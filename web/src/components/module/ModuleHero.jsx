import Eyebrow from "../Eyebrow.jsx";
import Button from "../Button.jsx";
import ProgressRing from "../ProgressRing.jsx";
import ShapeImage from "../ShapeImage.jsx";
import Wave from "../Wave.jsx";
import { Icon } from "../icons.jsx";
import "../accents.css";
import "./ModuleHero.css";

// Top of a module page: title, quick facts, progress and a person photo.
export default function ModuleHero({ module, done, minutes, onBack, onStart }) {
  const total = module.sections.length;
  const pct = total ? (done / total) * 100 : 0;
  const counts = module.sections.reduce(
    (n, s) => ({ tactics: n.tactics + (s.tactics?.length || 0), phrases: n.phrases + (s.phrases?.length || 0), scenarios: n.scenarios + (s.scenario ? 1 : 0) }),
    { tactics: 0, phrases: 0, scenarios: 0 }
  );
  const startLabel = done === 0 ? "Start the module" : done === total ? "Review the module" : "Continue where you left off";

  return (
    <section className="module-hero" data-accent={module.accent} aria-labelledby="module-title">
      <div className="module-hero__wave" aria-hidden="true"><Wave variant="glow" /></div>
      <div className="container module-hero__inner">
        <div className="module-hero__copy">
          <button type="button" className="module-hero__back" onClick={onBack}>
            <Icon name="arrow-left" size={18} /> All modules
          </button>
          <Eyebrow tone="ink">{module.eyebrow}</Eyebrow>
          <h1 id="module-title" className="module-hero__title">{module.title}</h1>
          <p className="module-hero__subtitle">{module.subtitle}</p>
          <ul className="module-hero__facts">
            <li><Icon name="map" size={16} /> {total} sections</li>
            <li><Icon name="clock" size={16} /> About {minutes} minutes</li>
            <li><Icon name="list-checks" size={16} /> {counts.tactics} tactics</li>
            <li><Icon name="messages" size={16} /> {counts.phrases} phrases</li>
            <li><Icon name="target" size={16} /> {counts.scenarios} scenarios</li>
          </ul>
          <div className="module-hero__actions">
            <Button variant="dark" size="lg" iconAfter="arrow-right" onClick={onStart}>{startLabel}</Button>
            <div className="module-hero__progress">
              <ProgressRing value={pct} size={64} stroke={8} label="Module progress" />
              <span>{done} of {total} sections<br />complete</span>
            </div>
          </div>
        </div>
        {module.heroImage && (
          <div className="module-hero__visual">
            <ShapeImage src={module.heroImage} shape="diamond" accent={module.accent} className="module-hero__person" />
          </div>
        )}
      </div>
    </section>
  );
}
