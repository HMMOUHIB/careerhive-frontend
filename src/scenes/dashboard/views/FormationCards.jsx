import { Link } from 'react-router-dom';
import { FormationIcon, PanelLink } from '../dash-components/DashWidgets';

// The template's purple formation cards with the ringed icon badge
const FormationCards = ({ title, formations, loading, footer, showCompletion = false }) => {
  if (!loading && formations.length === 0) return null;

  return (
    <section className="chd-formations" data-anim>
      <header className="chd-panel__head">
        <h3>{title}</h3>
        <PanelLink to="/formations">See all</PanelLink>
      </header>
      <div className="chd-formations__grid">
        {loading
          ? [0, 1, 2].map((i) => <div key={i} className="chd-fcard chd-fcard--loading" />)
          : formations.map((f) => (
              <Link key={f.id} to="/formations" className="chd-fcard">
                <FormationIcon formation={f} size="lg" />
                <h4>{f.title}</h4>
                <span className="chd-fcard__meta">{[f.category, f.level].filter(Boolean).join(' · ')}</span>
                {f.description && <p>{f.description}</p>}
                {f.skills?.length > 0 && (
                  <span className="chd-fcard__tags">
                    {f.skills.slice(0, 3).map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </span>
                )}
                {showCompletion && f.enrolled > 0 && (
                  <span className="chd-fcard__completion">
                    <span style={{ width: `${f.avgProgress}%` }} />
                  </span>
                )}
                {footer && <span className="chd-fcard__footer">{footer(f)}</span>}
              </Link>
            ))}
      </div>
    </section>
  );
};

export default FormationCards;
