<script setup lang="ts">
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const { t, locale, localePath } = useLanguage()

useSeo(() => ({
  title: locale.value === 'uk' ? 'Сторінку не знайдено — НУФВСУ' : 'Page not found — NUUPES',
  description: locale.value === 'uk' ? 'Такої сторінки немає.' : 'This page does not exist.',
  path: route.path,
  statusCode: 404,
}))
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <div class="container">
        <p class="kicker">404</p>
        <h1>{{ t({ uk: 'Сторінку не знайдено', en: 'Page not found' }) }}</h1>
        <p class="lead">{{ t({ uk: 'Адреса змінилась або сторінки ще немає в макеті.', en: 'The address has changed, or this page is not in the mock yet.' }) }}</p>
        <RouterLink class="btn btn-primary" :to="localePath('/')">{{ t({ uk: 'На головну', en: 'Home' }) }}</RouterLink>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(36px, 5vw, 56px); margin-bottom: 12px; }
.btn { margin-top: 20px; }
</style>
