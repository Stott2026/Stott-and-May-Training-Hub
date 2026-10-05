// The Studio reads its project ID and dataset from the shared .env file in the project root.
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
export const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error(
    "SANITY_STUDIO_PROJECT_ID is missing. Copy .env.example to .env in the project root and add your Sanity project ID."
  );
}
