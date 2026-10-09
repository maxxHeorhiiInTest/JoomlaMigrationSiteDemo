<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { erasmusProjects } from '@/data/erasmus'

const { t, localePath } = useLanguage()
</script>

<template>
  <ul class="projects">
    <li v-for="project in erasmusProjects" :key="project.slug" :id="project.slug">
      <RouterLink :to="localePath(`/international#${project.slug}`)">
        <strong>{{ project.code }}</strong>
        <span>{{ t(project.title) }}</span>
        <em>{{ t(project.text) }}</em>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.projects {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

li { scroll-margin-top: calc(var(--header) + 16px); }

a {
  display: grid;
  gap: 4px;
  height: 100%;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--white);
  color: var(--navy);
  text-decoration: none;
}

a:hover { border-color: var(--blue); }

strong { font-size: 18px; }

span, em { color: var(--muted); font-style: normal; font-weight: 400; font-size: 15px; }

@media (min-width: 768px) {
  .projects { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1100px) {
  .projects { grid-template-columns: repeat(4, 1fr); }
}
</style>
