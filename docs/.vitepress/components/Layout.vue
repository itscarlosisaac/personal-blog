<template>
  <AppShell>
    <template v-if="page.isNotFound">
      <NotFound />
    </template>
    <template v-else-if="frontmatter.layout === 'home'">
      <Hero />
      <div class="content">
        <PostList />
      </div>
    </template>
    <template v-else>
      <Breadcrumbs />
      <div class="content">
        <Content />
      </div>
    </template>
  </AppShell>
</template>

<script setup>
import { useData } from 'vitepress'
import AppShell   from './AppShell.vue'
import NotFound   from './NotFound.vue'
import Hero       from './Hero.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import PostList   from './Cards/PostList.vue'

const { page, frontmatter } = useData()
</script>

<style>
body { margin: 0; padding: 0; }
</style>