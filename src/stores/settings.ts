import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SeoInput } from '@/types/content'

const fallback: SeoInput = {
  title: 'НУФВСУ',
  description: '',
  path: '/',
  statusCode: 200,
}

export const useSettingsStore = defineStore('settings', () => {
  const seo = ref<SeoInput>({ ...fallback })

  function setSeo(value: SeoInput) {
    seo.value = value
  }

  return { seo, setSeo }
})
