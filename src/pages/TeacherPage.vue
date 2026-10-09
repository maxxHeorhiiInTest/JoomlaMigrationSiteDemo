<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppPicture from '@/components/AppPicture.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useSeo } from '@/composables/useSeo'
import { findTeacher } from '@/data/people'
import { findDepartment, findFaculty } from '@/data/structure'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const teacher = computed(() => findTeacher(String(route.params.slug || '')))
const department = computed(() => (teacher.value ? findDepartment(teacher.value.departmentSlug) : undefined))
const faculty = computed(() => (department.value ? findFaculty(department.value.facultySlug) : undefined))
const crumbs = computed(() => [
  ...(faculty.value ? [{ label: faculty.value.name, to: `/faculties/${faculty.value.slug}` }] : []),
  ...(department.value ? [{ label: department.value.name, to: `/departments/${department.value.slug}` }] : []),
  { label: teacher.value?.name ?? { uk: 'Не знайдено', en: 'Not found' } },
])

useSeo(() => {
  const item = teacher.value
  if (!item) {
    return {
      title: locale.value === 'uk' ? 'Викладача не знайдено — НУФВСУ' : 'Teacher not found — NUUPES',
      description: locale.value === 'uk' ? 'Такої сторінки немає.' : 'This page does not exist.',
      path: route.path,
      statusCode: 404,
    }
  }
  return {
    title: `${t(item.name)} — ${locale.value === 'uk' ? 'НУФВСУ' : 'NUUPES'}`,
    description: t(item.position),
    path: route.path,
    image: `/media/${item.image}-1600.jpg`,
    type: 'profile',
    statusCode: 200,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: t(item.name),
      jobTitle: t(item.position),
      email: item.email,
      worksFor: 'Національний університет фізичного виховання і спорту України',
    },
  }
})
</script>

<template>
  <DefaultLayout>
    <div class="page" v-if="teacher">
      <div class="container">
        <Breadcrumbs :items="crumbs" />
        <div class="profile">
          <AppPicture
            :name="teacher.image"
            :alt="t(teacher.name)"
            :width="800"
            :height="1000"
            eager
            sizes="(min-width: 768px) 360px, 100vw"
          />
          <div>
            <p class="degree">{{ t(teacher.degree) }}</p>
            <h1>{{ t(teacher.name) }}</h1>
            <p class="role">{{ t(teacher.position) }}</p>
            <p v-if="department">
              <RouterLink :to="localePath(`/departments/${department.slug}`)">{{ t(department.name) }}</RouterLink>
            </p>
            <p class="meta">{{ teacher.phone }}</p>
            <p><a :href="`mailto:${teacher.email}`">{{ teacher.email }}</a></p>
          </div>
        </div>
        <section class="block prose">
          <h2>{{ t({ uk: 'Про викладача', en: 'About' }) }}</h2>
          <p v-for="(paragraph, index) in teacher.bio" :key="index">{{ t(paragraph) }}</p>
        </section>
        <section class="block split">
          <div>
            <h2>{{ t({ uk: 'Дисципліни', en: 'Courses' }) }}</h2>
            <ul>
              <li v-for="item in teacher.disciplines" :key="t(item)">{{ t(item) }}</li>
            </ul>
          </div>
          <div>
            <h2>{{ t({ uk: 'Публікації', en: 'Publications' }) }}</h2>
            <ul>
              <li v-for="item in teacher.publications" :key="t(item)">{{ t(item) }}</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
    <div class="page" v-else>
      <div class="container">
        <h1>{{ t({ uk: 'Викладача не знайдено', en: 'Teacher not found' }) }}</h1>
        <RouterLink class="btn btn-primary" :to="localePath('/faculties')">{{ t({ uk: 'До факультетів', en: 'All faculties' }) }}</RouterLink>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(32px, 4vw, 48px); margin: 8px 0; }
.degree { color: var(--blue); font-weight: 700; }
.profile { display: grid; gap: 28px; align-items: start; }
.profile :deep(picture) { border-radius: 24px; overflow: hidden; aspect-ratio: 4 / 5; max-width: 420px; }
.role { font-size: 20px; font-weight: 600; }
.block { margin-top: 40px; }
.block h2 { margin-bottom: 12px; }
.split { display: grid; gap: 16px; }
.split > div { padding: 20px; border-radius: 18px; background: var(--soft); }
ul { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
@media (min-width: 800px) {
  .profile { grid-template-columns: 360px 1fr; }
  .split { grid-template-columns: 1fr 1fr; }
}
</style>
