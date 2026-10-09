<script setup lang="ts">
import AppPicture from '@/components/AppPicture.vue'
import ErasmusList from '@/components/ErasmusList.vue'
import NewsCard from '@/components/NewsCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'
import { faculties } from '@/data/structure'
import { news } from '@/data/news'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const latest = news.slice(0, 3)
const facultyCards = faculties.filter((item) => item.kind === 'faculty').slice(0, 4)

const routes = [
  { title: { uk: 'Вступнику', en: 'Applicants' }, text: { uk: 'Програми, строки і контакти приймальної комісії.', en: 'Programmes, dates and the admissions office.' }, to: '/admission', image: 'campus-building' },
  { title: { uk: 'Студенту', en: 'Students' }, text: { uk: 'Розклад, стипендія, гуртожиток і навчання онлайн.', en: 'Timetable, scholarships, dormitory and online study.' }, to: '/education#students', image: 'lecture-hall' },
  { title: { uk: 'Партнеру', en: 'Partners' }, text: { uk: 'Міжнародні програми і співпраця з клубами.', en: 'International programmes and club partnerships.' }, to: '/international', image: 'pool-training' },
  { title: { uk: 'Досліднику', en: 'Researchers' }, text: { uk: 'Наукові школи, журнали і аспірантура.', en: 'Research schools, journals and doctoral study.' }, to: '/science', image: 'science-lab' },
]

useSeo(() => ({
  title: locale.value === 'uk'
    ? 'Національний університет фізичного виховання і спорту України'
    : 'National University of Ukraine on Physical Education and Sport',
  description: locale.value === 'uk'
    ? 'Офіційний сайт НУФВСУ: факультети, вступ, наука, спорт і новини університету.'
    : 'Official website: faculties, admission, research, sport and university news.',
  path: route.path,
  image: '/media/hero-stadium-1600.jpg',
  statusCode: 200,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: 'Національний університет фізичного виховання і спорту України',
    url: '/',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'вул. Фізкультури, 1',
      addressLocality: 'Київ',
      postalCode: '03150',
      addressCountry: 'UA',
    },
  },
}))
</script>

<template>
  <DefaultLayout>
    <section class="hero">
      <AppPicture
        name="hero-stadium"
        :alt="t({ uk: 'Стадіон університету під час тренування', en: 'University stadium during training' })"
        :width="1600"
        :height="1000"
        eager
        sizes="100vw"
      />
      <div class="veil">
        <div class="container copy">
          <p class="line">{{ t({ uk: 'Талант стає майстерністю', en: 'Talent becomes mastery' }) }}</p>
          <h1>{{ t({ uk: 'Національний університет фізичного виховання і спорту України', en: 'National University of Ukraine on Physical Education and Sport' }) }}</h1>
          <p>{{ t({ uk: 'Готуємо тренерів, викладачів, терапевтів і менеджерів спорту.', en: 'We train coaches, teachers, therapists and sport managers.' }) }}</p>
          <div class="actions">
            <RouterLink class="btn btn-primary" :to="localePath('/admission')">{{ t({ uk: 'Вступ 2026', en: 'Admission 2026' }) }}</RouterLink>
            <RouterLink class="btn btn-ghost" :to="localePath('/faculties')">{{ t({ uk: 'Факультети', en: 'Faculties' }) }}</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="kicker">{{ t({ uk: 'Куди далі', en: 'Where to go' }) }}</p>
            <h2>{{ t({ uk: 'Оберіть свій маршрут', en: 'Choose a route' }) }}</h2>
          </div>
        </div>
        <div class="routes">
          <RouterLink v-for="item in routes" :key="item.to" class="route" :to="localePath(item.to)">
            <AppPicture :name="item.image" :alt="t(item.title)" :width="800" :height="520" sizes="(min-width: 1024px) 280px, 100vw" />
            <span>
              <strong>{{ t(item.title) }}</strong>
              <em>{{ t(item.text) }}</em>
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="kicker">{{ t({ uk: 'Новини', en: 'News' }) }}</p>
            <h2>{{ t({ uk: 'Останнє в університеті', en: 'Latest from the university' }) }}</h2>
          </div>
          <RouterLink class="btn btn-line" :to="localePath('/news')">{{ t({ uk: 'Усі новини', en: 'All news' }) }}</RouterLink>
        </div>
        <div class="grid-3">
          <NewsCard v-for="article in latest" :key="article.id" :article="article" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="kicker">{{ t({ uk: 'Структура', en: 'Structure' }) }}</p>
            <h2>{{ t({ uk: 'Факультети та інститути', en: 'Faculties and institutes' }) }}</h2>
          </div>
          <RouterLink class="btn btn-line" :to="localePath('/faculties')">{{ t({ uk: 'Усі підрозділи', en: 'All units' }) }}</RouterLink>
        </div>
        <div class="grid-4 faculties">
          <RouterLink v-for="item in facultyCards" :key="item.slug" class="faculty" :to="localePath(`/faculties/${item.slug}`)">
            <AppPicture :name="item.image" :alt="t(item.name)" :width="800" :height="520" sizes="(min-width: 1024px) 280px, 50vw" />
            <strong>{{ t(item.name) }}</strong>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section section-soft" aria-labelledby="erasmus-title">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="kicker">Erasmus+</p>
            <h2 id="erasmus-title">{{ t({ uk: 'Міжнародні проєкти', en: 'International projects' }) }}</h2>
          </div>
          <RouterLink class="btn btn-line" :to="localePath('/international#erasmus-page-title')">{{ t({ uk: 'Усі проєкти', en: 'All projects' }) }}</RouterLink>
        </div>
        <p class="lead erasmus-lead">{{ t({ uk: 'Сім чинних проєктів Erasmus+ університету: реабілітація, адаптивний спорт, здоров’я і врядування.', en: 'Seven live Erasmus+ projects: rehabilitation, adapted sport, health and governance.' }) }}</p>
        <ErasmusList />
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped lang="scss">
.hero { position: relative; min-height: 620px; background: var(--navy); color: var(--white); }
.hero :deep(img) { position: absolute; inset: 0; width: 100%; height: 100%; }
.veil {
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(180deg, rgba(5, 11, 47, 0.15), rgba(5, 11, 47, 0.82));
}
.copy { padding: 72px 0; max-width: 820px; }
.line {
  margin-bottom: 14px;
  color: var(--yellow);
  font-weight: 600;
}
h1 { font-size: clamp(36px, 5vw, 60px); max-width: 16ch; }
.copy > p:last-of-type { margin: 16px 0 24px; max-width: 46ch; font-size: 18px; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; }
.head { display: flex; justify-content: space-between; align-items: end; gap: 16px; margin-bottom: 24px; }
.routes, .faculties { margin-top: 0; }
.routes { display: grid; gap: 16px; }
.route, .faculty {
  display: grid;
  color: var(--navy);
  text-decoration: none;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
}
.route:hover, .faculty:hover { border-color: var(--blue); }
.route span, .faculty strong { display: grid; gap: 6px; padding: 16px 16px 18px; }
.route em { color: var(--muted); font-style: normal; font-weight: 400; }
.erasmus-lead { margin: -8px 0 20px; }
.route :deep(picture), .faculty :deep(picture) { aspect-ratio: 16 / 10; }
@media (min-width: 768px) { .routes { grid-template-columns: 1fr 1fr; } }
@media (max-width: 767px) { .hero, .veil { min-height: 520px; } }
</style>
