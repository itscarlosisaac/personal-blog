<template>
  <div class="layout">
    <Navigation />

    <main class="main">
      <div class="main-inner">

        <Hero />

        <Breadcrumbs /> 

        <!-- Content slot (VitePress page content renders here) -->
        <div class="content">
          <PostList />
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import Hero from './Hero.vue'
import Navigation from './Navigation.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import PostList from './Cards/PostList.vue'

</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #f9f9f9;
  font-family: 'DM Sans', system-ui, sans-serif;
}

/* ── Main ── */
.main {
  flex: 1;
  overflow-y: auto;
  min-width: 0;
}

.main-inner {
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* ── Top bar ── */
.topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0ef;
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #18181b;
  letter-spacing: -0.03em;
  margin: 0 0 4px;
}

.page-sub {
  font-size: 13px;
  color: #a1a1aa;
  margin: 0;
}

/* ── Content ── */
.content {
  /* VitePress markdown content styles */
  color: #3f3f46;
  line-height: 1.75;
  font-size: 15px;
}

/* Markdown elements */
.content :deep(h1) {
  font-size: 22px;
  font-weight: 700;
  color: #18181b;
  letter-spacing: -0.03em;
  margin: 0 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0ef;
}

.content :deep(h2) {
  font-size: 17px;
  font-weight: 600;
  color: #18181b;
  letter-spacing: -0.02em;
  margin: 32px 0 12px;
}

.content :deep(h3) {
  font-size: 15px;
  font-weight: 600;
  color: #18181b;
  margin: 24px 0 8px;
}

.content :deep(p) {
  margin: 0 0 14px;
}

.content :deep(a) {
  color: #6366f1;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.content :deep(code) {
  font-family: 'DM Mono', 'JetBrains Mono', monospace;
  font-size: 13px;
  background: #f4f4f5;
  border: 1px solid #e4e4e7;
  padding: 1px 6px;
  border-radius: 5px;
  color: #18181b;
}

.content :deep(pre) {
  background: #18181b;
  border-radius: 10px;
  padding: 18px 20px;
  overflow-x: auto;
  margin: 16px 0;
}

.content :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  color: #d4d4d8;
  font-size: 13px;
  line-height: 1.65;
}

.content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
}

.content :deep(th) {
  text-align: left;
  padding: 10px 14px;
  background: #f9f9fb;
  border-bottom: 1px solid #e4e4e7;
  font-size: 12px;
  font-weight: 600;
  color: #71717a;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.content :deep(td) {
  padding: 10px 14px;
  border-bottom: 1px solid #f4f4f5;
}

.content :deep(tr:last-child td) {
  border-bottom: none;
}

.content :deep(blockquote) {
  border-left: 3px solid #6366f1;
  background: #f5f5ff;
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  margin: 16px 0;
  color: #52525b;
  font-style: italic;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .main-inner {
    padding: 20px 20px;
  }
}

@media (max-width: 540px) {
  .main-inner {
    padding: 16px;
  }

  .page-title {
    font-size: 18px;
  }
}
</style>