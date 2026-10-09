<script setup lang="ts">
import AppPicture from '@/components/AppPicture.vue'
import { useLanguage } from '@/composables/useLanguage'
import type { NewsArticle } from '@/types/content'
import { formatDate } from '@/utils/format'

defineProps<{ article: NewsArticle }>()
const { t, locale, localePath } = useLanguage()
</script>

<template>
  <article class="card news-card">
    <RouterLink :to="localePath(`/news/${article.slug}`)" class="media">
      <AppPicture
        :name="article.image"
        :alt="t(article.title)"
        :width="800"
        :height="520"
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
      />
    </RouterLink>
    <div class="card-body">
      <p class="meta">{{ t(article.category) }} · {{ formatDate(article.publishedAt, locale) }}</p>
      <h3><RouterLink :to="localePath(`/news/${article.slug}`)">{{ t(article.title) }}</RouterLink></h3>
      <p>{{ t(article.excerpt) }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
.news-card { display: flex; flex-direction: column; height: 100%; }
.media { display: block; aspect-ratio: 16 / 10; overflow: hidden; }
h3 { font-size: 20px; }
.card-body p:last-child { color: var(--muted); }
</style>
