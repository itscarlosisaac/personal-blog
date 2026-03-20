<template>
    <nav class="breadcrumbs" aria-label="Breadcrumb" v-if="crumbs.length > 1">
      <ol class="crumb-list">
        <li
          v-for="(crumb, i) in crumbs"
          :key="crumb.path"
          class="crumb-item"
        >
          <!-- Separator -->
          <span v-if="i > 0" class="crumb-sep" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </span>
  
          <!-- Last crumb — current page, not a link -->
          <span v-if="i === crumbs.length - 1" class="crumb-current" aria-current="page">
            {{ crumb.label }}
          </span>
  
          <!-- Previous crumbs — links -->
          <a v-else :href="crumb.path" class="crumb-link">
            {{ crumb.label }}
          </a>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useData } from 'vitepress'
  
  const route  = useRoute()
  console.log(route)
  const { theme } = useData()
  
  // ── Build crumbs from current URL path ───────────────────────────
  // e.g. /esp32-submarine/bom → Home > ESP32 Submarine > Bom
  const crumbs = computed(() => {
    const parts = route.path
      .replace(/\.html$/, '')   // strip .html
      .split('/')
      .filter(Boolean)          // remove empty segments
  
    const result = [{ label: 'Home', path: '/' }]
  
    // Try to match each path segment against the sidebar to get proper titles
    const sidebar: any[] = theme.value.sidebar || []
  
    let accumulated = ''
    for (const part of parts) {
      accumulated += `/${part}`
  
      // Look for a matching sidebar entry to get the real title
      const sidebarTitle = findSidebarTitle(sidebar, accumulated)
      const label = sidebarTitle || toTitle(part)
  
      result.push({ label, path: accumulated })
    }
  
    return result
  })
  
  // ── Find title from sidebar config ───────────────────────────────
  function findSidebarTitle(sidebar: any[], path: string): string | null {
    for (const group of sidebar) {
      // Check group link
      if (group.link === path || group.link === `${path}/`) {
        return group.text || null
      }
      // Check items inside group
      for (const item of group.items || []) {
        if (item.link === path || item.link === `${path}/`) {
          return item.text || null
        }
      }
      // Group text matches the first segment
      if (path.split('/').filter(Boolean).length === 1) {
        const slug = path.replace(/\//g, '').toLowerCase()
        const groupSlug = (group.text || '').toLowerCase().replace(/\s+/g, '-')
        if (groupSlug === slug || group.text?.toLowerCase() === slug) {
          return group.text || null
        }
      }
    }
    return null
  }
  
  // ── kebab-case / slug → Title Case ───────────────────────────────
  function toTitle(str: string): string {
    return decodeURIComponent(str) 
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  }
  </script>
  
  <style scoped>
  .breadcrumbs {
    margin-bottom: 20px;
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  
  .crumb-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .crumb-item {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  
  .crumb-sep {
    display: flex;
    align-items: center;
    color: #d4d4d8;
    margin: 0 1px;
  }
  
  .crumb-sep svg {
    width: 12px;
    height: 12px;
  }
  
  .crumb-link {
    font-size: 13px;
    font-weight: 500;
    color: #71717a;
    text-decoration: none;
    padding: 2px 4px;
    border-radius: 4px;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
  }
  
  .crumb-link:hover {
    color: #18181b;
    background: #f4f4f5;
  }
  
  .crumb-current {
    font-size: 13px;
    font-weight: 500;
    color: #18181b;
    padding: 2px 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
  
  /* Responsive — truncate on mobile */
  @media (max-width: 540px) {
    .crumb-link {
      font-size: 12px;
    }
  
    .crumb-current {
      font-size: 12px;
      max-width: 120px;
    }
  }
  </style>