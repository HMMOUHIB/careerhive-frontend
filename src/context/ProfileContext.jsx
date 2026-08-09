import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const DEFAULT_EXTRAS = { skills: [], certificates: [], projects: [] };

export const ProfileProvider = ({ children }) => {
  const { user, token, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      setProfileData(null);
      return;
    }
    setProfileData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      position: user.position || '',
      department: user.department || '',
      education: user.education || '',
      bio: user.bio || '',
      profilePhoto: user.profilePhoto || '',
      coverPhoto: user.coverPhoto || '',
      ...DEFAULT_EXTRAS,
    });
  }, [user]);

  useEffect(() => {
    if (!user || !token) return;
    const loadExtras = async () => {
      try {
        const [skillsRes, certsRes] = await Promise.all([
          fetch(`${API_BASE}/skills/${user.id}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/certificates/${user.id}`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const skillsData = await skillsRes.json();
        const certsData = await certsRes.json();
        setProfileData((prev) =>
          prev ? { ...prev, skills: skillsData.skills || [], certificates: certsData.certificates || [] } : prev
        );
      } catch (err) {
        console.error('Failed to load skills/certificates', err);
      }
    };
    loadExtras();
  }, [user, token]);

  const updateProfileData = async (newData) => {
    const merged = { ...profileData, ...newData };
    setProfileData(merged);
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const res = await fetch(`${API_BASE}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(merged),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server error (status ${res.status}). Try a smaller photo.`);
      }

      if (!res.ok) throw new Error(data?.message || 'Failed to save profile.');
      updateUser(data.user);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateProfilePhoto = (photoUrl) => updateProfileData({ profilePhoto: photoUrl });
  const updateCoverPhoto = (photoUrl) => updateProfileData({ coverPhoto: photoUrl });

  const addSkill = async (skillName) => {
    try {
      const res = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ skillName }),
      });
      if (!res.ok) throw new Error((await res.json())?.message || 'Failed to add skill.');
      const newSkill = await res.json();
      setProfileData((prev) => ({ ...prev, skills: [...(prev.skills || []), newSkill] }));
    } catch (err) {
      setSaveError(err.message);
    }
  };

  const removeSkill = async (id) => {
    try {
      await fetch(`${API_BASE}/skills/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setProfileData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
    } catch (err) {
      setSaveError(err.message);
    }
  };

  const addCertificate = async (certificateName) => {
    try {
      const res = await fetch(`${API_BASE}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ certificateName }),
      });
      if (!res.ok) throw new Error((await res.json())?.message || 'Failed to add certificate.');
      const newCert = await res.json();
      setProfileData((prev) => ({ ...prev, certificates: [...(prev.certificates || []), newCert] }));
    } catch (err) {
      setSaveError(err.message);
    }
  };

  const removeCertificate = async (id) => {
    try {
      await fetch(`${API_BASE}/certificates/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setProfileData((prev) => ({
        ...prev,
        certificates: prev.certificates.filter((c) => c.id !== id),
      }));
    } catch (err) {
      setSaveError(err.message);
    }
  };

  const value = {
    profileData: profileData || {
      firstName: '', lastName: '', email: '', phone: '', location: '',
      position: '', department: '', education: '', bio: '',
      profilePhoto: '', coverPhoto: '', ...DEFAULT_EXTRAS,
    },
    updateProfileData,
    updateProfilePhoto,
    updateCoverPhoto,
    addSkill,
    removeSkill,
    addCertificate,
    removeCertificate,
    saving,
    saveError,
    saveSuccess,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
};

export default ProfileContext;