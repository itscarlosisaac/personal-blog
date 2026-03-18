import { defineConfig } from "vitepress";
import { generatedSidebarNavigation } from "./utils/generate-navigation";

export default defineConfig({
  title: "Personal Electronics Blog",
  description: "Just playing around.",
  themeConfig: {
    logo: "/logo.svg",
    sidebar: generatedSidebarNavigation(),
    socialLinks: [
    ],
  },
});