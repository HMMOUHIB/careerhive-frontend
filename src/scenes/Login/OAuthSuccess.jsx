import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setOAuthSession } = useAuth();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      navigate('/auth', { replace: true });
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Failed to load user (${res.status})`);
        const { user } = await res.json();
        setOAuthSession(token, user);
        navigate('/', { replace: true });
      } catch (err) {
        console.error('OAuth sign-in failed', err);
        navigate('/auth', { replace: true });
      }
    })();
  }, [navigate, setOAuthSession]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0b0715',
        color: '#fff',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      Signing you in...
    </div>
  );
};

export default OAuthSuccess;