import type { Locale, SeoInput } from '@/types/content'
import { localePath } from '@/utils/i18n'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function absolute(origin: string, value: string): string {
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  return `${origin}${value.startsWith('/') ? value : `/${value}`}`
}

export function seoModel(seo: SeoInput, locale: Locale, origin: string) {
  const canonical = absolute(origin, localePath(seo.path, locale))
  const image = absolute(origin, seo.image || '/media/hero-stadium-1600.jpg')
  return {
    canonical,
    image,
    uk: absolute(origin, localePath(seo.path, 'uk')),
    en: absolute(origin, localePath(seo.path, 'en')),
    localeTag: locale === 'uk' ? 'uk_UA' : 'en_GB',
    robots: seo.statusCode === 404 || seo.indexable === false ? 'noindex, follow' : 'index, follow',
  }
}

export function renderHead(seo: SeoInput, locale: Locale, origin: string): string {
  const model = seoModel(seo, locale, origin)
  const json = seo.jsonLd
    ? JSON.stringify(seo.jsonLd).replaceAll('<', '\\u003c')
    : ''
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta data-seo="description" name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta data-seo="robots" name="robots" content="${model.robots}" />`,
    `<link data-seo="canonical" rel="canonical" href="${escapeHtml(model.canonical)}" />`,
    `<link data-seo="alt-uk" rel="alternate" hreflang="uk" href="${escapeHtml(model.uk)}" />`,
    `<link data-seo="alt-en" rel="alternate" hreflang="en" href="${escapeHtml(model.en)}" />`,
    `<link data-seo="alt-x" rel="alternate" hreflang="x-default" href="${escapeHtml(model.uk)}" />`,
    `<meta data-seo="og:type" property="og:type" content="${seo.type || 'website'}" />`,
    `<meta data-seo="og:title" property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta data-seo="og:description" property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta data-seo="og:url" property="og:url" content="${escapeHtml(model.canonical)}" />`,
    `<meta data-seo="og:image" property="og:image" content="${escapeHtml(model.image)}" />`,
    `<meta data-seo="og:locale" property="og:locale" content="${model.localeTag}" />`,
    `<meta data-seo="twitter:card" name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo="twitter:title" name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta data-seo="twitter:description" name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta data-seo="twitter:image" name="twitter:image" content="${escapeHtml(model.image)}" />`,
  ]
  if (json) tags.push(`<script data-seo="jsonld" type="application/ld+json">${json}</script>`)
  return tags.join('\n')
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[data-seo="${key}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('data-seo', key)
    el.setAttribute(attr, key)
    document.head.append(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(key: string, rel: string, href: string, hreflang?: string) {
  const selector = `link[data-seo="${key}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('data-seo', key)
    document.head.append(el)
  }
  el.setAttribute('rel', rel)
  el.setAttribute('href', href)
  if (hreflang) el.setAttribute('hreflang', hreflang)
}

export function applyHead(seo: SeoInput, locale: Locale, origin: string) {
  if (typeof document === 'undefined') return
  const model = seoModel(seo, locale, origin)
  document.documentElement.lang = locale
  document.title = seo.title
  upsertMeta('name', 'description', seo.description)
  upsertMeta('name', 'robots', model.robots)
  upsertLink('canonical', 'canonical', model.canonical)
  upsertLink('alt-uk', 'alternate', model.uk, 'uk')
  upsertLink('alt-en', 'alternate', model.en, 'en')
  upsertLink('alt-x', 'alternate', model.uk, 'x-default')
  upsertMeta('property', 'og:type', seo.type || 'website')
  upsertMeta('property', 'og:title', seo.title)
  upsertMeta('property', 'og:description', seo.description)
  upsertMeta('property', 'og:url', model.canonical)
  upsertMeta('property', 'og:image', model.image)
  upsertMeta('property', 'og:locale', model.localeTag)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', seo.title)
  upsertMeta('name', 'twitter:description', seo.description)
  upsertMeta('name', 'twitter:image', model.image)
  const existing = document.head.querySelector('script[data-seo="jsonld"]')
  if (seo.jsonLd) {
    const script = existing ?? document.createElement('script')
    script.setAttribute('data-seo', 'jsonld')
    script.setAttribute('type', 'application/ld+json')
    script.textContent = JSON.stringify(seo.jsonLd)
    if (!existing) document.head.append(script)
  } else if (existing) {
    existing.remove()
  }
}
