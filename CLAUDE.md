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
   - The AI Coach is called **May** ("Ask May"), agreed with Ian in October 2026. Parked for now on cost. When picked up: start with a named chat coach (with role-play, e.g. May plays a hiring manager pushing back on fees), pilot on Claude Sonnet 5.5 with a monthly spending cap, and consider voice and an interactive avatar later. No candidate personal data in coach conversations until the data policy is confirmed.
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
| Build a private preview page with a snapshot of the content | `npm run preview:build` (creates `web/dist-preview/hub-preview.html`; needs `SANITY_READ_TOKEN`) |
| Deploy the hosted Studio | `npm run studio:deploy` (needs `SANITY_AUTH_TOKEN` in `.env`) |
| Import the prototype content into Sanity | `npm run import:prototype` (add `-- --dry-run` to check first; needs `SANITY_WRITE_TOKEN`) |

### Deploying (Railway)

Live address: https://server-production-fc323.up.railway.app (Railway service "server"). Railway deploys the `claude/training-hub-platform-a9e704` branch from GitHub automatically on every push. `railway.json` sets the build (`npm run build`), start (`npm start`) and health check (`/api/health`). Railway variables: `NODE_ENV=production`, `BASE_URL` (the Railway address, https), `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_READ_TOKEN`, `SESSION_SECRET`, and the three `ENTRA_*` sign-in values. The Sanity write and deploy tokens are never needed on Railway. IT registers `<BASE_URL>/auth/callback` and `<BASE_URL>/auth/signed-out` as redirect URIs.

### Project layout

- `web/`: the React front end (Vite). In development it runs inside the Express server, so there is only one address to open.
- `server/`: the Express server. Serves the front end and all `/api` routes. The only part that holds secrets.
- `studio/`: Sanity Studio, where content owners edit the training content.
- `reference/`: the prototype and brand guidelines. Reference only; not part of the running app.
