import type { Locale } from '@/types/content'

const months: Record<Locale, string[]> = {
  uk: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export function formatDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split('-').map(Number)
  if (!year || !month || !day) return iso
  return locale === 'uk'
    ? `${day} ${months.uk[month - 1]} ${year}`
    : `${months.en[month - 1]} ${day}, ${year}`
}
