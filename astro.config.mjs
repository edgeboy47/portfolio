import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  site: "https://dmills.dev",
  integrations: [sitemap(), compress()]
});