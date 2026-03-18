<template>
    <div class="layout">
        <Navigation />
        <main class="main">
            <div class="main-inner">
                <Breadcrumbs /> 
                <div class="content">
                    <Content />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Breadcrumbs from './Breadcrumbs.vue'
import Navigation from './Navigation.vue'
</script>

<style scoped>
.layout {
    display: flex;
    min-height: 100vh;
    background: #f9f9f9;
    font-family: 'DM Sans', system-ui, sans-serif;
}

.main {
    flex: 1;
    overflow-y: auto;
    min-width: 0;
}

.main-inner {
    max-width: 1000px;
    padding: 28px 32px;
    display: flex;
    flex-direction: column;
    gap: 28px;
}

/* ── Articles ── */
.articles-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.articles-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.articles-title {
    font-size: 16px;
    font-weight: 700;
    color: #18181b;
    margin: 0;
    letter-spacing: -0.02em;
}

.filter-row {
    display: flex;
    align-items: center;
    gap: 4px;
}

.filter-btn {
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid transparent;
    background: none;
    font-size: 12px;
    font-weight: 500;
    color: #71717a;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;
}

.filter-btn:hover {
    background: #f4f4f5;
    color: #18181b;
}

.filter-btn.active {
    background: #fff;
    border-color: #e4e4e7;
    color: #18181b;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

/* ── Post grid ── */
.articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
}

.post-card {
    background: #fff;
    border: 1px solid #f0f0ef;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.15s;
}

.post-card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

/* Thumbnail */
.post-thumb {
    height: 130px;
    padding: 16px;
    position: relative;
    overflow: hidden;
}

.post-thumb-content {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.thumb-line {
    height: 7px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    width: 100%;
}

.thumb-line.short {
    width: 55%;
}

.thumb-line.med {
    width: 75%;
}

.post-chip-dec {
    position: absolute;
    bottom: 12px;
    right: 14px;
    width: 28px;
    height: 18px;
    border-radius: 4px;
    opacity: 0.85;
}

/* Status */
.post-status-row {
    padding: 8px 14px 0;
    display: flex;
    justify-content: center;
}

.post-status {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    letter-spacing: 0.02em;
}

.s-published {
    background: #f0fdf4;
    color: #16a34a;
}

.s-editing {
    background: #eff6ff;
    color: #2563eb;
}

.s-revision {
    background: #fefce8;
    color: #ca8a04;
}

.s-draft {
    background: #f9f9f9;
    color: #71717a;
}

/* Post body */
.post-body {
    padding: 10px 14px 16px;
}

.post-title {
    font-size: 13px;
    font-weight: 600;
    color: #18181b;
    margin: 0 0 8px;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.post-meta {
    display: flex;
    align-items: center;
    gap: 5px;
}

.post-time {
    font-size: 11px;
    color: #a1a1aa;
}

.post-dot {
    color: #d4d4d8;
    font-size: 11px;
}

.post-author-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: 700;
    color: #fff;
}

.post-author {
    font-size: 11px;
    color: #71717a;
}

/* Responsive */
@media (max-width: 900px) {
    .articles-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .main-inner {
        padding: 20px 20px;
    }
}

@media (max-width: 600px) {
    .articles-grid {
        grid-template-columns: 1fr;
    }
}
</style>