import { defineConfig } from "vitepress";
import { generatedSidebarNavigation } from "./utils/generate-navigation";

export default defineConfig({
  base: "/personal-blog/",
  title: "Personal Electronics Blog",
  description: "Just playing around.",
  ignoreDeadLinks: true,
  markdown: {
    theme: {
      dark: "tokyo-night",
      light: "tokyo-night",
    },
    config: (md) => {
    },
  },
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    }],
    ["link", {
      rel: "stylesheet",
      href: "https://cdn.lineicons.com/5.1/line/lineicons.css",
    }],
    ["link", {
      rel: "stylesheet",
      href:
        "https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap&family=Instrument+Serif:ital@1&family=DM Sans:wght@300;600;800&family=Fragment+Mono&display=swap",
    }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    sidebar: generatedSidebarNavigation(),
    socialLinks: [],
  },
});
