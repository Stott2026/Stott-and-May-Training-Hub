import { Link } from "react-router";
import Card from "../Card.jsx";
import Eyebrow from "../Eyebrow.jsx";
import IconBadge from "../IconBadge.jsx";
import { Icon } from "../icons.jsx";

const ACCENTS = ["brand", "sky", "lime"];

// The 12-week programme: the phases with their gates, the weekly rhythm and the divisional tracks.
export default function Programme({ page }) {
  const { phases = [], rhythm = [], tracks = [], programmeIntro, relatedModule } = page;
  if (!phases.length) return null;
  return (
    <section className="programme" aria-labelledby="programme-title">
      <Eyebrow>The programme</Eyebrow>
      <h2 id="programme-title" className="section-title" tabIndex={-1}>{phases.length} phases, each with a gate</h2>
      {programmeIntro && <p className="section-lead">{programmeIntro}</p>}
      <ol className="programme__phases">
        {phases.map((ph, i) => (
          <li key={ph._key ?? i}>
            <Card accent={ACCENTS[i % ACCENTS.length]} className="phase-card">
              <p className="phase-card__weeks">{ph.weeks}</p>
              <h3 className="phase-card__title">{ph.title}</h3>
              {ph.text && <p className="phase-card__text">{ph.text}</p>}
              {ph.tools?.filter(Boolean).length > 0 && (
                <ul className="phase-card__tools">
                  {ph.tools.filter(Boolean).map((t) => <li key={t.slug}><Link to={`/tech/${t.slug}`}>{t.name}</Link></li>)}
                </ul>
              )}
              {ph.gate && (
                <div className="phase-card__gate" data-accent={ACCENTS[i % ACCENTS.length]}>
                  <Icon name="shield-check" size={18} />
                  <p><span className="phase-card__gate-label">Gate</span> {ph.gate}</p>
                </div>
              )}
            </Card>
          </li>
        ))}
      </ol>

      {rhythm.length > 0 && (
        <>
          <h3 className="programme__sub">Every week</h3>
          <ul className="programme__rhythm">
            {rhythm.map((r, i) => (
              <li key={r._key ?? i} className="rhythm-card">
                <IconBadge name={["book-open", "briefcase", "users"][i % 3]} size="sm" variant="solid" accent={ACCENTS[i % ACCENTS.length]} />
                <div>
                  {r.label && <p className="rhythm-card__label">{r.label}</p>}
                  <p className="rhythm-card__title">{r.title}</p>
                  {r.text && <p className="rhythm-card__text">{r.text}</p>}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {tracks.length > 0 && (
        <>
          <h3 className="programme__sub">One core, tailored by division</h3>
          <ul className="programme__tracks">
            {tracks.map((t, i) => (
              <li key={t._key ?? i}><strong>{t.division}</strong><span>{t.emphasis}</span></li>
            ))}
          </ul>
        </>
      )}
      {relatedModule && (
        <p className="programme__related"><Link to={`/modules/${relatedModule.slug}`}>Training module: {relatedModule.title} <Icon name="arrow-right" size={14} /></Link></p>
      )}
    </section>
  );
}
