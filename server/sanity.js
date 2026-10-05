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
  "category": category->title,
  "sectionKeys": sections[]._key
`;

export const queries = {
  home: `*[_id == "homePage"][0]{ heroTitle, heroIntro, ${image("heroImage")}, philosophyTitle, philosophyText }`,

  values: `*[_type == "value"] | order(order asc){ _id, title, description, icon }`,

  modules: `*[_type == "trainingModule"] | order(order asc){ ${MODULE_SUMMARY} }`,

  module: `*[_type == "trainingModule" && slug.current == $slug][0]{
    ${MODULE_SUMMARY}, estimatedMinutes, ${image("heroImage")},
    sections[]{ _key, title, takeaway, content, ${image("image")}, tactics, phrases, mistakes, scenario },
    "quiz": *[_type == "quizQuestion" && references(^._id)]{ _id, question, options, correct, explanation, afterSection },
    "next": *[_type == "trainingModule" && order > ^.order] | order(order asc)[0]{ title, "slug": slug.current }
  }`,

  quiz: `*[_type == "quizQuestion"]{ _id, question, options, correct, explanation }`,

  // Everything search looks through.
  searchable: `*[_type == "trainingModule"] | order(order asc){
    title, "slug": slug.current, accent,
    sections[]{ title, content, tactics, phrases, mistakes, scenario }
  }`,
};
