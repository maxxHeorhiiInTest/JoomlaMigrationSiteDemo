<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppPicture from '@/components/AppPicture.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ErasmusList from '@/components/ErasmusList.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'
import { findTopic } from '@/data/topics'

const props = defineProps<{ topic: 'science' | 'sport' | 'international' }>()
const route = useRoute()
const { t, locale } = useLanguage()
const page = computed(() => findTopic(props.topic))

useSeo(() => {
  const item = page.value
  if (!item) {
    return {
      title: locale.value === 'uk' ? 'Сторінку не знайдено — НУФВСУ' : 'Page not found — NUUPES',
      description: '',
      path: route.path,
      statusCode: 404,
    }
  }
  return {
    title: `${t(item.title)} — ${locale.value === 'uk' ? 'НУФВСУ' : 'NUUPES'}`,
    description: t(item.lead),
    path: route.path,
    image: `/media/${item.image}-1600.jpg`,
    statusCode: 200,
  }
})
</script>

<template>
  <DefaultLayout>
    <div v-if="page" class="page" :class="page.slug">
      <div class="container">
        <Breadcrumbs :items="[{ label: page.title }]" />
        <div class="intro">
          <div>
            <h1>{{ t(page.title) }}</h1>
            <p class="lead">{{ t(page.lead) }}</p>
          </div>
          <AppPicture :name="page.image" :alt="t(page.title)" :width="1600" :height="1000" eager sizes="(min-width: 900px) 520px, 100vw" />
        </div>
        <div class="blocks">
          <article v-for="block in page.blocks" :key="t(block.title)">
            <h2>{{ t(block.title) }}</h2>
            <p>{{ t(block.text) }}</p>
          </article>
        </div>
        <section v-if="page.slug === 'international'" class="erasmus" aria-labelledby="erasmus-page-title">
          <h2 id="erasmus-page-title">Erasmus+</h2>
          <ErasmusList />
        </section>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(40px, 5vw, 60px); margin-bottom: 12px; }
.intro { display: grid; gap: 24px; align-items: center; }
.intro :deep(picture) { border-radius: 24px; overflow: hidden; aspect-ratio: 16 / 10; }
.blocks { display: grid; gap: 16px; margin-top: 32px; }
article { padding: 22px; border-radius: 16px; border: 1px solid var(--line); display: grid; gap: 8px; }
.erasmus { margin-top: 36px; }
.erasmus h2 { margin-bottom: 16px; }
@media (min-width: 900px) {
  .intro { grid-template-columns: 0.9fr 1.1fr; }
  .blocks { grid-template-columns: repeat(3, 1fr); }
}
</style>
