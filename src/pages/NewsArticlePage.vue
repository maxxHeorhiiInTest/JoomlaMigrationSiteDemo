<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppPicture from '@/components/AppPicture.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import NewsCard from '@/components/NewsCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'
import { findNews, news } from '@/data/news'
import { formatDate } from '@/utils/format'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const article = computed(() => findNews(String(route.params.slug || '')))
const related = computed(() => news.filter((item) => item.slug !== article.value?.slug).slice(0, 3))
const crumbs = computed(() => useBreadcrumbs([
  { label: { uk: 'Новини', en: 'News' }, to: '/news' },
  { label: article.value?.title ?? { uk: 'Не знайдено', en: 'Not found' } },
]))

useSeo(() => {
  const item = article.value
  if (!item) {
    return {
      title: locale.value === 'uk' ? 'Новину не знайдено — НУФВСУ' : 'News not found — NUUPES',
      description: locale.value === 'uk' ? 'Такої новини немає.' : 'This news item does not exist.',
      path: route.path,
      statusCode: 404,
    }
  }
  return {
    title: `${t(item.title)} — ${locale.value === 'uk' ? 'НУФВСУ' : 'NUUPES'}`,
    description: t(item.excerpt),
    path: route.path,
    image: `/media/${item.image}-1600.jpg`,
    type: 'article',
    statusCode: 200,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: t(item.title),
      datePublished: item.publishedAt,
      image: `/media/${item.image}-1600.jpg`,
      description: t(item.excerpt),
    },
  }
})
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <div class="container narrow" v-if="article">
        <Breadcrumbs :items="crumbs" />
        <p class="meta">{{ t(article.category) }} · {{ formatDate(article.publishedAt, locale) }}</p>
        <h1>{{ t(article.title) }}</h1>
        <AppPicture
          class="cover"
          :name="article.image"
          :alt="t(article.title)"
          :width="1600"
          :height="1000"
          eager
          sizes="(min-width: 1024px) 860px, 100vw"
        />
        <div class="prose">
          <p v-for="(paragraph, index) in article.paragraphs" :key="index">{{ t(paragraph) }}</p>
        </div>
        <p class="back"><RouterLink :to="localePath('/news')">{{ t({ uk: 'Усі новини', en: 'All news' }) }}</RouterLink></p>
      </div>
      <div class="container" v-else>
        <h1>{{ t({ uk: 'Новину не знайдено', en: 'News not found' }) }}</h1>
        <p class="lead">{{ t({ uk: 'Перевірте адресу або поверніться до стрічки.', en: 'Check the address or return to the feed.' }) }}</p>
        <RouterLink class="btn btn-primary" :to="localePath('/news')">{{ t({ uk: 'До новин', en: 'Back to news' }) }}</RouterLink>
      </div>
      <div v-if="article" class="container more">
        <h2>{{ t({ uk: 'Ще новини', en: 'More news' }) }}</h2>
        <div class="grid">
          <NewsCard v-for="item in related" :key="item.id" :article="item" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
.narrow { max-width: 860px; }
h1 { font-size: clamp(32px, 4vw, 48px); margin: 10px 0 20px; }
.cover { border-radius: 20px; overflow: hidden; aspect-ratio: 16 / 9; margin-bottom: 24px; }
.back { margin-top: 28px; }
.more { margin-top: 56px; }
.more h2 { margin-bottom: 18px; }
.grid { display: grid; gap: 16px; }
.btn { margin-top: 18px; }
@media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }
</style>
