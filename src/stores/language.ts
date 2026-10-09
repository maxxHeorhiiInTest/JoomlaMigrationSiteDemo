import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Locale } from '@/types/content'
import { localePath, stripLocale } from '@/utils/i18n'

export const useLanguageStore = defineStore('language', () => {
  const locale = ref<Locale>('uk')

  function setLocale(value: Locale) {
    locale.value = value
  }

  const other = computed<Locale>(() => (locale.value === 'uk' ? 'en' : 'uk'))

  function switchPath(fullPath: string): string {
    const queryIndex = fullPath.indexOf('?')
    const path = queryIndex === -1 ? fullPath : fullPath.slice(0, queryIndex)
    const query = queryIndex === -1 ? '' : fullPath.slice(queryIndex)
    return `${localePath(stripLocale(path), other.value)}${query}`
  }

  function label(value: { uk: string; en: string }): string {
    return value[locale.value]
  }

  return { locale, other, setLocale, switchPath, label }
})
