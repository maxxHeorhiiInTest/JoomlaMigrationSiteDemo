import { createMemoryHistory, createRouter, createWebHistory, type Router } from 'vue-router'

const HomePage = () => import('@/pages/HomePage.vue')
const NewsListPage = () => import('@/pages/NewsListPage.vue')
const NewsArticlePage = () => import('@/pages/NewsArticlePage.vue')
const FacultiesPage = () => import('@/pages/FacultiesPage.vue')
const FacultyPage = () => import('@/pages/FacultyPage.vue')
const DepartmentPage = () => import('@/pages/DepartmentPage.vue')
const TeacherPage = () => import('@/pages/TeacherPage.vue')
const UniversityPage = () => import('@/pages/UniversityPage.vue')
const EducationPage = () => import('@/pages/EducationPage.vue')
const AdmissionPage = () => import('@/pages/AdmissionPage.vue')
const TopicPage = () => import('@/pages/TopicPage.vue')
const ContactsPage = () => import('@/pages/ContactsPage.vue')
const SearchPage = () => import('@/pages/SearchPage.vue')
const NotFoundPage = () => import('@/pages/NotFoundPage.vue')

function pages() {
  return [
    { path: '', component: HomePage },
    { path: 'news', component: NewsListPage },
    { path: 'news/:slug', component: NewsArticlePage },
    { path: 'faculties', component: FacultiesPage },
    { path: 'faculties/:slug', component: FacultyPage },
    { path: 'departments/:slug', component: DepartmentPage },
    { path: 'teachers/:slug', component: TeacherPage },
    { path: 'university', component: UniversityPage },
    { path: 'education', component: EducationPage },
    { path: 'admission', component: AdmissionPage },
    { path: 'science', component: TopicPage, props: { topic: 'science' } },
    { path: 'sport', component: TopicPage, props: { topic: 'sport' } },
    { path: 'international', component: TopicPage, props: { topic: 'international' } },
    { path: 'contacts', component: ContactsPage },
    { path: 'search', component: SearchPage },
    { path: ':pathMatch(.*)*', component: NotFoundPage },
  ]
}

export function createSiteRouter(): Router {
  const history = typeof window === 'undefined' ? createMemoryHistory() : createWebHistory()
  return createRouter({
    history,
    scrollBehavior(to) {
      if (to.hash) return { el: to.hash, top: 96 }
      return { top: 0 }
    },
    routes: [
      { path: '/', children: pages() },
      { path: '/en', children: pages() },
    ],
  })
}
