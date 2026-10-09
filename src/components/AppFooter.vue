<script setup lang="ts">
import wordmark from '@brand/wordmark-white.png'
import { useLanguage } from '@/composables/useLanguage'

const { t, locale, localePath } = useLanguage()

const columns = [
  {
    title: { uk: 'Навчання', en: 'Study' },
    links: [
      { label: { uk: 'Факультети', en: 'Faculties' }, to: '/faculties' },
      { label: { uk: 'Освіта', en: 'Education' }, to: '/education' },
      { label: { uk: 'Вступ 2026', en: 'Admission 2026' }, to: '/admission' },
    ],
  },
  {
    title: { uk: 'Університет', en: 'University' },
    links: [
      { label: { uk: 'Керівництво', en: 'Leadership' }, to: '/university#leadership' },
      { label: { uk: 'Наука', en: 'Research' }, to: '/science' },
      { label: { uk: 'Спорт', en: 'Sport' }, to: '/sport' },
      { label: { uk: 'Контакти', en: 'Contacts' }, to: '/contacts' },
    ],
  },
]
</script>

<template>
  <footer class="footer">
    <div class="container grid">
      <div>
        <img
          :src="wordmark"
          :alt="locale === 'uk'
          ? 'Національний університет фізичного виховання і спорту України'
          : 'National University of Ukraine on Physical Education and Sport'"
          width="2400"
          height="524"
        />
        <p>
          {{ t({
            uk: 'вул. Фізкультури, 1, Київ, 03150',
            en: '1 Fizkultury Street, Kyiv, 03150',
          }) }}
        </p>
        <p><a href="tel:+380442875452">+38 (044) 287-54-52</a></p>
        <p><a href="mailto:rectorat@uni-sport.edu.ua">rectorat@uni-sport.edu.ua</a></p>
      </div>
      <div v-for="column in columns" :key="t(column.title)">
        <h2>{{ t(column.title) }}</h2>
        <RouterLink v-for="link in column.links" :key="link.to" :to="localePath(link.to)">
          {{ t(link.label) }}
        </RouterLink>
      </div>
      <div>
        <h2>{{ t({ uk: 'Соціальні мережі', en: 'Social' }) }}</h2>
        <a href="https://www.facebook.com/nufvsu" rel="noopener">Facebook</a>
        <a href="https://www.instagram.com/nuupes_ukraine" rel="noopener">Instagram</a>
        <a href="https://www.youtube.com/@NUUPES" rel="noopener">YouTube</a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--navy);
  color: var(--white);
  padding: 48px 0 40px;
  box-shadow: inset 0 3px 0 var(--yellow);
}

.grid {
  display: grid;
  gap: 28px;
}

img { width: 180px; height: auto; margin-bottom: 16px; }

h2 { font-size: 16px; font-weight: 600; margin-bottom: 10px; }

a, p { color: rgba(255, 255, 255, 0.86); }

div > a, div > p { display: block; margin-top: 8px; text-decoration: none; }
div > a:hover { color: var(--white); }

@media (min-width: 768px) {
  .grid { grid-template-columns: 1.4fr 1fr 1fr 1fr; }
}
</style>
