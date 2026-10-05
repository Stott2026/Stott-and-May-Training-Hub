import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The front end is always served through the Express server (see server/index.js),
// so there is no separate Vite dev server port to remember: everything is on localhost:3000.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
