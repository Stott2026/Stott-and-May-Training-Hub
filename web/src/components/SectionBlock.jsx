import { useId } from "react";
import { Icon } from "./icons.jsx";
import Eyebrow from "./Eyebrow.jsx";
import Button from "./Button.jsx";
import "./SectionBlock.css";

// One expandable section of a module: content, tactics, phrases, mistakes and an optional scenario.
export default function SectionBlock({ section, number, open, onToggleOpen, completed, onToggleComplete }) {
  const id = useId();
  const { title, content, tactics = [], phrases = [], mistakes = [], scenario } = section;
  return (
    <div className={`section-block ${open ? "is-open" : ""} ${completed ? "is-complete" : ""}`}>
      <div className="section-block__header">
        <button
          type="button"
          className="section-block__check"
          onClick={onToggleComplete}
          aria-pressed={completed}
          aria-label={completed ? `Mark "${title}" as not complete` : `Mark "${title}" as complete`}
        >
          {completed ? <Icon name="check" size={16} strokeWidth={3} /> : <span className="section-block__number">{number}</span>}
        </button>
        <button type="button" className="section-block__toggle" onClick={onToggleOpen} aria-expanded={open} aria-controls={id}>
          <span className="section-block__title">{title}</span>
          <Icon name="chevron-down" size={20} className="section-block__chevron" />
        </button>
      </div>

      {open && (
        <div className="section-block__body" id={id}>
          {content && <p className="section-block__content">{content}</p>}

          {tactics.length > 0 && (
            <div className="section-block__group">
              <Eyebrow as="h4">Key tactics</Eyebrow>
              <ul className="section-block__list section-block__list--tactics">
                {tactics.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}

          {phrases.length > 0 && (
            <div className="section-block__group">
              <Eyebrow as="h4">Phrases to use</Eyebrow>
              <div className="section-block__phrases">
                {phrases.map((p, i) => (
                  <blockquote key={i} className="section-block__phrase">
                    <Icon name="message-circle" size={16} />
                    <span>{p}</span>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {mistakes.length > 0 && (
            <div className="section-block__group">
              <Eyebrow as="h4" tone="danger">Common mistakes to avoid</Eyebrow>
              <ul className="section-block__list section-block__list--mistakes">
                {mistakes.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          )}

          {scenario && (
            <div className="section-block__scenario">
              <Eyebrow as="h4">Real-world scenario</Eyebrow>
              <p className="section-block__scenario-title">{scenario.title}</p>
              <div className="section-block__approaches">
                <div className="section-block__approach section-block__approach--weak">
                  <Eyebrow as="h5" tone="danger">Weak approach</Eyebrow>
                  <p>{scenario.weak}</p>
                </div>
                <div className="section-block__approach section-block__approach--strong">
                  <Eyebrow as="h5">Strong approach</Eyebrow>
                  <p>{scenario.strong}</p>
                </div>
              </div>
            </div>
          )}

          <Button variant={completed ? "secondary" : "primary"} size="sm" icon={completed ? "circle-check" : "check"} onClick={onToggleComplete}>
            {completed ? "Completed" : "Mark as complete"}
          </Button>
        </div>
      )}
    </div>
  );
}
