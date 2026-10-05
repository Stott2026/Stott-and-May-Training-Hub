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

- Background `#111314`, surfaces `#181c20` and `#1a1f24`, borders `#2a2f35`, muted text `#7A8798`
- Signature gradient: teal `#00C8C8` to aquamarine `#73F7BB`
- Headings in Manrope, body in Inter (Google Fonts)
- Visual details from the prototype to keep: the thin wave line, gradient top borders on cards, the diamond mark, the eyebrow labels
- Define all colours, fonts and spacing as design tokens in one place and build reusable components. Nothing should hard-code a hex value outside the tokens file.

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
| Deploy the hosted Studio | `npm run studio:deploy` |

### Project layout

- `web/`: the React front end (Vite). In development it runs inside the Express server, so there is only one address to open.
- `server/`: the Express server. Serves the front end and all `/api` routes. The only part that holds secrets.
- `studio/`: Sanity Studio, where content owners edit the training content.
- `reference/`: the prototype and brand guidelines. Reference only; not part of the running app.
