<template>
  <a :href="withBase(post.url)" class="post-card">

    <!-- Image placeholder -->
    <div class="card-image"></div>

    <div class="card-body">

      <!-- Meta -->
      <div class="card-meta">
        <span class="card-author">Esther Howard</span>
        <span class="dot">•</span>
        <span class="card-date">{{ formattedDate }}</span>

        <span class="card-badge">
          {{ post.frontmatter.category || 'General' }}
        </span>
      </div>

      <!-- Title -->
      <h2 class="card-title">
        {{ post.frontmatter.title }}
      </h2>

      <!-- Excerpt -->
      <p class="card-excerpt" v-if="post.excerpt">
        {{ cleanExcerpt }}
      </p>

    </div>

  </a>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { computed } from 'vue'

const props = defineProps<{
  post: {
    url: string
    excerpt?: string
    frontmatter: {
      title: string
      date: string
      tags?: string[]
      category?: string
    }
  }
}>()

// ── Date ──
const formattedDate = computed(() => {
  if (!props.post.frontmatter.date) return ''
  return new Date(props.post.frontmatter.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

// ── Clean excerpt ──
const cleanExcerpt = computed(() => {
  return (props.post.excerpt || '')
    .replace(/^#+\s.*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .trim()
    .slice(0, 120) + (props.post.excerpt && props.post.excerpt.length > 120 ? '...' : '')
})
</script>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #f0f0ef;
  background: #fff;
  transition: all 0.2s ease;
  text-decoration: none;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}

/* ── Image ── */
.card-image {
  height: 140px;
  background: #f4f4f5;
}

/* ── Body ── */
.card-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ── Meta ── */
.card-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #71717a;
  flex-wrap: wrap;
}

.dot {
  opacity: 0.5;
}

/* ── Badge ── */
.card-badge {
  margin-left: auto;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 999px;
  background: #f4f4f5;
  color: #18181b;
}

/* ── Title ── */
.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #18181b;
  line-height: 1.4;
}

/* ── Excerpt ── */
.card-excerpt {
  font-size: 13px;
  color: #71717a;
}
</style>