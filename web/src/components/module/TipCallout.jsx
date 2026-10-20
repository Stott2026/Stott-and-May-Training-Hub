import { Icon } from "../icons.jsx";

// One memorable line in a highlighted box.
export default function TipCallout({ tip }) {
  return (
    <aside className="tip-callout" aria-label="Tip">
      <Icon name="lightbulb" size={22} className="tip-callout__icon" />
      <p><strong className="tip-callout__label">Tip</strong> {tip}</p>
    </aside>
  );
}
