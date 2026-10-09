import { useRef } from "react";
import Avatar from "./Avatar.jsx";
import Button from "./Button.jsx";
import Card from "./Card.jsx";
import Eyebrow from "./Eyebrow.jsx";
import { Icon } from "./icons.jsx";
import { assetUrl } from "../lib/assetUrl.js";
import "./AskMayConcept.css";

// CONCEPT ONLY: a look at "Ask May", the planned AI training coach (parked, see CLAUDE.md Phase 3).
// Shown only in the preview build (npm run preview:build), never on the live hub, so nobody
// thinks the coach is working yet. The conversations are fixed examples, not a real AI.
export const showMayConcept = import.meta.env.MODE === "preview";

const MAY_PHOTO = assetUrl("concepts/may.svg");

// Example conversations. On a module page May refers to the section you're on, and offers to
// role-play its scenario if it has one.
function sampleFor(module, section) {
  if (!section) {
    return {
      messages: [
        { from: "may", text: "Hi, I'm May, your training coach. Want to practise negotiating fees? I'll play a hiring manager who thinks you're too expensive." },
        { from: "me", text: "Go on then." },
        { from: "may", text: "“Honestly, the last agency charged us 15%. Why would we pay you 20?”" },
      ],
      chips: ["Explain the tactic", "Give me a hint", "How did I do?"],
    };
  }
  const intro = `Hi, I'm May. You're on “${section.title}” in ${module.title}.`;
  if (section.scenario?.title) {
    return {
      messages: [
        { from: "may", text: `${intro} Want to try this section's challenge for real? I'll play the other person.` },
        { from: "me", text: "Yes please." },
        { from: "may", text: `Here's the situation: ${section.scenario.title} Tell me what you'd do or say first, and I'll respond.` },
      ],
      chips: ["Give me a hint", "Show me a strong answer", "How did I do?"],
    };
  }
  return {
    messages: [
      { from: "may", text: `${intro} Ask me anything about it, or I can quiz you on the key tactics.` },
      { from: "me", text: "Quiz me." },
      { from: "may", text: "Great. First question: which of this section's tactics would make the biggest difference on your desk this week, and why?" },
    ],
    chips: ["Explain it simply", "Give me an example", "Next question"],
  };
}

// On the home page it also shows the "Meet May" card. On a module page, pass the module and
// the section being read, and showCard={false}.
export default function AskMayConcept({ module, section, showCard = true }) {
  const dialog = useRef(null);
  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();
  const sample = sampleFor(module, section);

  return (
    <>
      {showCard && (
        <Card className="may-card" accent="sky">
          <Avatar src={MAY_PHOTO} alt="May, the training coach" size={88} />
          <div className="may-card__body">
            <Eyebrow>Coming soon</Eyebrow>
            <h2 className="may-card__title">Meet May, your training coach</h2>
            <p className="may-card__text">Ask questions about any module, or practise a tricky call: May plays the client or candidate, then tells you how you did.</p>
          </div>
          <Button variant="secondary" icon="messages" onClick={open}>See how it works</Button>
        </Card>
      )}

      <button type="button" className="may-fab" onClick={open}>
        <Avatar src={MAY_PHOTO} size={44} />
        <span>Ask May</span>
      </button>

      <dialog ref={dialog} className="may-panel" aria-labelledby="may-title" onClick={(e) => e.target === dialog.current && close()}>
        <header className="may-panel__head">
          <Avatar src={MAY_PHOTO} size={52} />
          <div>
            <h2 id="may-title" className="may-panel__name">May</h2>
            <p className="may-panel__role">Your training coach</p>
          </div>
          <button type="button" className="may-panel__close" onClick={close} aria-label="Close">
            <Icon name="x" size={20} />
          </button>
        </header>
        <div className="may-panel__chat">
          {sample.messages.map((m, i) => (
            <p key={i} className={`may-bubble may-bubble--${m.from}`}>{m.text}</p>
          ))}
          <div className="may-panel__chips" aria-hidden="true">
            {sample.chips.map((c) => <span key={c}>{c}</span>)}
          </div>
        </div>
        <footer className="may-panel__foot">
          <Icon name="sparkles" size={16} />
          <span>Coming soon. This is an example conversation to show how May could work.</span>
        </footer>
      </dialog>
    </>
  );
}
