<template>
    <div class="hero">
      <!-- Welcome row -->
      <div class="welcome-row">
        <div>
          <h1 class="welcome-title">Hi Carlos, Welcome back 👋</h1>
          <p class="welcome-sub">
            You've documented
            <a href="#" class="highlight">{{ postsCount }} build logs</a>
            so far. Keep going!
          </p>
        </div>
        <div class="header-actions">
          <button class="btn-icon" title="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button class="btn-icon" title="Settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
          </button>
          <div class="avatar">C</div>
        </div>
      </div>
  
      <!-- Getting started + upgrade banner -->
      <div class="banner-row">
        <!-- Getting started steps -->
        <div class="getting-started">
          <div class="steps-list">
            <div
              v-for="(step, i) in steps"
              :key="i"
              class="step-item"
              :class="{ active: i === activeStep, done: step.done }"
              @click="activeStep = i"
            >
              <div class="step-num">
                <svg v-if="step.done" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="step-label">{{ step.label }}</span>
            </div>
          </div>
        </div>
  
        <!-- Upgrade card -->
        <div class="upgrade-card">
          <button class="card-hide">Hide</button>
          <div class="upgrade-illustration">
            <div class="ill-screen">
              <div class="ill-line"></div>
              <div class="ill-line short"></div>
              <div class="ill-line"></div>
              <div class="ill-chip">
                <div class="ill-chip-inner"></div>
              </div>
            </div>
          </div>
          <div class="upgrade-copy">
            <h3>Start your first build log <br>in seconds!</h3>
            <p>Document circuits, code, and lessons learned — all in one place.</p>
            <button class="btn-primary">New Build Log</button>
          </div>
        </div>
      </div>
  
      <!-- Quick action cards -->
      <div class="actions-row">
        <button
          v-for="action in quickActions"
          :key="action.label"
          class="action-card"
        >
          <div class="action-icon">{{ action.icon }}</div>
          <div class="action-text">
            <div class="action-label">{{ action.label }}</div>
            <div class="action-sub">{{ action.sub }}</div>
          </div>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const postsCount = 7
  const activeStep = ref(1)
  
  const steps = [
    { label: 'Create your first project', done: true },
    { label: 'Write your first build log', done: false },
    { label: 'Add photos & diagrams',      done: false },
    { label: 'Publish to the world',        done: false },
  ]
  
  const quickActions = [
    { icon: '✍️', label: 'New Build Log',   sub: 'Document what you just built' },
    { icon: '📁', label: 'Create Project',  sub: 'Group related build logs' },
    { icon: '📎', label: 'Manual Entry',    sub: 'Write a freeform note' },
  ]
  </script>
  
  <style scoped>
  .hero {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  
  /* ── Welcome row ── */
  .welcome-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  
  .welcome-title {
    font-size: 22px;
    font-weight: 700;
    color: #18181b;
    letter-spacing: -0.03em;
    margin: 0 0 4px;
  }
  
  .welcome-sub {
    font-size: 13.5px;
    color: #71717a;
    margin: 0;
  }
  
  .highlight {
    color: #18181b;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .btn-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    border: 1px solid #e4e4e7;
    background: #fff;
    color: #71717a;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .btn-icon:hover { background: #f4f4f5; color: #18181b; }
  
  .avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: #6366f1;
    color: #fff;
    font-size: 13px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  
  /* ── Banner row ── */
  .banner-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  
  /* Getting started */
  .getting-started {
    background: #fff;
    border: 1px solid #f0f0ef;
    border-radius: 14px;
    padding: 20px;
  }
  
  .steps-list { display: flex; flex-direction: column; gap: 4px; }
  
  .step-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
  }
  
  .step-item:hover { background: #f9f9f9; }
  
  .step-item.active {
    background: #f0f0ff;
    outline: 1.5px solid #e0e0ff;
  }
  
  .step-num {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1.5px solid #d4d4d8;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 600; color: #a1a1aa;
    flex-shrink: 0;
    transition: all 0.15s;
  }
  
  .step-item.done .step-num {
    background: #18181b; border-color: #18181b;
    color: #fff;
  }
  
  .step-item.active .step-num {
    border-color: #6366f1; color: #6366f1;
  }
  
  .step-label { font-size: 13px; font-weight: 500; color: #3f3f46; }
  .step-item.done .step-label { color: #a1a1aa; text-decoration: line-through; }
  .step-item.active .step-label { color: #18181b; font-weight: 600; }
  
  /* Upgrade card */
  .upgrade-card {
    background: #f5f5ff;
    border: 1px solid #e8e8ff;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    gap: 16px;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  
  .card-hide {
    position: absolute; top: 12px; right: 14px;
    background: none; border: none;
    font-size: 12px; color: #a1a1aa;
    cursor: pointer;
    font-family: inherit;
  }
  .card-hide:hover { color: #18181b; }
  
  .upgrade-illustration {
    flex-shrink: 0;
  }
  
  .ill-screen {
    width: 100px; height: 80px;
    background: #fff;
    border: 1.5px solid #e0e0ff;
    border-radius: 8px;
    padding: 10px;
    display: flex; flex-direction: column; gap: 6px;
  }
  
  .ill-line {
    height: 6px;
    background: #e8e8ff;
    border-radius: 3px;
  }
  .ill-line.short { width: 60%; }
  
  .ill-chip {
    width: 28px; height: 20px;
    background: #6366f1;
    border-radius: 4px;
    margin-top: 2px;
    display: flex; align-items: center; justify-content: center;
  }
  .ill-chip-inner {
    width: 16px; height: 10px;
    background: #818cf8;
    border-radius: 2px;
  }
  
  .upgrade-copy h3 {
    font-size: 14px; font-weight: 700;
    color: #18181b; margin: 0 0 6px;
    line-height: 1.4;
  }
  
  .upgrade-copy p {
    font-size: 12px; color: #71717a;
    margin: 0 0 12px; line-height: 1.5;
  }
  
  .btn-primary {
    background: #6366f1; color: #fff;
    border: none; border-radius: 8px;
    padding: 8px 16px;
    font-size: 12.5px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: background 0.15s, transform 0.1s;
  }
  .btn-primary:hover { background: #4f46e5; }
  .btn-primary:active { transform: scale(0.97); }
  
  /* ── Quick actions ── */
  .actions-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  
  .action-card {
    background: #fff;
    border: 1px solid #f0f0ef;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: border-color 0.15s, box-shadow 0.15s, transform 0.1s;
  }
  
  .action-card:hover {
    border-color: #d4d4d8;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }
  
  .action-icon {
    font-size: 22px;
    width: 40px; height: 40px;
    background: #f9f9fb;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  
  .action-label {
    font-size: 13.5px; font-weight: 600; color: #18181b;
    margin-bottom: 2px;
  }
  
  .action-sub {
    font-size: 11.5px; color: #a1a1aa;
  }
  </style>