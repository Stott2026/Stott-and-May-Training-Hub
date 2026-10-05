import { Link } from "react-router";
import Card from "./Card.jsx";
import IconBadge from "./IconBadge.jsx";
import Eyebrow from "./Eyebrow.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { Icon } from "./icons.jsx";
import "./ModuleCard.css";

// A training module tile for the home page grid.
export default function ModuleCard({ module, done = 0 }) {
  const { icon, eyebrow, title, subtitle, accent = "brand", slug } = module;
  const sectionCount = module.sectionKeys?.length ?? 0;
  const pct = sectionCount ? (done / sectionCount) * 100 : 0;
  return (
    <Card as={Link} to={`/modules/${slug}`} interactive accent={accent} className="module-card">
      <div className="module-card__top">
        <IconBadge name={icon} accent={accent} />
        {done === sectionCount && sectionCount > 0 ? (
          <span className="module-card__status module-card__status--done"><Icon name="badge-check" size={14} /> Complete</span>
        ) : done > 0 ? (
          <span className="module-card__status">In progress</span>
        ) : null}
      </div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className="module-card__title">{title}</h3>
      <p className="module-card__subtitle">{subtitle}</p>
      <ProgressBar value={pct} size="sm" accent={accent} label={`${title} progress`} />
      <div className="module-card__footer">
        <span>{done}/{sectionCount} complete</span>
        <span className="module-card__go">Open <Icon name="arrow-right" size={14} /></span>
      </div>
    </Card>
  );
}
