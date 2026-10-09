<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppPicture from '@/components/AppPicture.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const { t, locale } = useLanguage()
const crumbs = useBreadcrumbs([{ label: { uk: 'Контакти', en: 'Contacts' } }])
const cards = [
  { title: { uk: 'Ректорат', en: 'Rectorate' }, phone: '+38 (044) 287-54-52', email: 'rectorat@uni-sport.edu.ua' },
  { title: { uk: 'Приймальна комісія', en: 'Admissions' }, phone: '+38 (044) 287-04-91', email: 'pk@uni-sport.edu.ua' },
  { title: { uk: 'Тренерський факультет', en: 'Coaching Faculty' }, phone: '+38 (044) 287-05-80', email: 'trefa1930@gmail.com' },
]

useSeo(() => ({
  title: locale.value === 'uk' ? 'Контакти — НУФВСУ' : 'Contacts — NUUPES',
  description: locale.value === 'uk'
    ? 'Адреса, телефони і пошта Національного університету фізичного виховання і спорту України.'
    : 'Address, phones and email of the National University of Ukraine on Physical Education and Sport.',
  path: route.path,
  image: '/media/campus-building-1600.jpg',
  statusCode: 200,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Контакти НУФВСУ',
  },
}))
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <div class="container">
        <Breadcrumbs :items="crumbs" />
        <h1>{{ t({ uk: 'Контакти', en: 'Contacts' }) }}</h1>
        <div class="layout">
          <AppPicture name="campus-building" :alt="t({ uk: 'Головний корпус на вулиці Фізкультури', en: 'Main building on Fizkultury Street' })" :width="1600" :height="1000" eager sizes="(min-width: 900px) 560px, 100vw" />
          <div>
            <p class="address">{{ t({ uk: 'вул. Фізкультури, 1, Київ, 03150', en: '1 Fizkultury Street, Kyiv, 03150' }) }}</p>
            <article v-for="card in cards" :key="card.email">
              <h2>{{ t(card.title) }}</h2>
              <p><a :href="`tel:${card.phone.replace(/[^\d+]/g, '')}`">{{ card.phone }}</a></p>
              <p><a :href="`mailto:${card.email}`">{{ card.email }}</a></p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(40px, 5vw, 60px); margin-bottom: 24px; }
.layout { display: grid; gap: 24px; }
.layout :deep(picture) { border-radius: 24px; overflow: hidden; aspect-ratio: 16 / 10; }
.address { font-size: 20px; font-weight: 600; margin-bottom: 18px; }
article { padding: 16px 0; border-top: 1px solid var(--line); }
article h2 { font-size: 18px; margin-bottom: 6px; }
@media (min-width: 900px) { .layout { grid-template-columns: 1.1fr 0.9fr; align-items: start; } }
</style>
