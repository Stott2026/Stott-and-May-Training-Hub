import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes/index.js";
import { projectId, dataset } from "./env.js";
import { structure } from "./structure.js";

const SINGLETONS = ["homePage", "libraryPage", "managersPage"];

export default defineConfig({
  name: "default",
  title: "Stott and May Training Hub",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // The home page and the Library page are single documents: hide them from the "create new" menu.
    templates: (templates) => templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? actions.filter((a) => !["duplicate", "delete", "unpublish"].includes(a.action)) : actions,
  },
});
