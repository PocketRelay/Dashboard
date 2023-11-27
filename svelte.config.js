import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
    prerender: {
      entries: [],
    },
    paths: {
      // Uncomment the next line to use a custom base path:
      // base: "/test",
    },
  },
};

export default config;
