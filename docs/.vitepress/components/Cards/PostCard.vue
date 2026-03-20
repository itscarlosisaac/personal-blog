<template>
  <a :href="withBase(post.url)" class="post-card">

    <!-- Image / placeholder -->
    <div class="card-image">
      <span class="card-category">{{ post.frontmatter.category || 'General' }}</span>
    </div>

    <!-- Body -->
    <div class="card-body">

      <!-- Title -->
      <h2 class="card-title">{{ post.frontmatter.title }}</h2>

      <!-- Excerpt -->
      <p class="card-excerpt" v-if="post.excerpt">{{ cleanExcerpt }}</p>

      <!-- Footer -->
      <div class="card-footer">
        <div class="card-meta">
          <span class="card-author">{{ post.frontmatter.author || 'Carlos Isaac' }}</span>
          <span class="dot">·</span>
          <span class="card-date">{{ formattedDate }}</span>
        </div>
        <span class="card-arrow">→</span>
      </div>

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
      author?: string
      tags?: string[]
      category?: string
    }
  }
}>()

const formattedDate = computed(() => {
  if (!props.post.frontmatter.date) return ''
  return new Date(props.post.frontmatter.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

const cleanExcerpt = computed(() => {
  const raw = (props.post.excerpt || '')
    .replace(/^#+\s.*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .trim()
  return raw.slice(0, 110) + (raw.length > 110 ? '...' : '')
})
</script>

<style scoped>
/* ── Card shell ── */
.post-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #f0f0ef;
  background: #fff;
  text-decoration: none;
  text-decoration-line: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
  border-color: #e4e4e7;
}

/* ── Image area ── */
.card-image {
  height: 100px;
  background: #fafaf9;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 12px 14px;
  /* Subtle amber blob — matches Hero blob style */
  background-image:
    radial-gradient(ellipse 80% 80% at 90% 20%, rgba(239,159,39,0.13) 0%, transparent 70%),
    radial-gradient(ellipse 60% 60% at 10% 80%, rgba(29,158,117,0.08) 0%, transparent 70%);
}

.card-category {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #EF9F27;
  background: rgba(239, 159, 39, 0.1);
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid rgba(239, 159, 39, 0.2);
}

/* ── Body ── */
.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

/* ── Title — Fraunces italic, matching the Hero quote font ── */
.card-title {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-weight: 700;
  font-size: 17px;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 0;
  text-decoration: none;
}

/* ── Excerpt ── */
.card-excerpt {
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 13px;
  line-height: 1.6;
  color: #71717a;
  margin: 0;
  flex: 1;
}

/* ── Footer ── */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid #f4f4f5;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11.5px;
  color: #a1a1aa;
}

.card-author {
  font-weight: 600;
  color: #71717a;
}

.dot { opacity: 0.5; }

.card-date { font-weight: 300; }

/* ── Arrow — lights up green on hover ── */
.card-arrow {
  font-size: 14px;
  color: #d4d4d8;
  transition: color 0.15s, transform 0.15s;
}

.post-card:hover .card-arrow {
  color: #1D9E75;
  transform: translateX(3px);
}
</style>