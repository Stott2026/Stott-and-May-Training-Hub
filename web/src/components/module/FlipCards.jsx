import { useState } from "react";
import BlockHeading from "./BlockHeading.jsx";
import { Icon } from "../icons.jsx";

// "Flip cards": a prompt on the front, the answer on the back. The learner flips each card and
// says whether they got it; cards marked "Practise again" come round once more at the end.
export default function FlipCards({ activity, done, onDone }) {
  const cards = activity.cards ?? [];
  const [queue, setQueue] = useState(() => cards.map((_, i) => i));
  const [flipped, setFlipped] = useState(false);
  const [gotIt, setGotIt] = useState(0);
  const [again, setAgain] = useState(0);
  const finished = queue.length === 0;
  const card = cards[queue[0]];

  const next = (knew) => {
    setFlipped(false);
    if (knew) {
      setGotIt((n) => n + 1);
      const rest = queue.slice(1);
      setQueue(rest);
      if (!rest.length) onDone?.();
    } else {
      setAgain((n) => n + 1);
      setQueue([...queue.slice(1), queue[0]]);
    }
  };
  const restart = () => { setQueue(cards.map((_, i) => i)); setFlipped(false); setGotIt(0); setAgain(0); };

  return (
    <section className="content-block flip-cards">
      <BlockHeading icon="layers" title={activity.title || "Flip cards"} hint={activity.instructions || "Say your answer out loud, then flip the card to check."} />
      {done && !finished && gotIt === 0 && <p className="activity-done"><Icon name="circle-check" size={16} /> You've done this deck. Run through it again any time.</p>}

      <div className="flip-cards__progress" aria-hidden="true">
        {cards.map((_, i) => <span key={i} className={i < gotIt ? "is-done" : ""} />)}
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">
        {finished ? "Deck complete." : `Card ${gotIt + 1} of ${cards.length}. ${flipped ? `Answer: ${card.back}` : ""}`}
      </p>

      {finished ? (
        <div className="activity-result is-right">
          <p className="activity-result__verdict"><Icon name="party-popper" size={18} /> Deck complete{again === 0 ? ": every card first time." : `. ${again} ${again === 1 ? "card" : "cards"} needed another go.`}</p>
          <button type="button" className="activity-link" onClick={restart}><Icon name="repeat" size={16} /> Go through the deck again</button>
        </div>
      ) : (
        <>
          <button
            type="button"
            className={`flip-card${flipped ? " is-flipped" : ""}`}
            onClick={() => setFlipped((f) => !f)}
            aria-label={flipped ? `Answer: ${card.back}. Select to see the question again.` : `${card.front}. Select to see the answer.`}
          >
            <span className="flip-card__inner" key={queue[0]}>
              <span className="flip-card__face flip-card__front" aria-hidden="true">
                <span className="flip-card__tag">Card {gotIt + 1} of {cards.length}</span>
                <span className="flip-card__text">{card.front}</span>
                <span className="flip-card__hint"><Icon name="repeat" size={14} /> Tap to flip</span>
              </span>
              <span className="flip-card__face flip-card__back" aria-hidden="true">
                <span className="flip-card__tag">Answer</span>
                <span className="flip-card__text">{card.back}</span>
              </span>
            </span>
          </button>
          <div className="activity-actions flip-cards__actions">
            {flipped ? (
              <>
                <button type="button" className="btn btn--primary btn--md" onClick={() => next(true)}><Icon name="check" size={18} /> Got it</button>
                <button type="button" className="btn btn--secondary btn--md" onClick={() => next(false)}><Icon name="repeat" size={18} /> Practise again</button>
              </>
            ) : (
              <button type="button" className="btn btn--secondary btn--md" onClick={() => setFlipped(true)}>Show the answer</button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
