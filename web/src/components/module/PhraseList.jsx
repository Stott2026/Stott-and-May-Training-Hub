import { useState } from "react";
import BlockHeading from "./BlockHeading.jsx";
import Avatar from "../Avatar.jsx";
import { Icon } from "../icons.jsx";

// Phrases shown as chat bubbles, each with a copy button.
export default function PhraseList({ phrases, avatar }) {
  const [copied, setCopied] = useState(null);
  const copy = async (text, i) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 2000);
    } catch {
      setCopied(null);
    }
  };
  return (
    <section className="content-block">
      <BlockHeading icon="messages" title="Phrases to use" hint="Make them your own. Copy any phrase to use in a message." />
      <ul className="phrases">
        {phrases.map((p, i) => (
          <li key={i} className="phrase">
            {avatar && <Avatar src={avatar} size={40} />}
            <div className="phrase__bubble">
              <p>{p}</p>
              <button type="button" className="phrase__copy" onClick={() => copy(p, i)} aria-label={`Copy phrase: ${p}`}>
                <Icon name={copied === i ? "check" : "copy"} size={15} />
                <span aria-live="polite">{copied === i ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
