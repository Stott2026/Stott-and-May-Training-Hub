import { useState } from "react";
import BlockHeading from "../module/BlockHeading.jsx";
import { Icon } from "../icons.jsx";
import { Drawing } from "./drawings.jsx";
import "../module/ModuleContent.css";
import "../module/Activities.css";
import "./LessonBlocks.css";

// The parts of a compliance lesson, as set up in the Studio (complianceCourse.js, BLOCKS).
// Interactive parts call onDone once the learner has finished them; a lesson can't be completed
// until they have.
export const INTERACTIVE = ["ccSpotIt", "ccSorter", "ccScenario"];

const paragraphs = (text = "") => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

function TextBlock({ block }) {
  return (
    <section className="cc-block cc-text">
      {block.heading && <h3 className="cc-text__heading">{block.heading}</h3>}
      {paragraphs(block.body).map((p, i) => <p key={i}>{p}</p>)}
      {block.bullets?.length > 0 && <ul className="cc-bullets">{block.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
    </section>
  );
}

function KeyPoints({ block }) {
  return (
    <section className="cc-block cc-keypoints">
      <BlockHeading icon="list-checks" title={block.title || "Key points"} />
      <ol className="cc-keypoints__list">{(block.points ?? []).map((p, i) => <li key={i}><span className="cc-keypoints__n" aria-hidden="true">{i + 1}</span><span>{p}</span></li>)}</ol>
    </section>
  );
}

function Law({ block }) {
  return (
    <div className="cc-block cc-law">
      <Icon name="gavel" size={22} className="cc-law__icon" />
      <div>
        <p className="cc-law__tag">The law</p>
        <h3 className="cc-law__name">{block.name}</h3>
        {paragraphs(block.summary).map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

function DoDont({ block }) {
  return (
    <section className="cc-block cc-dodont">
      <div className="cc-dodont__col cc-dodont__col--do">
        <h3><Icon name="circle-check" size={18} /> Do</h3>
        <ul>{(block.dos ?? []).map((d, i) => <li key={i}>{d}</li>)}</ul>
      </div>
      <div className="cc-dodont__col cc-dodont__col--dont">
        <h3><Icon name="circle-x" size={18} /> Don't</h3>
        <ul>{(block.donts ?? []).map((d, i) => <li key={i}>{d}</li>)}</ul>
      </div>
    </section>
  );
}

function Stat({ block }) {
  return (
    <div className="cc-block cc-stat">
      <p className="cc-stat__number">{block.number}</p>
      <div>
        <p className="cc-stat__label">{block.label}</p>
        {block.source && <p className="cc-stat__source">Source: {block.source}</p>}
      </div>
    </div>
  );
}

function Illustration({ block }) {
  const labels = block.labels ?? [];
  return (
    <figure className="cc-block cc-figure">
      {block.drawing ? (
        <Drawing
          name={block.drawing}
          spots={labels.map((l) => l.spot)}
          overlay={(spot, [left, top], i) => <span key={spot} className="drawing__marker" style={{ left: `${left}%`, top: `${top}%` }} aria-hidden="true">{i + 1}</span>}
        />
      ) : block.image?.url ? (
        <img className="cc-figure__image" src={`${block.image.url}?w=1200&auto=format`} alt={block.image.alt || ""} loading="lazy" decoding="async" />
      ) : null}
      {labels.length > 0 && <ol className="cc-figure__labels">{labels.map((l) => <li key={l._key ?? l.spot}>{l.text}</li>)}</ol>}
      {block.caption && <figcaption className="cc-figure__caption">{block.caption}</figcaption>}
    </figure>
  );
}

// Spot it: check each point on a drawing and decide whether it's fine or a problem.
function SpotIt({ block, done, onDone }) {
  const spots = block.spots ?? [];
  const [answers, setAnswers] = useState({});
  const [open, setOpen] = useState(null);
  const checked = Object.keys(answers).length;
  const right = spots.filter((s) => answers[s._key] === !!s.problem).length;
  const finished = checked === spots.length;
  const current = spots.find((s) => s._key === open);
  const answer = (s, problem) => {
    const next = { ...answers, [s._key]: problem };
    setAnswers(next);
    if (Object.keys(next).length === spots.length) onDone?.();
  };
  return (
    <section className="cc-block cc-interactive cc-spotit">
      <BlockHeading icon="eye" title={block.title} hint={block.instructions || "Select each marker, then decide: fine, or a problem?"} />
      {done && checked === 0 && <p className="activity-done"><Icon name="circle-check" size={16} /> Done. You can go through it again.</p>}
      <div className="cc-spotit__layout">
        <Drawing
          name={block.drawing}
          spots={spots.map((s) => s.spot)}
          overlay={(spot, [left, top], i) => {
            const s = spots[i];
            const state = s._key in answers ? (answers[s._key] === !!s.problem ? "is-right" : "is-wrong") : "";
            return (
              <button key={s._key} type="button" className={`drawing__marker cc-spotit__marker ${state} ${open === s._key ? "is-open" : ""}`} style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => setOpen(s._key)} aria-label={`${i + 1}: ${s.label}${s._key in answers ? " (checked)" : ""}`} aria-pressed={open === s._key}>
                {s._key in answers ? <Icon name={state === "is-right" ? "check" : "x"} size={16} /> : i + 1}
              </button>
            );
          }}
        />
        <div className="cc-spotit__panel" aria-live="polite">
          <p className="cc-spotit__count">{checked} of {spots.length} checked</p>
          {!current ? (
            <p className="cc-muted">Select a numbered marker on the picture to look at it closely.</p>
          ) : !(current._key in answers) ? (
            <>
              <h4 className="cc-spotit__label">{spots.indexOf(current) + 1}. {current.label}</h4>
              <p>Is this fine, or a problem?</p>
              <div className="cc-choice-buttons">
                <button type="button" className="btn btn--secondary btn--md" onClick={() => answer(current, false)}><Icon name="circle-check" size={18} /> Fine</button>
                <button type="button" className="btn btn--secondary btn--md" onClick={() => answer(current, true)}><Icon name="triangle-alert" size={18} /> A problem</button>
              </div>
            </>
          ) : (
            <div className={`cc-feedback ${answers[current._key] === !!current.problem ? "is-right" : "is-wrong"}`}>
              <h4 className="cc-spotit__label">{spots.indexOf(current) + 1}. {current.label}: {current.problem ? "a problem" : "fine"}</h4>
              <p className="cc-feedback__verdict">{answers[current._key] === !!current.problem ? "You spotted it." : "Not quite."}</p>
              <p>{current.explanation}</p>
            </div>
          )}
          {finished && <p className="cc-result"><Icon name="party-popper" size={18} /> All checked: {right} of {spots.length} right first time.</p>}
          {finished && <button type="button" className="activity-link" onClick={() => { setAnswers({}); setOpen(null); }}><Icon name="repeat" size={16} /> Start again</button>}
        </div>
      </div>
    </section>
  );
}

// Sort it: put each item in the right group, one at a time, with the reason after each.
function Sorter({ block, done, onDone }) {
  const items = block.items ?? [];
  const groups = block.groups ?? [];
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const finished = index >= items.length;
  const item = items[index];
  const choose = (g) => {
    if (chosen) return;
    setChosen(g);
    if (g === item.group) setScore((n) => n + 1);
  };
  const next = () => {
    setChosen(null);
    setIndex((i) => i + 1);
    if (index + 1 >= items.length) onDone?.();
  };
  return (
    <section className="cc-block cc-interactive cc-sorter">
      <BlockHeading icon="layers" title={block.title} hint={block.instructions || "Choose the right group for each one."} />
      {done && index === 0 && !chosen && <p className="activity-done"><Icon name="circle-check" size={16} /> Done. You can go through it again.</p>}
      <div className="cc-sorter__progress" aria-hidden="true">{items.map((_, i) => <span key={i} className={i < index ? "is-done" : i === index ? "is-current" : ""} />)}</div>
      {finished ? (
        <div className="cc-feedback is-right">
          <p className="cc-feedback__verdict"><Icon name="party-popper" size={18} /> Sorted: {score} of {items.length} right.</p>
          <button type="button" className="activity-link" onClick={() => { setIndex(0); setScore(0); setChosen(null); }}><Icon name="repeat" size={16} /> Go through it again</button>
        </div>
      ) : (
        <>
          <p className="cc-sorter__item"><span className="cc-sorter__n">{index + 1} of {items.length}</span>{item.text}</p>
          <div className="cc-choice-buttons" role="group" aria-label="Choose a group">
            {groups.map((g) => (
              <button key={g} type="button" className={`cc-group-button ${chosen ? (g === item.group ? "is-right" : g === chosen ? "is-wrong" : "is-dim") : ""}`} onClick={() => choose(g)} aria-disabled={!!chosen}>{g}</button>
            ))}
          </div>
          {chosen && (
            <div className={`cc-feedback ${chosen === item.group ? "is-right" : "is-wrong"}`} role="status">
              <p className="cc-feedback__verdict">{chosen === item.group ? "Right." : `Not quite: this one is "${item.group}".`}</p>
              {item.why && <p>{item.why}</p>}
              <button type="button" className="btn btn--dark btn--sm" onClick={next}>{index + 1 < items.length ? "Next" : "See how you did"} <Icon name="arrow-right" size={16} /></button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

// What would you do? Pick a choice, see the feedback; finished once the best choice is found.
function ScenarioChoice({ block, done, onDone }) {
  const [picked, setPicked] = useState([]);
  const options = block.options ?? [];
  const last = picked.at(-1);
  const foundBest = picked.some((i) => options[i]?.best);
  const pick = (i) => {
    if (picked.includes(i) || foundBest) return;
    setPicked([...picked, i]);
    if (options[i].best) onDone?.();
  };
  return (
    <section className="cc-block cc-interactive cc-scenario">
      <BlockHeading icon="target" title={block.title || "What would you do?"} hint={foundBest || done ? null : "Choose what you would do."} />
      <div className="cc-scenario__situation">
        <Icon name="quote" size={26} className="cc-scenario__quote" />
        {paragraphs(block.situation).map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="cc-scenario__options">
        {options.map((o, i) => {
          const state = picked.includes(i) ? (o.best ? "is-correct" : "is-wrong") : foundBest ? "is-dim" : "";
          return (
            <button key={o._key ?? i} type="button" className={`quick-check__option ${state}`} onClick={() => pick(i)} aria-disabled={picked.includes(i) || foundBest}>
              <span className="quick-check__letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
              <span>{o.text}</span>
              {picked.includes(i) && <Icon name={o.best ? "circle-check" : "circle-x"} size={20} className="quick-check__mark" />}
            </button>
          );
        })}
      </div>
      {last !== undefined && (
        <div className={`cc-feedback ${options[last].best ? "is-right" : "is-wrong"}`} role="status">
          <p className="cc-feedback__verdict">{options[last].best ? "That's the best choice." : "Not the best choice. Try another."}</p>
          <p>{options[last].feedback}</p>
        </div>
      )}
    </section>
  );
}

// Check your own set-up: the learner ticks things off for themselves. Nothing is stored.
function Checklist({ block }) {
  const [ticked, setTicked] = useState({});
  const items = block.items ?? [];
  const count = Object.values(ticked).filter(Boolean).length;
  return (
    <section className="cc-block cc-checklist">
      <BlockHeading icon="list-checks" title={block.title} hint="Tick each one you can say yes to. Nothing you tick here is saved." />
      <ul className="cc-checklist__list">
        {items.map((it, i) => (
          <li key={i}>
            <label className={`cc-checklist__item ${ticked[i] ? "is-ticked" : ""}`}>
              <input type="checkbox" checked={!!ticked[i]} onChange={(e) => setTicked({ ...ticked, [i]: e.target.checked })} />
              <span>{it}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="cc-muted">{count === items.length ? "All set. If anything changes, check again." : `${count} of ${items.length}. Anything you can't tick: fix it, or tell your manager.`}</p>
    </section>
  );
}

const COMPONENTS = { ccText: TextBlock, ccKeyPoints: KeyPoints, ccLaw: Law, ccDoDont: DoDont, ccStat: Stat, ccIllustration: Illustration, ccSpotIt: SpotIt, ccSorter: Sorter, ccScenario: ScenarioChoice, ccChecklist: Checklist };

export default function LessonBlocks({ blocks = [], doneKeys = {}, onBlockDone, lessonKey }) {
  return blocks.map((b, i) => {
    const Block = COMPONENTS[b._type];
    // Keyed by lesson, so moving to the next lesson starts its interactive parts fresh.
    return Block ? <Block key={`${lessonKey}-${b._key ?? i}`} block={b} done={!!doneKeys[b._key]} onDone={() => onBlockDone?.(b._key)} /> : null;
  });
}
