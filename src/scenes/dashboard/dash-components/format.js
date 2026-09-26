export const ROLE_LABELS = { student: 'Employee', manager: 'Manager', hr: 'HR', admin: 'Admin' };

export const isDone = (f) => f.status === 'Terminée' || Number(f.progress) >= 100;

export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export const initials = (name) =>
  (name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
