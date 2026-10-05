import { Icon } from "../icons.jsx";
import "./SectionJourney.css";

// The list of a module's sections as a path the learner moves along.
export default function SectionJourney({ sections, current, completed, onSelect }) {
  const done = sections.filter((_, i) => completed[i]).length;
  return (
    <nav className="journey" aria-label="Sections in this module">
      <p className="journey__heading">Your journey <span>{done}/{sections.length}</span></p>
      <ol className="journey__list">
        {sections.map((s, i) => {
          const state = completed[i] ? "done" : i === current ? "current" : "todo";
          return (
            <li key={s.title} className={`journey__item journey__item--${state}`}>
              <button type="button" onClick={() => onSelect(i)} aria-current={i === current ? "step" : undefined}>
                <span className="journey__marker" aria-hidden="true">
                  {completed[i] ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}
                </span>
                <span className="journey__title">
                  {s.title}
                  {completed[i] && <span className="visually-hidden"> (complete)</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
