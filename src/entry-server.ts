import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { useLanguageStore } from './stores/language'
import { useSettingsStore } from './stores/settings'
import { renderHead } from './utils/seo'

export async function render(url: string, origin: string) {
  const { app, router, pinia } = createApp()
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  const settings = useSettingsStore(pinia)
  const language = useLanguageStore(pinia)
  const head = renderHead(settings.seo, language.locale, origin)
  return {
    html,
    head,
    state: pinia.state.value,
    status: settings.seo.statusCode,
    lang: language.locale,
  }
}
