# Phase 1 brief: foundation and content migration

**Goal:** the Training Hub running on a private link, behind Microsoft sign-in, with all 14 modules, the quiz and the values content coming from Sanity. Content owners can edit a module in Sanity Studio and see the change live without anyone touching code.

**Expected time:** 2–3 weeks alongside other work.

**How to use this brief:** work through the steps in order. Each step has a prompt to paste into Claude Code, and a "you'll know it works when" check. Don't move on until the check passes. If a step goes wrong, tell Claude Code what you see, including any error messages, and ask it to fix that before continuing.

---

## Before you start

Get these ready first. Some of them depend on other people, so start them early.

1. **Install the basics.** Node.js (the LTS version), Git, and the Claude Code desktop app.
2. **Create a GitHub repository**, private, called something like `sm-training-hub`. Clone it to your computer.
3. **Copy this starter pack into the repo**: `CLAUDE.md`, `PHASE-1-BRIEF.md` and the `reference/` folder.
4. **Railway**: create a new empty project for the hub.
5. **Sanity**: create an account and a new project. Decide on the plan: the Free plan only allows public datasets, so training content would be readable by anyone with the project ID. The Growth plan ($15 per editor per month) allows a private dataset. Private is the right choice for internal material.
6. **Microsoft sign-in (needs IT).** Ask IT to create an **app registration** in Microsoft Entra ID for the Training Hub, restricted to your organisation's accounts only (single tenant). You need from them:
   - the **Application (client) ID**
   - the **Directory (tenant) ID**
   - a **client secret**
   - redirect URIs added for `http://localhost:3000/auth/callback` (for local testing) and your Railway URL plus `/auth/callback` (once you have it, in step 7)

   This is the step most likely to take time, so request it on day one.

---

## Step 1: set up the project structure

**Paste into Claude Code:**

> Read CLAUDE.md and everything in reference/prototype/ first. Then set up the project structure: a React + Vite front end in /web, an Express server in /server that serves the built front end, and a Sanity Studio in /studio. Add a root package.json with scripts to run everything locally, a .gitignore that excludes .env and node_modules, and a .env.example. Explain the structure to me when you're done, then commit.

**You'll know it works when** you can run one command and see a blank page served by the Express server in your browser, and Sanity Studio opens locally.

---

## Step 2: build the brand foundation

**Paste into Claude Code:**

> Using the prototype in reference/prototype/ as the visual reference, create the design system for /web: a tokens file with all brand colours, fonts and spacing from CLAUDE.md, plus reusable components for the page shell and top navigation, cards, eyebrow labels, the wave line, buttons, progress bars and the expandable section block. Build a placeholder home page using them that looks like the prototype's Training Hub header and values section. Don't hard-code any content beyond placeholder text yet. Commit when done.

**You'll know it works when** the local page looks like the prototype, and changing a colour in the tokens file changes it everywhere.

---

## Step 3: design the content model in Sanity

**Paste into Claude Code:**

> Create Sanity schemas in /studio that match the content in reference/prototype/data.js: a Module (id/slug, icon, eyebrow, title, subtitle, gradient, display order, and an ordered list of Sections), a Section (title, content, tactics list, phrases list, mistakes list, and an optional Scenario with title, weak approach and strong approach), a Quiz Question (question, four options, correct option, explanation, and an optional link to a module), a Value (icon, title, description), and a Category for grouping modules. Make the Studio easy for non-technical editors: clear field labels, help text on each field, sensible ordering, and a preview that shows the title. Leave room in the Section for a video field we'll add in Phase 2. Show me the Studio before committing.

**You'll know it works when** you can open the Studio, create a test module with a section, and the fields make sense to someone who isn't technical. Delete the test module afterwards.

---

## Step 4: migrate the existing content

**Paste into Claude Code:**

> Write a one-off migration script that reads MODS, QUIZ_QS and VALUES from reference/prototype/data.js and imports them into Sanity using the schemas from step 3, keeping the module order and the module ids as slugs. Make it safe to run more than once without creating duplicates. Run it against the Sanity dataset, then show me a count of what was imported.

**You'll know it works when** the Studio shows **14 modules** (Candidate Management through to the Phrases and Questions Toolkit, with Job Management third), **14 quiz questions** and **4 values**, and spot-checking a few sections shows the phrases, mistakes and scenarios came through correctly.

---

## Step 5: show the content in the app

**Paste into Claude Code:**

> Connect the app to Sanity through the Express server only: the server holds the Sanity read token and exposes API routes for modules, a single module, the quiz and values. Then build the real pages in /web using the components from step 2: the hub home page (header, search, The Stott and May Way and values, overall progress bar, module grid), the module page with expandable sections, and search across all module content. Match the prototype's behaviour. Progress can stay in the browser for now, as in the prototype; Phase 2 moves it to the database. Commit when done.

**You'll know it works when** the app looks and behaves like the prototype's Training Hub tab, and editing a phrase in the Studio and publishing it changes it in the app after a refresh.

---

## Step 6: add Microsoft sign-in

**Paste into Claude Code:**

> Add Microsoft Entra ID sign-in to the Express server using MSAL Node, single tenant, with the client ID, tenant ID and secret from environment variables. Use a secure session cookie. Protect every page and API route so only signed-in users from our organisation can reach them, and show the signed-in person's name in the top navigation with a sign-out option. Explain how it works in plain English, and tell me exactly what redirect URIs IT needs to have registered.

**You'll know it works when** opening the app sends you to the Microsoft sign-in page, signing in with your Stott and May account takes you to the hub, and opening it in a private browser window without signing in shows nothing.

---

## Step 7: deploy to Railway

**Paste into Claude Code:**

> Get this ready to deploy on Railway from GitHub: a production build of the front end served by Express, the start command, and a health-check route. Give me click-by-click instructions for connecting the GitHub repo in Railway, which environment variables to set, and how to deploy the Sanity Studio to its hosted URL with `sanity deploy`. Then tell me the exact redirect URI to send to IT for the live site.

**You'll know it works when** the hub loads on its Railway URL, sign-in works there too (after IT adds the live redirect URI), and the hosted Studio URL opens for editors.

---

## Step 8: the content owner test

No prompt needed. Invite one of your content owners to the Sanity project as an editor. Ask them to change a phrase, add a tactic to a section and publish, without any help from you.

**You'll know it works when** they manage it on their own and see their change in the live hub. That's the whole point of Phase 1.

---

## Phase 1 checklist

- [ ] Hub runs locally and on Railway
- [ ] All 14 modules, 14 quiz questions and 4 values are in Sanity and display correctly
- [ ] Look and feel matches the prototype, built from shared tokens and components
- [ ] Every page and API route requires a Stott and May Microsoft sign-in
- [ ] No keys or secrets in the code or in GitHub; `.env.example` is complete
- [ ] A content owner has edited and published content without help
- [ ] The "Useful commands" section in CLAUDE.md is filled in

## Developer checkpoint

At the end of Phase 1, book a developer for half a day to review:

- the sign-in setup and session handling
- that every route is genuinely protected
- how secrets are handled
- the Sanity content model, before more content is built on it

It's much cheaper to fix any of these now than after Phase 2 adds a database and personal data.

## What's in reference/prototype/

| File | What it is |
|---|---|
| `data.js` | All module content, quiz questions and values. Source for the step 4 migration. |
| `forms.jsx` | All 17 forms and their field components. Used in Phase 3. |
| `app.jsx` | The prototype app: layout, navigation, AI Coach, quiz and Documents tab behaviour. Visual and behavioural reference. |
| `shell.html` | The page wrapper with global styles and print styles. |
