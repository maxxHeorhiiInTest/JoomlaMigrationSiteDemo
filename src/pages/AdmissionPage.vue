<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppPicture from '@/components/AppPicture.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const crumbs = useBreadcrumbs([{ label: { uk: 'Вступ', en: 'Admission' } }])
const steps = [
  { uk: 'Оберіть рівень: бакалавр, магістр або аспірантура.', en: 'Choose a level: bachelor, master or doctoral study.' },
  { uk: 'Перегляньте спеціальності і кафедри.', en: 'Review fields of study and departments.' },
  { uk: 'Подайте документи до приймальної комісії.', en: 'Submit documents to the admissions office.' },
]

useSeo(() => ({
  title: locale.value === 'uk' ? 'Вступ 2026 — НУФВСУ' : 'Admission 2026 — NUUPES',
  description: locale.value === 'uk'
    ? 'Вступ до Національного університету фізичного виховання і спорту України у 2026 році.'
    : 'Apply to the National University of Ukraine on Physical Education and Sport in 2026.',
  path: route.path,
  image: '/media/campus-building-1600.jpg',
  statusCode: 200,
}))
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <div class="container intro">
        <div>
          <Breadcrumbs :items="crumbs" />
          <p class="kicker">2026</p>
          <h1>{{ t({ uk: 'Вступ', en: 'Admission' }) }}</h1>
          <p class="lead">{{ t({ uk: 'Приймальна комісія: +38 (044) 287-04-91, pk@uni-sport.edu.ua. Правила, програми і контакти — на цій сторінці.', en: 'Admissions office: +38 (044) 287-04-91, pk@uni-sport.edu.ua. Rules, programmes and contacts stay on this page.' }) }}</p>
          <ol>
            <li v-for="step in steps" :key="t(step)">{{ t(step) }}</li>
          </ol>
          <div class="actions">
            <RouterLink class="btn btn-primary" :to="localePath('/education')">{{ t({ uk: 'Програми', en: 'Programmes' }) }}</RouterLink>
            <RouterLink class="btn btn-line" :to="localePath('/faculties/coaching')">{{ t({ uk: 'Тренерський факультет', en: 'Coaching Faculty' }) }}</RouterLink>
          </div>
        </div>
        <AppPicture name="campus-building" :alt="t({ uk: 'Корпус університету', en: 'University building' })" :width="1600" :height="1000" eager sizes="(min-width: 900px) 480px, 100vw" />
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(40px, 5vw, 60px); margin-bottom: 12px; }
.intro { display: grid; gap: 28px; align-items: center; }
.intro :deep(picture) { border-radius: 24px; overflow: hidden; aspect-ratio: 4 / 3; }
ol { margin: 20px 0; padding-left: 20px; display: grid; gap: 10px; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; }
@media (min-width: 900px) { .intro { grid-template-columns: 1.1fr 0.9fr; } }
</style>
