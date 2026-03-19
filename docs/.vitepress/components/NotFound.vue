<template>
  <!-- 404 card -->
  <div class="error-card">

    <!-- SVG illustration -->
    <div class="svg-wrap">
      <svg viewBox="0 0 480 260" class="pcb-svg">
        <rect x="30" y="20" width="420" height="220" rx="10" class="pcb-bg"/>
        <rect x="38" y="28" width="404" height="204" rx="7" class="pcb-surface"/>
        <circle cx="56"  cy="46"  r="6" class="mount"/>
        <circle cx="424" cy="46"  r="6" class="mount"/>
        <circle cx="56"  cy="234" r="6" class="mount"/>
        <circle cx="424" cy="234" r="6" class="mount"/>
        <polyline class="trace" points="90,130 130,130 130,100 200,100"/>
        <polyline class="trace" points="200,100 280,100 280,130 320,130"/>
        <polyline class="trace" points="320,130 360,130 360,100 400,100"/>
        <polyline class="trace" points="130,130 130,160 200,160"/>
        <polyline class="trace" points="280,160 360,160 360,130"/>
        <line class="trace" x1="200" y1="160" x2="280" y2="160"/>
        <line class="trace" x1="90"  y1="160" x2="90"  y2="200"/>
        <line class="trace" x1="400" y1="160" x2="400" y2="200"/>
        <!-- Center chip -->
        <rect x="188" y="95" width="104" height="70" rx="5" class="chip"/>
        <rect x="174" y="104" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="174" y="115" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="174" y="126" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="174" y="137" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="174" y="148" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="292" y="104" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="292" y="115" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="292" y="126" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="292" y="137" width="14" height="5" rx="1.5" class="pin"/>
        <rect x="292" y="148" width="14" height="5" rx="1.5" class="pin"/>
        <circle cx="197" cy="102" r="3.5" class="pin1"/>
        <text x="240" y="133" text-anchor="middle" class="chip-num">404</text>
        <text x="240" y="147" text-anchor="middle" class="chip-sub">PAGE_NOT_FOUND</text>
        <!-- Burnt resistor -->
        <line class="trace" x1="68" y1="127" x2="90" y2="127"/>
        <line class="trace" x1="125" y1="127" x2="130" y2="127"/>
        <rect x="88" y="120" width="38" height="14" rx="4" class="res-burnt"/>
        <rect x="94"  y="123" width="5" height="8" rx="1" class="band b1"/>
        <rect x="104" y="123" width="5" height="8" rx="1" class="band b2"/>
        <rect x="114" y="123" width="5" height="8" rx="1" class="band b1"/>
        <path class="smoke" d="M96 120 Q94 113 97 107 Q100 101 98 96"/>
        <path class="smoke" d="M107 120 Q105 111 108 104 Q111 97 109 91"/>
        <path class="smoke" d="M118 120 Q116 113 119 107 Q122 101 120 96"/>
        <!-- LED -->
        <line class="trace" x1="350" y1="127" x2="365" y2="127"/>
        <line class="trace" x1="388" y1="127" x2="400" y2="127"/>
        <polygon points="365,118 365,136 383,127" class="led-tri"/>
        <line x1="383" y1="119" x2="383" y2="135" class="led-bar"/>
        <line class="ray" x1="387" y1="117" x2="393" y2="111"/>
        <line class="ray" x1="390" y1="127" x2="397" y2="127"/>
        <line class="ray" x1="387" y1="137" x2="393" y2="143"/>
        <!-- Capacitor -->
        <line class="trace" x1="135" y1="60" x2="155" y2="60"/>
        <line class="trace" x1="182" y1="60" x2="200" y2="60"/>
        <rect x="155" y="50" width="27" height="20" rx="10" class="cap"/>
        <line x1="155" y1="57" x2="182" y2="57" class="cap-line"/>
        <text x="168" y="65" text-anchor="middle" class="cap-plus">+</text>
        <!-- USB -->
        <rect x="194" y="210" width="92" height="20" rx="3" class="usb"/>
        <rect x="202" y="214" width="12" height="12" rx="1" class="usb-pin"/>
        <rect x="220" y="214" width="12" height="12" rx="1" class="usb-pin"/>
        <rect x="238" y="214" width="12" height="12" rx="1" class="usb-pin"/>
        <rect x="256" y="214" width="12" height="12" rx="1" class="usb-pin"/>
        <rect x="274" y="214" width="12" height="12" rx="1" class="usb-pin"/>
        <text x="420" y="180" text-anchor="middle" class="qmark">?</text>
      </svg>
    </div>

    <!-- Text -->
    <div class="error-text">
      <div class="status-pill">
        <span class="status-dot"></span>
        Page not found
      </div>

      <h1 class="error-title">Oops! This trace<br>is broken.</h1>

      <p class="error-desc">
        The page you're looking for got fried somewhere along the circuit.
        The resistor is burnt, the LED is blinking red, and we can't find what you need.
      </p>

      <!-- Serial log -->
      <div class="serial-box">
        <div class="serial-header">
          <div class="serial-dot r"></div>
          <div class="serial-dot y"></div>
          <div class="serial-dot g"></div>
          <span class="serial-title">Serial Monitor — 115200 baud</span>
        </div>
        <div class="serial-body">
          <div class="serial-line">
            <span class="s-ok">[INFO]</span>
            <span class="s-text">Looking up route...</span>
          </div>
          <div class="serial-line">
            <span class="s-err">[ERROR]</span>
            <span class="s-text">No such file or directory: <span class="s-path">{{ currentPath }}</span></span>
          </div>
          <div class="serial-line">
            <span class="s-warn">[WARN]</span>
            <span class="s-text">Redirecting in <span class="s-count">{{ countdown }}s</span><span class="cursor">█</span></span>
          </div>
        </div>
      </div>

      <div class="action-row">
        <a href="/" class="btn-primary">← Back to Home</a>
        <a href="/posts" class="btn-secondary">View Build Logs</a>
      </div>
    </div>
  </div>

  <!-- Suggestions -->
  <div class="suggestion-row">
    <p class="suggestion-label">You might be looking for</p>
    <div class="suggestion-cards">
      <a v-for="s in suggestions" :key="s.title" :href="s.href" class="sug-card">
        <div class="sug-icon">{{ s.icon }}</div>
        <div>
          <div class="sug-title">{{ s.title }}</div>
          <div class="sug-sub">{{ s.sub }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const countdown   = ref(10)
const currentPath = ref('/unknown-page')
let timer = null

onMounted(() => {
  currentPath.value = window?.location?.pathname || '/unknown-page'
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
})

onUnmounted(() => clearInterval(timer))

const suggestions = [
  { icon: '⚡', title: 'ESP32 Setup',      sub: 'Getting started guide',   href: '/' },
  { icon: '📡', title: 'ESP-NOW Wireless', sub: 'Wireless communication',  href: '/' },
  { icon: '🖥',  title: 'TFT Display',     sub: 'Round display wiring',    href: '/' },
  { icon: '🌊', title: 'Submarine ROV',    sub: 'The main project',        href: '/' },
]
</script>

<style scoped>
/* ── Error card ── */
.error-card {
  background: #fff;
  border: 1px solid #f0f0ef;
  border-radius: 16px;
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  align-items: center;
}

.svg-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pcb-svg {
  width: 100%;
  max-width: 480px;
  filter: drop-shadow(0 4px 24px rgba(0,0,0,0.08));
}

.pcb-bg      { fill: #1e3a1e; stroke: #2d5a2d; stroke-width: 1.5; }
.pcb-surface { fill: #234523; }
.mount       { fill: #162a16; stroke: #2d5a2d; stroke-width: 1; }
.trace       { stroke: #2d9e5a; stroke-width: 2; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.chip        { fill: #111; stroke: #444; stroke-width: 1.5; }
.pin         { fill: #c8a84a; }
.pin1        { fill: #6ee7b7; }

.chip-num { font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500; fill: #f87171; letter-spacing: 0.04em; }
.chip-sub { font-family: 'DM Mono', monospace; font-size: 6px; fill: #888; letter-spacing: 0.04em; }

.res-burnt { fill: #2a1500; stroke: #6b3a0a; stroke-width: 1; }
.b1 { fill: #3d1a00; }
.b2 { fill: #111; }

.smoke {
  stroke: #aaa; stroke-width: 1.2; fill: none; stroke-linecap: round; opacity: 0.5;
  animation: smokeDrift 2.5s ease-in-out infinite alternate;
}
@keyframes smokeDrift {
  from { opacity: 0.2; transform: translateX(0); }
  to   { opacity: 0.6; transform: translateX(2px); }
}

.led-tri {
  fill: #f87171; stroke: #dc2626; stroke-width: 1;
  filter: drop-shadow(0 0 5px #f8717188);
  animation: ledBlink 1.4s ease-in-out infinite;
}
@keyframes ledBlink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.35; }
}
.led-bar { stroke: #888; stroke-width: 2; }
.ray     { stroke: #f87171; stroke-width: 1.2; stroke-linecap: round; opacity: 0.7; animation: ledBlink 1.4s ease-in-out infinite; }

.cap      { fill: #1e3a6e; stroke: #3a6aaa; stroke-width: 1.5; }
.cap-line { stroke: #fff; stroke-width: 1.5; opacity: 0.35; }
.cap-plus { font-size: 9px; font-weight: 700; fill: #fff; font-family: 'DM Mono'; opacity: 0.7; }

.usb     { fill: #1a1a2a; stroke: #4a4a6a; stroke-width: 1.5; }
.usb-pin { fill: #c8a84a; }

.qmark {
  font-size: 28px; font-weight: 700; fill: #2d9e5a; opacity: 0.2;
  font-family: 'DM Sans', sans-serif;
  animation: qPulse 2.5s ease-in-out infinite;
}
@keyframes qPulse { 0%,100% { opacity: 0.1; } 50% { opacity: 0.35; } }

/* ── Error text ── */
.error-text { display: flex; flex-direction: column; gap: 16px; }

.status-pill {
  display: inline-flex; align-items: center; gap: 7px;
  background: #fff1f2; border: 1px solid #fecdd3; color: #e11d48;
  font-size: 12px; font-weight: 600; padding: 5px 12px;
  border-radius: 20px; width: fit-content;
}
.status-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #f43f5e;
  animation: ledBlink 1.4s ease-in-out infinite;
}
.error-title { font-size: 28px; font-weight: 700; color: #18181b; letter-spacing: -0.03em; line-height: 1.25; }
.error-desc  { font-size: 13px; color: #71717a; line-height: 1.65; }

/* ── Serial box ── */
.serial-box { background: #f9f9f9; border: 1px solid #f0f0ef; border-radius: 10px; overflow: hidden; }
.serial-header { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: #f4f4f5; border-bottom: 1px solid #f0f0ef; }
.serial-dot { width: 9px; height: 9px; border-radius: 50%; }
.serial-dot.r { background: #ef4444; }
.serial-dot.y { background: #f59e0b; }
.serial-dot.g { background: #22c55e; }
.serial-title { font-size: 10px; color: #a1a1aa; font-family: 'DM Mono', monospace; margin-left: 4px; }
.serial-body  { padding: 10px 14px; display: flex; flex-direction: column; gap: 5px; }
.serial-line  { display: flex; align-items: baseline; gap: 8px; font-family: 'DM Mono', monospace; font-size: 11px; }
.s-ok   { color: #22c55e; font-weight: 500; flex-shrink: 0; }
.s-err  { color: #ef4444; font-weight: 500; flex-shrink: 0; }
.s-warn { color: #f59e0b; font-weight: 500; flex-shrink: 0; }
.s-text { color: #71717a; }
.s-path { color: #6366f1; }
.s-count { color: #ef4444; font-weight: 500; }
.cursor { color: #18181b; animation: blink 0.7s step-end infinite; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

/* ── Buttons ── */
.action-row { display: flex; gap: 10px; flex-wrap: wrap; }
.btn-primary  { padding: 9px 20px; background: #18181b; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.15s; }
.btn-primary:hover  { background: #27272a; }
.btn-secondary { padding: 9px 20px; background: #fff; color: #3f3f46; border: 1px solid #e4e4e7; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.15s; }
.btn-secondary:hover { background: #f4f4f5; }

/* ── Suggestions ── */
.suggestion-row   { display: flex; flex-direction: column; gap: 12px; }
.suggestion-label { font-size: 13px; font-weight: 600; color: #18181b; }
.suggestion-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.sug-card { background: #fff; border: 1px solid #f0f0ef; border-radius: 12px; padding: 14px; display: flex; align-items: center; gap: 12px; text-decoration: none; transition: border-color 0.15s, box-shadow 0.15s, transform 0.1s; }
.sug-card:hover  { border-color: #d4d4d8; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transform: translateY(-1px); }
.sug-icon  { width: 36px; height: 36px; background: #f4f4f5; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.sug-title { font-size: 12.5px; font-weight: 600; color: #18181b; margin-bottom: 2px; }
.sug-sub   { font-size: 11px; color: #a1a1aa; }

/* ── Responsive ── */
@media (max-width: 800px) {
  .error-card       { grid-template-columns: 1fr; }
  .suggestion-cards { grid-template-columns: repeat(2, 1fr); }
}
</style>