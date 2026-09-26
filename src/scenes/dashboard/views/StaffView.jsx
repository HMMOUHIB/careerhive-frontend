import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import {
  BarList,
  EmptyState,
  Panel,
  PanelLink,
  Pipeline,
  ProgressRing,
  Skeleton,
  Stars,
  StatCard,
  StatusChip,
} from '../dash-components/DashWidgets';
import { formatDate, initials, plural, ROLE_LABELS } from '../dash-components/format';
import FormationCards from './FormationCards';

const QueueList = ({ items, render }) => (
  <ul className="chd-list">
    {items.map((item) => (
      <li key={item.id} className="chd-list__item">
        {item.photo ? (
          <img className="chd-avatar" src={item.photo} alt="" />
        ) : (
          <span className="chd-avatar chd-avatar--initials">{initials(item.employee)}</span>
        )}
        <span className="chd-list__text">
          <strong>{item.employee}</strong>
          <span>{render(item)}</span>
        </span>
        <span className="chd-list__meta">
          <StatusChip status={item.status} />
          <small>{formatDate(item.date)}</small>
        </span>
      </li>
    ))}
  </ul>
);

const StaffView = ({ org, role, loading }) => {
  const totals = org?.totals || {};
  const queue = org?.queue || { promotions: [], formations: [] };
  const isAdmin = role === 'admin';
  const seesPeople = role === 'admin' || role === 'hr';

  return (
    <>
      <div className="chd-stats">
        {isAdmin ? (
          <StatCard
            icon={<AdminPanelSettingsOutlinedIcon />}
            label="Users"
            value={totals.users || 0}
            hint={`${totals.employees || 0} employees`}
            to="/team"
            tone="purple"
            loading={loading}
          />
        ) : (
          <StatCard
            icon={<PeopleAltOutlinedIcon />}
            label="Employees"
            value={totals.employees || 0}
            hint="across the company"
            to="/team"
            tone="purple"
            loading={loading}
          />
        )}
        <StatCard
          icon={<GroupsOutlinedIcon />}
          label="Team"
          value={totals.teamMembers || 0}
          hint={plural(totals.teams || 0, 'team')}
          to="/team"
          tone="blue"
          loading={loading}
        />
        <StatCard
          icon={<WorkspacePremiumOutlinedIcon />}
          label="Certificates"
          value={totals.certificates || 0}
          hint="earned by employees"
          to="/certificates"
          tone="amber"
          loading={loading}
        />
        <StatCard
          icon={<SchoolOutlinedIcon />}
          label="Enrollments"
          value={totals.enrollments || 0}
          hint={`${plural(totals.catalog || 0, 'formation')} in catalog`}
          to="/formations"
          tone="teal"
          loading={loading}
        />
      </div>

      <div className="chd-row">
        <Panel title="Training completion">
          {loading ? (
            <Skeleton lines={3} />
          ) : totals.enrollments ? (
            <ProgressRing
              percent={totals.avgProgress || 0}
              caption="average progress"
              sub={`${totals.completedEnrollments} of ${plural(totals.enrollments, 'enrollment')} completed`}
            />
          ) : (
            <EmptyState to="/formations" cta="Assign a formation">
              No one is enrolled in a formation yet.
            </EmptyState>
          )}
        </Panel>

        <Panel
          title="Waiting for you"
          action={
            !loading && (
              <span className="chd-count">{(totals.promotionQueue || 0) + (totals.formationQueue || 0)}</span>
            )
          }
        >
          {loading ? (
            <Skeleton lines={4} />
          ) : queue.promotions.length || queue.formations.length ? (
            <>
              {queue.promotions.length > 0 && (
                <div className="chd-subsection">
                  <h4>
                    Promotions <PanelLink to="/certificates">Review</PanelLink>
                  </h4>
                  <QueueList
                    items={queue.promotions}
                    render={(r) => `${r.currentPosition || '—'} → ${r.requestedPosition}`}
                  />
                </div>
              )}
              {queue.formations.length > 0 && (
                <div className="chd-subsection">
                  <h4>
                    Formation requests <PanelLink to="/formations">Review</PanelLink>
                  </h4>
                  <QueueList items={queue.formations} render={(r) => r.formation} />
                </div>
              )}
            </>
          ) : (
            <EmptyState>Nothing is waiting for your review right now.</EmptyState>
          )}
        </Panel>
      </div>

      <div className="chd-row chd-row--even">
        <Panel title="Promotion pipeline" action={<PanelLink to="/certificates">Open</PanelLink>}>
          {loading ? <Skeleton lines={3} /> : <Pipeline counts={org?.promotionPipeline} />}
        </Panel>
        <Panel title="Formation requests" action={<PanelLink to="/formations">Open</PanelLink>}>
          {loading ? <Skeleton lines={3} /> : <Pipeline counts={org?.formationPipeline} />}
        </Panel>
      </div>

      <div className="chd-row chd-row--even">
        <Panel title="Top skills" action={<PanelLink to="/skills-evolution">Evolution</PanelLink>}>
          {loading ? (
            <Skeleton lines={4} />
          ) : org?.topSkills?.length ? (
            <BarList items={org.topSkills} />
          ) : (
            <EmptyState>Skills appear here once employees add them.</EmptyState>
          )}
        </Panel>

        {seesPeople ? (
          <Panel title="People">
            {loading ? (
              <Skeleton lines={4} />
            ) : (
              <>
                <BarList
                  items={Object.entries(org?.usersByRole || {})
                    .filter(([, count]) => count > 0)
                    .map(([r, count]) => ({ name: ROLE_LABELS[r] || r, count }))}
                />
                {org?.departments?.length > 0 && (
                  <div className="chd-subsection">
                    <h4>Employees by department</h4>
                    <BarList items={org.departments} />
                  </div>
                )}
              </>
            )}
          </Panel>
        ) : (
          <Panel title="Team health" action={<PanelLink to="/team">Manage</PanelLink>}>
            {loading ? (
              <Skeleton lines={4} />
            ) : (
              <>
                <div className="chd-team__rating">
                  <span>Average rating</span>
                  {totals.avgRating !== null && totals.avgRating !== undefined ? (
                    <Stars value={totals.avgRating} />
                  ) : (
                    <small>Not rated yet</small>
                  )}
                </div>
                {org?.departments?.length > 0 && (
                  <div className="chd-subsection">
                    <h4>Employees by department</h4>
                    <BarList items={org.departments} />
                  </div>
                )}
              </>
            )}
          </Panel>
        )}
      </div>

      <FormationCards
        title="Most followed formations"
        loading={loading}
        formations={org?.popularFormations || []}
        showCompletion
        footer={(f) =>
          f.enrolled ? `${plural(f.enrolled, 'employee')} · ${f.avgProgress}% avg. progress` : 'No enrollments yet'
        }
      />
    </>
  );
};

export default StaffView;
