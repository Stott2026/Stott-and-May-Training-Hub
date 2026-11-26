import { useEffect, useId, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import Button from "../components/Button.jsx";
import LoadState from "../components/LoadState.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import { shuffle } from "../lib/shuffle.js";
import { usePageTitle, useSite } from "../lib/site.jsx";
import { useToast } from "../lib/toast.jsx";
import "../components/accents.css";
import "./Games.css";

// One game in the Games Room. "Handle the objection" (kind "objection"): choose a level, then May
// plays someone with an objection, you type your answer, and she replies in character and scores
// it out of 10 against the hub's training (server/games.js). A game is a few challenges picked at
// random from the game's list in the Studio. Your best score is kept in this browser, like progress.
const LEVELS = ["friendly", "tough", "brutal"];
const LEVEL_FALLBACK = { friendly: "Friendly", tough: "Tough", brutal: "Brutal" };

// May's playbook line, with her [R1]-style citations taken out and listed as links instead.
function cited(text, sources) {
  const refs = [...new Set([...String(text).matchAll(/\[(R\d+|S)\]/g)].map((m) => m[1]))].filter((r) => sources?.[r]);
  return { text: String(text).replace(/\s*\[(R\d+|S)\]/g, "").trim(), links: refs.map((r) => sources[r]) };
}

async function scoreAnswer(slug, body) {
  const res = await fetch(`/api/games/${slug}/score`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Sorry, May couldn't score that. Please try again.");
  return data;
}

export default function GamePage() {
  const { slug } = useParams();
  const { data, error } = useApi(`/games/${slug}`);
  const { may } = useSite();
  usePageTitle(data ? data.game.title : null);
  if (error || !data) return <LoadState error={error} notFoundText="We couldn't find that game." />;
  const { game, page = {} } = data;
  const playable = may && !game.comingSoon && game.kind === "objection" && game.scenarios?.length > 0;
  return (
    <div className="container game" data-accent={game.accent || "brand"}>
      <Link className="game__back" to="/games"><Icon name="arrow-left" size={16} /> Games Room</Link>
      {playable ? <Objection game={game} page={page} /> : (
        <section className="game__panel">
          <h1 className="game__title">{game.title}</h1>
          <p className="game__intro">{may ? "This game isn't ready to play yet." : "The games need May, who isn't switched on here yet."}</p>
        </section>
      )}
    </div>
  );
}

function Objection({ game, page }) {
  const progress = useProgress();
  const toast = useToast();
  const best = progress.games?.[game.slug];
  const [level, setLevel] = useState("tough");
  const [round, setRound] = useState(null); // { challenges, index, results }
  const levelName = (l) => page[l]?.name || LEVEL_FALLBACK[l];
  const count = Math.min(game.rounds || 3, game.scenarios.length);

  const start = () => setRound({ challenges: shuffle(game.scenarios).slice(0, count), index: 0, results: [] });

  if (!round) {
    return (
      <section className="game__panel game__start" aria-labelledby="game-title">
        <span className="game__tile" aria-hidden="true"><Icon name={game.icon || "target"} size={32} /></span>
        <h1 id="game-title" className="game__title">{game.title}</h1>
        {game.intro && <p className="game__intro">{game.intro}</p>}
        <p className="game__meta">{count} {count === 1 ? "challenge" : "challenges"}, each scored out of 10{best ? ` · Your best: ${best.best}/${best.total}` : ""}</p>
        <fieldset className="game__levels">
          <legend>Choose your level</legend>
          {LEVELS.map((l) => (
            <label key={l} className="game__level">
              <input type="radio" name="level" value={l} checked={level === l} onChange={() => setLevel(l)} />
              <span className="game__level-name">{levelName(l)}</span>
              {page[l]?.line && <span className="game__level-line">{page[l].line}</span>}
            </label>
          ))}
        </fieldset>
        <Button iconAfter="arrow-right" onClick={start}>Challenge May</Button>
      </section>
    );
  }

  const total = round.challenges.length * 10;
  const scored = round.results.reduce((n, r) => n + r.score, 0);

  if (round.index >= round.challenges.length) {
    return <Finished game={game} score={scored} total={total} results={round.results} levelName={levelName(level)} onAgain={start} onLevel={() => setRound(null)} />;
  }

  const finishOne = (result) => {
    const results = [...round.results, result];
    const done = results.length >= round.challenges.length;
    if (done) {
      const sum = results.reduce((n, r) => n + r.score, 0);
      const before = progress.games?.[game.slug]?.best ?? 0;
      progress.addGameScore(game.slug, sum, total);
      if (sum > before) toast?.(before ? `New best: ${sum}/${total}` : `Game complete: ${sum}/${total}`);
    }
    setRound({ ...round, results, index: round.index + 1 });
  };

  return (
    <Challenge
      key={round.index}
      game={game}
      page={page}
      level={level}
      levelName={levelName(level)}
      scenario={round.challenges[round.index]}
      number={round.index + 1}
      of={round.challenges.length}
      runningScore={scored}
      onNext={finishOne}
    />
  );
}

function Challenge({ game, page, level, levelName, scenario, number, of, runningScore, onNext }) {
  const answerId = useId();
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState(null);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => { boxRef.current?.focus(); }, []);
  useEffect(() => { if (result) resultRef.current?.focus(); }, [result]);

  async function submit(e) {
    e.preventDefault();
    if (!answer.trim() || busy) return;
    setBusy(true);
    setProblem(null);
    try {
      setResult(await scoreAnswer(game.slug, { scenario: scenario._key, level, answer }));
    } catch (err) {
      setProblem(err.message);
    } finally {
      setBusy(false);
    }
  }

  const playbook = result ? cited(result.playbook, result.sources) : null;
  return (
    <section className="game__panel" aria-labelledby="challenge-title">
      <div className="game__bar">
        <span>{game.title} · {levelName}</span>
        <span>Challenge {number} of {of}</span>
        <span>Score so far: {runningScore}</span>
      </div>
      <div className="game__steps" aria-hidden="true">
        {Array.from({ length: of }, (_, i) => <span key={i} className={i < number - 1 || (i === number - 1 && result) ? "is-done" : i === number - 1 ? "is-now" : ""} />)}
      </div>

      <h1 id="challenge-title" className="visually-hidden">Challenge {number}: {scenario.who}</h1>
      <div className="game__say">
        <div className="game__avatar" aria-hidden="true"><span>M</span></div>
        <div>
          <p className="game__who">May plays: {scenario.who}</p>
          <blockquote className="game__bubble">{scenario.line}</blockquote>
        </div>
      </div>

      {!result && (
        <form className="game__answer" onSubmit={submit}>
          <label htmlFor={answerId} className="game__label">Your answer, as you'd say it to them</label>
          <textarea id={answerId} ref={boxRef} rows={5} maxLength={1200} value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={busy} />
          {page.privacyNote && <p className="game__hint">{page.privacyNote}</p>}
          {problem && <p className="game__problem" role="alert">{problem}</p>}
          <div className="game__actions">
            <Button type="submit" iconAfter="arrow-right" disabled={busy || !answer.trim()}>{busy ? "May is thinking…" : "Send your answer"}</Button>
          </div>
        </form>
      )}

      {result && (
        <div className="game__result" ref={resultRef} tabIndex={-1} aria-live="polite">
          <div className="game__you">
            <p className="game__who">You said</p>
            <p className="game__you-text">{answer}</p>
          </div>
          {result.reaction && (
            <div className="game__say">
              <div className="game__avatar" aria-hidden="true"><span>M</span></div>
              <blockquote className="game__bubble">{result.reaction}</blockquote>
            </div>
          )}
          <div className="game__score">
            <ProgressRing value={result.score * 10} size={104} stroke={10} label="Your score" />
            <div>
              <p className="game__score-number"><strong>{result.score}</strong>/10</p>
              {result.verdict && <p className="game__verdict">{result.verdict}</p>}
            </div>
          </div>
          <div className="game__feedback">
            {result.worked.length > 0 && (
              <div className="game__list game__list--good">
                <h2>What worked</h2>
                <ul>{result.worked.map((w) => <li key={w}>{w}</li>)}</ul>
              </div>
            )}
            {result.improve.length > 0 && (
              <div className="game__list game__list--better">
                <h2>To do better</h2>
                <ul>{result.improve.map((w) => <li key={w}>{w}</li>)}</ul>
              </div>
            )}
          </div>
          {result.betterLine && (
            <div className="game__line">
              <h2>Try saying</h2>
              <p>“{result.betterLine}”</p>
            </div>
          )}
          {playbook?.text && (
            <div className="game__playbook">
              <h2><Icon name="book-open" size={18} /> What the Playbook says</h2>
              <p>{playbook.text}</p>
              {playbook.links.length > 0 && (
                <ul>
                  {playbook.links.map((s) => <li key={s.href}><Link to={s.href}>{s.label}</Link></li>)}
                </ul>
              )}
            </div>
          )}
          <div className="game__actions">
            <Button iconAfter="arrow-right" onClick={() => onNext({ score: result.score, who: scenario.who, verdict: result.verdict })}>
              {number < of ? "Next challenge" : "See your score"}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

function Finished({ game, score, total, results, levelName, onAgain, onLevel }) {
  const headingRef = useRef(null);
  useEffect(() => { headingRef.current?.focus(); }, []);
  const pct = total ? Math.round((score / total) * 100) : 0;
  const message = pct >= 80 ? "Outstanding. May didn't stand a chance." : pct >= 60 ? "Solid. A couple of sharper answers and you'll have her." : pct >= 40 ? "Getting there. Look at May's lines and try again." : "May won this one. Have another go.";
  return (
    <section className="game__panel game__end" aria-labelledby="end-title">
      <ProgressRing value={pct} size={140} stroke={12} label="Your score" />
      <h1 id="end-title" className="game__title" ref={headingRef} tabIndex={-1}>{score}/{total}</h1>
      <p className="game__intro">{message}</p>
      <p className="game__meta">{game.title} · {levelName}</p>
      <ol className="game__recap">
        {results.map((r, i) => (
          <li key={i}><span>{r.who}</span><strong>{r.score}/10</strong>{r.verdict && <em>{r.verdict}</em>}</li>
        ))}
      </ol>
      <div className="game__actions game__actions--centre">
        <Button icon="rotate-ccw" onClick={onAgain}>Play again</Button>
        <Button variant="secondary" onClick={onLevel}>Change level</Button>
        <Button variant="ghost" to="/games">Back to the Games Room</Button>
      </div>
    </section>
  );
}
