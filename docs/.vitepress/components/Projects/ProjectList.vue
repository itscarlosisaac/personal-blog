<template>
    <div class="project-list">

        <div class="cards-grid">
            <a v-for="project in projects" :key="project.slug" :href="withBase(`/projects/${project.slug}/`)"
                class="project-card">
                <!-- Top row -->
                <div class="card-top">
                    <i :class="project.icon" class="card-icon-class"></i>
                    <span class="card-status" :class="project.status || 'active'">
                        <span class="status-dot"></span>
                        {{ statusLabel(project.status) }}
                    </span>
                </div>

                <!-- Title + description -->
                <div class="card-body">
                    <h2 class="card-title">{{ project.title }}</h2>
                    <p class="card-desc" v-if="project.description">{{ project.description }}</p>
                    <p class="card-desc muted" v-else>No description yet.</p>
                </div>

                <!-- Tags -->
                <div class="card-tags" v-if="project.tags?.length">
                    <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
                </div>

                <div class="card-divider"></div>

                <!-- Footer -->
                <div class="card-footer">
                    <div class="footer-left">
                        <span class="footer-stat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            {{ project.pageCount }} page{{ project.pageCount !== 1 ? 's' : '' }}
                        </span>
                        <span class="footer-stat" v-if="project.date">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {{ formatDate(project.date) }}
                        </span>
                    </div>
                    <span class="footer-arrow">→</span>
                </div>

            </a>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

// ── Read all project index.md files ───────────────────────────────
// Glob imports every index.md under docs/projects/*/
// frontmatter is available via .frontmatter on each module
const projectIndexFiles = import.meta.glob(
    '../../../projects/*/index.md',
    { eager: true }
)

// Also glob all pages to count them per project
const allProjectPages = import.meta.glob(
    '../../../projects/**/*.md',
    { eager: true }
)

// ── Build project list ────────────────────────────────────────────
const projects = computed(() => {
    return Object.entries(projectIndexFiles)
        .map(([filePath, module]) => {
            // Extract slug from path: ../../projects/esp32-submarine/index.md → esp32-submarine
            const slug = filePath.split('/').slice(-2)[0]

            // Count all .md pages in this project folder (excluding index.md)
            const pageCount = Object.keys(allProjectPages)
                .filter(p => p.includes(`/projects/${slug}/`) && !p.endsWith('index.md'))
                .length

            const fm = module.__pageData.frontmatter || {}

            return {
                slug,
                title: fm.title ?? slug,
                description: fm.description ?? null,
                icon: fm.icon ?? null,
                category: fm.category ?? null,
                hardware: fm.hardware ?? null,
                status: fm.status ?? 'active',
                tags: fm.tags ?? [],
                date: fm.date ?? null,
                pageCount,
            }
        })
        .sort((a, b) => {
            // Sort: active first, then wip, then others
            const order = { active: 0, wip: 1, planning: 2, paused: 3, done: 4 }
            return (order[a.status] ?? 9) - (order[b.status] ?? 9)
        })
})


function statusLabel(status) {
    const map = {
        active: 'Active',
        wip: 'In Progress',
        done: 'Completed',
        paused: 'Paused',
        planning: 'Planning',
    }
    return map[status] || 'Active'
}

function formatDate(date) {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    })
}
</script>

<style scoped>
.card-icon-class {
    font-size: 24px;
    color: color(srgb 0.9355 0.6214 0.1516)
}

.project-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-family: "DM Sans", system-ui, sans-serif;
}

/* ── Header ── */
.list-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}

.list-title {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-weight: 900;
    font-size: 32px;
    letter-spacing: -0.02em;
    color: #18181b;
    margin: 0 0 4px;
    line-height: 1.1;
}

.list-sub {
    font-size: 13px;
    font-weight: 300;
    color: #a1a1aa;
    margin: 0;
}

/* ── Grid ── */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
}

/* ── Card ── */
.project-card {
    background: #fff;
    border: 1px solid #f0f0ef;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-decoration: none;
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
    border-color: #e4e4e7;
}

.card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card-icon {
    font-size: 20px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;
    border-radius: 9px;
    border: 1px solid #f0f0ef;
}

.card-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 999px;
}

.card-status.active {
    background: #f0fdf4;
    color: #16a34a;
}

.card-status.wip {
    background: #fffbeb;
    color: #d97706;
}

.card-status.done {
    background: #f0f0ff;
    color: #6366f1;
}

.card-status.paused {
    background: #f4f4f5;
    color: #71717a;
}

.card-status.planning {
    background: #eff6ff;
    color: #2563eb;
}

.status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.card-title {
    font-family: "DM Sans", system-ui, sans-serif;
    font-weight: 700;
    font-size: 17px;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: #18181b;
    margin: 0;
}

.card-desc {
    font-size: 13px;
    font-weight: 300;
    line-height: 1.55;
    color: #52525b;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-desc.muted {
    color: #a1a1aa;
}

.card-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
}

.meta-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12.5px;
    font-weight: 500;
    color: #71717a;
}

.meta-item svg {
    width: 13px;
    height: 13px;
    opacity: 0.7;
}

.meta-dot {
    color: #d4d4d8;
    font-size: 12px;
}

.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.tag {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.03em;
    padding: 3px 8px;
    border-radius: 999px;
    background: #f4f4f5;
    color: #52525b;
    border: 1px solid #e4e4e7;
}

.card-divider {
    height: 1px;
    background: #f4f4f5;
    margin: 0 -20px;
    width: calc(100% + 40px);
}

.card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 2px;
}

.footer-left {
    display: flex;
    align-items: center;
    gap: 14px;
}

.footer-stat {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    color: #393942;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
}

.footer-stat svg {
    width: 13px;
    height: 13px;
    opacity: 0.6;
    position: relative;
    top: -2px;
}

.footer-arrow {
    font-size: 14px;
    color: #d4d4d8;
    transition: color 0.15s, transform 0.15s;
}

.project-card:hover .footer-arrow {
    color: #1D9E75;
    transform: translateX(3px);
}

@media (max-width: 640px) {
    .cards-grid {
        grid-template-columns: 1fr;
    }

    .list-title {
        font-size: 26px;
    }
}
</style>