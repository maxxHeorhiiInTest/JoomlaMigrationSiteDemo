<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import type { Locale } from '@/types/content'
import { localePath, stripLocale } from '@/utils/i18n'

const route = useRoute()
const language = useLanguageStore()

const items: { code: Locale; label: string }[] = [
  { code: 'uk', label: 'UA' },
  { code: 'en', label: 'EN' },
]

const label = computed(() => (language.locale === 'uk' ? 'Мова' : 'Language'))

function href(code: Locale): string {
  const full = route.fullPath
  const queryIndex = full.indexOf('?')
  const path = queryIndex === -1 ? full : full.slice(0, queryIndex)
  const query = queryIndex === -1 ? '' : full.slice(queryIndex)
  return `${localePath(stripLocale(path), code)}${query}`
}
</script>

<template>
  <div class="switch" role="group" :aria-label="label">
    <RouterLink
      v-for="item in items"
      :key="item.code"
      :to="href(item.code)"
      :class="{ current: language.locale === item.code }"
      :aria-current="language.locale === item.code ? 'page' : undefined"
      :lang="item.code"
    >
      {{ item.label }}
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.switch {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.45);
}

a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 32px;
  padding: 0 8px;
  border-radius: 999px;
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

a.current {
  background: var(--white);
  color: var(--navy);
}

a:not(.current):hover { background: rgba(255, 255, 255, 0.14); }
</style>
