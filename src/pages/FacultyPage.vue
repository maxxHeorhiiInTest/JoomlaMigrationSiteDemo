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
import { facultyDepartments, findFaculty } from '@/data/structure'

const route = useRoute()
const { t, locale, localePath } = useLanguage()
const faculty = computed(() => findFaculty(String(route.params.slug || '')))
const dean = computed(() => (faculty.value?.deanSlug ? findTeacher(faculty.value.deanSlug) : undefined))
const departments = computed(() => (faculty.value ? facultyDepartments(faculty.value) : []))
const crumbs = computed(() => [
  { label: { uk: 'Факультети', en: 'Faculties' }, to: '/faculties' },
  { label: faculty.value?.name ?? { uk: 'Не знайдено', en: 'Not found' } },
])

useSeo(() => {
  const item = faculty.value
  if (!item) {
    return {
      title: locale.value === 'uk' ? 'Підрозділ не знайдено — НУФВСУ' : 'Unit not found — NUUPES',
      description: locale.value === 'uk' ? 'Такого факультету немає.' : 'This faculty does not exist.',
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
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollegeOrUniversity',
      name: t(item.name),
      parentOrganization: 'Національний університет фізичного виховання і спорту України',
    },
  }
})
</script>

<template>
  <DefaultLayout>
    <div class="page" v-if="faculty">
      <div class="container">
        <Breadcrumbs :items="crumbs" />
        <div class="intro">
          <AppPicture
            :name="faculty.image"
            :alt="t(faculty.name)"
            :width="1600"
            :height="1000"
            eager
            sizes="(min-width: 1024px) 560px, 100vw"
          />
          <div>
            <p class="kicker">{{ faculty.kind === 'college' ? t({ uk: 'Відокремлений підрозділ', en: 'Separate unit' }) : t({ uk: 'Факультет', en: 'Faculty' }) }}</p>
            <h1>{{ t(faculty.name) }}</h1>
            <p class="lead">{{ t(faculty.summary) }}</p>
            <p class="meta">{{ faculty.phone }} · <a :href="`mailto:${faculty.email}`">{{ faculty.email }}</a></p>
          </div>
        </div>

        <section v-if="dean" class="block">
          <h2>{{ t({ uk: 'Декан', en: 'Dean' }) }}</h2>
          <div class="dean">
            <PersonCard
              :name="dean.name"
              :role="dean.position"
              :image="dean.image"
              :email="dean.email"
              :to="`/teachers/${dean.slug}`"
            />
          </div>
        </section>

        <section v-if="departments.length" class="block">
          <h2>{{ t({ uk: 'Кафедри', en: 'Departments' }) }}</h2>
          <div class="deps">
            <RouterLink v-for="item in departments" :key="item.slug" :to="localePath(`/departments/${item.slug}`)">
              <AppPicture :name="item.image" :alt="t(item.name)" :width="800" :height="520" sizes="(min-width: 1024px) 240px, 100vw" />
              <strong>{{ t(item.name) }}</strong>
            </RouterLink>
          </div>
        </section>

        <section class="block">
          <h2>{{ t({ uk: 'Освітні програми', en: 'Programmes' }) }}</h2>
          <ul>
            <li v-for="program in faculty.programs" :key="t(program)">{{ t(program) }}</li>
          </ul>
          <RouterLink class="btn btn-line" :to="localePath('/education')">{{ t({ uk: 'Усі програми', en: 'All programmes' }) }}</RouterLink>
        </section>
      </div>
    </div>
    <div class="page" v-else>
      <div class="container">
        <h1>{{ t({ uk: 'Підрозділ не знайдено', en: 'Unit not found' }) }}</h1>
        <RouterLink class="btn btn-primary" :to="localePath('/faculties')">{{ t({ uk: 'До факультетів', en: 'All faculties' }) }}</RouterLink>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
h1 { font-size: clamp(32px, 4vw, 52px); margin-bottom: 12px; }
.intro { display: grid; gap: 24px; align-items: center; }
.intro :deep(picture) { border-radius: 20px; overflow: hidden; aspect-ratio: 16 / 10; }
.block { margin-top: 48px; }
.block h2 { margin-bottom: 16px; }
.dean { max-width: 320px; }
.deps { display: grid; gap: 16px; }
.deps a {
  display: grid;
  color: var(--navy);
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
}
.deps :deep(picture) { aspect-ratio: 16 / 10; }
.deps strong { padding: 14px 14px 16px; }
ul { margin: 0 0 18px; padding-left: 18px; display: grid; gap: 8px; }
.btn { margin-top: 8px; }
@media (min-width: 900px) {
  .intro { grid-template-columns: 1.1fr 0.9fr; }
  .deps { grid-template-columns: repeat(3, 1fr); }
}
</style>
