import { Link } from 'react-router-dom';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import {
  EmptyState,
  FormationIcon,
  Panel,
  PanelLink,
  ProgressBar,
  ProgressRing,
  PromotionTracker,
  Skeleton,
  Stars,
  StatCard,
  StatusChip,
} from '../dash-components/DashWidgets';
import { formatDate, initials, isDone, plural } from '../dash-components/format';
import FormationCards from './FormationCards';

const EmployeeView = ({ me, loading }) => {
  const learning = me?.learning || { total: 0, active: 0, completed: 0, avgProgress: 0 };
  const promotion = me?.promotion;
  const team = me?.team;

  return (
    <>
      <div className="chd-stats">
        <StatCard
          icon={<PsychologyOutlinedIcon />}
          label="Skills"
          value={me?.skills || 0}
          hint="Add or update"
          to="/add-skills"
          tone="teal"
          loading={loading}
        />
        <StatCard
          icon={<WorkspacePremiumOutlinedIcon />}
          label="Certificates"
          value={me?.certificates || 0}
          hint="on your profile"
          to="/profile"
          tone="amber"
          loading={loading}
        />
        <StatCard
          icon={<SchoolOutlinedIcon />}
          label="Formations"
          value={learning.active}
          hint={`${learning.completed} completed`}
          to="/formations"
          tone="purple"
          loading={loading}
        />
        <StatCard
          icon={<GroupsOutlinedIcon />}
          label="My team"
          value={team?.members || 0}
          hint={team ? team.name : 'Not in a team yet'}
          to="/contacts"
          tone="blue"
          loading={loading}
        />
      </div>

      <div className="chd-row">
        <Panel title="Learning progress">
          {loading ? (
            <Skeleton lines={3} />
          ) : learning.total ? (
            <ProgressRing
              percent={learning.avgProgress}
              caption="overall"
              sub={`${learning.completed} of ${plural(learning.total, 'formation')} completed`}
            />
          ) : (
            <EmptyState to="/formations" cta="Browse formations">
              You're not enrolled in any formation yet.
            </EmptyState>
          )}
        </Panel>

        <Panel title="Promotion journey" action={promotion && <StatusChip status={promotion.status} />}>
          {loading ? (
            <Skeleton lines={3} />
          ) : promotion ? (
            <div className="chd-promo">
              <p className="chd-promo__route">
                <span>{promotion.currentPosition || 'Current role'}</span>
                <TrendingUpRoundedIcon fontSize="small" />
                <strong>{promotion.managerApproval?.approvedPosition || promotion.requestedPosition}</strong>
              </p>
              <PromotionTracker request={promotion} />
              <p className="chd-promo__date">Submitted {formatDate(promotion.submittedDate)}</p>
              {(promotion.managerApproval?.comments || promotion.hrApproval?.comments) && (
                <blockquote className="chd-promo__note">
                  “{promotion.managerApproval?.comments || promotion.hrApproval?.comments}”
                </blockquote>
              )}
            </div>
          ) : (
            <div className="chd-promo">
              <PromotionTracker request={null} />
              <EmptyState to="/promotion-request" cta="Request a promotion">
                Ready for the next step? Your request goes to HR, then to your manager.
              </EmptyState>
            </div>
          )}
        </Panel>
      </div>

      <div className="chd-row chd-row--wide">
        <Panel title="My formations" action={<PanelLink to="/formations">All formations</PanelLink>}>
          {loading ? (
            <Skeleton lines={4} />
          ) : me?.formations?.length ? (
            <ul className="chd-list">
              {me.formations.map((f) => (
                <li key={f.id} className="chd-list__item">
                  <FormationIcon formation={f} size="sm" />
                  <span className="chd-list__text">
                    <strong>{f.title}</strong>
                    <span>{[f.level, f.duration, f.instructor].filter(Boolean).join(' · ')}</span>
                    <ProgressBar value={Number(f.progress) || 0} />
                  </span>
                  <span className="chd-list__meta">
                    <StatusChip status={isDone(f) ? 'Terminée' : 'En cours'} />
                    <small>{Number(f.progress) || 0}%</small>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState to="/formations" cta="Find a formation">
              Formations you join will show up here with your progress.
            </EmptyState>
          )}

          {me?.formationRequests?.length > 0 && (
            <div className="chd-subsection">
              <h4>Enrollment requests</h4>
              <ul className="chd-mini-list">
                {me.formationRequests.map((r) => (
                  <li key={r.id}>
                    <span>{r.title}</span>
                    <StatusChip status={r.status} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Panel>

        <Panel title="My team" action={team && <PanelLink to="/contacts">Team hub</PanelLink>}>
          {loading ? (
            <Skeleton lines={3} />
          ) : team ? (
            <div className="chd-team">
              <div className="chd-team__manager">
                {team.manager.avatar ? (
                  <img className="chd-avatar chd-avatar--lg" src={team.manager.avatar} alt="" />
                ) : (
                  <span className="chd-avatar chd-avatar--lg chd-avatar--initials">{initials(team.manager.name)}</span>
                )}
                <span>
                  <strong>{team.manager.name}</strong>
                  <small>{team.manager.role || 'Manager'}</small>
                </span>
              </div>
              <p className="chd-team__name">
                {team.name} · {plural(team.members, 'member')}
              </p>
              {team.rating !== null && (
                <div className="chd-team__rating">
                  <span>Your rating</span>
                  <Stars value={team.rating} />
                </div>
              )}
              {team.feedback && <blockquote className="chd-promo__note">“{team.feedback}”</blockquote>}
            </div>
          ) : (
            <EmptyState to="/contacts" cta="Open team hub">
              You haven't been added to a team yet. Your manager will add you.
            </EmptyState>
          )}
        </Panel>
      </div>

      <FormationCards
        title="Recommended for you"
        loading={loading}
        formations={me?.recommended || []}
        footer={(f) => (f.enrolled ? `${plural(f.enrolled, 'colleague')} enrolled` : 'Be the first to join')}
      />

      {!loading && !me?.recommended?.length && !me?.formations?.length && (
        <Link to="/formations" className="chd-btn chd-btn--ghost chd-btn--center">
          Explore the formation catalog
        </Link>
      )}
    </>
  );
};

export default EmployeeView;
