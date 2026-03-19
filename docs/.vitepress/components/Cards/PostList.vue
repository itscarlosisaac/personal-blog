<template>
  <div class="post-list">

    <!-- ── Tag filters ───────────────────────── -->
    <div class="tag-bar" v-if="allTags.length">
      <button class="tag-btn" :class="{ active: activeTag === null }" @click="activeTag = null">
        All
      </button>

      <button v-for="tag in allTags" :key="tag" class="tag-btn" :class="{ active: activeTag === tag }"
        @click="activeTag = activeTag === tag ? null : tag">
        {{ tag }}
      </button>

      <div class="search-box">
        <input v-model="search" type="text" placeholder="Search articles..." />
      </div>
    </div>

    <!-- ── Posts grid (flat like design) ───────── -->
    <div class="posts-grid">
      <PostCard v-for="post in filtered" :key="post.url" :post="post" @tag-click="activeTag = $event" />
    </div>

    <!-- ── Empty state ───────────────────────── -->
    <div v-if="filtered.length === 0" class="empty-state">
      <span class="empty-icon">📭</span>
      <p>No posts found</p>
      <button class="clear-filter" @click="resetFilters">
        Clear filters
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PostCard from './PostCard.vue'

// ── Load posts ─────────────────────────
const modules = import.meta.glob('../../../posts/*.md', { eager: true })

const posts = Object.entries(modules).map(([path, mod]: [string, any]) => {
  const slug = path.split('/').pop()!.replace('.md', '')
  console.log(path, mod)
  return {
    url: `/posts/${slug}`,
    excerpt: mod.__pageData?.description || '',
    frontmatter: mod.__pageData?.frontmatter || {},
  }
})
  .filter(p => !p.url.includes('index'))
  .filter(p => !p.frontmatter.draft)
  .sort((a, b) =>
    +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  )

// ── State ─────────────────────────
const activeTag = ref<string | null>(null)
const search = ref('')

// ── Tags ─────────────────────────
const allTags = computed(() => {
  const freq: Record<string, number> = {}

  for (const post of posts) {
    for (const tag of post.frontmatter.tags || []) {
      freq[tag] = (freq[tag] || 0) + 1
    }
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
})

// ── Filter logic ─────────────────────────
const filtered = computed(() => {
  let result = posts

  if (activeTag.value) {
    result = result.filter(p =>
      p.frontmatter.tags?.includes(activeTag.value!)
    )
  }

  if (search.value.trim()) {
    const q = search.value.toLowerCase()

    result = result.filter(p =>
      p.frontmatter.title?.toLowerCase().includes(q) ||
      p.excerpt?.toLowerCase().includes(q) ||
      p.frontmatter.category?.toLowerCase().includes(q)
    )
  }

  return result
})

const resetFilters = () => {
  activeTag.value = null
  search.value = ''
}
</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'DM Sans', system-ui, sans-serif;
}

/* ── Hero ── */
.search-hero {
  padding-top: 10px;
}

.search-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}


.search-box {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
}

.search-box input {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid #e4e4e7;
  font-size: 14px;
  width: 240px;
}

.search-box input:focus {
  outline: none;
  border-color: #18181b;
}

/* ── Tags ── */
.tag-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-btn {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid #e4e4e7;
  background: #fff;
  font-size: 12px;
  color: #71717a;
  cursor: pointer;
}

.tag-btn.active {
  background: #18181b;
  color: #fff;
}

/* ── Grid ── */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

/* ── Empty ── */
.empty-state {
  text-align: center;
  padding: 40px;
  color: #a1a1aa;
}

.clear-filter {
  margin-top: 10px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>