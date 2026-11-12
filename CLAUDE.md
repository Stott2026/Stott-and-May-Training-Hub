# Stott and May Training Hub

The live version of the Stott and May consultant Training Hub: training modules, video lessons, quizzes, fillable forms and an AI Coach, covering the recruitment lifecycle across perm, contract and SOW.

A working prototype exists in `reference/prototype/`. Treat it as the source of truth for content, look and behaviour. Do not copy its architecture: in the prototype, content is hard-coded in `data.js` and `forms.jsx`. In this build, content lives in Sanity.

## Who you're working with

The project owner is Ian. He is not a developer, but he has shipped React and Express apps on Railway before with AI assistance. Work with him like this:

- Explain what you're about to do in plain English before doing it, and what changed afterwards.
- Work in small steps. Each step should end with something Ian can run and see working.
- Ask before any decision that is hard to undo: database schema changes, deleting files, changing auth, adding paid services.
- Commit to Git after each working step, with a clear message.
- When something needs doing outside the code (a setting in Railway, Azure or Sanity), give exact click-by-click instructions.
- Use British English in all UI text and content.

## Stack

| Part | Choice |
|---|---|
| Front end | React with Vite, in `/web` |
| Back end | Node with Express, in `/server` |
| Content | Sanity, with the Studio in `/studio` (hosted Studio via `sanity deploy`) |
| Database | Postgres on Railway (from Phase 2: progress, quiz scores, form drafts) |
| Video | Mux (Phase 2) |
| Sign-in | Microsoft Entra ID (work accounts), handled server-side with MSAL Node |
| AI Coach | Anthropic API, called from the server only (Phase 3) |
| Hosting | Railway, deployed from GitHub |

The Express server serves the built React app and is the only thing that talks to Sanity, Postgres, Mux and Anthropic. The browser never holds API keys or tokens.

## Brand

Ian chose a **light, welcoming design** (October 2026), moving on from the prototype's dark theme. The hub should feel energetic and easy to navigate. Source: `reference/brand/Stott_and_May_Group_Brand_Guidelines.pdf`.

- Page background `#ECEEF3` (brand light mode), white cards with soft shadows, ink text `#111314`
- Signature gradient: teal `#00C8C8` to aquamarine `#73F7BB`. Sister gradients (teal to sky `#44B3F4`, teal to lime `#7EFF2C`) are used as module accents, as in the prototype
- Brand teal fails contrast as small text on white, so text uses the darker `--sm-teal-ink`; muted text uses `--sm-slate-ink`. Dark text on gradients, never white
- Headings in Manrope, body in Inter (Google Fonts)
- Visual details to keep: the wave line, gradient top borders on cards, eyebrow labels, cut-out people rising out of brand shapes, gradient-ringed avatars, soft gradient icon tiles
- Icons are Lucide line icons (closest match to the brand iconography), registered by name in `web/src/components/icons.jsx`. Editors pick from the list in `studio/schemaTypes/options.js`, so add any new icon to both. No emoji in the UI
- All colours, gradients, fonts, spacing and shadows are tokens in `web/src/styles/tokens.css`. Nothing outside that file may contain a hex or rgba value. Components live in `web/src/components/`
- **Module pages are the heart of the hub** and must be engaging and good to look at, not walls of text: give each type of content (tactics, phrases, mistakes, scenarios) its own visual treatment, show progress through the module, add small interactive moments, and always offer a clear next step
- Photos in `web/public/placeholders/` were extracted from the brand guidelines for design review only. Real images will be uploaded to Sanity

## Rules

- **Secrets**: all keys and tokens go in environment variables. Never commit `.env`. Keep `.env.example` up to date with every variable name and a comment on what it is.
- **No hard-coded content**: modules, sections, quiz questions, values and categories all come from Sanity. Content owners must be able to change anything they can see without touching code.
- **Sign-in on everything**: every page and every API route requires a signed-in Stott and May Microsoft account, except the sign-in route itself.
- **Candidate data**: do not store any candidate personal data in the database until Ian confirms the compliance-approved data policy. Until then, form drafts stay in the browser only, as in the prototype.
- **Accessibility**: real buttons and links, visible focus states, labels on every input, sensible heading order, works on mobile.
- **Keep it simple**: prefer well-known libraries and the official Sanity, Mux and Microsoft guides over clever custom solutions. Ian has to be able to maintain this.

## Build phases

1. Foundation and content migration (current phase, see `PHASE-1-BRIEF.md`)
2. Video (Mux), per-person progress, manager dashboard, learning paths
3. Forms in Sanity, PDF export, server-side AI Coach grounded in hub content
   - The AI Coach is called **May** ("Ask May"), agreed with Ian in October 2026. **Built (November 2026), switched on by setting `ANTHROPIC_API_KEY` on the server**; without it May doesn't appear. Server: `server/may.js` (route `POST /api/may`, signed-in only; Claude Sonnet 5.5 at low effort with server-side refusal fallback; prompt caching; a `search_hub` tool over the hub's own search; a daily message limit per person, `MAY_DAILY_LIMIT`, default 60). Browser: `web/src/components/AskMay.jsx` (panel on every page, modes Ask / Role-play / Quiz me, numbered sources linking into the hub) and `web/src/lib/may.jsx` (pages tell May which section or tool the learner is on with `useMayPlace`). Agreed with Ian: **hub first**, citing hub content, with her general knowledge allowed for wider questions but labelled "General advice" and never presented as Stott and May policy or specifics. Nothing typed to May is stored by the hub. No candidate personal data in coach conversations until the data policy is confirmed (her instructions and the panel both say so). The concept (`AskMayConcept.jsx`) still shows in the preview build, which has no server. Set a monthly spend limit in the Claude Console.
4. Pilot with one desk, then company-wide launch

## Useful commands

Run all of these from the project root. Needs Node 22.12 or newer.

| What | Command |
|---|---|
| First-time setup | `npm install`, then copy `.env.example` to `.env` and fill it in |
| Run the hub and the Studio together | `npm run dev` (hub on http://localhost:3000, Studio on http://localhost:3333) |
| Run just the hub | `npm run dev:app` |
| Run just the Studio | `npm run dev:studio` |
| Build the front end for production | `npm run build` |
| Run the production build locally | `npm run build`, then `NODE_ENV=production npm start` |
| Build a private preview page with a snapshot of the content | `npm run preview:build` (creates `web/dist-preview/hub-preview.html`; needs `SANITY_READ_TOKEN`; add `-- --drafts` to include unpublished drafts for review) |
| Deploy the hosted Studio | `npm run studio:deploy` (needs `SANITY_AUTH_TOKEN` in `.env`) |
| Import Playbook modules as drafts | `npm run import:playbook` (07, 08 and the home page groups; run first), `npm run import:playbook-01-09`, `npm run import:playbook-02-04`, `npm run import:playbook-03`, `npm run import:playbook-05-06`, `npm run import:playbook-10-11`. Add `-- --dry-run` to check first; needs `SANITY_WRITE_TOKEN`. Shared helpers in `studio/migrations/playbook-kit.js` |
| Rebuild the Recruitment Playbook PowerPoint decks from the hub content | `npm run decks:install` once, then `npm run decks -- all` (or deck numbers, e.g. `-- 05 06`). Decks land in `scripts/decks/out/` (not committed); needs `SANITY_READ_TOKEN` and includes drafts. Per-deck session facts, outcomes and note mapping are in `scripts/decks/extras/`, trainer notes in `scripts/decks/notes/`. Presenting laptops need the Manrope and Inter fonts installed |
| Upload the rebuilt decks to the Library as drafts | `npm run decks -- all`, then `npm run import:library` (add `-- --dry-run` to check first, `-- --replace` to overwrite the drafts with new files; needs `SANITY_WRITE_TOKEN`). Library files download through `/api/library/:id/download`, so they need a sign-in like everything else |
| Import the Management Programme modules (M8 to M11) as drafts | `npm run import:management` (creates the "Management Programme" group, marked Managers, so these show on the Managers page only). Their decks are `npm run decks -- M08 M09 M10 M11`, uploaded with `npm run import:library` |
| Add the Marketing Hub quick link and "Look here" cards as drafts | `npm run import:marketing-hub` (add `-- --dry-run` to check first). Quick links (top-bar buttons) live in Site settings in the Studio; a Look here card with no address of its own links to the first quick link |
| Import the fillable forms for the Documents & Forms tab as drafts | `npm run import:forms` (17 forms from `studio/migrations/data/forms.json`; add `-- --dry-run` to check first, `-- --replace` to overwrite the drafts; needs `SANITY_WRITE_TOKEN`). What people type in a form stays in their own browser only |
| Link training sections to the forms ("Use this form" cards) as drafts | `npm run link:forms` (run after `import:forms`; add `-- --dry-run` to check first). The links are set per section in the Studio under "Look here and forms"; each form page lists the modules that use it |
| Add the first "Start here" path for new starters as a draft | `npm run import:start-here` (add `-- --dry-run` to check first; leaves an existing path alone). Edit it in the Studio under "Start here path": steps with a timing, modules and forms to practise with. It shows on the home page under Your progress |
| Add the first badges, levels and points as a draft | `npm run import:rewards` (add `-- --dry-run` to check first; leaves existing ones alone). Edit them in the Studio under "Badges and levels". The achievements each badge can use are listed in `BADGE_RULES` (`studio/schemaTypes/options.js`) and checked in `web/src/lib/achievements.jsx`, so add new ones to both. Like progress, points and badges are kept in the browser until Phase 2 |
| Add the first activities ("Put it in order" and "Flip cards") as drafts | `npm run import:activities` (add `-- --dry-run` to check first). Also adds points per activity and two activity badges to Badges and levels. Activities are added per section in the Studio, on the "Activities" tab; finishing one earns points, kept in the browser like progress |
| Import the Technology tab (11 tools and the Technology page) as drafts | `npm run import:tech` (add `-- --dry-run` to check first). Content is from the Group Technology Training Programme deck. Edit in the Studio under "Technology page" and "Tech tools" (each tool: best practice, set-up checklist, daily check for the Big 5, jobs it does, vendor training links, optional logo). Also adds points and three badges for setting up tools and the Big 5 |
| Add suggested second heading lines (two-tone headlines) to the Training home, Library, Managers and Documents & Forms pages as drafts | `npm run import:headline-accents` (add `-- --dry-run` to check first; leaves a page that already has one alone). Edit them in the Studio, "Heading, second line". Section headers use `PageHero` with `tone` "gradient", "light" or "dark" (dark pages sit in a `theme-dark` wrapper; shared dark styles in `web/src/styles/themes.css`) |
| Import the compliance courses (and the Compliance page) as drafts | `npm run import:compliance` (add `-- --dry-run` to check first; `-- --replace <course-address>` overwrites just that course's draft, so check nobody has edited it in the Studio first). Course content is written as data in `studio/migrations/data/compliance/` (one file per course, helpers in `kit.js`, list in `index.js`). Each course has lessons made of parts (text, key points, the law, do and don't, a number, drawings, and the interactive Spot it, Sort it and What would you do?), an assessment drawn at random from a question bank with a pass mark (80%), a renewal period and a sign-off section for HR and Compliance (reviewers' notes stay in the Studio). Drawings are SVG in `web/src/components/compliance/drawings.jsx`, listed for editors in `DRAWING_OPTIONS`/`DRAWING_SPOTS` (`studio/schemaTypes/options.js`), so add new ones to both; their colours are the `--ill-*` tokens. Progress and results are kept in the browser (`web/src/lib/compliance.jsx`) and marked as a practice record until official records move to the database |
| Change the hub's name | In the Studio: Site settings, "Hub name" (empty means "Training Hub"). It shows in the top bar, browser tabs, certificates and sign-in pages, and May uses it. The full name puts "Stott and May" in front unless the name mentions Stott. In code: `useHubName()` and `usePageTitle()` (`web/src/lib/site.jsx`) and `hubName()`/`fullHubName()` (`server/sanity.js`); never write the name into pages |
| Add the House's settings and first four rooms as drafts | `npm run import:house` (add `-- --dry-run` to check first; leaves anything that already exists alone; run `npm run studio:deploy` first so editors see the new section). The House is a separate app (`stott2026/the-house`) that reads "The House" in the Studio: House settings (its name and the words on the front door and in the hallway) and Rooms (room name, tool name, description, web address, icon, colour, order). A room with no web address shows as coming soon The Training Hub links back to the House with a button in its top bar, set in Site settings ("The House: web address" and "button text"; empty address hides it). It goes to the House's hallway (`?hallway`), skipping the front door |
| Import the prototype content into Sanity | `npm run import:prototype` (add `-- --dry-run` to check first; needs `SANITY_WRITE_TOKEN`) |

### Deploying (Railway)

Live address: https://server-production-fc323.up.railway.app (Railway service "server"). Railway deploys the `claude/training-hub-platform-a9e704` branch from GitHub automatically on every push. `railway.json` sets the build (`npm run build`), start (`npm start`) and health check (`/api/health`). Railway variables: `NODE_ENV=production`, `BASE_URL` (the Railway address, https), `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_READ_TOKEN`, `SESSION_SECRET`, the three `ENTRA_*` sign-in values, and (to switch on Ask May) `ANTHROPIC_API_KEY`, optionally with `MAY_DAILY_LIMIT`. The Sanity write and deploy tokens are never needed on Railway. IT registers `<BASE_URL>/auth/callback` and `<BASE_URL>/auth/signed-out` as redirect URIs.

### Project layout

- `web/`: the React front end (Vite). In development it runs inside the Express server, so there is only one address to open.
- `server/`: the Express server. Serves the front end and all `/api` routes. The only part that holds secrets.
- `studio/`: Sanity Studio, where content owners edit the training content.
- `reference/`: the prototype and brand guidelines. Reference only; not part of the running app.
