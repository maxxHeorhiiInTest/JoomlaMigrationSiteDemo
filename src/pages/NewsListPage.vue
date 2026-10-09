<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import NewsCard from '@/components/NewsCard.vue'
import Pagination from '@/components/Pagination.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'
import { usePagination } from '@/composables/usePagination'
import { useSeo } from '@/composables/useSeo'
import { news } from '@/data/news'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t, locale } = useLanguage()
const crumbs = useBreadcrumbs([{ label: { uk: 'Новини', en: 'News' } }])
const { page, pages, items, go } = usePagination(() => news, 4)

useSeo(() => ({
  title: locale.value === 'uk' ? 'Новини — НУФВСУ' : 'News — NUUPES',
  description: locale.value === 'uk'
    ? 'Новини Національного університету фізичного виховання і спорту України.'
    : 'News from the National University of Ukraine on Physical Education and Sport.',
  path: route.path,
  image: '/media/lecture-hall-1600.jpg',
  statusCode: 200,
}))
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <div class="container">
        <Breadcrumbs :items="crumbs" />
        <p class="kicker">{{ t({ uk: 'Стрічка', en: 'Feed' }) }}</p>
        <h1>{{ t({ uk: 'Новини', en: 'News' }) }}</h1>
        <p class="lead">{{ t({ uk: 'Одна стрічка університету: нагороди, спорт, наука і життя факультетів.', en: 'One university feed: awards, sport, research and faculty life.' }) }}</p>
        <div class="grid">
          <NewsCard v-for="article in items" :key="article.id" :article="article" />
        </div>
        <Pagination :page="page" :pages="pages" @go="go" />
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(36px, 5vw, 56px); margin-bottom: 12px; }
.grid { display: grid; gap: 20px; margin-top: 28px; }
@media (min-width: 768px) { .grid { grid-template-columns: 1fr 1fr; } }
</style>
