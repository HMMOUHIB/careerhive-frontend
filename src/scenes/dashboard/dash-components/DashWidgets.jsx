import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Animates a number from its previous value to `value`
export const useCountUp = (value, duration = 900) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }
    const from = fromRef.current;
    const startTime = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
};

export const Panel = ({ title, action, children, className = '' }) => (
  <section className={`chd-panel ${className}`} data-anim>
    {(title || action) && (
      <header className="chd-panel__head">
        {title && <h3>{title}</h3>}
        {action}
      </header>
    )}
    {children}
  </section>
);

export const PanelLink = ({ to, children }) => (
  <Link to={to} className="chd-panel__link">
    {children} <ArrowForwardRoundedIcon fontSize="inherit" />
  </Link>
);

// Round badge with the rotating gradient ring from the template
export const RingBadge = ({ children, size = 'md' }) => (
  <span className={`chd-ring chd-ring--${size}`}>
    <span className="chd-ring__inner">{children}</span>
  </span>
);

export const StatCard = ({ icon, label, value, hint, to, loading, tone = 'purple' }) => {
  const shown = useCountUp(loading ? 0 : value);
  return (
    <Link to={to} className={`chd-stat chd-stat--${tone}`} data-anim>
      <RingBadge>{icon}</RingBadge>
      <span className="chd-stat__body">
        <span className="chd-stat__label">{label}</span>
        <span className="chd-stat__value">{loading ? '—' : shown}</span>
        {hint && <span className="chd-stat__hint">{hint}</span>}
      </span>
    </Link>
  );
};

export const ProgressRing = ({ percent, caption, sub }) => {
  const shown = useCountUp(percent);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(percent, 0), 100) / 100);

  return (
    <div className="chd-ring-chart" role="img" aria-label={`${percent}% ${caption}`}>
      <svg viewBox="0 0 180 180">
        <defs>
          <linearGradient id="chdRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="55%" stopColor="#7b65db" />
            <stop offset="100%" stopColor="#ffb020" />
          </linearGradient>
        </defs>
        <circle className="chd-ring-chart__track" cx="90" cy="90" r={radius} />
        <circle
          className="chd-ring-chart__value"
          cx="90"
          cy="90"
          r={radius}
          stroke="url(#chdRingGrad)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ '--chd-circ': circumference }}
        />
      </svg>
      <div className="chd-ring-chart__center">
        <strong>{shown}%</strong>
        <span>{caption}</span>
      </div>
      {sub && <p className="chd-ring-chart__sub">{sub}</p>}
    </div>
  );
};

export const ProgressBar = ({ value }) => (
  <span className="chd-bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <span className="chd-bar__fill" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
  </span>
);

// Promotion flow in the backend: pending → (HR) on-hold → (Manager) approved, or rejected at either step
const promotionSteps = (request) => {
  const steps = [
    { key: 'submitted', label: 'Submitted', state: 'done' },
    { key: 'hr', label: 'HR review', state: 'todo' },
    { key: 'manager', label: 'Manager decision', state: 'todo' },
  ];
  if (!request) return steps.map((s) => ({ ...s, state: 'todo' }));

  switch (request.status) {
    case 'pending':
      steps[1].state = 'current';
      break;
    case 'on-hold':
      steps[1].state = 'done';
      steps[2].state = 'current';
      break;
    case 'approved':
      steps[1].state = 'done';
      steps[2].state = 'done';
      break;
    case 'rejected':
      if (request.hrApproval && !request.hrApproval.approved) {
        steps[1].state = 'rejected';
      } else {
        steps[1].state = 'done';
        steps[2].state = 'rejected';
      }
      break;
    default:
      break;
  }
  return steps;
};

export const PromotionTracker = ({ request }) => {
  const steps = promotionSteps(request);
  return (
    <ol className="chd-steps">
      {steps.map((step, i) => (
        <li key={step.key} className={`chd-steps__item is-${step.state}`}>
          <span className="chd-steps__dot">
            {step.state === 'done' && <CheckRoundedIcon fontSize="inherit" />}
            {step.state === 'rejected' && <CloseRoundedIcon fontSize="inherit" />}
            {(step.state === 'todo' || step.state === 'current') && i + 1}
          </span>
          <span className="chd-steps__label">{step.label}</span>
        </li>
      ))}
    </ol>
  );
};

export const StatusChip = ({ status }) => {
  const labels = {
    pending: 'Awaiting HR',
    'on-hold': 'Awaiting manager',
    approved: 'Approved',
    rejected: 'Rejected',
    'En cours': 'In progress',
    Terminée: 'Completed',
  };
  const tone = {
    pending: 'amber',
    'on-hold': 'purple',
    approved: 'teal',
    rejected: 'red',
    'En cours': 'purple',
    Terminée: 'teal',
  };
  return <span className={`chd-chip chd-chip--${tone[status] || 'muted'}`}>{labels[status] || status}</span>;
};

export const FormationIcon = ({ formation, size = 'md' }) => (
  <RingBadge size={size}>
    {formation.iconUrl ? (
      <img src={formation.iconUrl} alt="" loading="lazy" />
    ) : (
      <span className="chd-ring__letter">{(formation.title || '?').charAt(0).toUpperCase()}</span>
    )}
  </RingBadge>
);

// Horizontal bars, scaled to the largest value
export const BarList = ({ items, unit = '' }) => {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <ul className="chd-barlist">
      {items.map((item, i) => (
        <li key={item.name} style={{ animationDelay: `${i * 0.06}s` }}>
          <span className="chd-barlist__label">
            <span>{item.name}</span>
            <strong>
              {item.count}
              {unit}
            </strong>
          </span>
          <span className="chd-bar">
            <span className="chd-bar__fill" style={{ width: `${(item.count / max) * 100}%` }} />
          </span>
        </li>
      ))}
    </ul>
  );
};

// Request pipeline: Awaiting HR → Awaiting manager → Approved, plus rejected
export const Pipeline = ({ counts }) => {
  const stages = [
    { key: 'pending', label: 'Awaiting HR', tone: 'amber' },
    { key: 'on-hold', label: 'Awaiting manager', tone: 'purple' },
    { key: 'approved', label: 'Approved', tone: 'teal' },
    { key: 'rejected', label: 'Rejected', tone: 'red' },
  ];
  const total = stages.reduce((sum, s) => sum + (counts?.[s.key] || 0), 0);
  return (
    <div className="chd-pipeline">
      <div className="chd-pipeline__track" aria-hidden="true">
        {total > 0 &&
          stages.map((s) =>
            counts[s.key] ? (
              <span
                key={s.key}
                className={`chd-pipeline__seg chd-tone--${s.tone}`}
                style={{ flexGrow: counts[s.key] }}
              />
            ) : null
          )}
      </div>
      <ul className="chd-pipeline__legend">
        {stages.map((s) => (
          <li key={s.key} className={`chd-tone--${s.tone}`}>
            <strong>{counts?.[s.key] || 0}</strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Stars = ({ value, max = 5 }) => (
  <span className="chd-stars" role="img" aria-label={`${value} out of ${max}`}>
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={i < Math.round(value) ? 'is-on' : ''}>
        ★
      </span>
    ))}
    <strong>{value}</strong>
  </span>
);

export const EmptyState = ({ children, to, cta }) => (
  <div className="chd-empty">
    <p>{children}</p>
    {to && (
      <Link to={to} className="chd-btn chd-btn--ghost">
        {cta}
      </Link>
    )}
  </div>
);

export const Skeleton = ({ lines = 3 }) => (
  <div className="chd-skeleton" aria-hidden="true">
    {Array.from({ length: lines }, (_, i) => (
      <span key={i} />
    ))}
  </div>
);
