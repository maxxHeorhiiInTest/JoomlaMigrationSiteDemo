import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '@/stores/language'
import type { L, Locale } from '@/types/content'
import { localePath as toLocalePath } from '@/utils/i18n'

export function useLanguage() {
  const store = useLanguageStore()
  const { locale } = storeToRefs(store)

  function t(value: L): string {
    return value[locale.value]
  }

  function localePath(path: string, target?: Locale): string {
    return toLocalePath(path, target ?? locale.value)
  }

  return { locale, t, localePath, switchPath: store.switchPath }
}
