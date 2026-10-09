<script setup lang="ts">
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import PersonCard from '@/components/PersonCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'
import { leaders } from '@/data/people'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const crumbs = useBreadcrumbs([{ label: { uk: 'Університет', en: 'University' } }])

const offices = [
  { uk: 'Навчально-методичний відділ', en: 'Academic office' },
  { uk: 'Відділ кадрів', en: 'Human resources' },
  { uk: 'Планово-фінансовий відділ', en: 'Finance office' },
  { uk: 'Центр колективного користування науковим обладнанням', en: 'Shared research equipment centre' },
  { uk: 'Спортивні бази університету', en: 'University sport bases' },
]

const documents = [
  { uk: 'Статут університету', en: 'University statute' },
  { uk: 'Ліцензія і сертифікати акредитації', en: 'Licence and accreditation certificates' },
  { uk: 'Звіти ректора за 2015–2025 роки', en: 'Rector’s reports, 2015–2025' },
  { uk: 'Кошторис і фінансова звітність', en: 'Budget and financial reports' },
]

useSeo(() => ({
  title: locale.value === 'uk' ? 'Університет — НУФВСУ' : 'University — NUUPES',
  description: locale.value === 'uk'
    ? 'Керівництво, структура, документи і контакти Національного університету фізичного виховання і спорту України.'
    : 'Leadership, structure and documents of the National University of Ukraine on Physical Education and Sport.',
  path: route.path,
  image: '/media/campus-building-1600.jpg',
  statusCode: 200,
}))
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <div class="container">
        <Breadcrumbs :items="crumbs" />
        <p class="kicker">{{ t({ uk: 'Про університет', en: 'About' }) }}</p>
        <h1>{{ t({ uk: 'Національний університет фізичного виховання і спорту України', en: 'National University of Ukraine on Physical Education and Sport' }) }}</h1>
        <p class="lead">{{ t({ uk: 'Заклад у Києві, де готують фахівців фізичної культури, спорту, терапії і менеджменту. Керівництво, структура і документи зібрані на одній сторінці.', en: 'A Kyiv university that trains specialists in physical culture, sport, therapy and management. Leadership, structure and documents live on one page.' }) }}</p>

        <section id="leadership" class="block">
          <h2>{{ t({ uk: 'Керівництво', en: 'Leadership' }) }}</h2>
          <div class="people">
            <PersonCard
              v-for="person in leaders"
              :key="t(person.name)"
              :name="person.name"
              :role="person.role"
              :image="person.image"
              :email="person.email"
            />
          </div>
          <p class="note">{{ t({ uk: 'На сторінці контактів старого сайту адміністративним проректором ще зазначено Рибитву Миколу Степановича. У розділі відділів вказано Возного Богдана Сергійовича. Тут показано чинний склад за розділом керівництва.', en: 'The old contacts page still lists Mykola Rybytva as administrative vice-rector, while the offices page lists Bohdan Voznyi. This page follows the leadership section.' }) }}</p>
        </section>

        <section id="council" class="block">
          <h2>{{ t({ uk: 'Вчена рада', en: 'Academic council' }) }}</h2>
          <p>{{ t({ uk: 'Порядок денний, рішення і склад ради публікуються тут. Окремого переходу на зовнішній архів немає.', en: 'Agendas, decisions and membership are published here, without a jump to an external archive.' }) }}</p>
        </section>

        <section id="structure" class="block">
          <h2>{{ t({ uk: 'Структура', en: 'Structure' }) }}</h2>
          <p><RouterLink :to="localePath('/faculties')">{{ t({ uk: 'Факультети, інститути і коледжі', en: 'Faculties, institutes and colleges' }) }}</RouterLink></p>
          <ul>
            <li v-for="item in offices" :key="t(item)">{{ t(item) }}</li>
          </ul>
        </section>

        <section id="documents" class="block">
          <h2>{{ t({ uk: 'Офіційні документи', en: 'Official documents' }) }}</h2>
          <ul>
            <li v-for="item in documents" :key="t(item)">{{ t(item) }}</li>
          </ul>
        </section>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(32px, 4vw, 52px); margin-bottom: 14px; }
.block { margin-top: 48px; }
.block h2 { margin-bottom: 16px; }
.people { display: grid; gap: 16px; }
.note { margin-top: 16px; color: var(--muted); max-width: 78ch; }
ul { margin: 12px 0 0; padding-left: 18px; display: grid; gap: 8px; }
@media (min-width: 700px) { .people { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1100px) { .people { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
</style>
