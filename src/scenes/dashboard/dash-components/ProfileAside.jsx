import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { EmptyState, Panel, PanelLink, RingBadge, useCountUp } from './DashWidgets';
import { initials, ROLE_LABELS } from './format';

const MiniPill = ({ icon, label, value, to }) => {
  const shown = useCountUp(value);
  return (
    <Link to={to} className="chd-minipill">
      <RingBadge size="sm">{icon}</RingBadge>
      <span>
        <strong>{shown}</strong>
        <small>{label}</small>
      </span>
    </Link>
  );
};

const ProfileAside = ({ profileData, role, me }) => {
  const fullName = [profileData.firstName, profileData.lastName].filter(Boolean).join(' ') || 'Your profile';
  const skills = profileData.skills || [];
  const certificates = profileData.certificates || [];

  return (
    <aside className="chd-aside">
      <section className="chd-profile" data-anim>
        <Link to="/profile" className="chd-profile__photo" aria-label="Edit your profile">
          <RingBadge size="xl">
            {profileData.profilePhoto ? (
              <img src={profileData.profilePhoto} alt="" />
            ) : (
              <span className="chd-ring__letter">{initials(fullName)}</span>
            )}
          </RingBadge>
          <span className="chd-profile__edit">
            <EditOutlinedIcon fontSize="inherit" />
          </span>
        </Link>
        <h2>{fullName}</h2>
        <p>{[profileData.position, profileData.department].filter(Boolean).join(' · ') || 'Add your position'}</p>
        <span className="chd-chip chd-chip--purple">{ROLE_LABELS[role] || role}</span>

        <div className="chd-minipills">
          <MiniPill icon={<PsychologyOutlinedIcon />} label="Skills" value={skills.length} to="/add-skills" />
          <MiniPill
            icon={<WorkspacePremiumOutlinedIcon />}
            label="Certificates"
            value={certificates.length}
            to="/profile"
          />
          <MiniPill
            icon={<SchoolOutlinedIcon />}
            label="Formations"
            value={me?.learning?.total || 0}
            to="/formations"
          />
        </div>

        <Link to="/profile" className="chd-btn chd-btn--primary chd-btn--block">
          Edit profile
        </Link>
      </section>

      <Panel title="Skills" action={<PanelLink to="/add-skills">Add</PanelLink>}>
        {skills.length ? (
          <div className="chd-tags">
            {skills.slice(0, 12).map((s) => (
              <span key={s.id}>{s.name}</span>
            ))}
            {skills.length > 12 && <span className="chd-tags__more">+{skills.length - 12}</span>}
          </div>
        ) : (
          <EmptyState to="/add-skills" cta="Add skills">
            List your skills so managers can match you to formations.
          </EmptyState>
        )}
      </Panel>

      <Panel title="Certificates" action={<PanelLink to="/profile">Manage</PanelLink>}>
        {certificates.length ? (
          <ul className="chd-certs">
            {certificates.slice(0, 5).map((c) => (
              <li key={c.id}>
                <WorkspacePremiumOutlinedIcon fontSize="small" />
                <span>{c.name}</span>
              </li>
            ))}
            {certificates.length > 5 && <li className="chd-certs__more">+{certificates.length - 5} more</li>}
          </ul>
        ) : (
          <EmptyState to="/profile" cta="Add a certificate">
            Certificates you earn light up the hive.
          </EmptyState>
        )}
      </Panel>
    </aside>
  );
};

export default ProfileAside;
