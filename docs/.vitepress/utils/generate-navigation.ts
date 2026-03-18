import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { DefaultTheme } from "vitepress";

function toTitle(str) {
    return str
        .replace(/\.md$/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generatedSidebarNavigation() {
    const sidebar: DefaultTheme.Sidebar = []
    const projects = 'docs/projects'
    const src = join( process.cwd(), projects)
    
    let folders;

    try {
        folders = readdirSync(src)
    
        folders.forEach(folder => {
            const files = readdirSync(join(src, folder))

            let items = files.map(file => {
                let link = file === 'index.md' ?
                    `/projects/${folder}/index.html` :
                    `/projects/${folder}/${file.replace('.md', '.html')}`

                return {
                    text: file === 'index.md' ? "Overview" : toTitle(file),
                    link
                }
            })

            console.log(items)
            sidebar.push({
                text: folder,
                items,
            })
        })
    }
    catch(e) {
        console.log(e)
        return []
    }

    return sidebar;
}
