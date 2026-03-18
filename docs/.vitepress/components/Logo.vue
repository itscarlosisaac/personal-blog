<template>
  <a :href="withBase('/')" class="logo" :class="{ collapsed }">
    <svg class="logo-icon" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dim base trace — drawn first, behind everything -->
      <line x1="0" y1="12" x2="10" y2="12" stroke="#18181b" stroke-width="1.5" stroke-linecap="round" opacity="0.2"/>
      <line x1="34" y1="12" x2="44" y2="12" stroke="#18181b" stroke-width="1.5" stroke-linecap="round" opacity="0.2"/>

      <!-- Electron dash — seamless loop across full path -->
      <line class="electron" x1="0" y1="12" x2="44" y2="12"
        stroke="#18181b" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Yellow bands — drawn BEFORE outline so they clip inside it -->
      <line class="band1" x1="17" y1="5" x2="17" y2="19" stroke="#EF9F27" stroke-width="2.5" stroke-linecap="round"/>
      <line class="band2" x1="22" y1="5" x2="22" y2="19" stroke="#EF9F27" stroke-width="2.5" stroke-linecap="round"/>
      <line class="band3" x1="27" y1="5" x2="27" y2="19" stroke="#EF9F27" stroke-width="3"   stroke-linecap="round"/>

      <!-- Resistor outline — on top, clips bands cleanly -->
      <rect x="10" y="5" width="24" height="14" rx="3.5" stroke="#18181b" stroke-width="1.5"/>
    </svg>

    <span class="logo-text" v-show="!collapsed">
      <span class="logo-byte">Byte</span><span class="logo-trace">Trace</span>
    </span>
  </a>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress';
defineProps<{
  collapsed?: boolean
}>()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;800&display=swap');

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  user-select: none;
  flex-shrink: 0;
  overflow: hidden;
  margin-block: 0 30px;
}

.logo-icon {
  width: 44px;
  height: 24px;
  flex-shrink: 0;
}

.logo-text {
  font-family: 'Urbanist', sans-serif;
  font-size: 22px;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
}

.logo-byte  { font-weight: 800; color: #18181b; }
.logo-trace { font-weight: 300; color: #1D9E75; }

/* ── Seamless electron loop ───────────────────────────────────────
   Full trace: x=0 to x=44 = 44px
   dash=6 + gap=38 = 44px → perfect wrap, zero jump
*/
@keyframes flow {
  from { stroke-dashoffset: 44; }
  to   { stroke-dashoffset: 0; }
}

.electron {
  stroke-dasharray: 6 38;
  animation: flow 1.6s linear infinite;
}

/* ── Bands light up as electron passes each x position ──
   band1 @ x=17 → ~39% of path → fires at 35-50%
   band2 @ x=22 → ~50% of path → fires at 48-63%
   band3 @ x=27 → ~61% of path → fires at 60-75%
*/
@keyframes b1 {
  0%, 25%   { opacity: 0.15; }
  35%, 50%  { opacity: 1; }
  60%, 100% { opacity: 0.15; }
}

@keyframes b2 {
  0%, 38%   { opacity: 0.15; }
  48%, 63%  { opacity: 1; }
  73%, 100% { opacity: 0.15; }
}

@keyframes b3 {
  0%, 50%   { opacity: 0.15; }
  60%, 75%  { opacity: 1; }
  85%, 100% { opacity: 0.15; }
}

.band1 { animation: b1 1.6s linear infinite; }
.band2 { animation: b2 1.6s linear infinite; }
.band3 { animation: b3 1.6s linear infinite; }

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .electron, .band1, .band2, .band3 {
    animation: none;
  }
  .band1, .band2, .band3 { opacity: 0.6; }
}
</style>