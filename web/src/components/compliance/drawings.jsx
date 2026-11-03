// Drawings for compliance lessons, drawn in code so they stay sharp and can carry labels and
// "spot it" markers. Each drawing has a viewBox size and named points (in the same units);
// editors attach labels and spot-it items to those points in the Studio. The list of drawings and
// points is mirrored in studio/schemaTypes/options.js (DRAWING_OPTIONS, DRAWING_SPOTS).
import "./drawings.css";

// A seated person at a well set-up desk, seen from the side.
function DeskPosture() {
  return (
    <>
      <rect className="d-wall" x="0" y="0" width="600" height="400" />
      <rect className="d-floor" x="0" y="400" width="600" height="20" />
      {/* Desk, keyboard and lamp */}
      <rect className="d-wood" x="330" y="230" width="250" height="12" rx="3" />
      <rect className="d-wood-dark" x="556" y="242" width="12" height="158" />
      <rect className="d-dark" x="378" y="224" width="64" height="6" rx="2" />
      <path className="d-metal-line" d="M548 230 L560 182 L540 156" />
      <path className="d-lamp" d="M522 150 L558 150 L548 172 L532 172 Z" transform="rotate(-24 540 160)" />
      <path className="d-light" d="M528 172 L486 226 L560 226 L548 172 Z" />
      {/* Screen on a stand: top roughly at eye level */}
      <rect className="d-metal" x="476" y="222" width="56" height="8" rx="3" />
      <rect className="d-metal" x="499" y="170" width="8" height="54" />
      <rect className="d-screen" x="488" y="92" width="14" height="96" rx="3" transform="rotate(-8 495 140)" />
      {/* Chair */}
      <path className="d-chair" d="M168 150 Q156 205 176 262 L188 262 Q172 210 184 152 Z" />
      <path className="d-chair" d="M150 214 Q186 222 196 248 L184 252 Q176 232 150 226 Z" opacity="0.6" />
      <rect className="d-chair" x="170" y="262" width="128" height="14" rx="6" />
      <rect className="d-metal" x="228" y="276" width="10" height="84" />
      <path className="d-metal-line" d="M180 384 L233 360 L290 384" />
      <circle className="d-dark" cx="180" cy="390" r="8" />
      <circle className="d-dark" cx="290" cy="390" r="8" />
      {/* Person */}
      <path className="d-trousers d-limb" d="M205 256 L322 258" strokeWidth="30" />
      <path className="d-trousers d-limb" d="M322 260 L326 382" strokeWidth="24" />
      <path className="d-shoe" d="M314 384 Q314 396 326 398 L366 398 Q370 386 352 382 Z" />
      <path className="d-shirt" d="M190 262 Q186 200 200 156 Q214 138 236 146 Q250 196 236 262 Z" />
      <path className="d-shirt d-limb" d="M222 160 L234 228" strokeWidth="20" />
      <path className="d-skin d-limb" d="M234 228 L372 226" strokeWidth="16" />
      <path className="d-skin d-limb" d="M372 226 L396 223" strokeWidth="13" />
      <rect className="d-skin" x="222" y="128" width="16" height="20" rx="6" />
      <circle className="d-skin" cx="232" cy="106" r="27" />
      <path className="d-hair" d="M205 104 Q206 74 236 76 Q260 78 258 98 Q244 88 226 92 Q214 96 212 112 Z" />
      <circle className="d-dark" cx="250" cy="104" r="2.6" />
      {/* Guides: eye line to the top of the screen, and the elbow angle */}
      <path className="d-guide" d="M252 104 L486 96" />
      <path className="d-guide-solid" d="M234 212 Q248 212 250 226" />
    </>
  );
}

// A home workspace with several things worth checking.
function HomeDesk() {
  return (
    <>
      <rect className="d-wall" x="0" y="0" width="640" height="330" />
      <rect className="d-floor" x="0" y="330" width="640" height="90" />
      <path className="d-floor-line" d="M0 360 H640 M0 392 H640" />
      {/* Window behind the table, so the screen faces the light */}
      <rect className="d-frame" x="244" y="34" width="182" height="164" rx="4" />
      <rect className="d-sky" x="254" y="44" width="76" height="144" />
      <rect className="d-sky" x="340" y="44" width="76" height="144" />
      <circle className="d-sun" cx="300" cy="84" r="20" />
      <rect className="d-frame" x="236" y="196" width="198" height="10" rx="3" />
      {/* Floor lamp */}
      <rect className="d-metal" x="586" y="160" width="6" height="210" />
      <rect className="d-metal" x="566" y="366" width="46" height="8" rx="3" />
      <path className="d-lamp" d="M566 112 L612 112 L620 160 L558 160 Z" />
      {/* Box on the floor */}
      <rect className="d-box" x="34" y="332" width="84" height="62" rx="3" />
      <path className="d-box-line" d="M34 350 H118 M76 332 V350" />
      {/* Dining chair, no arms or back support */}
      <rect className="d-wood-dark" x="128" y="224" width="10" height="96" />
      <rect className="d-wood-dark" x="190" y="224" width="10" height="96" />
      <rect className="d-wood-dark" x="128" y="232" width="72" height="8" />
      <rect className="d-wood" x="120" y="314" width="88" height="12" rx="3" />
      <rect className="d-wood-dark" x="126" y="326" width="8" height="70" />
      <rect className="d-wood-dark" x="194" y="326" width="8" height="70" />
      {/* Table */}
      <rect className="d-wood" x="180" y="250" width="330" height="14" rx="3" />
      <rect className="d-wood-dark" x="196" y="264" width="12" height="134" />
      <rect className="d-wood-dark" x="482" y="264" width="12" height="134" />
      {/* Laptop flat on the table: screen far too low */}
      <path className="d-screen" d="M302 196 L378 196 L382 244 L298 244 Z" />
      <path className="d-screen-glow" d="M308 202 L372 202 L375 238 L305 238 Z" />
      <rect className="d-metal" x="288" y="243" width="104" height="8" rx="2" />
      {/* Drink right next to the laptop */}
      <rect className="d-mug" x="398" y="222" width="22" height="28" rx="4" />
      <path className="d-mug-line" d="M420 228 Q432 234 420 244" />
      {/* Plant */}
      <path className="d-plant" d="M462 214 Q446 186 452 168 Q466 186 466 212 Z M468 212 Q472 180 492 170 Q490 196 472 214 Z" />
      <rect className="d-pot" x="452" y="212" width="30" height="38" rx="4" />
      {/* Cable from the laptop, down and across the floor to the socket */}
      <path className="d-cable" d="M392 248 Q400 290 360 330 Q330 362 300 388 Q290 400 330 402 L470 396" />
      {/* Extension lead with an adaptor plugged into it */}
      <rect className="d-frame d-outline" x="470" y="384" width="96" height="20" rx="4" />
      <rect className="d-dark" x="480" y="372" width="14" height="14" rx="2" />
      <rect className="d-dark" x="500" y="372" width="14" height="14" rx="2" />
      <rect className="d-frame d-outline" x="520" y="354" width="34" height="32" rx="3" />
      <rect className="d-dark" x="524" y="340" width="10" height="14" rx="2" />
      <rect className="d-dark" x="540" y="340" width="10" height="14" rx="2" />
      <path className="d-cable" d="M529 340 Q520 300 540 290 M545 340 Q560 310 586 300 M487 372 Q470 340 450 330" />
    </>
  );
}

export const DRAWINGS = {
  "desk-posture": {
    title: "A person sitting at a desk, seen from the side",
    width: 600, height: 420, Art: DeskPosture,
    points: { "screen-height": [495, 96], distance: [370, 100], back: [168, 212], elbows: [240, 232], wrists: [384, 214], feet: [346, 398], light: [540, 150] },
  },
  "home-desk": {
    title: "A home workspace: a table under a window with a laptop, a chair, a lamp and a few other things",
    width: 640, height: 420, Art: HomeDesk,
    points: { laptop: [340, 218], window: [380, 70], cable: [330, 372], socket: [536, 368], chair: [164, 270], box: [76, 362], drink: [410, 228], lamp: [589, 134], plant: [470, 192] },
  },
};

// The drawing itself, with anything (markers, labels) laid over it at its points.
// overlay(point, [leftPercent, topPercent]) is called for each point that should show something.
export function Drawing({ name, spots = [], overlay, className = "" }) {
  const d = DRAWINGS[name];
  if (!d) return null;
  const { Art } = d;
  return (
    <div className={`drawing ${className}`}>
      <svg viewBox={`0 0 ${d.width} ${d.height}`} role="img" aria-label={d.title}>
        <Art />
      </svg>
      {overlay && spots.map((spot, i) => {
        const p = d.points[spot];
        return p ? overlay(spot, [(p[0] / d.width) * 100, (p[1] / d.height) * 100], i) : null;
      })}
    </div>
  );
}
