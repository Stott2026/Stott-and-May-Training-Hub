import { useEffect, useId, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import Avatar from "../components/Avatar.jsx";
import Button from "../components/Button.jsx";
import CountUp from "../components/CountUp.jsx";
import LoadState from "../components/LoadState.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import Confetti from "../components/games/Confetti.jsx";
import GameArt from "../components/games/GameArt.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { assetUrl } from "../lib/assetUrl.js";
import { useProgress } from "../lib/progress.jsx";
import { shuffle, shuffleAnswers } from "../lib/shuffle.js";
import { usePageTitle, useSite } from "../lib/site.jsx";
import { useToast } from "../lib/toast.jsx";
import "../components/accents.css";
import "./Games.css";

// One game in the Games Room. Two kinds so far:
// - "objection" (Handle the objection): May plays someone with an objection, you answer, and she
//   replies in character and scores it out of 10 (POST /api/games/:slug/score). A game is a few
//   challenges picked at random from the game's list in the Studio.
// - "meeting" (Get the meeting): a cold call of up to five turns (POST /api/games/:slug/turn). May
//   answers the phone, a warmth meter shows how it's going, and she either agrees to a meeting or
//   hangs up, then scores the whole call.
// - "rapid" (Rapid fire): questions from the hub's quiz bank against the clock (GET
//   /api/games/:slug/questions); the level sets the seconds per question. No call to May.
// - "mistake" (Spot the mistake): May writes an email, InMail or advert with a few deliberate
//   mistakes (POST /api/games/:slug/piece); you tap the sentences you think are wrong, and the page
//   marks it: what you caught, what you missed and anything you flagged that was fine.
// - "counter" (Counter-offer): the same call engine as Get the meeting; May plays a candidate who's
//   resigned and been offered more to stay, and calls you. The meter is their commitment to the move.
// Best scores are kept in this browser, like progress. Server: server/games.js.
export const PLAYABLE = ["objection", "meeting", "rapid", "mistake", "counter"];
// Rapid fire needs no challenges of its own: its questions come from the quiz bank.
export const isReady = (game) => !game.comingSoon && PLAYABLE.includes(game.kind) && (game.kind === "rapid" || (game.challenges ?? game.scenarios?.length ?? 0) > 0);
const LEVELS = ["friendly", "tough", "brutal"];
const LEVEL_FALLBACK = { friendly: "Friendly", tough: "Tough", brutal: "Brutal" };
// May's picture, the same one as in Ask May.
const MAY_PHOTO = assetUrl("concepts/may.svg");
const MAX_TURNS = 5;

// May's playbook line, with her [R1]-style citations taken out and listed as links instead.
function cited(text, sources) {
  const refs = [...new Set([...String(text).matchAll(/\[(R\d+|S)\]/g)].map((m) => m[1]))].filter((r) => sources?.[r]);
  return { text: String(text).replace(/\s*\[(R\d+|S)\]/g, "").trim(), links: refs.map((r) => sources[r]) };
}

async function post(path, body, what) {
  const res = await fetch(`/api/games/${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Sorry, May couldn't ${what}. Please try again.`);
  return data;
}

export default function GamePage() {
  const { slug } = useParams();
  const { data, error } = useApi(`/games/${slug}`);
  const { may } = useSite();
  usePageTitle(data ? data.game.title : null);
  if (error || !data) return <LoadState error={error} notFoundText="We couldn't find that game." />;
  const { game, page = {} } = data;
  const playable = may && isReady(game);
  return (
    <div className="container game" data-accent={game.accent || "brand"}>
      <Link className="game__back" to="/games"><Icon name="arrow-left" size={16} /> Games Room</Link>
      {playable ? <Game game={game} page={page} /> : (
        <section className="game__panel">
          <h1 className="game__title">{game.title}</h1>
          <p className="game__intro">{may ? "This game isn't ready to play yet." : "The games need May, who isn't switched on here yet."}</p>
        </section>
      )}
    </div>
  );
}

// ── Shared pieces ─────────────────────────────────────────────

function MayBubble({ children, who, typing = false }) {
  return (
    <div className="game__say game__pop">
      <span className="game__avatar"><Avatar src={MAY_PHOTO} size={48} /></span>
      <div>
        {who && <p className="game__who">{who}</p>}
        {typing ? (
          <p className="game__bubble game__bubble--typing" role="status">
            <span className="visually-hidden">May is thinking</span>
            <span className="typing" aria-hidden="true"><span /><span /><span /></span>
          </p>
        ) : (
          <blockquote className="game__bubble">{children}</blockquote>
        )}
      </div>
    </div>
  );
}

// The phone ringing before a call or a challenge: a moment, then it's answered. Straight through
// for anyone whose device asks for reduced motion.
function useRinging(ms = 1600) {
  const [ringing, setRinging] = useState(true);
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setRinging(false), reduced ? 0 : ms);
    return () => clearTimeout(t);
  }, [ms]);
  return ringing;
}

function Ringing({ title, who, note }) {
  return (
    <section className="game__panel game__ringing" aria-labelledby="ring-title">
      <span className="ring-phone" aria-hidden="true"><Icon name="phone" size={40} /></span>
      <h1 id="ring-title" className="game__title">{title}</h1>
      <p className="game__intro">{who}</p>
      {note && <p className="game__meta">{note}</p>}
    </section>
  );
}

function YouBubble({ children }) {
  return (
    <div className="game__you game__pop">
      <p className="game__who">You</p>
      <p className="game__you-text">{children}</p>
    </div>
  );
}

// The game's picture: its own from the Studio, otherwise the drawing for its kind.
function Art({ game, className }) {
  return game.image?.url ? <img className={`game-art game-art--photo ${className ?? ""}`} src={`${game.image.url}?w=600&auto=format`} alt="" /> : <GameArt kind={game.kind} className={className} />;
}

function Start({ game, page, level, setLevel, onStart, note }) {
  const best = useProgress().games?.[game.slug];
  const levelName = (l) => page[l]?.name || LEVEL_FALLBACK[l];
  return (
    <section className="game__panel game__start" aria-labelledby="game-title">
      <div className="game__art-wrap"><Art game={game} className="game__art" /></div>
      <h1 id="game-title" className="game__title">{game.title}</h1>
      {game.intro && <p className="game__intro">{game.intro}</p>}
      <p className="game__meta">{note}{best ? <> · Your best: <strong>{best.best}/{best.total}</strong></> : null}</p>
      <fieldset className="game__levels">
        <legend>Choose your level</legend>
        {LEVELS.map((l, i) => (
          <label key={l} className="game__level">
            <input type="radio" name="level" value={l} checked={level === l} onChange={() => setLevel(l)} />
            <span className="game__level-heat" aria-hidden="true">{Array.from({ length: i + 1 }, (_, n) => <Icon key={n} name="flame" size={16} />)}</span>
            <span className="game__level-name">{levelName(l)}</span>
            {page[l]?.line && <span className="game__level-line">{page[l].line}</span>}
          </label>
        ))}
      </fieldset>
      <Button className="game__go" iconAfter="arrow-right" onClick={onStart}>Challenge May</Button>
    </section>
  );
}

// May's feedback on one answer or a whole call: the score, what worked, what to do better, a better
// line and what the Playbook says.
function ScoreCard({ result }) {
  const { gamesOnly } = useSite();
  const playbook = cited(result.playbook, result.sources);
  const mood = result.score >= 8 ? "great" : result.score <= 3 ? "low" : "ok";
  return (
    <>
      <div className={`game__score game__score--${mood}`}>
        <ProgressRing value={result.score * 10} size={104} stroke={10} label="Your score" />
        <div>
          <p className="game__score-number"><strong><CountUp value={result.score} duration={700} /></strong>/10</p>
          {result.verdict && <p className="game__verdict">{result.verdict}</p>}
        </div>
        {result.score >= 8 && <Icon name="trophy" size={40} className="game__score-trophy" />}
      </div>
      <div className="game__feedback">
        {result.worked.length > 0 && (
          <div className="game__list game__list--good game__rise" style={{ "--i": 1 }}>
            <h2><Icon name="circle-check" size={18} /> What worked</h2>
            <ul>{result.worked.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        )}
        {result.improve.length > 0 && (
          <div className="game__list game__list--better game__rise" style={{ "--i": 2 }}>
            <h2><Icon name="trending-up" size={18} /> To do better</h2>
            <ul>{result.improve.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        )}
      </div>
      {result.betterLine && (
        <div className="game__line game__rise" style={{ "--i": 3 }}>
          <h2><Icon name="quote" size={18} /> Try saying</h2>
          <p>“{result.betterLine}”</p>
        </div>
      )}
      {playbook.text && (
        <div className="game__playbook game__rise" style={{ "--i": 4 }}>
          <h2><Icon name="book-open" size={18} /> What the Playbook says</h2>
          <p>{playbook.text}</p>
          {playbook.links.length > 0 && (
            <ul>{playbook.links.map((s) => <li key={s.href}>{gamesOnly ? s.label : <Link to={s.href}>{s.label}</Link>}</li>)}</ul>
          )}
        </div>
      )}
    </>
  );
}

// Saves the score, and says so when it's a new best.
function useSaveScore(game) {
  const progress = useProgress();
  const toast = useToast();
  return (score, total) => {
    const before = progress.games?.[game.slug]?.best ?? 0;
    progress.addGameScore(game.slug, score, total);
    if (score > before) toast?.(before ? `New best: ${score}/${total}` : `Game complete: ${score}/${total}`);
  };
}

function Game({ game, page }) {
  const [level, setLevel] = useState("tough");
  const [playing, setPlaying] = useState(0); // a new number starts a new game
  const levelName = page[level]?.name || LEVEL_FALLBACK[level];
  const count = Math.min(game.rounds || 3, game.scenarios?.length ?? 0);
  const questions = game.rounds || 10;
  const note = CALLS[game.kind] ? `One call, up to ${MAX_TURNS} turns, scored out of 10`
    : game.kind === "rapid" ? `${questions} questions from the Playbook, ${SECONDS[level]} seconds each`
    : game.kind === "mistake" ? `One piece of writing, ${level === "brutal" ? 4 : 3} mistakes to find, scored out of 10`
    : `${count} ${count === 1 ? "challenge" : "challenges"}, each scored out of 10`;
  if (!playing) return <Start game={game} page={page} level={level} setLevel={setLevel} note={note} onStart={() => setPlaying(1)} />;
  const props = { game, page, level, levelName, onAgain: () => setPlaying((n) => n + 1), onLevel: () => setPlaying(0) };
  if (game.kind === "rapid") return <Rapid key={playing} {...props} />;
  if (game.kind === "mistake") return <Mistake key={playing} {...props} />;
  return CALLS[game.kind] ? <Call key={playing} {...props} /> : <Objection key={playing} {...props} count={count} />;
}

// ── Handle the objection ──────────────────────────────────────

function Objection({ game, page, level, levelName, count, onAgain, onLevel }) {
  const save = useSaveScore(game);
  const [challenges] = useState(() => shuffle(game.scenarios).slice(0, count));
  const [results, setResults] = useState([]);
  const total = challenges.length * 10;
  const scored = results.reduce((n, r) => n + r.score, 0);

  if (results.length >= challenges.length) {
    return <Finished game={game} score={scored} total={total} levelName={levelName} onAgain={onAgain} onLevel={onLevel}
      recap={results.map((r) => ({ label: r.who, score: `${r.score}/10`, note: r.verdict }))} />;
  }
  const finishOne = (result) => {
    const next = [...results, result];
    if (next.length >= challenges.length) save(next.reduce((n, r) => n + r.score, 0), total);
    setResults(next);
  };
  return <Challenge key={results.length} game={game} page={page} level={level} levelName={levelName} scenario={challenges[results.length]} number={results.length + 1} of={challenges.length} runningScore={scored} onNext={finishOne} />;
}

function Challenge({ game, page, level, levelName, scenario, number, of, runningScore, onNext }) {
  const ringing = useRinging(1400);
  const answerId = useId();
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState(null);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => { if (!ringing) boxRef.current?.focus(); }, [ringing]);
  useEffect(() => { if (result) resultRef.current?.focus(); }, [result]);

  async function submit(e) {
    e.preventDefault();
    if (!answer.trim() || busy) return;
    setBusy(true);
    setProblem(null);
    try {
      setResult(await post(`${game.slug}/score`, { scenario: scenario._key, level, answer }, "score that"));
    } catch (err) {
      setProblem(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (ringing) return <Ringing title="Calling…" who={scenario.who} note={`Challenge ${number} of ${of}`} />;
  return (
    <section className="game__panel" aria-labelledby="challenge-title">
      {result?.score >= 8 && <Confetti />}
      <div className="game__bar">
        <span>{game.title} · {levelName}</span>
        <span>Challenge {number} of {of}</span>
        <span>Score so far: {runningScore}</span>
      </div>
      <div className="game__steps" aria-hidden="true">
        {Array.from({ length: of }, (_, i) => <span key={i} className={i < number - 1 || (i === number - 1 && result) ? "is-done" : i === number - 1 ? "is-now" : ""} />)}
      </div>

      <h1 id="challenge-title" className="visually-hidden">Challenge {number}: {scenario.who}</h1>
      <MayBubble who={`May plays: ${scenario.who}`}>{scenario.line}</MayBubble>

      {!result && (
        <form className="game__answer" onSubmit={submit}>
          <label htmlFor={answerId} className="game__label">Your answer, as you'd say it to them</label>
          <textarea id={answerId} ref={boxRef} rows={5} maxLength={1200} value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={busy} />
          {page.privacyNote && <p className="game__hint">{page.privacyNote}</p>}
          {problem && <p className="game__problem" role="alert">{problem}</p>}
          {busy && <MayBubble typing />}
          <div className="game__actions">
            <Button type="submit" iconAfter="arrow-right" disabled={busy || !answer.trim()}>{busy ? "May is thinking…" : "Send your answer"}</Button>
          </div>
        </form>
      )}

      {result && (
        <div className="game__result" ref={resultRef} tabIndex={-1} aria-live="polite">
          <YouBubble>{answer}</YouBubble>
          {result.reaction && <MayBubble>{result.reaction}</MayBubble>}
          <ScoreCard result={result} />
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

// ── Get the meeting and Counter-offer (calls) ──────────────────

// The two call games: the meter's words, how it starts, and how it ends. Keep the starting points in
// step with the levels in server/games.js (CALLS).
const CALLS = {
  meeting: {
    start: { friendly: 40, tough: 25, brutal: 10 },
    meterLabel: "How it's going",
    meterName: "How warm May is to a meeting",
    word: (w) => (w >= 75 ? "Hot" : w >= 50 ? "Warm" : w >= 25 ? "Warming up" : "Cold"),
    ringing: "Calling…",
    onCall: "On the phone to",
    won: { icon: "calendar", text: "Meeting booked" },
    lost: { icon: "phone", text: "They hung up" },
    again: "Another call",
  },
  counter: {
    start: { friendly: 55, tough: 40, brutal: 25 },
    meterLabel: "Their commitment to the move",
    meterName: "How committed the candidate is to the move",
    word: (w) => (w >= 75 ? "Committed" : w >= 50 ? "Leaning your way" : w >= 25 ? "Wavering" : "Leaning towards staying"),
    ringing: "Your candidate is calling…",
    onCall: "On the phone with",
    won: { icon: "handshake", text: "They're still joining" },
    lost: { icon: "circle-x", text: "They took the counter" },
    again: "Another call",
  },
};

function Call({ game, page, level, levelName, onAgain, onLevel }) {
  const kind = CALLS[game.kind];
  const save = useSaveScore(game);
  const lineId = useId();
  const [scenario] = useState(() => shuffle(game.scenarios)[0]);
  const ringing = useRinging();
  const [turns, setTurns] = useState(() => [{ role: "assistant", content: scenario.line }]);
  const [warmth, setWarmth] = useState(kind.start[level] ?? 25);
  const [line, setLine] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState(null);
  const [ended, setEnded] = useState(null); // { outcome, final }
  const boxRef = useRef(null);
  const endRef = useRef(null);
  const logRef = useRef(null);
  const used = turns.filter((t) => t.role === "user").length;

  useEffect(() => { if (!ringing && !ended) boxRef.current?.focus(); }, [ringing, ended, busy]);
  useEffect(() => { if (ended) endRef.current?.focus(); }, [ended]);
  useEffect(() => { logRef.current?.lastElementChild?.scrollIntoView?.({ block: "nearest", behavior: "smooth" }); }, [turns, busy]);

  async function send(e) {
    e.preventDefault();
    const said = line.trim();
    if (!said || busy || ended) return;
    const next = [...turns, { role: "user", content: said }];
    setTurns(next);
    setLine("");
    setBusy(true);
    setProblem(null);
    try {
      const r = await post(`${game.slug}/turn`, { scenario: scenario._key, level, turns: next }, "reply to that");
      setTurns([...next, { role: "assistant", content: r.reply }]);
      setWarmth(r.warmth);
      if (r.outcome !== "talking") {
        setEnded({ outcome: r.outcome, final: r.final });
        if (r.final) save(r.final.score, 10);
      }
    } catch (err) {
      setTurns(turns);
      setLine(said);
      setProblem(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (ringing) return <Ringing title={kind.ringing} who={scenario.who} />;

  const booked = ended?.outcome === "won";
  return (
    <section className="game__panel game__call" aria-labelledby="call-title">
      {booked && <Confetti />}
      <div className="game__bar">
        <span>{game.title} · {levelName}</span>
        <span>{ended ? "Call ended" : `Turn ${Math.min(used + 1, MAX_TURNS)} of ${MAX_TURNS}`}</span>
      </div>
      <h1 id="call-title" className="game__call-title"><Icon name="phone" size={18} /> {kind.onCall}: {scenario.who}</h1>

      <div className="warmth" role="meter" aria-label={kind.meterName} aria-valuemin={0} aria-valuemax={100} aria-valuenow={warmth} aria-valuetext={kind.word(warmth)}>
        <div className="warmth__head"><span>{kind.meterLabel}</span><strong>{kind.word(warmth)}</strong></div>
        <div className="warmth__track"><span className="warmth__fill" style={{ width: `${Math.max(4, warmth)}%` }} /><Icon name="flame" size={20} className="warmth__flame" style={{ left: `${Math.max(4, warmth)}%` }} /></div>
      </div>

      <div className="game__log" ref={logRef}>
        {turns.map((t, i) => (t.role === "assistant" ? <MayBubble key={i}>{t.content}</MayBubble> : <YouBubble key={i}>{t.content}</YouBubble>))}
        {busy && <MayBubble typing />}
      </div>

      {!ended && (
        <form className="game__answer" onSubmit={send}>
          <label htmlFor={lineId} className="game__label">What you say {used === 0 ? "(open the call)" : "next"}</label>
          <textarea id={lineId} ref={boxRef} rows={3} maxLength={800} value={line} onChange={(e) => setLine(e.target.value)} disabled={busy}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) send(e); }} />
          <p className="game__hint">{MAX_TURNS - used} {MAX_TURNS - used === 1 ? "turn" : "turns"} left. Ctrl and Enter sends. {page.privacyNote}</p>
          {problem && <p className="game__problem" role="alert">{problem}</p>}
          <div className="game__actions">
            <span className="game__turns" aria-hidden="true">{Array.from({ length: MAX_TURNS }, (_, i) => <span key={i} className={i < used ? "is-done" : ""} />)}</span>
            <Button type="submit" iconAfter="arrow-right" disabled={busy || !line.trim()}>{busy ? "May is thinking…" : "Say it"}</Button>
          </div>
        </form>
      )}

      {ended && (
        <div className="game__result" ref={endRef} tabIndex={-1} aria-live="polite">
          <div className={`stamp ${booked ? "stamp--won" : "stamp--lost"}`}>
            <Icon name={booked ? kind.won.icon : kind.lost.icon} size={22} />
            {booked ? kind.won.text : kind.lost.text}
          </div>
          {ended.final ? <ScoreCard result={ended.final} /> : <p className="game__intro">May couldn't score this call. Have another go.</p>}
          <div className="game__actions game__actions--centre">
            <Button icon="rotate-ccw" onClick={onAgain}>{kind.again}</Button>
            <Button variant="secondary" onClick={onLevel}>Change level</Button>
            <Button variant="ghost" to="/games">Back to the Games Room</Button>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Rapid fire ────────────────────────────────────────────────

// Seconds per question at each level.
const SECONDS = { friendly: 25, tough: 12, brutal: 7 };

function Rapid({ game, level, levelName, onAgain, onLevel }) {
  const save = useSaveScore(game);
  const { gamesOnly } = useSite();
  const seconds = SECONDS[level] ?? 12;
  const [questions, setQuestions] = useState(null);
  const [problem, setProblem] = useState(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null); // the option chosen, or "time" when the clock ran out
  const [left, setLeft] = useState(seconds);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [started] = useState(() => Date.now());
  const [finishedAt, setFinishedAt] = useState(null);
  const deadline = useRef(0);
  const nextRef = useRef(null);
  const headingRef = useRef(null);

  // A fresh set of questions, each with its answers in a new order.
  useEffect(() => {
    let gone = false;
    fetch(`/api/games/${game.slug}/questions`)
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok || !Array.isArray(data) || !data.length) throw new Error(data?.error || "The questions couldn't be loaded. Please try again.");
        if (!gone) setQuestions(data.map(shuffleAnswers));
      })
      .catch((err) => !gone && setProblem(err.message));
    return () => { gone = true; };
  }, [game.slug]);

  const q = questions?.[index];
  const answered = picked !== null;

  // The clock: starts when each question appears, stops when it's answered.
  useEffect(() => {
    if (!q || answered) return;
    deadline.current = Date.now() + seconds * 1000;
    setLeft(seconds);
    headingRef.current?.focus();
    const tick = setInterval(() => {
      const remaining = Math.max(0, (deadline.current - Date.now()) / 1000);
      setLeft(remaining);
      if (remaining <= 0) choose("time");
    }, 100);
    return () => clearInterval(tick);
  }, [q, answered]); // eslint-disable-line react-hooks/exhaustive-deps

  function choose(option) {
    if (!q || picked !== null) return;
    const right = option === q.correct;
    setPicked(option);
    setResults((r) => [...r, { q, right, timedOut: option === "time" }]);
    setStreak((n) => {
      const next = right ? n + 1 : 0;
      setBestStreak((b) => Math.max(b, next));
      return next;
    });
  }

  function next() {
    if (index + 1 >= questions.length) {
      const score = results.filter((r) => r.right).length;
      save(score, questions.length);
      setFinishedAt(Date.now());
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  // A right answer moves on by itself; a wrong one waits, so the explanation can be read.
  useEffect(() => {
    if (picked === null) return;
    if (picked === q.correct) {
      const t = setTimeout(next, 900);
      return () => clearTimeout(t);
    }
    nextRef.current?.focus();
  }, [picked]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keys 1 to 4 answer, as well as clicking.
  useEffect(() => {
    if (!q || answered) return;
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= q.options.length) choose(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  if (problem) return <section className="game__panel"><p className="game__problem" role="alert">{problem}</p><Button onClick={onLevel}>Back</Button></section>;
  if (!questions) return <section className="game__panel game__ringing"><MayBubble typing /></section>;

  if (finishedAt) {
    const score = results.filter((r) => r.right).length;
    const time = Math.round((finishedAt - started) / 1000);
    const missed = results.filter((r) => !r.right);
    return (
      <Finished game={game} score={score} total={questions.length} levelName={levelName} onAgain={onAgain} onLevel={onLevel}
        recap={[
          { label: "Best streak", score: `${bestStreak} in a row` },
          { label: "Time", score: `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}` },
        ]}>
        {missed.length > 0 && (
          <div className="rapid__missed">
            <h2>The ones that got away</h2>
            <ul>
              {missed.map(({ q: m, timedOut }) => (
                <li key={m._id}>
                  <p className="rapid__missed-q">{m.question}</p>
                  <p><strong>Answer:</strong> {m.options[m.correct]}{timedOut ? " (out of time)" : ""}</p>
                  {m.explanation && <p className="rapid__missed-why">{m.explanation}</p>}
                  {m.source && (gamesOnly ? <span className="rapid__missed-why">From: {m.source.label}</span> : <Link to={m.source.href}>{m.source.label}</Link>)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Finished>
    );
  }

  const right = answered && picked === q.correct;
  const low = !answered && left <= 3;
  return (
    <section className="game__panel rapid" aria-labelledby="rapid-q">
      <div className="game__bar">
        <span>{game.title} · {levelName}</span>
        <span>Question {index + 1} of {questions.length}</span>
        <span>Score: {results.filter((r) => r.right).length}</span>
      </div>
      <div className="game__steps" aria-hidden="true">
        {questions.map((_, i) => <span key={i} className={i < index || (i === index && answered) ? (results[i]?.right ? "is-done" : "is-missed") : i === index ? "is-now" : ""} />)}
      </div>

      <div className={`rapid__clock${low ? " is-low" : ""}`} role="timer" aria-label={`${Math.ceil(left)} seconds left`}>
        <Icon name="timer" size={18} />
        <span className="rapid__track"><span className="rapid__fill" style={{ width: `${(left / seconds) * 100}%` }} /></span>
        <strong aria-hidden="true">{Math.ceil(left)}</strong>
      </div>

      {streak >= 2 && <p key={streak} className="rapid__streak"><Icon name="flame" size={18} /> {streak} in a row</p>}

      <div className="game__say game__pop" key={q._id}>
        <span className="game__avatar"><Avatar src={MAY_PHOTO} size={48} /></span>
        <h1 id="rapid-q" className="game__bubble rapid__question" ref={headingRef} tabIndex={-1}>{q.question}</h1>
      </div>

      <div className="rapid__options" role="group" aria-label="Answers">
        {q.options.map((o, i) => {
          const state = !answered ? "" : i === q.correct ? " is-right" : i === picked ? " is-wrong" : " is-dim";
          return (
            <button key={o} type="button" className={`rapid__option${state}`} onClick={() => choose(i)} disabled={answered} style={{ "--i": i }}>
              <span className="rapid__key" aria-hidden="true">{i + 1}</span>
              <span>{o}</span>
              {answered && i === q.correct && <Icon name="circle-check" size={20} className="rapid__mark" />}
              {answered && i === picked && i !== q.correct && <Icon name="circle-x" size={20} className="rapid__mark" />}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {right && <p className="rapid__verdict rapid__verdict--right">Right! <span className="rapid__plus" aria-hidden="true">+1</span></p>}
        {answered && !right && (
          <div className="rapid__why">
            <p className="rapid__verdict rapid__verdict--wrong">{picked === "time" ? "Out of time." : "Not quite."} The answer is: {q.options[q.correct]}</p>
            {q.explanation && <p>{q.explanation}</p>}
            {q.source && <p className="rapid__source"><Icon name="book-open" size={16} /> {gamesOnly ? q.source.label : <Link to={q.source.href}>{q.source.label}</Link>}</p>}
            <div className="game__actions">
              <Button ref={nextRef} iconAfter="arrow-right" onClick={next}>{index + 1 < questions.length ? "Next question" : "See your score"}</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Spot the mistake ──────────────────────────────────────────

const FORMAT_LABEL = { email: "Email", inmail: "LinkedIn InMail", advert: "Job advert", message: "Message" };

// The score: each mistake found counts, each sentence flagged that was fine takes half back.
function markPiece(sentences, flagged) {
  const mistakes = sentences.filter((x) => x.mistake).length;
  const hits = sentences.filter((x, i) => x.mistake && flagged.has(i)).length;
  const wrong = sentences.filter((x, i) => !x.mistake && flagged.has(i)).length;
  const score = Math.max(0, Math.min(10, Math.round((10 * Math.max(0, hits - wrong / 2)) / Math.max(1, mistakes))));
  const verdict = hits === mistakes && !wrong ? "Eagle-eyed" : hits === mistakes ? "Found them all, plus a few extras" : hits === 0 ? "They all got past you" : `${hits} of ${mistakes} found`;
  return { mistakes, hits, wrong, score, verdict };
}

function Mistake({ game, level, levelName, onAgain, onLevel }) {
  const save = useSaveScore(game);
  const [scenario] = useState(() => shuffle(game.scenarios)[0]);
  const [piece, setPiece] = useState(null);
  const [problem, setProblem] = useState(null);
  const [flagged, setFlagged] = useState(() => new Set());
  const [checked, setChecked] = useState(null);
  const docRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    let gone = false;
    post(`${game.slug}/piece`, { scenario: scenario._key, level }, "write that")
      .then((p) => !gone && setPiece(p))
      .catch((err) => !gone && setProblem(err.message));
    return () => { gone = true; };
  }, [game.slug, scenario._key, level]);
  useEffect(() => { if (piece) docRef.current?.focus(); }, [piece]);
  useEffect(() => { if (checked) resultRef.current?.focus(); }, [checked]);

  if (problem) return <section className="game__panel"><p className="game__problem" role="alert">{problem}</p><div className="game__actions"><Button onClick={onAgain}>Try again</Button></div></section>;
  if (!piece) {
    return (
      <section className="game__panel game__ringing" aria-live="polite">
        <span className="writing-pen" aria-hidden="true"><Icon name="file-text" size={40} /></span>
        <h1 className="game__title">May is writing…</h1>
        <p className="game__intro">{scenario.who}</p>
      </section>
    );
  }

  const toggle = (i) => {
    if (checked) return;
    setFlagged((f) => { const n = new Set(f); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };
  const mistakes = piece.sentences.filter((x) => x.mistake).length;
  const check = () => {
    const result = markPiece(piece.sentences, flagged);
    setChecked(result);
    save(result.score, 10);
  };

  // The piece as paragraphs of tappable sentences.
  const paragraphs = [];
  piece.sentences.forEach((x, i) => {
    if (!paragraphs.length || x.newParagraph) paragraphs.push([]);
    paragraphs.at(-1).push(i);
  });

  return (
    <section className="game__panel" aria-labelledby="piece-title">
      {checked?.score >= 8 && <Confetti />}
      <div className="game__bar">
        <span>{game.title} · {levelName}</span>
        <span>{checked ? "Checked" : `Flagged ${flagged.size} · ${mistakes} to find`}</span>
      </div>
      <h1 id="piece-title" className="game__call-title"><Icon name="search" size={18} /> {scenario.who}</h1>
      {!checked && <p className="game__hint">Tap each sentence you think is a mistake. Tap again to change your mind.</p>}

      <article className={`piece piece--${piece.format}${checked ? " is-checked" : ""}`} ref={docRef} tabIndex={-1} aria-label={FORMAT_LABEL[piece.format] ?? "The piece"}>
        <header className="piece__head">
          <span className="piece__kind">{FORMAT_LABEL[piece.format] ?? "Message"}</span>
          {piece.from && <p><span>From</span> {piece.from}</p>}
          {piece.to && <p><span>To</span> {piece.to}</p>}
          {piece.subject && <p className="piece__subject"><span>{piece.format === "advert" ? "Role" : "Subject"}</span> {piece.subject}</p>}
        </header>
        <div className="piece__body">
          {paragraphs.map((para, p) => (
            <p key={p}>
              {para.map((i) => {
                const x = piece.sentences[i];
                const on = flagged.has(i);
                const state = !checked ? (on ? " is-flagged" : "") : x.mistake && on ? " is-hit" : x.mistake ? " is-missed" : on ? " is-wrong" : "";
                return (
                  <button key={i} type="button" className={`piece__s${state}`} aria-pressed={on} onClick={() => toggle(i)} disabled={!!checked}>
                    {x.text}
                  </button>
                );
              })}
            </p>
          ))}
        </div>
      </article>

      {!checked && (
        <div className="game__actions">
          <Button iconAfter="arrow-right" onClick={check} disabled={!flagged.size}>Check it</Button>
        </div>
      )}

      {checked && (
        <div className="game__result" ref={resultRef} tabIndex={-1} aria-live="polite">
          <ScoreCard result={{ score: checked.score, verdict: checked.verdict, worked: [], improve: [], betterLine: "", playbook: piece.playbook, sources: piece.sources }} />
          <ol className="spotted">
            {piece.sentences.map((x, i) => ({ x, i })).filter(({ x, i }) => x.mistake || flagged.has(i)).map(({ x, i }, n) => {
              const kind = x.mistake && flagged.has(i) ? "hit" : x.mistake ? "missed" : "wrong";
              return (
                <li key={i} className={`spotted__item spotted__item--${kind} game__rise`} style={{ "--i": n + 1 }}>
                  <p className="spotted__tag">
                    <Icon name={kind === "hit" ? "circle-check" : kind === "missed" ? "eye" : "circle-x"} size={16} />
                    {kind === "hit" ? "You spotted it" : kind === "missed" ? "You missed this one" : "This one was fine"}
                  </p>
                  <p className="spotted__text">“{x.text}”</p>
                  {x.why && <p>{x.why}</p>}
                  {x.fix && <p className="spotted__fix"><strong>Better:</strong> “{x.fix}”</p>}
                </li>
              );
            })}
          </ol>
          <div className="game__actions game__actions--centre">
            <Button icon="rotate-ccw" onClick={onAgain}>Another one</Button>
            <Button variant="secondary" onClick={onLevel}>Change level</Button>
            <Button variant="ghost" to="/games">Back to the Games Room</Button>
          </div>
        </div>
      )}
    </section>
  );
}

// ── The end of a game ─────────────────────────────────────────

function Finished({ game, score, total, recap, levelName, onAgain, onLevel, children }) {
  const headingRef = useRef(null);
  useEffect(() => { headingRef.current?.focus(); }, []);
  const pct = total ? Math.round((score / total) * 100) : 0;
  const message = pct >= 80 ? "Outstanding. May didn't stand a chance." : pct >= 60 ? "Solid. A couple of sharper answers and you'll have her." : pct >= 40 ? "Getting there. Look at May's lines and try again." : "May won this one. Have another go.";
  return (
    <section className="game__panel game__end" aria-labelledby="end-title">
      {pct >= 80 && <Confetti pieces={60} />}
      <div className="game__end-ring">
        <ProgressRing value={pct} size={140} stroke={12} label="Your score" />
        {pct >= 80 && <Icon name="trophy" size={36} className="game__end-trophy" />}
      </div>
      <h1 id="end-title" className="game__title" ref={headingRef} tabIndex={-1}><CountUp value={score} />/{total}</h1>
      <p className="game__intro">{message}</p>
      <p className="game__meta">{game.title} · {levelName}</p>
      <ol className="game__recap">
        {recap.map((r, i) => (
          <li key={i} className="game__rise" style={{ "--i": i + 1 }}><span>{r.label}</span><strong>{r.score}</strong>{r.note && <em>{r.note}</em>}</li>
        ))}
      </ol>
      {children}
      <div className="game__actions game__actions--centre">
        <Button icon="rotate-ccw" onClick={onAgain}>Play again</Button>
        <Button variant="secondary" onClick={onLevel}>Change level</Button>
        <Button variant="ghost" to="/games">Back to the Games Room</Button>
      </div>
    </section>
  );
}
