import type { L } from '@/types/content'

export interface Crumb {
  label: L
  to?: string
}

export function useBreadcrumbs(items: Crumb[]): Crumb[] {
  return items
}
