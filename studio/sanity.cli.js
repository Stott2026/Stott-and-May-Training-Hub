import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./env.js";

export default defineCliConfig({
  api: { projectId, dataset },
});
