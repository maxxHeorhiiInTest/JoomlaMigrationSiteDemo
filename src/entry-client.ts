import type { StateTree } from 'pinia'
import { createApp } from './main'
import { useLanguageStore } from './stores/language'
import { useSettingsStore } from './stores/settings'
import { applyHead } from './utils/seo'

const { app, router, pinia } = createApp()

if (typeof window !== 'undefined' && window.__PINIA__) {
  pinia.state.value = window.__PINIA__ as Record<string, StateTree>
}

router.isReady().then(() => {
  app.mount('#app')
  const settings = useSettingsStore(pinia)
  const language = useLanguageStore(pinia)
  applyHead(settings.seo, language.locale, window.location.origin)
})
