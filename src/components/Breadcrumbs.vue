<script setup lang="ts">
import { computed } from 'vue'
import type { Crumb } from '@/composables/useBreadcrumbs'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps<{ items: Crumb[] }>()
const { t, localePath, locale } = useLanguage()

const trail = computed(() => [
  { label: locale.value === 'uk' ? 'Головна' : 'Home', to: localePath('/') },
  ...props.items.map((item) => ({
    label: t(item.label),
    to: item.to ? localePath(item.to) : undefined,
  })),
])
</script>

<template>
  <nav class="crumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in trail" :key="`${item.label}-${index}`">
        <RouterLink v-if="item.to && index < trail.length - 1" :to="item.to">{{ item.label }}</RouterLink>
        <span v-else aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
.crumbs { margin-bottom: 22px; }

ol {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 0;
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--muted);
  font-size: 14px;
}

li:not(:last-child)::after {
  content: '/';
  margin: 0 8px;
  color: #9aa3b8;
}

a { color: var(--navy); text-decoration: none; }
a:hover { color: var(--blue); }
</style>
