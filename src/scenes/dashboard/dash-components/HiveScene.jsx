import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Honeycomb "hive" rendered with plain three.js (@react-three/fiber v9 needs React 19).
// `highlights` lights up that many amber cells — one per certificate / completed formation.

const CELL_RADIUS = 0.5;
const GAP = 0.9;
const GRID_RADIUS = 4; // hex rings around the centre cell
const MAX_HIGHLIGHTS = 12;

const TEAL = new THREE.Color('#14b8a6');
const PURPLE = new THREE.Color('#7b65db');
const DEEP = new THREE.Color('#2a148f');

// Axial hex coordinates within GRID_RADIUS rings, pointy-top layout on the XZ plane
const buildCells = () => {
  const cells = [];
  for (let q = -GRID_RADIUS; q <= GRID_RADIUS; q += 1) {
    for (let r = -GRID_RADIUS; r <= GRID_RADIUS; r += 1) {
      const s = -q - r;
      if (Math.abs(s) > GRID_RADIUS) continue;
      const x = Math.sqrt(3) * CELL_RADIUS * (q + r / 2);
      const z = 1.5 * CELL_RADIUS * r;
      cells.push({ x, z, dist: Math.hypot(x, z) });
    }
  }
  return cells;
};

// Spread highlighted cells across the hive instead of clustering them
const pickHighlights = (cells, count) => {
  const picked = new Set();
  const golden = 0.618033988749895;
  for (let i = 0; picked.size < count && i < cells.length * 4; i += 1) {
    picked.add(Math.floor(((i * golden) % 1) * cells.length));
  }
  return picked;
};

const HiveScene = ({ highlights = 0, className = '' }) => {
  const mountRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch (err) {
      setSupported(false);
      return undefined;
    }

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 6.2, 6.4);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(4, 8, 5);
    scene.add(key);
    const glow = new THREE.PointLight(0x14b8a6, 18, 12, 1.6);
    glow.position.set(0, 2.5, 0);
    scene.add(glow);

    const cells = buildCells();
    const highlighted = pickHighlights(cells, Math.min(highlights, MAX_HIGHLIGHTS));
    const baseCells = cells.filter((_, i) => !highlighted.has(i));
    const goldCells = cells.filter((_, i) => highlighted.has(i));

    const geometry = new THREE.CylinderGeometry(CELL_RADIUS * GAP, CELL_RADIUS * GAP, 1, 6);
    geometry.translate(0, 0.5, 0); // grow upward from the floor when scaled

    const baseMaterial = new THREE.MeshStandardMaterial({ metalness: 0.35, roughness: 0.35 });
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: '#ffb020',
      emissive: '#ff8a00',
      emissiveIntensity: 0.6,
      metalness: 0.4,
      roughness: 0.3,
    });

    const baseMesh = new THREE.InstancedMesh(geometry, baseMaterial, Math.max(baseCells.length, 1));
    const goldMesh = new THREE.InstancedMesh(geometry, goldMaterial, Math.max(goldCells.length, 1));
    baseMesh.count = baseCells.length;
    goldMesh.count = goldCells.length;

    const maxDist = Math.max(...cells.map((c) => c.dist));
    const color = new THREE.Color();
    baseCells.forEach((cell, i) => {
      const t = cell.dist / maxDist;
      color.copy(TEAL).lerp(PURPLE, Math.min(t * 1.4, 1)).lerp(DEEP, Math.max(t - 0.6, 0));
      baseMesh.setColorAt(i, color);
    });
    if (baseMesh.instanceColor) baseMesh.instanceColor.needsUpdate = true;

    const group = new THREE.Group();
    group.add(baseMesh, goldMesh);
    group.rotation.x = 0.08;
    scene.add(group);

    const dummy = new THREE.Object3D();
    const layout = (mesh, list, time, lift) => {
      list.forEach((cell, i) => {
        const wave = Math.sin(time * 1.3 - cell.dist * 1.1);
        const height = 0.35 + lift + (wave + 1) * 0.35;
        dummy.position.set(cell.x, 0, cell.z);
        dummy.scale.set(1, height, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    };

    // Pointer parallax
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerleave', onPointerLeave);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frameId = null;
    let visible = true;

    const renderFrame = () => {
      const time = reduceMotion ? 1.2 : clock.getElapsedTime();
      layout(baseMesh, baseCells, time, 0);
      layout(goldMesh, goldCells, time, 0.35);
      group.rotation.y += ((pointer.x * 0.35 + time * 0.08) - group.rotation.y) * 0.05;
      group.rotation.x += ((0.08 + pointer.y * 0.12) - group.rotation.x) * 0.05;
      goldMaterial.emissiveIntensity = 0.5 + Math.sin(time * 2.2) * 0.25;
      renderer.render(scene, camera);
    };

    const loop = () => {
      renderFrame();
      frameId = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduceMotion || frameId !== null || !visible || document.hidden) return;
      frameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    };

    // Only animate while on screen and while the tab is visible
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(mount);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    renderFrame();
    start();

    return () => {
      stop();
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);
      geometry.dispose();
      baseMaterial.dispose();
      goldMaterial.dispose();
      baseMesh.dispose();
      goldMesh.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [highlights]);

  if (!supported) return null;
  return <div ref={mountRef} className={className} aria-hidden="true" />;
};

export default HiveScene;
