// docs/posts.data.ts
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData
      .filter(p => !p.frontmatter.draft)
      .sort((a, b) =>
        +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      )
  },
})