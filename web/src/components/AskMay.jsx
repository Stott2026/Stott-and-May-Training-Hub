import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Avatar from "./Avatar.jsx";
import { Icon } from "./icons.jsx";
import { assetUrl } from "../lib/assetUrl.js";
import { useMay } from "../lib/may.jsx";
import { useSite } from "../lib/site.jsx";
import { showMayConcept } from "./AskMayConcept.jsx";
import Button from "./Button.jsx";
import Card from "./Card.jsx";
import Eyebrow from "./Eyebrow.jsx";
import "./AskMayConcept.css";
import "./AskMay.css";

const MAY_PHOTO = assetUrl("concepts/may.svg");
const MAX_LENGTH = 2000;
const MODES = [
  { id: "ask", label: "Ask", icon: "message-circle" },
  { id: "roleplay", label: "Role-play", icon: "users" },
  { id: "quiz", label: "Quiz me", icon: "brain" },
];

// The live May's controls (open, place), or null when May is off or this is the preview build.
export function useLiveMay() {
  const { may } = useSite();
  const controls = useMay();
  return may && !showMayConcept ? controls : null;
}

// "Meet May" on the Training page, when May is switched on.
export function MeetMayCard() {
  const may = useLiveMay();
  if (!may) return null;
  return (
    <Card className="may-card" accent="sky">
      <Avatar src={MAY_PHOTO} alt="May, the training coach" size={88} />
      <div className="may-card__body">
        <Eyebrow>Your training coach</Eyebrow>
        <h2 className="may-card__title">Ask May</h2>
        <p className="may-card__text">Ask anything about your training, practise a tricky call (May plays the client or candidate, then tells you how you did), or let her quiz you.</p>
      </div>
      <Button variant="secondary" icon="message-circle" onClick={() => may.open()}>Talk to May</Button>
    </Card>
  );
}

// Ideas to start with, depending on where the learner is.
function starters(place) {
  if (place?.type === "section") {
    return [
      { mode: "ask", text: "Explain this section simply" },
      { mode: "ask", text: "Give me a real example of this" },
      { mode: "roleplay", text: place.scenario ? "Let's role-play this section's scenario. You start." : "Let's role-play a conversation for this section. You start." },
      { mode: "quiz", text: "Quiz me on this section" },
    ];
  }
  if (place?.type === "tool") {
    return [
      { mode: "ask", text: `What should I use ${place.name} for every day?` },
      { mode: "ask", text: `How do I set ${place.name} up properly?` },
      { mode: "quiz", text: `Quiz me on ${place.name} best practice` },
    ];
  }
  return [
    { mode: "ask", text: "How do I handle a client who says our fee is too high?" },
    { mode: "roleplay", text: "Role-play a hiring manager pushing back on our fees. You start." },
    { mode: "quiz", text: "Quiz me on qualifying a new role" },
    { mode: "ask", text: "Which tool should I use to find contacts?" },
  ];
}

// May's replies: short paragraphs, "- " bullet lists, **bold**, and [S] / [R1] source markers.
// Each source she cites becomes a small number in the text, with the sources listed underneath as
// links into the hub. Built as React elements, so nothing she writes runs as code.
function Reply({ text, sources = {}, onFollow }) {
  const order = [];
  for (const m of text.matchAll(/\[(S|R\d+)\]/g)) if (sources[m[1]] && !order.includes(m[1])) order.push(m[1]);
  const inline = (line, key) => line.split(/(\*\*[^*]+\*\*|\s?\[(?:S|R\d+)\])/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={`${key}-${i}`}>{part.slice(2, -2)}</strong>;
    const ref = part.match(/^\s?\[(S|R\d+)\]$/)?.[1];
    if (ref) {
      const n = order.indexOf(ref) + 1;
      if (!n) return null; // still arriving, or nothing to link to
      return <Link key={`${key}-${i}`} to={sources[ref].href} className="may-cite" onClick={onFollow} title={sources[ref].label} aria-label={`Source ${n}: ${sources[ref].label}`}>{n}</Link>;
    }
    return <Fragment key={`${key}-${i}`}>{part}</Fragment>;
  });
  const blocks = text.trim().split(/\n{2,}/).map((block, b) => {
    const lines = block.split("\n").filter((l) => l.trim());
    if (lines.length && lines.every((l) => /^\s*[-•]\s+/.test(l))) {
      return <ul key={b}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\s*[-•]\s+/, ""), `${b}-${i}`)}</li>)}</ul>;
    }
    return <p key={b}>{lines.map((l, i) => <Fragment key={i}>{i > 0 && <br />}{inline(l, `${b}-${i}`)}</Fragment>)}</p>;
  });
  return (
    <>
      {blocks}
      {order.length > 0 && (
        <div className="may-sources">
          <p className="may-sources__title">From the hub</p>
          <ol>
            {order.map((ref) => (
              <li key={ref}><Link to={sources[ref].href} onClick={onFollow}><Icon name="book-open" size={12} /> {sources[ref].label}</Link></li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

// Asks the server, which streams back lines of JSON: text, a status note, sources, done or error.
async function askMay({ messages, mode, place, signal, onEvent }) {
  const context = place?.type === "section" ? { type: "section", module: place.module, section: place.section } : place?.type === "tool" ? { type: "tool", slug: place.slug } : null;
  const res = await fetch("/api/may", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages, mode, context }), signal });
  if (res.status === 401) {
    window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`);
    return;
  }
  if (!res.ok || !res.body) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Sorry, May couldn't answer that. Please try again.");
  }
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) if (line.trim()) onEvent(JSON.parse(line));
  }
}

// The live "Ask May" coach: a button on every page and a chat panel. Only shown when May is
// switched on (an API key is set on the server). Conversations live in this page only: nothing is
// saved, and they're gone when the page is closed or reloaded.
export default function AskMay() {
  const { place, isOpen, open, close, request } = useMay();
  const [mode, setMode] = useState("ask");
  const [messages, setMessages] = useState([]); // { role, content, sources? }
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abort = useRef(null);
  const log = useRef(null);
  const input = useRef(null);

  useEffect(() => { if (isOpen) setTimeout(() => input.current?.focus(), 50); }, [isOpen]);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [messages, status]);
  // Close with the Escape key.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);
  // Opened from a button with a first message (e.g. "Role-play this"): send it.
  useEffect(() => { if (request && isOpen) send(request.prompt, request.mode); }, [request]); // eslint-disable-line react-hooks/exhaustive-deps

  async function send(text, nextMode = mode) {
    const content = text.trim();
    if (!content || busy) return;
    setMode(nextMode);
    setError("");
    setDraft("");
    const history = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "", sources: {} }]);
    setBusy(true);
    abort.current = new AbortController();
    const update = (fn) => setMessages((all) => [...all.slice(0, -1), fn(all.at(-1))]);
    try {
      await askMay({
        messages: history.map(({ role, content: c }) => ({ role, content: c })),
        mode: nextMode,
        place,
        signal: abort.current.signal,
        onEvent: (e) => {
          if (e.type === "text") { setStatus(""); update((m) => ({ ...m, content: m.content + e.text })); }
          if (e.type === "status") setStatus(e.text);
          if (e.type === "sources") update((m) => ({ ...m, sources: e.sources }));
          if (e.type === "error") setError(e.message);
        },
      });
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      setBusy(false);
      setStatus("");
      // Drop an empty reply (e.g. stopped before May wrote anything).
      setMessages((all) => (all.at(-1)?.role === "assistant" && !all.at(-1).content.trim() ? all.slice(0, -1) : all));
    }
  }

  const stop = () => abort.current?.abort();
  const restart = () => { stop(); setMessages([]); setError(""); setMode("ask"); };

  return (
    <>
      {!isOpen && (
        <button type="button" className="may-fab" onClick={() => open()}>
          <Avatar src={MAY_PHOTO} size={44} />
          <span>Ask May</span>
        </button>
      )}
      {isOpen && (
        <section className="may-live" role="dialog" aria-modal="false" aria-labelledby="may-live-title">
          <header className="may-panel__head">
            <Avatar src={MAY_PHOTO} size={48} />
            <div>
              <h2 id="may-live-title" className="may-panel__name">May</h2>
              <p className="may-panel__role">Your training coach</p>
            </div>
            {messages.length > 0 && (
              <button type="button" className="may-live__new" onClick={restart}><Icon name="rotate-ccw" size={16} /> New chat</button>
            )}
            <button type="button" className="may-panel__close" onClick={close} aria-label="Close May"><Icon name="x" size={20} /></button>
          </header>

          <div className="may-live__modes" role="group" aria-label="What would you like to do?">
            {MODES.map((m) => (
              <button key={m.id} type="button" className="may-live__mode" aria-pressed={mode === m.id} onClick={() => setMode(m.id)} disabled={busy}>
                <Icon name={m.icon} size={16} /> {m.label}
              </button>
            ))}
          </div>
          {place?.label && <p className="may-live__place"><Icon name="map" size={14} /> About: {place.label}</p>}

          <div className="may-live__log" ref={log} role="log" aria-live="polite" aria-busy={busy}>
            {messages.length === 0 ? (
              <div className="may-live__welcome">
                <p className="may-bubble may-bubble--may">Hi, I'm May. I can answer questions using the hub's training, role-play a tricky call with you, or quiz you. What would you like to do?</p>
                <ul className="may-live__starters" aria-label="Ideas to start with">
                  {starters(place).map((s) => (
                    <li key={s.text}><button type="button" onClick={() => send(s.text, s.mode)}>{s.text}</button></li>
                  ))}
                </ul>
              </div>
            ) : messages.map((m, i) => (
              <div key={i} className={`may-bubble may-bubble--${m.role === "user" ? "me" : "may"}`}>
                {m.role === "user" ? <p>{m.content}</p> : <Reply text={m.content} sources={m.sources} onFollow={() => window.innerWidth < 640 && close()} />}
                {m.role === "assistant" && busy && i === messages.length - 1 && !m.content && <span className="may-typing" aria-label="May is typing"><span /><span /><span /></span>}
              </div>
            ))}
            {status && <p className="may-live__status"><Icon name="search" size={14} /> {status}</p>}
            {mode === "roleplay" && messages.length >= 4 && !busy && (
              <button type="button" className="may-live__how" onClick={() => send("How did I do?")}><Icon name="star" size={14} /> How did I do?</button>
            )}
            {error && <p className="may-live__error" role="alert">{error}</p>}
          </div>

          <form className="may-live__form" onSubmit={(e) => { e.preventDefault(); send(draft); }}>
            <label htmlFor="may-input" className="visually-hidden">Message May</label>
            <textarea
              id="may-input"
              ref={input}
              rows={2}
              maxLength={MAX_LENGTH}
              value={draft}
              placeholder={mode === "roleplay" ? "Say what you'd say on the call…" : mode === "quiz" ? "Your answer…" : "Ask May anything about your training…"}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); } }}
            />
            {busy ? (
              <button type="button" className="may-live__send" onClick={stop} aria-label="Stop May"><Icon name="x" size={18} /></button>
            ) : (
              <button type="submit" className="may-live__send" disabled={!draft.trim()} aria-label="Send"><Icon name="arrow-right" size={18} /></button>
            )}
          </form>
          <p className="may-live__note"><Icon name="shield-check" size={14} /> Keep it anonymous: no candidate or client details. May can make mistakes, so check anything important with your manager.</p>
        </section>
      )}
    </>
  );
}
