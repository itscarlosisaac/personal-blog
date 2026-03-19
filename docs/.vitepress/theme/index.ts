import './style.css'
import './code-blocks.css'
import type { Theme } from "vitepress";

// You can directly import Vue files in the theme entry
// VitePress is pre-configured with @vitejs/plugin-vue.
import Layout from "../components/Layout.vue";
import NotFound from '../components/NotFound.vue'


export default {
    Layout,
    NotFound,
    enhanceApp({ app, router, siteData }) {
        // app.component()
    },
} satisfies Theme;
