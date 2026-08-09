import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, signup, loading, error } = useAuth();

  const [mode, setMode] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('student');
  const [formError, setFormError] = useState('');

  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const headingRef = useRef(null);
  const iconRefs = useRef([]);
  const dotRefs = useRef([]);
  const formFieldsRef = useRef(null);

  iconRefs.current = [];
  dotRefs.current = [];
  const addIconRef = (el) => el && !iconRefs.current.includes(el) && iconRefs.current.push(el);
  const addDotRef = (el) => el && !dotRefs.current.includes(el) && dotRefs.current.push(el);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(leftPanelRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.7 })
        .fromTo(rightPanelRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.55')
        .fromTo(headingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
        .fromTo(
          iconRefs.current,
          { opacity: 0, scale: 0.4, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'back.out(2)' },
          '-=0.3'
        )
        .fromTo(
          formFieldsRef.current?.children || [],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          '-=0.4'
        );

      iconRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -14 : 12,
          duration: 2.4 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      gsap.to(leftPanelRef.current, {
        backgroundPosition: '60% 40%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const switchMode = (nextMode) => {
    if (nextMode === mode) return;
    setFormError('');

    gsap.to(formFieldsRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.2,
      ease: 'power1.in',
      onComplete: () => {
        setMode(nextMode);
        gsap.fromTo(
          formFieldsRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      },
    });

    gsap.to(dotRefs.current, {
      scale: (i) => (dotRefs.current[i] === dotRefs.current[nextMode === 'signup' ? 0 : 1] ? 1.4 : 1),
      duration: 0.3,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password || (mode === 'signup' && !formData.name)) {
      setFormError('Please fill in all fields.');
      return;
    }
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    try {
      if (mode === 'signup') {
        await signup({ ...formData, role: selectedRole });
      } else {
        await login({ email: formData.email, password: formData.password });
      }
      navigate('/');
    } catch (err) {
      setFormError(err?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page" ref={containerRef}>
      <div className="auth-left" ref={leftPanelRef}>
        <div className="auth-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9552/9552379.png"
            alt="CareerHive Logo"
            className="auth-logo-img"
          />
          <span className="auth-logo-text">CareerHive</span>
        </div>

        <div className="auth-left-content">
          <h1 className="auth-heading" ref={headingRef}>
            {mode === 'signup' ? 'Welcome to CareerHive!' : 'Welcome back!'}
          </h1>
          <p className="auth-subtext">
            {mode === 'signup'
              ? 'Join a community of professionals building their career journey, one milestone at a time.'
              : 'Sign in to pick up right where you left off on your career journey.'}
          </p>

          <div className="auth-icon-collage">
            <div className="auth-icon-circle circle-1" ref={addIconRef}>
              <WorkIcon />
            </div>
            <div className="auth-icon-circle circle-2" ref={addIconRef}>
              <SchoolIcon />
            </div>
            <div className="auth-icon-circle circle-3" ref={addIconRef}>
              <GroupsIcon />
            </div>
            <div className="auth-icon-circle circle-4" ref={addIconRef}>
              <TrendingUpIcon />
            </div>
          </div>
        </div>

        <div className="auth-dots">
          <span className="auth-dot" ref={addDotRef} data-active={mode === 'signup'}></span>
          <span className="auth-dot" ref={addDotRef} data-active={mode === 'signin'}></span>
        </div>
      </div>

      <div className="auth-right" ref={rightPanelRef}>
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h2>{mode === 'signup' ? 'Get Started' : 'Sign In'}</h2>
            <p>
              {mode === 'signup' ? (
                <>Already have an account? <button type="button" className="auth-link" onClick={() => switchMode('signin')}>Sign In</button></>
              ) : (
                <>New here? <button type="button" className="auth-link" onClick={() => switchMode('signup')}>Sign Up</button></>
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" ref={formFieldsRef}>
            {mode === 'signup' && (
              <>
                <div className="auth-field">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>

                <div className="auth-field">
                  <label>I am signing up as</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="auth-role-select"
                  >
                    <option value="student">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
              </>
            )}

            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="auth-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </div>

            {(formError || error) && <p className="auth-error">{formError || error}</p>}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Please wait…' : mode === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>

            <div className="auth-divider">
              <span>Or continue with</span>
            </div>

            <div className="auth-socials">
              <button
                type="button"
                className="auth-social-btn"
                aria-label="Continue with Google"
                onClick={() => (window.location.href = `${API_BASE}/auth/google`)}
              >
                <GoogleIcon />
              </button>
              <button type="button" className="auth-social-btn" aria-label="Continue with LinkedIn">
                <LinkedInIcon />
              </button>
              <button type="button" className="auth-social-btn" aria-label="Continue with GitHub">
                <GitHubIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;