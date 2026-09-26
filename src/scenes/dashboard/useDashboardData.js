import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Loads the role-aware payload from GET /api/dashboard:
// { role, me: {...personal progress}, org: {...analytics + review queue} | null }
const useDashboardData = () => {
  const { user, token } = useAuth();
  const [state, setState] = useState({ loading: true, error: '', data: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!token) return undefined;
    const controller = new AbortController();
    setState((prev) => ({ ...prev, loading: true, error: '' }));

    fetch(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.message || `Dashboard failed to load (${res.status}).`);
        setState({ loading: false, error: '', data: body });
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setState({
          loading: false,
          data: null,
          error: err instanceof TypeError ? 'Could not reach the server. Check that the backend is running.' : err.message,
        });
      });

    return () => controller.abort();
  }, [token, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  const role = state.data?.role || user?.role || 'student';

  return { ...state, role, isStaff: ['manager', 'hr', 'admin'].includes(role), reload };
};

export default useDashboardData;
