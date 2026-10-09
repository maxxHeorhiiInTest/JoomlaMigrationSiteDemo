import { defineStore } from 'pinia'
import { menu } from '@/data/menu'

export const useMenuStore = defineStore('menu', () => {
  return { items: menu }
})
