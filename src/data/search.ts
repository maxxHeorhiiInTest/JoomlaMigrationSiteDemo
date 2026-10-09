import { news } from '@/data/news'
import { teachers } from '@/data/people'
import { departments, faculties } from '@/data/structure'
import type { L } from '@/types/content'

export type SearchKind = 'news' | 'faculty' | 'department' | 'teacher' | 'page'

export interface SearchHit {
  id: string
  kind: SearchKind
  title: L
  text: L
  to: string
}

export const kindLabel: Record<SearchKind, L> = {
  news: { uk: 'Новина', en: 'News' },
  faculty: { uk: 'Факультет', en: 'Faculty' },
  department: { uk: 'Кафедра', en: 'Department' },
  teacher: { uk: 'Викладач', en: 'Teacher' },
  page: { uk: 'Сторінка', en: 'Page' },
}

const pages: SearchHit[] = [
  {
    id: 'page-university',
    kind: 'page',
    to: '/university',
    title: { uk: 'Університет', en: 'University' },
    text: { uk: 'Керівництво, ректор Москаленко, вчена рада, структура, документи', en: 'Leadership, rector, academic council, structure, documents' },
  },
  {
    id: 'page-education',
    kind: 'page',
    to: '/education',
    title: { uk: 'Освіта', en: 'Education' },
    text: { uk: 'Бакалавр, магістр, аспірантура, розклад, стипендія, гуртожиток, акредитація', en: 'Bachelor, master, doctoral study, timetable, scholarship, dormitory' },
  },
  {
    id: 'page-admission',
    kind: 'page',
    to: '/admission',
    title: { uk: 'Вступ 2026', en: 'Admission 2026' },
    text: { uk: 'Приймальна комісія, документи, програми, pk@uni-sport.edu.ua', en: 'Admissions office, documents, programmes' },
  },
  {
    id: 'page-science',
    kind: 'page',
    to: '/science',
    title: { uk: 'Наука', en: 'Research' },
    text: { uk: 'Наукові школи, журнали, конференції, аспірантура', en: 'Research schools, journals, conferences, doctoral study' },
  },
  {
    id: 'page-sport',
    kind: 'page',
    to: '/sport',
    title: { uk: 'Спорт', en: 'Sport' },
    text: { uk: 'Збірні, спартакіада, рейтинг кафедр, спортивні бази', en: 'Teams, university games, department ranking, sport bases' },
  },
  {
    id: 'page-international',
    kind: 'page',
    to: '/international',
    title: { uk: 'Міжнародна діяльність', en: 'International' },
    text: { uk: 'Іноземні студенти, Erasmus, партнери', en: 'International students, Erasmus, partners' },
  },
  {
    id: 'page-news',
    kind: 'page',
    to: '/news',
    title: { uk: 'Новини', en: 'News' },
    text: { uk: 'Стрічка новин університету', en: 'University news feed' },
  },
  {
    id: 'page-faculties',
    kind: 'page',
    to: '/faculties',
    title: { uk: 'Факультети та інститути', en: 'Faculties and institutes' },
    text: { uk: 'Факультети, інститути, коледжі, відокремлені підрозділи', en: 'Faculties, institutes, colleges, separate units' },
  },
  {
    id: 'page-contacts',
    kind: 'page',
    to: '/contacts',
    title: { uk: 'Контакти', en: 'Contacts' },
    text: { uk: 'вул. Фізкультури 1, Київ, ректорат, телефон', en: '1 Fizkultury Street, Kyiv, rectorate, phone' },
  },
]

const catalog: SearchHit[] = [
  ...pages,
  ...news.map((item) => ({
    id: `news-${item.slug}`,
    kind: 'news' as const,
    to: `/news/${item.slug}`,
    title: item.title,
    text: item.excerpt,
  })),
  ...faculties.map((item) => ({
    id: `faculty-${item.slug}`,
    kind: 'faculty' as const,
    to: `/faculties/${item.slug}`,
    title: item.name,
    text: {
      uk: `${item.summary.uk} ${item.programs.map((program) => program.uk).join(', ')}`,
      en: `${item.summary.en} ${item.programs.map((program) => program.en).join(', ')}`,
    },
  })),
  ...departments.map((item) => ({
    id: `department-${item.slug}`,
    kind: 'department' as const,
    to: `/departments/${item.slug}`,
    title: item.name,
    text: item.summary,
  })),
  ...teachers.map((item) => ({
    id: `teacher-${item.slug}`,
    kind: 'teacher' as const,
    to: `/teachers/${item.slug}`,
    title: item.name,
    text: {
      uk: `${item.position.uk}. ${item.degree.uk}. ${item.disciplines.map((row) => row.uk).join(', ')}`,
      en: `${item.position.en}. ${item.degree.en}. ${item.disciplines.map((row) => row.en).join(', ')}`,
    },
  })),
]

function normalize(value: string): string {
  return value.toLowerCase().replaceAll('’', "'").replaceAll('ʼ', "'")
}

export function searchContent(raw: string): SearchHit[] {
  const query = normalize(raw.trim())
  if (query.length < 2) return []
  return catalog.filter((item) => {
    const haystack = normalize(`${item.title.uk} ${item.title.en} ${item.text.uk} ${item.text.en}`)
    return haystack.includes(query)
  })
}
