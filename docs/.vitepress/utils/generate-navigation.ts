import { readdirSync, statSync } from "fs";
import { join } from "path";
import { DefaultTheme } from "vitepress";

function toTitle(str) {
    return str
        .replace(/\.md$/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toSlug(str: string): string {
    return str.toLowerCase().replace(/\s+/g, "-");
}

export function generatedSidebarNavigation() {
    const sidebar: DefaultTheme.Sidebar = [];
    const projects = "docs/projects";
    const src = join(process.cwd(), projects);

    try {
        if (!statSync(src).isDirectory()) return [];

        const folders = readdirSync(src).filter((f) => {
            const full = join(src, f);
            return statSync(full).isDirectory(); // only directories, skip index.md
        });

        folders.forEach((folder) => {
            const folderPath = join(src, folder); // ← Bug 1 fix
            const slug = toSlug(folder); // ← Bug 3 fix

            const files = readdirSync(folderPath)
                .filter((f) => f.endsWith(".md"));

            const items = files.map((file) => {
                const isIndex = file === "index.md";
                const link = isIndex
                    ? `/projects/${slug}/` // ← Bug 2 fix
                    : `/projects/${slug}/${file.replace(".md", "")}`;

                return {
                    text: isIndex ? "Overview" : toTitle(file),
                    link,
                };
            });

            // Put index/Overview first
            items.sort((a, b) => {
                if (a.text === "Overview") return -1;
                if (b.text === "Overview") return 1;
                return a.text.localeCompare(b.text);
            });

            sidebar.push({
                text: toTitle(folder),
                items,
            });
        });
    } catch (e) {
        console.log("[sidebar] Error:", e)
        return [];
    }

    return sidebar;
}
