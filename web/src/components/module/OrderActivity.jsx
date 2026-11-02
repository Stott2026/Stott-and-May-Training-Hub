import { useLayoutEffect, useRef, useState } from "react";
import BlockHeading from "./BlockHeading.jsx";
import { Icon } from "../icons.jsx";

// Shuffles 0..n-1, making sure it doesn't start already in order.
function shuffled(n) {
  const order = [...Array(n).keys()];
  if (n < 2) return order;
  do {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  } while (order.every((v, i) => v === i));
  return order;
}

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// "Put it in order": the learner arranges shuffled items, by dragging them (mouse) or with the
// up and down buttons (keyboard, touch), then checks. Items glide into their new places.
export default function OrderActivity({ activity, done, onDone }) {
  const items = activity.items ?? [];
  const [order, setOrder] = useState(() => shuffled(items.length));
  const [checked, setChecked] = useState(null);
  const [tries, setTries] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const dragging = useRef(null);
  const rows = useRef(new Map());
  const lastTops = useRef(new Map());

  // Glide: measure where each item was, and slide it from there to its new place.
  useLayoutEffect(() => {
    const before = lastTops.current;
    const after = new Map();
    rows.current.forEach((el, id) => { if (el) after.set(id, el.getBoundingClientRect().top); });
    if (!reducedMotion()) {
      after.forEach((top, id) => {
        const el = rows.current.get(id);
        const from = before.get(id);
        if (el && from !== undefined && from !== top) {
          el.animate([{ transform: `translateY(${from - top}px)` }, { transform: "none" }], { duration: 260, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" });
        }
      });
    }
    lastTops.current = after;
  }, [order]);

  // checked: after "Check my order", whether each item (by id) was in its right place. Moving an
  // item clears its own mark, so the marks never point at the wrong thing.
  const solved = !!checked && order.every((id) => checked[id] === true);
  const move = (from, to) => {
    if (to < 0 || to >= order.length || from === to || solved) return;
    const next = [...order];
    const [id] = next.splice(from, 1);
    next.splice(to, 0, id);
    setOrder(next);
    // Clear the marks of every item that has changed place.
    if (checked) setChecked((c) => Object.fromEntries(Object.entries(c).filter(([key]) => next.indexOf(Number(key)) === order.indexOf(Number(key)))));
    setAnnouncement(`${items[id]} moved to position ${to + 1} of ${order.length}.`);
  };
  const check = () => {
    const result = Object.fromEntries(order.map((id, pos) => [id, id === pos]));
    setChecked(result);
    setTries((t) => t + 1);
    const right = Object.values(result).filter(Boolean).length;
    if (right === order.length) { setAnnouncement("All in the right order. Well done."); if (!revealed) onDone?.(); }
    else setAnnouncement(`${right} of ${order.length} in the right place. Move the others and check again.`);
  };
  const reveal = () => {
    setRevealed(true);
    setOrder([...Array(items.length).keys()]);
    setChecked(Object.fromEntries(items.map((_, id) => [id, true])));
    setAnnouncement("Here's the right order.");
  };
  const restart = () => { setOrder(shuffled(items.length)); setChecked(null); setTries(0); setRevealed(false); };
  const rightCount = checked ? Object.values(checked).filter(Boolean).length : 0;

  return (
    <section className={`content-block order-activity${solved ? " is-solved" : ""}`}>
      <BlockHeading icon="list-ordered" title={activity.title || "Put it in order"} hint={activity.instructions || "Drag the items, or use the arrows, then check your order."} />
      {done && !checked && <p className="activity-done"><Icon name="circle-check" size={16} /> You've done this one. Try it again any time.</p>}
      <ol className="order-activity__list">
        {order.map((id, pos) => {
          const mark = checked?.[id];
          const state = mark === true ? "is-right" : mark === false ? "is-wrong" : "";
          return (
            <li
              key={id}
              ref={(el) => rows.current.set(id, el)}
              className={`order-item ${state}`}
              style={{ "--n": pos }}
              draggable={!solved}
              onDragStart={(e) => { dragging.current = pos; e.dataTransfer.effectAllowed = "move"; e.currentTarget.classList.add("is-dragging"); }}
              onDragEnd={(e) => { dragging.current = null; e.currentTarget.classList.remove("is-dragging"); }}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragging.current !== null && dragging.current !== pos) { move(dragging.current, pos); dragging.current = pos; }
              }}
            >
              <span className="order-item__grip" aria-hidden="true"><Icon name="grip-vertical" size={18} /></span>
              <span className="order-item__number" aria-hidden="true">{pos + 1}</span>
              <span className="order-item__text">{items[id]}</span>
              {mark !== undefined && (
                <>
                  <Icon name={mark ? "circle-check" : "circle-x"} size={20} className="order-item__mark" />
                  <span className="visually-hidden">{mark ? "(right place)" : "(wrong place)"}</span>
                </>
              )}
              {!solved && (
                <span className="order-item__moves">
                  <button type="button" className="order-item__move" onClick={() => move(pos, pos - 1)} disabled={pos === 0} aria-label={`Move "${items[id]}" up`}><Icon name="arrow-up" size={16} /></button>
                  <button type="button" className="order-item__move" onClick={() => move(pos, pos + 1)} disabled={pos === order.length - 1} aria-label={`Move "${items[id]}" down`}><Icon name="arrow-down" size={16} /></button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>

      {solved ? (
        <div className="activity-result is-right">
          <p className="activity-result__verdict"><Icon name="party-popper" size={18} /> {revealed ? "That's the right order." : tries === 1 ? "Perfect, first time." : "All in the right order."}</p>
          {activity.explanation && <p>{activity.explanation}</p>}
          <button type="button" className="activity-link" onClick={restart}><Icon name="repeat" size={16} /> Shuffle and try again</button>
        </div>
      ) : (
        <div className="activity-actions">
          <button type="button" className="btn btn--primary btn--md" onClick={check}>Check my order</button>
          {checked && <span className="activity-actions__score">{rightCount} of {order.length} in the right place</span>}
          {tries >= 2 && <button type="button" className="activity-link" onClick={reveal}>Show me the answer</button>}
        </div>
      )}
    </section>
  );
}
