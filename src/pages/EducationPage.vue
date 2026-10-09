<script setup lang="ts">
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const crumbs = useBreadcrumbs([{ label: { uk: 'Освіта', en: 'Education' } }])

const bachelor = [
  { uk: '014 Середня освіта. Фізична культура', en: '014 Secondary education. Physical culture' },
  { uk: '017 Фізична культура і спорт', en: '017 Physical culture and sport' },
  { uk: '024 Хореографія', en: '024 Choreography' },
  { uk: '073 Менеджмент', en: '073 Management' },
  { uk: '227 Терапія та реабілітація', en: '227 Therapy and rehabilitation' },
  { uk: '229 Громадське здоров’я', en: '229 Public health' },
]
const master = [
  { uk: 'Олімпійський спорт і освіта', en: 'Olympic sport and education' },
  { uk: 'Фітнес і рекреація', en: 'Fitness and recreation' },
  { uk: 'Фізична терапія, ерготерапія', en: 'Physical therapy, occupational therapy' },
  { uk: 'Аспірантура: 017, 091, 227', en: 'Doctoral study: 017, 091, 227' },
]

useSeo(() => ({
  title: locale.value === 'uk' ? 'Освіта — НУФВСУ' : 'Education — NUUPES',
  description: locale.value === 'uk'
    ? 'Освітні програми, навчальний процес, студентські сервіси і якість освіти.'
    : 'Programmes, the study process, student services and education quality.',
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
        <p class="kicker">{{ t({ uk: 'Навчання', en: 'Study' }) }}</p>
        <h1>{{ t({ uk: 'Освіта', en: 'Education' }) }}</h1>
        <p class="lead">{{ t({ uk: 'Програми згруповані за спеціальностями. Розклад, стипендія і гуртожиток живуть тут один раз — факультети ведуть на ці самі розділи.', en: 'Programmes are grouped by field. Timetable, scholarships and the dormitory live here once — faculties point to the same sections.' }) }}</p>

        <section id="bachelor" class="block">
          <h2>{{ t({ uk: 'Бакалавр', en: 'Bachelor' }) }}</h2>
          <ul>
            <li v-for="item in bachelor" :key="t(item)">{{ t(item) }}</li>
          </ul>
        </section>
        <section id="master" class="block">
          <h2>{{ t({ uk: 'Магістр і аспірантура', en: 'Master and PhD' }) }}</h2>
          <ul>
            <li v-for="item in master" :key="t(item)">{{ t(item) }}</li>
          </ul>
        </section>
        <section id="process" class="block card-block">
          <h2>{{ t({ uk: 'Навчальний процес', en: 'Study process' }) }}</h2>
          <p>{{ t({ uk: 'Розклад занять, сесія, силабуси і графік навчального процесу.', en: 'Class timetable, exams, syllabi and the academic calendar.' }) }}</p>
        </section>
        <section id="students" class="block card-block">
          <h2>{{ t({ uk: 'Студенту', en: 'Students' }) }}</h2>
          <p>{{ t({ uk: 'Стипендія, оплата навчання, гуртожиток, студентське самоврядування і дистанційні курси.', en: 'Scholarships, tuition, dormitory, student council and distance courses.' }) }}</p>
          <RouterLink :to="localePath('/contacts')">{{ t({ uk: 'Запитати деканат', en: 'Ask a faculty office' }) }}</RouterLink>
        </section>
        <section id="quality" class="block card-block">
          <h2>{{ t({ uk: 'Якість, ліцензії, підвищення кваліфікації', en: 'Quality, licences, professional development' }) }}</h2>
          <p>{{ t({ uk: 'Ліцензія, акредитовані програми і курси підвищення кваліфікації зібрані разом, без ланцюжка зовнішніх посилань.', en: 'The licence, accredited programmes and professional courses sit together, without a chain of external links.' }) }}</p>
        </section>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(36px, 5vw, 56px); margin-bottom: 12px; }
.block { margin-top: 36px; }
.block h2 { margin-bottom: 12px; }
ul { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
.card-block { padding: 22px; border: 1px solid var(--line); border-radius: 18px; display: grid; gap: 10px; }
</style>
