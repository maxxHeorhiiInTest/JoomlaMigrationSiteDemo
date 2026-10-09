<script setup lang="ts">
import AppPicture from '@/components/AppPicture.vue'
import { useLanguage } from '@/composables/useLanguage'
import type { L } from '@/types/content'

defineProps<{
  name: L
  role: L
  image?: string
  to?: string
  email?: string
}>()

const { t, localePath } = useLanguage()
</script>

<template>
  <article class="person">
    <AppPicture
      v-if="image"
      :name="image"
      :alt="t(name)"
      :width="640"
      :height="800"
      sizes="(min-width: 768px) 240px, 100vw"
    />
    <div v-else class="fallback" aria-hidden="true">{{ t(name).slice(0, 1) }}</div>
    <div class="card-body">
      <h3>
        <RouterLink v-if="to" :to="localePath(to)">{{ t(name) }}</RouterLink>
        <template v-else>{{ t(name) }}</template>
      </h3>
      <p>{{ t(role) }}</p>
      <a v-if="email" :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </article>
</template>

<style scoped lang="scss">
.person {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.person :deep(img),
.fallback { aspect-ratio: 4 / 5; }

.fallback {
  display: grid;
  place-items: center;
  background: var(--navy);
  color: var(--white);
  font-size: 42px;
  font-weight: 800;
}

h3 { font-size: 18px; }
p, a { color: var(--muted); font-size: 15px; }
a { color: var(--blue); }
</style>
