import type { L, Locale } from '@/types/content'

export function textOf(value: L, locale: Locale): string {
  return value[locale]
}

export function localePath(path: string, locale: Locale): string {
  const [pathname, hash] = path.split('#')
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const base = locale === 'en' ? (normalized === '/' ? '/en' : `/en${normalized}`) : normalized
  return hash ? `${base}#${hash}` : base
}

export function stripLocale(path: string): string {
  const [pathname, hash] = path.split('#')
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  return hash ? `${bare}#${hash}` : bare
}
