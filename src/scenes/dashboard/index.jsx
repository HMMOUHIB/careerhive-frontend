import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './index.css';
import AreaCharts from './dash-components/AreaChart';
import mg from './mg.png';
import Progress from './dash-components/Progress';
import team from './team.png';
import project from './project.png';
import cadre from './profilecadre.png';
import RotatingText from '../../components/Reactbit/RotatingText ';
import { useProfile } from '../../context/ProfileContext';

const Index = () => {
  const navigate = useNavigate();
  const { profileData } = useProfile();
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);

  // Refs for GSAP
  const containerRef = useRef(null);
  const welcomeRef = useRef(null);
  const mgRef = useRef(null);
  const chartRefs = useRef([]);
  const formationRefs = useRef([]);
  const certBadgeRefs = useRef([]);
  const photoWrapRef = useRef(null);
  const photoRingRef = useRef(null);
  const firstLastRef = useRef(null);
  const editBtnRef = useRef(null);

  chartRefs.current = [];
  formationRefs.current = [];
  certBadgeRefs.current = [];

  const addChartRef = (el) => el && !chartRefs.current.includes(el) && chartRefs.current.push(el);
  const addFormationRef = (el) => el && !formationRefs.current.includes(el) && formationRefs.current.push(el);
  const addCertBadgeRef = (el) => el && !certBadgeRefs.current.includes(el) && certBadgeRefs.current.push(el);

  const displayFirstName = profileData?.firstName || 'Mouhib';
  const displayLastName = profileData?.lastName || 'Hamzaoui';
  const displayPosition = profileData?.position || 'Position';
  const displayPhoto = profileData?.profilePhoto;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(welcomeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(mgRef.current, { opacity: 0, scale: 0.85, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 0.7 }, '-=0.4')
        .fromTo(chartRefs.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, '-=0.3')
        .fromTo(formationRefs.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, '-=0.3')
        .fromTo(
          certBadgeRefs.current,
          { opacity: 0, scale: 0, rotate: -90 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(2.2)' },
          '-=0.5'
        )
        .fromTo(photoWrapRef.current, { opacity: 0, scale: 0.6, rotate: -10 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.7 }, '-=0.6')
        .fromTo(firstLastRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
        .fromTo(editBtnRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4 }, '-=0.2');

      // Gentle floating loop for the hero illustration
      gsap.to(mgRef.current, {
        y: -12,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Slow rotating glow ring behind profile photo
      gsap.to(photoRingRef.current, {
        rotate: 360,
        duration: 10,
        repeat: -1,
        ease: 'linear',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover reaction on the profile photo
  useLayoutEffect(() => {
    if (!photoWrapRef.current) return;
    gsap.to(photoWrapRef.current, {
      scale: isHoveringPhoto ? 1.08 : 1,
      duration: 0.35,
      ease: 'power2.out',
    });
    gsap.to(photoRingRef.current, {
      opacity: isHoveringPhoto ? 1 : 0.4,
      scale: isHoveringPhoto ? 1.15 : 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [isHoveringPhoto]);

  const handleEditProfile = () => {
    gsap.fromTo(
      editBtnRef.current,
      { scale: 1 },
      { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut', onComplete: () => navigate('/profile') }
    );
  };

  const formations = [
    {
      icon: 'https://img.icons8.com/?size=512&id=78295&format=png',
      name: 'Symfony',
      desc: 'Les certifications Symfony valorisent vos compétences et dynamisent votre carrière.',
    },
    {
      icon: 'https://cdn-icons-png.freepik.com/256/11674/11674239.png?semt=ais_hybrid',
      name: 'React-js',
      desc: 'Les certifications React valorisent vos compétences et boostent votre carrière.',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/919/919852.png',
      name: 'Python',
      desc: 'Les certifications Python renforcent vos compétences et dynamisent votre carrière.',
    },
  ];

  return (
    <div className='maindash' ref={containerRef}>
      <div className="left">
        <div className="welcomeback" ref={welcomeRef}>
          <div className='msg'>
            <p className='ww'>
              <span className="gg">Welcome</span>back!
            </p>
            <span className='name'>
              -{displayLastName} {displayFirstName}-
            </span>
            <span>
              Your career management dashboard is ready to empower your journey. Let's make progress together!
            </span>
          </div>

          <div className='imgs'>
            <img className='mg' src={mg} alt="" ref={mgRef} />
          </div>
        </div>

        <div className='chartss'>
          <div className='peecharts' ref={addChartRef}>
            <p>Formation actuelle</p>
            <AreaCharts />
          </div>
          <div className="progress" ref={addChartRef}>
            <p>Progress</p>
            <div className='prog'>
              <Progress />
            </div>
          </div>
          <div className='team2' ref={addChartRef}>
            <div className='teams'>
              <div className="team">
                <div className='imgsss'>
                  <img className='membre' src={team} alt="" />
                </div>
                <div className='stats'>
                  <p>Team</p>
                  <span>5</span>
                </div>
              </div>
            </div>
            <div className='teams'>
              <div className="team">
                <div className='imgsss'>
                  <img className='membre' src={project} alt="" />
                </div>
                <div className='stats2'>
                  <p>Certificats</p>
                  <span>+10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="formation-section">
          <p className="formation-title">Formation</p>
          <div className='formations'>
            {formations.map((f) => (
              <div className="formation1" ref={addFormationRef} key={f.name}>
                <div className="photo">
                  <div className='cert-badge' ref={addCertBadgeRef}>
                    <div className='cert-badge-inner'>
                      <img className='form' src={f.icon} alt={f.name} />
                    </div>
                  </div>
                  <p>{f.name}</p>
                </div>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="righ">
        <div className='Logo'>
          <RotatingText />
        </div>

        <div
          className='name2'
          onMouseEnter={() => setIsHoveringPhoto(true)}
          onMouseLeave={() => setIsHoveringPhoto(false)}
        >
          <div className='photo-glow-ring' ref={photoRingRef}></div>

          <div className='photo-wrap' ref={photoWrapRef} onClick={handleEditProfile}>
            <img
              className='prpicture'
              src={displayPhoto || "https://scontent.ftun1-2.fna.fbcdn.net/v/t39.30808-6/466392131_2380393522299461_77210064096490724_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ESR6yfsdV7kQ7kNvwGhFlei&_nc_oc=Adkq6mcBLRdbpb9bZGl27K09UGuvsDmwUnbokyqxqPBPh6Ucb1Ms0cPKhX04zqnd7GI&_nc_zt=23&_nc_ht=scontent.ftun1-2.fna&_nc_gid=PBwis4sYpQu6u7Ijt4iAGg&oh=00_AfIG4TR-4ZvYB_CywH7gYZq6i17t_ah2YTi2hiE9KwH2rg&oe=682AF54A"}
              alt="Profile"
            />
            <div className={`photo-hover-overlay ${isHoveringPhoto ? 'visible' : ''}`}>
              <span>Edit</span>
            </div>
          </div>

          <img className='cadre' src={cadre} alt="" />
        </div>

        <div className='firstlast' ref={firstLastRef}>
          <p>{displayLastName} {displayFirstName}</p>
          <span>Position : {displayPosition}</span>
          <button className="pp1btn" ref={editBtnRef} onClick={handleEditProfile}>
            <span className="pp1btn-text-one">Edit Profile</span>
            <span className="pp1btn-text-two">Great!</span>
          </button>
        </div>
        <div className='onlineteam'></div>
      </div>
    </div>
  );
};

export default Index;