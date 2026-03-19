import { defineConfig } from "vitepress";
import { generatedSidebarNavigation } from "./utils/generate-navigation";

export default defineConfig({
  base: '/personal-blog/',
  title: "Personal Electronics Blog",
  description: "Just playing around.",
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Urbanist:wght@300;600;800&family=Fragment+Mono&display=swap'
    }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    sidebar: generatedSidebarNavigation(),
    socialLinks: [
    ],
  },
});