import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePagination<T>(source: () => T[], perPage = 6) {
  const route = useRoute()
  const router = useRouter()
  const page = ref(1)

  watch(
    () => route.query.page,
    (value) => {
      const parsed = Number(Array.isArray(value) ? value[0] : value)
      page.value = Number.isFinite(parsed) && parsed > 0 ? parsed : 1
    },
    { immediate: true },
  )

  const total = computed(() => source().length)
  const pages = computed(() => Math.max(1, Math.ceil(total.value / perPage)))
  const items = computed(() => {
    const start = (page.value - 1) * perPage
    return source().slice(start, start + perPage)
  })

  function go(next: number) {
    const safe = Math.min(Math.max(next, 1), pages.value)
    const query = { ...route.query }
    if (safe === 1) delete query.page
    else query.page = String(safe)
    void router.push({ path: route.path, query })
  }

  return { page, pages, items, total, go }
}
