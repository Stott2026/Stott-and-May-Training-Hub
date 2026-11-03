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

// An open-plan office corner: a fire exit, a desk with a screen, a printer and filing.
// Used for workplace hazards and for clean-desk checks.
function Office() {
  return (
    <>
      <rect className="d-wall" x="0" y="0" width="720" height="340" />
      <rect className="d-floor" x="0" y="340" width="720" height="100" />
      <path className="d-floor-line" d="M0 372 H720 M0 404 H720" />
      {/* Fire exit door, sign above, boxes stacked in front of it */}
      <rect className="d-ui-line-fill" x="28" y="106" width="104" height="236" rx="3" />
      <rect className="d-frame" x="34" y="112" width="92" height="230" />
      <rect className="d-metal" x="104" y="220" width="14" height="6" rx="2" />
      <rect className="d-green" x="42" y="78" width="76" height="22" rx="3" />
      <path className="d-sign-mark" d="M54 89 H72 M66 84 L72 89 L66 94 M86 84 a4 4 0 1 0 0.1 0 M86 90 L82 97 M86 90 L92 96" />
      <rect className="d-box" x="40" y="292" width="62" height="50" rx="3" />
      <rect className="d-box" x="56" y="250" width="56" height="42" rx="3" />
      <path className="d-box-line" d="M40 308 H102 M56 264 H112" />
      {/* First aid sign and fire extinguisher */}
      <rect className="d-green" x="150" y="150" width="34" height="34" rx="4" />
      <path className="d-sign-cross" d="M167 157 V177 M157 167 H177" />
      <rect className="d-metal" x="160" y="236" width="14" height="6" rx="2" />
      <rect className="d-red" x="156" y="242" width="22" height="70" rx="8" />
      <path className="d-dark-line" d="M178 252 Q192 262 186 290" />
      {/* Filing cabinet, bottom drawer left open, boxes piled high on top */}
      <rect className="d-metal" x="204" y="214" width="76" height="128" rx="3" />
      <path className="d-ui-line" d="M204 256 H280 M204 298 H280" />
      <rect className="d-dark" x="232" y="232" width="20" height="5" rx="2" />
      <rect className="d-dark" x="232" y="274" width="20" height="5" rx="2" />
      <rect className="d-metal-dark" x="212" y="304" width="96" height="34" rx="2" />
      <rect className="d-paper" x="222" y="296" width="70" height="12" />
      <rect className="d-box" x="210" y="176" width="64" height="38" rx="3" />
      <rect className="d-box" x="218" y="140" width="54" height="36" rx="3" transform="rotate(6 245 158)" />
      <rect className="d-box" x="206" y="104" width="50" height="36" rx="3" transform="rotate(-8 231 122)" />
      {/* Desk, screen with a spreadsheet of names showing, sticky note, keyboard, phone */}
      <rect className="d-wood" x="320" y="252" width="250" height="12" rx="3" />
      <rect className="d-wood-dark" x="334" y="264" width="10" height="78" />
      <rect className="d-wood-dark" x="546" y="264" width="10" height="78" />
      <rect className="d-dark" x="372" y="150" width="128" height="88" rx="6" />
      <rect className="d-paper" x="379" y="157" width="114" height="74" rx="2" />
      <path className="d-ui-line" d="M379 170 H493 M379 183 H493 M379 196 H493 M379 209 H493 M379 222 H493 M415 157 V231 M455 157 V231" />
      <rect className="d-link-fill" x="379" y="157" width="114" height="13" />
      <rect className="d-metal" x="428" y="238" width="16" height="10" />
      <rect className="d-metal" x="410" y="246" width="52" height="6" rx="2" />
      <rect className="d-note" x="484" y="140" width="26" height="24" transform="rotate(8 497 152)" />
      <path className="d-dark-line" d="M488 148 H504 M488 155 H500" transform="rotate(8 497 152)" />
      <rect className="d-dark" x="340" y="244" width="58" height="8" rx="2" />
      <rect className="d-dark" x="512" y="236" width="34" height="16" rx="4" />
      {/* Printer on a side table, pages left in the tray */}
      <rect className="d-wood" x="590" y="282" width="112" height="10" rx="3" />
      <rect className="d-wood-dark" x="600" y="292" width="8" height="50" />
      <rect className="d-wood-dark" x="684" y="292" width="8" height="50" />
      <rect className="d-metal" x="604" y="236" width="86" height="46" rx="6" />
      <rect className="d-dark" x="616" y="246" width="62" height="6" rx="2" />
      <rect className="d-paper" x="620" y="226" width="54" height="22" transform="rotate(-6 647 237)" />
      <path className="d-ui-line" d="M626 232 H664 M626 238 H660" transform="rotate(-6 647 237)" />
      {/* Confidential waste bin with a lock */}
      <rect className="d-dark" x="616" y="300" width="58" height="42" rx="4" />
      <rect className="d-metal" x="614" y="296" width="62" height="8" rx="3" />
      <rect className="d-note" x="638" y="312" width="14" height="12" rx="2" />
      {/* Coffee spilt on the floor, and a cable trailing across it to the wall socket */}
      <ellipse className="d-coffee" cx="372" cy="396" rx="44" ry="9" />
      <path className="d-mug" d="M396 384 L414 380 L418 396 L400 400 Z" />
      <path className="d-cable" d="M560 256 Q566 300 540 350 Q520 390 580 398 Q650 404 704 330" />
      <rect className="d-frame d-outline" x="696" y="316" width="18" height="20" rx="2" />
    </>
  );
}

// A phishing email, with the warning signs to find.
function PhishingEmail() {
  return (
    <>
      <rect className="d-ui" x="0" y="0" width="640" height="440" />
      <rect className="d-paper" x="20" y="20" width="600" height="400" rx="10" />
      <rect className="d-ui" x="20" y="20" width="600" height="34" rx="10" />
      <rect className="d-ui" x="20" y="40" width="600" height="14" />
      <circle className="d-red" cx="42" cy="37" r="6" />
      <circle className="d-note" cx="62" cy="37" r="6" />
      <circle className="d-green" cx="82" cy="37" r="6" />
      <text className="d-email-subject" x="44" y="92">URGENT: Your account locks in 2 hours</text>
      <circle className="d-red" cx="58" cy="124" r="14" />
      <text className="d-email-avatar" x="58" y="129">IT</text>
      <text className="d-email-strong" x="82" y="120">IT Service Desk</text>
      <text className="d-email-soft" x="82" y="137">it-support@stottandmay-helpdesk.co</text>
      <text className="d-email-soft" x="600" y="120" textAnchor="end">Today, 07:52</text>
      <path className="d-ui-line" d="M44 156 H596" />
      <text className="d-email" x="44" y="186">Dear user,</text>
      <text className="d-email" x="44" y="214">We detected unusual sign-in activity on your account. To avoid</text>
      <text className="d-email" x="44" y="234">losing access, confirm your password and Bullhorn login now.</text>
      <rect className="d-link-fill" x="44" y="254" width="200" height="38" rx="6" />
      <text className="d-email-button" x="144" y="278">Verify my account</text>
      <text className="d-email-link" x="256" y="278">http://stottandmay.secure-login.ru/verify</text>
      <rect className="d-ui" x="44" y="310" width="210" height="40" rx="6" />
      <path className="d-dark-line" d="M58 320 h12 l6 6 v14 h-18 z" />
      <text className="d-email-strong" x="86" y="327">Payroll_Update.zip</text>
      <text className="d-email-soft" x="86" y="343">1.2 MB</text>
      <text className="d-email" x="44" y="380">Failure to act will result in permanent account closure.</text>
      <text className="d-email-soft" x="44" y="404">IT Security Team</text>
    </>
  );
}

export const DRAWINGS = {
  "desk-posture": {
    title: "A person sitting at a desk, seen from the side",
    width: 600, height: 420, Art: DeskPosture,
    points: { "screen-height": [495, 96], distance: [370, 100], back: [168, 212], elbows: [240, 232], wrists: [384, 214], feet: [346, 398], light: [540, 150] },
  },
  office: {
    title: "An office corner: a fire exit door, signs, a filing cabinet, a desk with a computer, a printer and a confidential waste bin",
    width: 720, height: 440, Art: Office,
    points: { "fire-exit": [80, 200], "first-aid": [167, 167], extinguisher: [167, 276], drawer: [292, 322], "high-stack": [238, 122], screen: [396, 206], "sticky-note": [516, 140], phone: [529, 220], printer: [647, 212], "shred-bin": [645, 356], spill: [360, 396], cable: [612, 400] },
  },
  "phishing-email": {
    title: "An email from \"IT Service Desk\" asking you to verify your account, with a link and an attachment",
    width: 640, height: 440, Art: PhishingEmail,
    points: { subject: [520, 86], sender: [350, 133], time: [508, 116], greeting: [138, 181], request: [520, 232], link: [566, 273], attachment: [282, 330], threat: [478, 375] },
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
