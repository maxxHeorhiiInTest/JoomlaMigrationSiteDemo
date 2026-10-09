<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppPicture from '@/components/AppPicture.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import PersonCard from '@/components/PersonCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'
import { findTeacher } from '@/data/people'
import { findDepartment, findFaculty } from '@/data/structure'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const department = computed(() => findDepartment(String(route.params.slug || '')))
const faculty = computed(() => (department.value ? findFaculty(department.value.facultySlug) : undefined))
const staff = computed(() => {
  const slugs = department.value?.teacherSlugs ?? []
  return slugs.flatMap((slug) => {
    const person = findTeacher(slug)
    return person ? [person] : []
  })
})
const crumbs = computed(() => [
  { label: { uk: 'Факультети', en: 'Faculties' }, to: '/faculties' },
  ...(faculty.value ? [{ label: faculty.value.name, to: `/faculties/${faculty.value.slug}` }] : []),
  { label: department.value?.name ?? { uk: 'Не знайдено', en: 'Not found' } },
])

useSeo(() => {
  const item = department.value
  if (!item) {
    return {
      title: locale.value === 'uk' ? 'Кафедру не знайдено — НУФВСУ' : 'Department not found — NUUPES',
      description: locale.value === 'uk' ? 'Такої кафедри немає.' : 'This department does not exist.',
      path: route.path,
      statusCode: 404,
    }
  }
  return {
    title: `${t(item.name)} — ${locale.value === 'uk' ? 'НУФВСУ' : 'NUUPES'}`,
    description: t(item.summary),
    path: route.path,
    image: `/media/${item.image}-1600.jpg`,
    statusCode: 200,
  }
})
</script>

<template>
  <DefaultLayout>
    <div class="page" v-if="department">
      <div class="container">
        <Breadcrumbs :items="crumbs" />
        <div class="intro">
          <AppPicture :name="department.image" :alt="t(department.name)" :width="1600" :height="1000" eager sizes="(min-width: 1024px) 520px, 100vw" />
          <div>
            <p class="kicker">{{ t({ uk: 'Кафедра', en: 'Department' }) }}</p>
            <h1>{{ t(department.name) }}</h1>
            <p class="lead">{{ t(department.summary) }}</p>
            <p v-if="faculty"><RouterLink :to="localePath(`/faculties/${faculty.slug}`)">{{ t(faculty.name) }}</RouterLink></p>
          </div>
        </div>
        <section v-if="staff.length" class="block">
          <h2>{{ t({ uk: 'Викладачі', en: 'Staff' }) }}</h2>
          <div class="staff">
            <PersonCard
              v-for="person in staff"
              :key="person.slug"
              :name="person.name"
              :role="person.position"
              :image="person.image"
              :to="`/teachers/${person.slug}`"
            />
          </div>
        </section>
        <section class="block facts">
          <div>
            <h2>{{ t({ uk: 'Навчання', en: 'Teaching' }) }}</h2>
            <p>{{ t({ uk: 'Освітні компоненти, практика і методичні матеріали зібрані на цій сторінці, а не розкидані окремими посиланнями.', en: 'Courses, placement and teaching materials stay on this page instead of scattering into separate links.' }) }}</p>
          </div>
          <div>
            <h2>{{ t({ uk: 'Контакти', en: 'Contacts' }) }}</h2>
            <p>{{ department.phone }}</p>
            <p><a :href="`mailto:${department.email}`">{{ department.email }}</a></p>
          </div>
        </section>
      </div>
    </div>
    <div class="page" v-else>
      <div class="container">
        <h1>{{ t({ uk: 'Кафедру не знайдено', en: 'Department not found' }) }}</h1>
        <RouterLink class="btn btn-primary" :to="localePath('/faculties')">{{ t({ uk: 'До факультетів', en: 'All faculties' }) }}</RouterLink>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(32px, 4vw, 48px); margin-bottom: 12px; }
.intro { display: grid; gap: 24px; }
.intro :deep(picture) { border-radius: 20px; overflow: hidden; aspect-ratio: 16 / 10; }
.block { margin-top: 42px; }
.block h2 { margin-bottom: 14px; }
.staff { display: grid; gap: 16px; }
.facts { display: grid; gap: 16px; }
.facts > div { padding: 20px; border: 1px solid var(--line); border-radius: 18px; display: grid; gap: 8px; }
@media (min-width: 768px) {
  .staff { grid-template-columns: repeat(3, minmax(0, 280px)); }
  .facts { grid-template-columns: 1.4fr 0.8fr; }
}
@media (min-width: 900px) { .intro { grid-template-columns: 1.1fr 0.9fr; align-items: center; } }
</style>
