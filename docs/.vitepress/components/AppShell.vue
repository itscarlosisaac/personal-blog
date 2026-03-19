<template>
  <div class="layout">
    <Navigation />
    <main class="main">
      <div class="main-inner">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import Navigation from './Navigation.vue'
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f9f9f9;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.main {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  min-width: 0;
}

.main-inner {
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.main-inner :deep(.content) {
  color: #3f3f46;
  line-height: 1.75;
  font-size: 15px;
}

.main-inner :deep(.content h1) {
  font-size: 22px; font-weight: 700; color: #18181b;
  letter-spacing: -0.03em; margin: 0 0 16px;
  padding-bottom: 10px; border-bottom: 1px solid #f0f0ef;
}

.main-inner :deep(.content h2) {
  font-size: 17px; font-weight: 600; color: #18181b;
  letter-spacing: -0.02em; margin: 12px 0 12px;
}

.main-inner :deep(.content h3) {
  font-size: 15px; font-weight: 600; color: #18181b; margin: 24px 0 8px;
}

.main-inner :deep(.content p)  { margin: 0 0 14px; }

.main-inner :deep(.content code) {
  font-family: 'DM Mono', monospace; font-size: 13px;
  background: #f4f4f5; border: 1px solid #e4e4e7;
  padding: 1px 6px; border-radius: 5px; color: #18181b;
}

.main-inner :deep(.content pre) {
  background: #18181b; border-radius: 10px;
  padding: 18px 20px; overflow-x: auto; margin: 16px 0;
}

.main-inner :deep(.content pre code) {
  background: none; border: none; padding: 0;
  color: #d4d4d8; font-size: 13px; line-height: 1.65;
}

.main-inner :deep(.content blockquote) {
  border-left: 3px solid #6366f1; background: #f5f5ff;
  padding: 12px 16px; border-radius: 0 8px 8px 0;
  margin: 16px 0; color: #52525b; font-style: italic;
}

.main-inner :deep(.content table)  { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
.main-inner :deep(.content th)     { text-align: left; padding: 10px 14px; background: #f9f9fb; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 600; color: #71717a; letter-spacing: 0.04em; text-transform: uppercase; }
.main-inner :deep(.content td)     { padding: 10px 14px; border-bottom: 1px solid #f4f4f5; }
.main-inner :deep(.content tr:last-child td) { border-bottom: none; }

@media (max-width: 768px) { .main-inner { padding: 20px; } }
@media (max-width: 540px) { .main-inner { padding: 16px; } }
</style>