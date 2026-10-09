<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'
import { kindLabel, searchContent } from '@/data/search'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const crumbs = useBreadcrumbs([{ label: { uk: 'Пошук', en: 'Search' } }])
const query = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''))
const results = computed(() => searchContent(query.value))

useSeo(() => ({
  title: query.value
    ? `${locale.value === 'uk' ? 'Пошук' : 'Search'}: ${query.value}`
    : (locale.value === 'uk' ? 'Пошук — НУФВСУ' : 'Search — NUUPES'),
  description: locale.value === 'uk'
    ? 'Пошук новин, факультетів, кафедр і викладачів університету.'
    : 'Search news, faculties, departments and teachers.',
  path: route.path,
  statusCode: 200,
  indexable: false,
}))
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <div class="container">
        <Breadcrumbs :items="crumbs" />
        <h1>{{ t({ uk: 'Пошук', en: 'Search' }) }}</h1>
        <p v-if="query" class="query">{{ query }}</p>
        <p v-if="query.length < 2" class="lead">
          {{ t({ uk: 'Введіть щонайменше дві літери: прізвище, кафедру або слово з новини.', en: 'Type at least two letters: a name, a department or a word from the news.' }) }}
        </p>
        <p v-else-if="results.length === 0" class="lead">
          {{ t({ uk: 'За цим запитом нічого немає. Спробуйте коротше слово.', en: 'Nothing matches this query. Try a shorter word.' }) }}
        </p>
        <ul v-else>
          <li v-for="hit in results" :key="hit.id">
            <RouterLink :to="localePath(hit.to)">
              <span>{{ t(kindLabel[hit.kind]) }}</span>
              <strong>{{ t(hit.title) }}</strong>
              <em>{{ t(hit.text) }}</em>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(36px, 5vw, 56px); margin-bottom: 8px; }
.query { margin: 8px 0 18px; font-size: 20px; font-weight: 600; }
ul { list-style: none; margin: 22px 0 0; padding: 0; display: grid; gap: 12px; }

a {
  display: grid;
  gap: 4px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--white);
  border: 1px solid var(--line);
  color: var(--navy);
  text-decoration: none;
}

a:hover { border-color: var(--blue); }
span { color: var(--blue); font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
em { color: var(--muted); font-style: normal; }
</style>
