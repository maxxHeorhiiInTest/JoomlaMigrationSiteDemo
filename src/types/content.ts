export type Locale = 'uk' | 'en'

export interface L {
  uk: string
  en: string
}

export interface MenuLink {
  label: L
  to: string
}

export interface MenuGroup {
  title: L
  links: MenuLink[]
}

export interface MenuItem {
  id: string
  label: L
  to?: string
  groups?: MenuGroup[]
}

export interface NewsArticle {
  id: number
  slug: string
  title: L
  excerpt: L
  paragraphs: L[]
  image: string
  publishedAt: string
  category: L
}

export interface Teacher {
  slug: string
  name: L
  position: L
  degree: L
  email: string
  phone: string
  image: string
  departmentSlug: string
  disciplines: L[]
  bio: L[]
  publications: L[]
}

export interface Department {
  slug: string
  facultySlug: string
  name: L
  summary: L
  image: string
  email: string
  phone: string
  teacherSlugs: string[]
}

export interface Faculty {
  slug: string
  name: L
  summary: L
  image: string
  deanSlug?: string
  phone: string
  email: string
  kind: 'faculty' | 'college'
  departmentSlugs: string[]
  programs: L[]
}

export interface Leader {
  name: L
  role: L
  image?: string
  email?: string
}

export interface TopicBlock {
  title: L
  text: L
}

export interface TopicPage {
  slug: 'science' | 'sport' | 'international'
  title: L
  lead: L
  image: string
  blocks: TopicBlock[]
}

export interface SeoInput {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  jsonLd?: Record<string, unknown>
  statusCode: number
  indexable?: boolean
}
