import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes/index.js";
import { projectId, dataset } from "./env.js";
import { structure } from "./structure.js";

export default defineConfig({
  name: "default",
  title: "Stott and May Training Hub",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // The home page is a single document: hide it from the "create new" menu.
    templates: (templates) => templates.filter((t) => t.schemaType !== "homePage"),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === "homePage" ? actions.filter((a) => !["duplicate", "delete", "unpublish"].includes(a.action)) : actions,
  },
});
