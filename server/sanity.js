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
  site: `*[_id == "siteSettings"][0]{ "quickLinks": quickLinks[]{ _key, label, url } }`,

  home: `*[_id == "homePage"][0]{ heroTitle, heroIntro, ${image("heroImage")}, philosophyTitle, philosophyText }`,

  values: `*[_type == "value"] | order(order asc){ _id, title, description, icon }`,

  modules: `*[_type == "trainingModule" && !(${FOR_MANAGERS})] | order(order asc){ ${MODULE_SUMMARY} }`,

  module: `*[_type == "trainingModule" && slug.current == $slug][0]{
    ${MODULE_SUMMARY}, estimatedMinutes, ${image("heroImage")},
    sections[]{ _key, title, takeaway, content, ${image("image")}, framework, tables, tip, tactics, phrases, mistakes, scenario, lookHere },
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

  form: `*[_type == "formDocument" && slug.current == $slug][0]{ _id, title, "slug": slug.current, group, summary, intro, icon, blocks }`,

  // Only the server ever sees this address.
  libraryFile: `*[_type == "libraryItem" && _id == $id][0].file.asset->{ url, originalFilename, mimeType, size }`,

  // Everything search looks through.
  searchable: `*[_type == "trainingModule" && !(${FOR_MANAGERS})] | order(order asc){
    title, "slug": slug.current, accent,
    sections[]{ title, content, framework, tables, tip, tactics, phrases, mistakes, scenario }
  }`,
};
