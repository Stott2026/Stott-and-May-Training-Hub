// The server's connection to Sanity, and the queries the hub uses.
// Only the server talks to Sanity: the read token never reaches the browser.
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const token = process.env.SANITY_READ_TOKEN;

if (!projectId) throw new Error("SANITY_STUDIO_PROJECT_ID is missing from .env. See .env.example.");
if (!token) throw new Error("SANITY_READ_TOKEN is missing from .env. See .env.example for how to create one.");

export const sanity = createClient({
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  token,
  apiVersion: "2025-02-19",
  // No caching, so a change published in the Studio shows after a refresh.
  useCdn: false,
  // Only published content: editors' unpublished drafts never appear in the hub.
  perspective: "published",
});

const image = (field) => `${field}{ alt, "url": asset->url }`;

// What a tool's card needs (Technology tab, tool pages and search).
const TOOL_SUMMARY = `_id, name, "slug": slug.current, role, summary, core, family, week, icon, ${image("logo")}, accent, order, capabilities`;

// What a module card needs. Section keys let the browser work out progress.
const MODULE_SUMMARY = `
  _id, title, "slug": slug.current, eyebrow, subtitle, icon, accent, order,
  "category": category->{ _id, title, order, description, area },
  "sectionKeys": sections[]._key
`;

// Manager material sits in groups (categories) or Library files marked "Managers" in the Studio.
// It shows on the Managers page only, never in the consultants' training, quiz, search or Library.
const FOR_MANAGERS = `category->area == "managers"`;

// What a Library card needs. The file's address is left out: downloads go through the server.
const LIBRARY_ITEM = `
  _id, title, label, kind, summary, duration, audience,
  "file": file.asset->{ "name": originalFilename, extension, size }
`;

export const queries = {
  site: `{
    "quickLinks": *[_id == "siteSettings"][0].quickLinks[]{ _key, label, url },
    // Badges, levels and points (Badges and levels in the Studio). Missing means no gamification.
    "rewards": *[_id == "rewards"][0]{ title, intro, points, levels[]{ _key, title, points }, badges[]{ _key, rule, title, description, icon } }
  }`,

  home: `*[_id == "homePage"][0]{ heroTitle, heroIntro, ${image("heroImage")}, philosophyTitle, philosophyText,
    // The "Start here" path for new starters (its own document in the Studio).
    "startHere": *[_id == "startHere"][0]{ title, intro, steps[]{
      _key, timing, title, note,
      "modules": modules[]->{ _id, title, "slug": slug.current, icon, accent, "sectionKeys": sections[]._key },
      "forms": forms[]->{ _id, title, "slug": slug.current, icon }
    } }
  }`,

  values: `*[_type == "value"] | order(order asc){ _id, title, description, icon }`,

  modules: `*[_type == "trainingModule" && !(${FOR_MANAGERS})] | order(order asc){ ${MODULE_SUMMARY} }`,

  module: `*[_type == "trainingModule" && slug.current == $slug][0]{
    ${MODULE_SUMMARY}, estimatedMinutes, ${image("heroImage")},
    sections[]{ _key, title, takeaway, content, ${image("image")}, framework, tables, tip, tactics, phrases, mistakes, scenario, lookHere, activities,
      "forms": forms[]->{ _id, title, "slug": slug.current, summary, icon } },
    "quiz": *[_type == "quizQuestion" && references(^._id)]{ _id, question, options, correct, explanation, afterSection },
    // Library files for this module, such as its classroom deck.
    "library": *[_type == "libraryItem" && module._ref == ^._id && defined(file.asset)] | order(order asc){ ${LIBRARY_ITEM} },
    // The next module in the same group (Playbook or Core skills).
    "next": *[_type == "trainingModule" && (category._ref == ^.category._ref || (!defined(category) && !defined(^.category))) && order > ^.order] | order(order asc)[0]{ title, "slug": slug.current }
  }`,

  quiz: `*[_type == "quizQuestion" && !(module->${FOR_MANAGERS})]{ _id, question, options, correct, explanation }`,

  library: `{
    "page": *[_id == "libraryPage"][0]{ title, intro },
    "items": *[_type == "libraryItem" && area != "managers" && defined(file.asset)] | order(order asc){
      ${LIBRARY_ITEM}, "module": module->{ title, "slug": slug.current, accent }
    }
  }`,

  managers: `{
    "page": *[_id == "managersPage"][0]{ title, intro },
    "modules": *[_type == "trainingModule" && ${FOR_MANAGERS}] | order(order asc){ ${MODULE_SUMMARY} },
    "library": *[_type == "libraryItem" && area == "managers" && defined(file.asset)] | order(order asc){
      ${LIBRARY_ITEM}, "module": module->{ title, "slug": slug.current, accent }
    }
  }`,

  forms: `{
    "page": *[_id == "formsPage"][0]{ title, intro },
    "items": *[_type == "formDocument"] | order(order asc){ _id, title, "slug": slug.current, group, summary, icon }
  }`,

  form: `*[_type == "formDocument" && slug.current == $slug][0]{ _id, title, "slug": slug.current, group, summary, intro, icon, blocks,
    // Training modules that point to this form.
    "usedIn": *[_type == "trainingModule" && references(^._id)] | order(order asc){ _id, title, "slug": slug.current } }`,

  // Only the server ever sees this address.
  libraryFile: `*[_type == "libraryItem" && _id == $id][0].file.asset->{ url, originalFilename, mimeType, size }`,

  // Everything the hub's search looks through: training sections, forms and Library files.
  // Manager-only modules and files stay out, as on the consultant pages.
  searchable: `{
    "modules": *[_type == "trainingModule" && !(${FOR_MANAGERS})] | order(order asc){
      title, "slug": slug.current, accent,
      sections[]{ title, content, framework, tables, tip, tactics, phrases, mistakes, scenario, activities }
    },
    "forms": *[_type == "formDocument"] | order(order asc){ _id, title, "slug": slug.current, group, summary, intro, icon, blocks },
    "library": *[_type == "libraryItem" && area != "managers" && defined(file.asset)] | order(order asc){
      ${LIBRARY_ITEM}, "module": module->{ title, "slug": slug.current, accent }
    },
    "tools": *[_type == "techTool"] | order(order asc){ ${TOOL_SUMMARY}, why, learn, bestPractice, setup, dailyCheck }
  }`,

  // The Technology tab: its page and every tool, with what the page's daily check and map need.
  tech: `{
    "page": *[_id == "techPage"][0]{
      title, titleAccent, intro, ruleTitle, ruleText, "ruleTool": ruleTool->{ name, "slug": slug.current },
      bigFiveIntro, mapNote, programmeIntro, rhythm, tracks,
      "workflow": workflow[]{ _key, title, text, stage, "tools": tools[]->{ name, "slug": slug.current, icon, ${image("logo")} } },
      "phases": phases[]{ _key, weeks, title, text, gate, "tools": tools[]->{ name, "slug": slug.current } },
      "relatedModule": relatedModule->{ title, "slug": slug.current }
    },
    "tools": *[_type == "techTool"] | order(order asc){ ${TOOL_SUMMARY}, dailyCheck, "setupCount": count(setup) }
  }`,

  // One tool's page, with the tools either side of it.
  tool: `*[_type == "techTool" && slug.current == $slug][0]{
    ${TOOL_SUMMARY}, why, learn, bestPractice, links, setup, dailyCheck, measures,
    "previous": *[_type == "techTool" && order < ^.order] | order(order desc)[0]{ name, "slug": slug.current },
    "next": *[_type == "techTool" && order > ^.order] | order(order asc)[0]{ name, "slug": slug.current }
  }`,
};
