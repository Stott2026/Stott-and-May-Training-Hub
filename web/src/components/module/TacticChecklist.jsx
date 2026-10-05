import { useState } from "react";
import BlockHeading from "./BlockHeading.jsx";
import { Icon } from "../icons.jsx";

// Key tactics as a checklist the learner can tick off.
export default function TacticChecklist({ tactics }) {
  const [ticked, setTicked] = useState({});
  const count = Object.values(ticked).filter(Boolean).length;
  return (
    <section className="content-block">
      <BlockHeading icon="list-checks" title="Key tactics" hint="Tick the ones you already do. The rest are your focus for this week." />
      <ul className="tactics">
        {tactics.map((t, i) => (
          <li key={i}>
            <label className={`tactic ${ticked[i] ? "is-ticked" : ""}`}>
              <input type="checkbox" checked={!!ticked[i]} onChange={() => setTicked({ ...ticked, [i]: !ticked[i] })} />
              <span className="tactic__box" aria-hidden="true"><Icon name="check" size={14} strokeWidth={3} /></span>
              <span className="tactic__text">{t}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="tactics__count" aria-live="polite">
        {count === 0 ? "Nothing ticked yet." : count === tactics.length ? "You already do all of these. Great work." : `You do ${count} of ${tactics.length}. Pick one of the others to try on your next call.`}
      </p>
    </section>
  );
}
