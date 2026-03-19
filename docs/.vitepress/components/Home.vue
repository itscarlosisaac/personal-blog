<template>
  <AppShell>
    <NotFound v-if="page.isNotFound" />
    <Home v-else-if="frontmatter.layout === 'home'" />
    <Page v-else />
  </AppShell>
</template>

<script setup>
import { useData } from 'vitepress'
import AppShell from './AppShell.vue'
import NotFound from './NotFound.vue'
import Home from './Home.vue'
import Page from './Page.vue'

const { page, frontmatter } = useData()
</script>

<style>
/* Global reset — only place this lives */
body {
  margin: 0;
  padding: 0;
}
</style>