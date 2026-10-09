import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useLanguageStore } from '@/stores/language'
import type { SeoInput } from '@/types/content'
import { applyHead } from '@/utils/seo'
import { isBrowser } from '@/utils/browser'
import { stripLocale } from '@/utils/i18n'

export function useSeo(factory: () => SeoInput) {
  const settings = useSettingsStore()
  const language = useLanguageStore()
  const route = useRoute()

  watchEffect(() => {
    void route.fullPath
    const seo = factory()
    const path = stripLocale(seo.path.split('?')[0].split('#')[0] || '/')
    const next = { ...seo, path }
    settings.setSeo(next)
    if (isBrowser()) applyHead(next, language.locale, window.location.origin)
  })
}
