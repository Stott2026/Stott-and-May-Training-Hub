import Button from "../Button.jsx";
import IconBadge from "../IconBadge.jsx";
import "./ModuleComplete.css";

// Celebration shown when every section in a module is complete.
export default function ModuleComplete({ module, nextModule, onNext, onReview }) {
  return (
    <section className="module-complete" data-accent={module.accent} aria-labelledby="complete-title">
      <div className="module-complete__confetti" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => <span key={i} style={{ "--i": i }} />)}
      </div>
      <IconBadge name="trophy" size="lg" variant="solid" shape="circle" accent={module.accent} />
      <h2 id="complete-title" className="module-complete__title">Module complete!</h2>
      <p className="module-complete__text">
        You've finished all {module.sections.length} sections of {module.title}. Put one new tactic into practice today.
      </p>
      <div className="module-complete__actions">
        {nextModule && <Button size="lg" iconAfter="arrow-right" onClick={onNext}>Next: {nextModule.title}</Button>}
        <Button variant="secondary" size="lg" onClick={onReview}>Review this module</Button>
      </div>
    </section>
  );
}
