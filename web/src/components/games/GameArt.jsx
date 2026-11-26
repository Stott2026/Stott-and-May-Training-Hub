// A picture for each kind of game in the Games Room, drawn in the brand's colours (tokens in
// Games.css, so there are no colour values here). Used on the game cards and at the start of a game
// when the game has no picture of its own in the Studio. Decoration only: screen readers skip it.
// Parts with an "art__…" class move a little in Games.css (inside prefers-reduced-motion).
const VIEW = "0 0 240 140";

function Objection() {
  return (
    <>
      <g className="art__float art__float--a">
        <rect className="art-fill-paper art-line" x="22" y="26" width="112" height="52" rx="18" />
        <path className="art-fill-paper art-line" d="M46 76 l-6 18 l22 -16" />
        <rect className="art-fill-ink-soft" x="40" y="44" width="58" height="6" rx="3" />
        <rect className="art-fill-ink-soft" x="40" y="56" width="40" height="6" rx="3" />
        <circle className="art-fill-alert" cx="124" cy="30" r="13" />
        <rect className="art-fill-paper" x="122.5" y="22" width="3" height="10" rx="1.5" />
        <circle className="art-fill-paper" cx="124" cy="36.5" r="2" />
      </g>
      <g className="art__float art__float--b">
        <rect className="art-fill-brand" x="104" y="64" width="116" height="50" rx="18" />
        <path className="art-fill-brand" d="M196 112 l8 16 l-24 -16" />
        <rect className="art-fill-paper-soft" x="120" y="80" width="64" height="6" rx="3" />
        <rect className="art-fill-paper-soft" x="120" y="92" width="44" height="6" rx="3" />
      </g>
      <g className="art__spin">
        <circle className="art-ring" cx="202" cy="34" r="16" />
        <circle className="art-ring" cx="202" cy="34" r="9" />
        <circle className="art-fill-brand" cx="202" cy="34" r="3.5" />
      </g>
    </>
  );
}

function Meeting() {
  return (
    <>
      <g className="art__ring-waves">
        <path className="art-wave" d="M100 40 a28 28 0 0 1 0 50" />
        <path className="art-wave art-wave--2" d="M112 30 a42 42 0 0 1 0 70" />
      </g>
      <g className="art__shake">
        <rect className="art-fill-brand" x="40" y="30" width="54" height="80" rx="14" />
        <rect className="art-fill-paper" x="48" y="42" width="38" height="50" rx="6" />
        <circle className="art-fill-paper" cx="67" cy="101" r="4" />
        <circle className="art-fill-brand-soft" cx="67" cy="60" r="9" />
        <rect className="art-fill-brand-soft" x="56" y="73" width="22" height="10" rx="5" />
      </g>
      <g className="art__float art__float--b">
        <rect className="art-fill-paper art-line" x="140" y="34" width="78" height="74" rx="12" />
        <rect className="art-fill-brand" x="140" y="34" width="78" height="20" rx="10" />
        <rect className="art-fill-brand" x="140" y="44" width="78" height="10" />
        <rect className="art-fill-ink" x="156" y="26" width="5" height="14" rx="2.5" />
        <rect className="art-fill-ink" x="197" y="26" width="5" height="14" rx="2.5" />
        {[0, 1, 2, 3].map((c) => [0, 1].map((r) => <rect key={`${c}${r}`} className="art-fill-ink-soft" x={152 + c * 15} y={64 + r * 16} width="9" height="9" rx="2" />))}
        <circle className="art-fill-brand art__pop" cx="195" cy="85" r="9" />
        <path className="art-tick art__pop" d="M190.5 85 l3 3 l6 -6" />
      </g>
    </>
  );
}

function Rapid() {
  return (
    <>
      <g className="art__float art__float--a">
        <circle className="art-fill-paper art-line" cx="92" cy="76" r="44" />
        <rect className="art-fill-ink" x="86" y="22" width="12" height="10" rx="3" />
        <rect className="art-fill-ink" x="80" y="16" width="24" height="8" rx="4" />
        <circle className="art-fill-brand-soft" cx="92" cy="76" r="34" />
        <path className="art-fill-brand" d="M92 76 L92 42 A34 34 0 0 1 124 87 Z" />
        <g className="art__spin art__spin--fast">
          <rect className="art-fill-ink" x="90" y="48" width="4" height="30" rx="2" />
        </g>
        <circle className="art-fill-ink" cx="92" cy="76" r="5" />
      </g>
      <path className="art-fill-brand art__pop" d="M170 22 l-22 50 h20 l-10 46 l34 -60 h-22 l14 -36 z" />
      <g className="art__float art__float--b">
        <rect className="art-fill-paper art-line" x="186" y="86" width="40" height="30" rx="8" />
        <rect className="art-fill-ink-soft" x="194" y="96" width="24" height="4" rx="2" />
        <rect className="art-fill-ink-soft" x="194" y="104" width="16" height="4" rx="2" />
      </g>
    </>
  );
}

function Mistake() {
  return (
    <>
      <g className="art__float art__float--a">
        <rect className="art-fill-paper art-line" x="22" y="18" width="150" height="104" rx="12" />
        <rect className="art-fill-ui" x="22" y="18" width="150" height="20" rx="12" />
        <rect className="art-fill-ui" x="22" y="28" width="150" height="10" />
        <circle className="art-fill-ink-soft" cx="36" cy="28" r="3" />
        <circle className="art-fill-ink-soft" cx="46" cy="28" r="3" />
        <rect className="art-fill-ink-soft" x="36" y="50" width="90" height="6" rx="3" />
        <rect className="art-fill-ink-soft" x="36" y="64" width="120" height="6" rx="3" />
        <rect className="art-fill-alert-soft" x="36" y="78" width="70" height="6" rx="3" />
        <rect className="art-fill-ink-soft" x="36" y="92" width="104" height="6" rx="3" />
        <ellipse className="art-circle-alert art__draw" cx="71" cy="81" rx="44" ry="12" />
      </g>
      <g className="art__search">
        <circle className="art-fill-paper-soft art-glass" cx="176" cy="66" r="28" />
        <rect className="art-fill-brand" x="192" y="88" width="14" height="40" rx="7" transform="rotate(-40 199 108)" />
      </g>
    </>
  );
}

function Counter() {
  return (
    <>
      <g className="art__float art__float--a">
        <rect className="art-fill-paper art-line" x="26" y="40" width="80" height="62" rx="12" />
        <rect className="art-fill-ink-soft" x="40" y="56" width="40" height="6" rx="3" />
        <rect className="art-fill-alert" x="40" y="70" width="52" height="14" rx="7" />
        <path className="art-arrow-paper" d="M58 77 h18 m-6 -5 l6 5 l-6 5" />
      </g>
      <g className="art__tug">
        <path className="art-rope" d="M96 84 C 120 70, 140 98, 164 84" />
      </g>
      <g className="art__float art__float--b">
        <rect className="art-fill-brand" x="148" y="30" width="72" height="80" rx="14" />
        <circle className="art-fill-paper" cx="184" cy="58" r="14" />
        <rect className="art-fill-paper" x="166" y="78" width="36" height="20" rx="10" />
        <circle className="art-fill-brand art__pop" cx="214" cy="34" r="12" />
        <path className="art-tick-paper art__pop" d="M208.5 34 l4 4 l7 -7" />
      </g>
    </>
  );
}

const ART = { objection: Objection, meeting: Meeting, rapid: Rapid, mistake: Mistake, counter: Counter };

export default function GameArt({ kind, className = "" }) {
  const Art = ART[kind] ?? Objection;
  return (
    <svg className={`game-art ${className}`} viewBox={VIEW} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
