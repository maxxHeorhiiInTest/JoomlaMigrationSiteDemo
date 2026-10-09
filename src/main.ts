import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createSiteRouter } from './router'
import { useLanguageStore } from './stores/language'
import '@fontsource/manrope/cyrillic-400.css'
import '@fontsource/manrope/cyrillic-600.css'
import '@fontsource/manrope/cyrillic-800.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-800.css'
import './assets/styles/main.scss'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  const router = createSiteRouter()
  app.use(pinia)
  app.use(router)

  router.beforeEach((to) => {
    const language = useLanguageStore()
    const locale = to.path === '/en' || to.path.startsWith('/en/') ? 'en' : 'uk'
    language.setLocale(locale)
  })

  return { app, router, pinia }
}
