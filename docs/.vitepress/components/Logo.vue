<template>
    <a :href="withBase('/')" class="logo" :class="{ collapsed }">
      <svg class="logo-icon" viewBox="0 0 38 28" xmlns="http://www.w3.org/2000/svg">
        <!-- Base trace — dim, drawn first so resistor sits on top -->
        <line
          x1="2" y1="14" x2="36" y2="14"
          stroke="#1D9E75" stroke-width="1.5" stroke-linecap="round" opacity="0.2"
        />
  
        <!-- Electron dash -->
        <line
          class="electron"
          x1="2" y1="14" x2="36" y2="14"
          stroke="#1D9E75" stroke-width="1.5" stroke-linecap="round" fill="none"
        />
  
        <!-- Resistor body — line art, green outline -->
        <rect x="8" y="9" width="14" height="10" rx="2" fill="none" stroke="#1D9E75" stroke-width="1.5"/>
  
        <!-- Bands as vertical strokes -->
        <line class="band1" x1="12"   y1="9" x2="12"   y2="19" stroke-width="2" stroke-linecap="round"/>
        <line class="band2" x1="16"   y1="9" x2="16"   y2="19" stroke-width="2" stroke-linecap="round"/>
        <line class="band3" x1="19.5" y1="9" x2="19.5" y2="19" stroke-width="2" stroke-linecap="round"/>
  
        <!-- Pin 1 dot -->
        <circle class="pin1" cx="10" cy="11" r="1" fill="#1D9E75"/>
      </svg>
  
      <span class="logo-text" v-show="!collapsed">
        <span class="logo-deno">DENO</span><span class="logo-log">LOG</span>
      </span>
    </a>
  </template>
  
  <script setup lang="ts">
  import { withBase } from 'vitepress'
  defineProps<{
    collapsed?: boolean
  }>()
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
  
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    user-select: none;
    flex-shrink: 0;
    overflow: hidden;
  }
  
  .logo-icon {
    width: 44px;
    height: 32px;
    flex-shrink: 0;
  }
  
  .logo-text {
    font-family: 'Oswald', sans-serif;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.06em;
    line-height: 1;
    white-space: nowrap;
  }
  
  .logo-deno { color: #18181b; }
  .logo-log  { color: #1D9E75; }
  
  /* ── Seamless electron loop ──────────────────────────────────────
     Full trace: x=2 to x=36 = 34px
     dash=5 + gap=29 = 34px → dot wraps perfectly
  */
  @keyframes flow {
    from { stroke-dashoffset: 34; }
    to   { stroke-dashoffset: 0; }
  }
  
  .electron {
    stroke-dasharray: 5 29;
    animation: flow 1.4s linear infinite;
  }
  
  /* ── Bands — animate stroke color as electron passes ── */
  @keyframes b1 {
    0%, 15%   { stroke: #3a2800; }
    20%, 35%  { stroke: #EF9F27; }
    50%, 100% { stroke: #3a2800; }
  }
  
  @keyframes b2 {
    0%, 30%   { stroke: #3a2800; }
    40%, 55%  { stroke: #EF9F27; }
    70%, 100% { stroke: #3a2800; }
  }
  
  @keyframes b3 {
    0%, 50%   { stroke: #7a5800; }
    58%, 72%  { stroke: #EF9F27; }
    85%, 100% { stroke: #7a5800; }
  }
  
  .band1 { animation: b1 1.4s linear infinite; }
  .band2 { animation: b2 1.4s linear infinite; }
  .band3 { animation: b3 1.4s linear infinite; }
  
  /* ── Pin 1 dot pulse ── */
  @keyframes pin {
    0%, 100% { opacity: 0.3; }
    5%, 18%  { opacity: 1; }
  }
  
  .pin1 { animation: pin 1.4s linear infinite; }
  
  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .electron, .band1, .band2, .band3, .pin1 {
      animation: none;
    }
    .band1, .band2 { stroke: #3a2800; }
    .band3         { stroke: #7a5800; }
  }
  </style>