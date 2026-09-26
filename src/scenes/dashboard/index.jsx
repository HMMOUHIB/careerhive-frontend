import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import gsap from 'gsap';
import { useProfile } from '../../context/ProfileContext';
import useDashboardData from './useDashboardData';
import HiveScene from './dash-components/HiveScene';
import ProfileAside from './dash-components/ProfileAside';
import { greeting, plural, ROLE_LABELS } from './dash-components/format';
import EmployeeView from './views/EmployeeView';
import StaffView from './views/StaffView';
// Legacy stylesheet: other pages still inherit its generic class rules (.name, .stats, .team, …),
// so it stays loaded until those pages get their own scoped styles.
import './index.css';
import './Dashboard.css';

const heroMessage = ({ loading, isStaff, data }) => {
  if (loading) return 'Loading your career overview…';
  if (isStaff) {
    const totals = data?.org?.totals || {};
    const waiting = (totals.promotionQueue || 0) + (totals.formationQueue || 0);
    return waiting
      ? `${plural(waiting, 'request')} ${waiting === 1 ? 'is' : 'are'} waiting for your review. Your team is counting on you.`
      : 'Your review queue is clear. Here is how your people are growing.';
  }
  const learning = data?.me?.learning;
  return learning?.active
    ? `You have ${plural(learning.active, 'formation')} in progress, ${learning.avgProgress}% complete overall. Keep going!`
    : 'Pick a formation to start building your next skill.';
};

const Dashboard = () => {
  const theme = useTheme();
  const { profileData } = useProfile();
  const dashboard = useDashboardData();
  const { loading, error, data, role, isStaff, reload } = dashboard;
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-anim]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out', clearProps: 'transform' }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [isStaff]);

  const me = data?.me;
  const highlights = (me?.certificates || 0) + (me?.learning?.completed || 0);

  return (
    <div className={`chd chd--${theme.palette.mode}`} ref={rootRef}>
      <div className="chd-main">
        <header className="chd-hero" data-anim>
          <HiveScene className="chd-hero__scene" highlights={highlights} />
          <div className="chd-hero__content">
            <span className="chd-hero__eyebrow">
              {greeting()} · {ROLE_LABELS[role] || role}
            </span>
            <h1>
              Welcome back, <span>{profileData.firstName || 'there'}</span>
            </h1>
            <p>{heroMessage(dashboard)}</p>
            <div className="chd-hero__actions">
              {isStaff ? (
                <>
                  <Link to="/certificates" className="chd-btn chd-btn--light">Review requests</Link>
                  <Link to="/team" className="chd-btn chd-btn--glass">Manage team</Link>
                </>
              ) : (
                <>
                  <Link to="/formations" className="chd-btn chd-btn--light">Continue learning</Link>
                  <Link to="/promotion-request" className="chd-btn chd-btn--glass">
                    {me?.promotion ? 'Track promotion' : 'Request promotion'}
                  </Link>
                </>
              )}
            </div>
          </div>
          <p className="chd-hero__legend">
            <span className="chd-hero__legend-dot" /> Each glowing cell is a certificate or completed formation
          </p>
        </header>

        {error && (
          <div className="chd-alert" role="alert">
            <span>{error}</span>
            <button type="button" className="chd-btn chd-btn--ghost" onClick={reload}>
              Retry
            </button>
          </div>
        )}

        {isStaff ? (
          <StaffView org={data?.org} role={role} loading={loading} />
        ) : (
          <EmployeeView me={me} loading={loading} />
        )}
      </div>

      <ProfileAside profileData={profileData} role={role} me={me} />
    </div>
  );
};

export default Dashboard;
