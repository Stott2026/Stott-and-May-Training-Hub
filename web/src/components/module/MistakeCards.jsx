import BlockHeading from "./BlockHeading.jsx";
import { Icon } from "../icons.jsx";

// Common mistakes as short warning cards.
export default function MistakeCards({ mistakes }) {
  return (
    <section className="content-block">
      <BlockHeading icon="triangle-alert" title="Common mistakes to avoid" tone="danger" />
      <ul className="mistakes">
        {mistakes.map((m, i) => (
          <li key={i} className="mistake">
            <Icon name="circle-x" size={20} />
            <p>{m}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
