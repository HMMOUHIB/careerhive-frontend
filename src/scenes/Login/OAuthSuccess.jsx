import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setOAuthSession } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userStr = params.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        setOAuthSession(token, user);
        navigate('/');
      } catch (err) {
        console.error('Failed to parse OAuth user data', err);
        navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
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