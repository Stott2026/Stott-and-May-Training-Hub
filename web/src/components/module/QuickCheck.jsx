import { useState } from "react";
import BlockHeading from "./BlockHeading.jsx";
import { Icon } from "../icons.jsx";

// One multiple-choice question with instant feedback.
export default function QuickCheck({ question }) {
  const [chosen, setChosen] = useState(null);
  const answered = chosen !== null;
  const right = chosen === question.correct;
  return (
    <section className="content-block quick-check">
      <BlockHeading icon="brain" title="Quick check" hint="One question to lock in what you've learnt." />
      <fieldset className="quick-check__set">
        <legend className="quick-check__question">{question.q}</legend>
        {question.opts.map((o, i) => {
          const state = !answered ? "" : i === question.correct ? "is-correct" : i === chosen ? "is-wrong" : "is-dim";
          return (
            <button key={i} type="button" className={`quick-check__option ${state}`} onClick={() => !answered && setChosen(i)} aria-disabled={answered}>
              <span className="quick-check__letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
              <span>{o}</span>
              {answered && i === question.correct && <Icon name="circle-check" size={20} className="quick-check__mark" />}
              {answered && i === chosen && !right && <Icon name="circle-x" size={20} className="quick-check__mark" />}
            </button>
          );
        })}
      </fieldset>
      {answered && (
        <div className={`quick-check__feedback ${right ? "is-right" : "is-wrong"}`} role="status">
          <p className="quick-check__verdict">{right ? "Spot on." : "Not quite."}</p>
          <p>{question.exp}</p>
          {!right && (
            <button type="button" className="quick-check__retry" onClick={() => setChosen(null)}>Try again</button>
          )}
        </div>
      )}
    </section>
  );
}
