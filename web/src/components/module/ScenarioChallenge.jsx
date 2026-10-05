import { useState } from "react";
import BlockHeading from "./BlockHeading.jsx";
import Button from "../Button.jsx";
import Eyebrow from "../Eyebrow.jsx";
import { Icon } from "../icons.jsx";

// A real-world scenario set as a challenge: think first, then reveal the weak and strong approaches.
export default function ScenarioChallenge({ scenario }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="content-block scenario">
      <BlockHeading icon="target" title="Your challenge" hint="A real situation from the desk." />
      <div className="scenario__situation">
        <Icon name="quote" size={28} className="scenario__quote" />
        <p>{scenario.title}</p>
      </div>
      {!revealed ? (
        <div className="scenario__prompt">
          <p>How would you handle it? Take a moment to think about what you'd say, then compare.</p>
          <Button icon="eye" onClick={() => setRevealed(true)}>Reveal the approaches</Button>
        </div>
      ) : (
        <div className="scenario__answers">
          <div className="scenario__answer scenario__answer--weak">
            <Eyebrow tone="danger" as="h4"><Icon name="circle-x" size={14} /> Weak approach</Eyebrow>
            <p>{scenario.weak}</p>
          </div>
          <div className="scenario__answer scenario__answer--strong">
            <Eyebrow as="h4"><Icon name="circle-check" size={14} /> Strong approach</Eyebrow>
            <p>{scenario.strong}</p>
          </div>
        </div>
      )}
    </section>
  );
}
