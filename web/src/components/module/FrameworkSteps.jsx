import BlockHeading from "./BlockHeading.jsx";

// A short process or model as numbered cards side by side, e.g. "The four-part sell-in".
export default function FrameworkSteps({ framework }) {
  const steps = framework.steps ?? [];
  return (
    <section className="content-block">
      <BlockHeading icon="map" title={framework.title || "Step by step"} hint={`${steps.length} steps. Work through them in order.`} />
      <ol className="framework">
        {steps.map((s, i) => (
          <li key={s._key ?? i} className="framework__step">
            <span className="framework__number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            {s.label && <p className="framework__label">{s.label}</p>}
            <h4 className="framework__title">{s.title}</h4>
            {s.text && <p className="framework__text">{s.text}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
