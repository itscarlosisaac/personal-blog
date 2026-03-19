<template>
  <div class="hero">

    <!-- Blob decorations -->
    <div class="blob blob-amber"></div>
    <div class="blob blob-green"></div>

    <!-- Content -->
    <div class="hero-content">
      <div class="eyebrow">TODAY'S BUILD QUOTE</div>

      <h1 class="quote-headline">
        <template v-if="currentQuote.highlight">
          {{ currentQuote.before }}<span class="hl">{{ currentQuote.highlight }}</span>{{ currentQuote.after }}
        </template>
        <template v-else>{{ currentQuote.text }}</template>
      </h1>

      <p class="quote-author">— {{ currentQuote.author }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const quotes = [
  { before: 'Build ', highlight: 'something that matters,', after: ' even if it breaks along the way.', author: 'Anonymous' },
  { before: 'First, solve ', highlight: 'the problem.', after: ' Then, write the code.', author: 'John Johnson' },
  { before: 'Talk is cheap. ', highlight: 'Show me the code.', after: '', author: 'Linus Torvalds' },
  { before: 'Make it work, ', highlight: 'make it right,', after: ' make it fast.', author: 'Kent Beck' },
  { before: '', highlight: 'Simplicity', after: ' is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { before: 'Any sufficiently advanced technology is ', highlight: 'indistinguishable from magic.', after: '', author: 'Arthur C. Clarke' },
  { before: 'The best error message is ', highlight: 'the one that never shows up.', after: '', author: 'Thomas Fuchs' },
  { before: 'Programs must be written ', highlight: 'for people to read,', after: ' and only incidentally for machines to execute.', author: 'Harold Abelson' },
]

const currentQuote = ref(quotes[Math.floor(Math.random() * quotes.length)])
</script>

<style scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 36px 40px;
  border-radius: 16px;
  overflow: hidden;
  background: #fafaf9;
  font-family: 'Urbanist', system-ui, sans-serif;
}

/* ── Blobs ── */
.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.blob-amber {
  top: -60px;
  right: -40px;
  width: 280px;
  height: 280px;
  background: #EF9F27;
  opacity: 0.12;
  filter: blur(60px);
}

.blob-green {
  bottom: -80px;
  left: -60px;
  width: 320px;
  height: 320px;
  background: #1D9E75;
  opacity: 0.08;
  filter: blur(80px);
}

/* ── Content sits above blobs ── */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

/* ── Eyebrow ── */
.eyebrow {
  font-family: 'Urbanist', sans-serif;
  font-weight: 800;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #EF9F27;
  text-transform: uppercase;
  margin-bottom: 16px;
}

/* ── Quote headline ── */
.quote-headline {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 900;
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 0 0 20px;
  max-width: 680px;
}

/* ── Highlight ── */
.hl {
  background: linear-gradient(transparent 52%, rgba(226, 104, 80, .4) 52%);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  padding: 0 3px;
  border-radius: 2px;
}

/* ── Author ── */
.quote-author {
  font-family: 'Fragment Mono', monospace;
  font-size: 11px;
  color: #a1a1aa;
  letter-spacing: 0.05em;
  margin: 0;
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .hero { padding: 24px; }
  .quote-headline { font-size: 26px; }
  .blob-amber { width: 180px; height: 180px; }
  .blob-green  { width: 200px; height: 200px; }
}
</style>