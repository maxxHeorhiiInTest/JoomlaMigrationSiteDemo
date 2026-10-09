<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppPicture from '@/components/AppPicture.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'
import { faculties } from '@/data/structure'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const crumbs = useBreadcrumbs([{ label: { uk: 'Факультети', en: 'Faculties' } }])
const schools = computed(() => faculties.filter((item) => item.kind === 'faculty'))
const colleges = computed(() => faculties.filter((item) => item.kind === 'college'))

useSeo(() => ({
  title: locale.value === 'uk' ? 'Факультети та інститути — НУФВСУ' : 'Faculties and institutes — NUUPES',
  description: locale.value === 'uk'
    ? 'Факультети, інститути і відокремлені структурні підрозділи університету.'
    : 'Faculties, institutes and separate units of the university.',
  path: route.path,
  image: '/media/football-training-1600.jpg',
  statusCode: 200,
}))
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <div class="container">
        <Breadcrumbs :items="crumbs" />
        <p class="kicker">{{ t({ uk: 'Структура', en: 'Structure' }) }}</p>
        <h1>{{ t({ uk: 'Факультети та інститути', en: 'Faculties and institutes' }) }}</h1>
        <div class="list">
          <RouterLink v-for="item in schools" :key="item.slug" class="row" :to="localePath(`/faculties/${item.slug}`)">
            <AppPicture :name="item.image" :alt="t(item.name)" :width="800" :height="520" sizes="(min-width: 768px) 280px, 100vw" />
            <span>
              <strong>{{ t(item.name) }}</strong>
              <em>{{ t(item.summary) }}</em>
            </span>
          </RouterLink>
        </div>
        <h2 id="colleges">{{ t({ uk: 'Відокремлені структурні підрозділи', en: 'Separate structural units' }) }}</h2>
        <div class="list">
          <RouterLink v-for="item in colleges" :key="item.slug" class="row" :to="localePath(`/faculties/${item.slug}`)">
            <AppPicture :name="item.image" :alt="t(item.name)" :width="800" :height="520" sizes="(min-width: 768px) 280px, 100vw" />
            <span>
              <strong>{{ t(item.name) }}</strong>
              <em>{{ t(item.summary) }}</em>
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(36px, 5vw, 56px); margin-bottom: 28px; }
h2 { margin: 48px 0 20px; }
.list { display: grid; gap: 16px; }
.row {
  display: grid;
  gap: 0;
  text-decoration: none;
  color: var(--navy);
  border: 1px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
  background: var(--white);
}
.row :deep(picture) { aspect-ratio: 16 / 10; }
.row span { display: grid; gap: 8px; padding: 18px; }
.row em { color: var(--muted); font-style: normal; }
@media (min-width: 768px) {
  .row { grid-template-columns: 280px 1fr; }
  .row :deep(picture) { aspect-ratio: auto; min-height: 180px; }
}
</style>
