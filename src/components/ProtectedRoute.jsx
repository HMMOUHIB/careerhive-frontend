import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('ch_token');

  if (!user && !token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;