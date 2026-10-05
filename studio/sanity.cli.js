import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./env.js";

export default defineCliConfig({
  api: { projectId, dataset },
  // The hosted Studio's address: https://<studioHost>.sanity.studio
  studioHost: process.env.SANITY_STUDIO_HOSTNAME || "stottandmay-training",
  // Editors always get the latest Studio version without a redeploy.
  deployment: { autoUpdates: true },
});
