<template>
  <aside class="nav" :class="{ collapsed }">

    <!-- Toggle button -->
    <button class="collapse-btn" @click="collapsed = !collapsed" :title="collapsed ? 'Expand' : 'Collapse'">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path v-if="!collapsed" d="M15 18l-6-6 6-6" />
        <path v-else d="M9 18l6-6-6-6" />
      </svg>
    </button>

    <!-- Logo -->
    <Logo :collapsed="collapsed" />

    <!-- Social links -->
    <div class="social-section">
      <span class="section-label" v-show="!collapsed">LINKS</span>
      <div class="social-links">
        <a v-for="link in socialLinks" :key="link.label" :href="link.url" target="_blank" rel="noopener"
          class="social-item" :title="link.label">
          <span class="social-icon" v-html="link.svg"></span>
          <span class="social-label" v-show="!collapsed">{{ link.label }}</span>
        </a>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Projects -->
    <div class="projects-section">
      <span class="section-label" v-show="!collapsed">PROJECTS</span>
      <nav class="project-tree">
        <div v-for="project in projects" :key="project.name" class="project-folder">
          <button
            class="folder-header"
            @click="onFolderClick($event, project)"
            :title="project.name"
          >
            <span class="folder-icon">
              <span v-if="project.icon" class="folder-emoji">{{ project.icon }}</span>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span class="folder-name" v-show="!collapsed">{{ project.name }}</span>
            <span class="folder-chevron" v-show="!collapsed" :class="{ open: openFolders.has(project.name) }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>

          <!-- Inline pages — expanded mode only -->
          <Transition name="folder-slide">
            <div v-if="openFolders.has(project.name) && !collapsed" class="folder-pages">
              <a v-for="page in project.pages" :key="page.path"
                :href="withBase(page.path)" class="page-link"
                :class="{ active: currentPath === page.path }">
                <span class="page-dot"></span>
                {{ page.title }}
              </a>
            </div>
          </Transition>
        </div>
      </nav>
    </div>

    <!-- ── Flyout popup (collapsed / mobile mode) ── -->
    <Teleport to="body">
      <div v-if="popup.visible" class="popup-overlay" @click="closePopup" />
      <Transition name="popup-fade">
        <div
          v-if="popup.visible"
          class="folder-popup"
          :style="{ top: popup.y + 'px', left: popup.x + 'px' }"
        >
          <div class="popup-header">
            <span v-if="popup.project?.icon" class="popup-icon">{{ popup.project.icon }}</span>
            <span class="popup-title">{{ popup.project?.name }}</span>
          </div>
          <div class="popup-pages">
            <a
              v-for="page in popup.project?.pages"
              :key="page.path"
              :href="withBase(page.path)"
              class="popup-link"
              :class="{ active: currentPath === page.path }"
              @click="closePopup"
            >
              <span class="popup-dot"></span>
              {{ page.title }}
            </a>
          </div>
        </div>
      </Transition>
    </Teleport>

  </aside>
</template>

<script setup>
import Logo from './Logo.vue'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { theme } = useData()

// ── Projects — reads optional `icon` field from sidebar config ────
// Usage in config.ts:
//   { text: 'ESP32 Submarine', icon: '🌊', items: [...] }
const projects = computed(() =>
  (theme.value.sidebar || []).map(group => ({
    name:  group.text,
    icon:  group.icon ?? null,
    pages: (group.items || []).map(item => ({
      title: item.text,
      path:  item.link,
    })),
  }))
)

// ── Collapse ──────────────────────────────────────────────────────
const collapsed = ref(false)

function checkMobile() {
  if (typeof window !== 'undefined') {
    collapsed.value = window.innerWidth < 768
    // Always close popup on resize — avoids stale positioning
    closePopup()
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// ── Current path ──────────────────────────────────────────────────
const currentPath = ref(
  typeof window !== 'undefined' ? window.location.pathname : '/'
)

// ── Open folders (expanded mode) ──────────────────────────────────
const openFolders = reactive(new Set())

// ── Popup state (collapsed mode) ──────────────────────────────────
const popup = reactive({ visible: false, project: null, x: 0, y: 0 })

function onFolderClick(event, project) {
  if (!collapsed.value) {
    // Expanded sidebar — toggle inline list
    openFolders.has(project.name)
      ? openFolders.delete(project.name)
      : openFolders.add(project.name)
    return
  }

  // Collapsed — toggle popup
  if (popup.visible && popup.project?.name === project.name) {
    closePopup()
    return
  }

  const rect = event.currentTarget.getBoundingClientRect()
  popup.x       = rect.right + 8
  popup.y       = rect.top
  popup.project = project
  popup.visible = true
}

function closePopup() {
  popup.visible = false
  popup.project = null
}

// ── Social links ──────────────────────────────────────────────────
const socialLinks = [
  {
    label: 'Portfolio',
    url: 'https://www.itscarlosisaac.com',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
  {
    label: 'Medium',
    url: 'https://medium.com/@itscarlosisaac',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/cisaacmb/',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
]
</script>

<style scoped>
.nav {
  width: 220px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #f0f0ef;
  display: flex;
  flex-direction: column;
  padding: 20px 12px;
  box-sizing: border-box;
  flex-shrink: 0;
  transition: width 0.22s ease;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.nav.collapsed { width: 60px; }

/* ── Toggle ── */
.collapse-btn {
  position: absolute; bottom: 18px; right: 10px;
  width: 24px; height: 24px; background: none; border: none;
  color: #a1a1aa; cursor: pointer; display: flex;
  align-items: center; justify-content: center;
  border-radius: 5px; transition: color 0.15s, background 0.15s;
  padding: 0; flex-shrink: 0;
}
.collapse-btn svg { width: 14px; height: 14px; }
.collapse-btn:hover { color: #18181b; background: #f4f4f5; }

/* ── Section label ── */
.section-label {
  display: block; font-size: 10px; font-weight: 700;
  color: #a1a1aa; letter-spacing: 0.08em;
  padding: 0 6px 8px; white-space: nowrap;
}

/* ── Social ── */
.social-section { display: flex; flex-direction: column; }
.social-links   { display: flex; flex-direction: column; gap: 2px; }
.social-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 6px; border-radius: 8px; text-decoration: none;
  color: #71717a; font-size: 13.5px; font-weight: 500;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap; overflow: hidden;
}
.social-item:hover { background: #f4f4f5; color: #18181b; }
.social-icon { width: 20px; height: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.social-icon :deep(svg) { width: 16px; height: 16px; }
.social-label { overflow: hidden; text-overflow: ellipsis; }

/* ── Divider ── */
.divider { height: 1px; background: #f0f0ef; margin: 16px 0; flex-shrink: 0; }

/* ── Projects ── */
.projects-section { display: flex; flex-direction: column; flex: 1; overflow-y: auto; }
.project-tree     { display: flex; flex-direction: column; gap: 2px; }

.folder-header {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 7px 6px; border-radius: 8px; background: none; border: none;
  cursor: pointer; font-family: inherit; text-align: left;
  color: #3f3f46; transition: background 0.15s;
  white-space: nowrap; overflow: hidden;
}
.folder-header:hover { background: #f4f4f5; }

.folder-icon { width: 20px; height: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #a1a1aa; }
.folder-icon svg { width: 15px; height: 15px; }
.folder-emoji { font-size: 15px; line-height: 1; }
.folder-name  { font-size: 13px; font-weight: 500; flex: 1; overflow: hidden; text-overflow: ellipsis; }

.folder-chevron {
  width: 16px; height: 16px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: #a1a1aa; transition: transform 0.2s;
}
.folder-chevron svg  { width: 12px; height: 12px; }
.folder-chevron.open { transform: rotate(180deg); }

.folder-pages { display: flex; flex-direction: column; padding-left: 26px; gap: 1px; margin-bottom: 4px; }

.page-link {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 8px; border-radius: 6px;
  font-size: 12.5px; font-weight: 400; color: #71717a;
  text-decoration: none; transition: background 0.15s, color 0.15s;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.page-link:hover  { background: #f4f4f5; color: #18181b; }
.page-link.active { background: #f0f0ff; color: #6366f1; font-weight: 500; }
.page-dot { width: 5px; height: 5px; border-radius: 50%; background: #d4d4d8; flex-shrink: 0; }
.page-link.active .page-dot { background: #6366f1; }

/* ── Folder slide ── */
.folder-slide-enter-active,
.folder-slide-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.folder-slide-enter-from,
.folder-slide-leave-to     { opacity: 0; transform: translateY(-4px); }

/* ── Collapsed icon-only ── */
.nav.collapsed .social-item   { justify-content: center; padding: 8px 0; }
.nav.collapsed .folder-header { justify-content: center; padding: 8px 0; }

/* ── Popup flyout ── */
.popup-overlay {
  position: fixed; inset: 0; z-index: 9998;
  background: transparent;
}

.folder-popup {
  position: fixed; z-index: 9999;
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 8px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
}

.popup-header {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px 10px;
  border-bottom: 1px solid #f0f0ef;
  margin-bottom: 6px;
}
.popup-icon  { font-size: 15px; }
.popup-title {
  font-size: 13px;
  font-weight: 700;
  color: #18181b;
  letter-spacing: -0.01em;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-style: normal;
}

.popup-pages { display: flex; flex-direction: column; gap: 1px; }

.popup-link {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 8px; border-radius: 7px;
  font-size: 13px; color: #3f3f46; text-decoration: none;
  font-family: 'DM Sans', sans-serif;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
}
.popup-link:hover  { background: #f4f4f5; color: #18181b; }
.popup-link.active { background: #f0f0ff; color: #6366f1; font-weight: 500; }
.popup-dot { width: 5px; height: 5px; border-radius: 50%; background: #d4d4d8; flex-shrink: 0; }
.popup-link.active .popup-dot { background: #6366f1; }

/* Popup animation */
.popup-fade-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.popup-fade-leave-active { transition: opacity 0.1s  ease, transform 0.1s  ease; }
.popup-fade-enter-from   { opacity: 0; transform: translateX(-6px); }
.popup-fade-leave-to     { opacity: 0; transform: translateX(-6px); }
</style>