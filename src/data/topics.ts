import type { TopicPage } from '@/types/content'

export const topics: TopicPage[] = [
  {
    slug: 'science',
    title: { uk: 'Наука', en: 'Research' },
    lead: {
      uk: 'Дослідження, наукові школи, конференції, видання і підготовка докторів філософії зібрані в одному розділі.',
      en: 'Research, schools of thought, conferences, journals and doctoral study live in one section.',
    },
    image: 'science-lab',
    blocks: [
      { title: { uk: 'Напрямки', en: 'Directions' }, text: { uk: 'План науково-дослідної роботи на 2026–2030 роки, теми кафедр і звіти.', en: 'The 2026–2030 research plan, department topics and reports.' } },
      { title: { uk: 'Видання', en: 'Journals' }, text: { uk: 'Sport Science Spectrum, «Спортивна медицина, фізична терапія та ерготерапія», «Спорт. Освіта. Здоров’я». Кожне видання має сторінку університету.', en: 'Sport Science Spectrum and the university’s therapy and education journals. Each has a university page.' } },
      { title: { uk: 'Аспірантура', en: 'Doctoral study' }, text: { uk: 'Фізична культура і спорт, фізіологія, терапія та реабілітація. Вступ, атестація і спеціалізовані ради поруч.', en: 'Physical culture and sport, physiology, therapy and rehabilitation. Admission, attestation and councils sit together.' } },
    ],
  },
  {
    slug: 'sport',
    title: { uk: 'Спорт', en: 'Sport' },
    lead: {
      uk: 'Рейтинг спортивної роботи, спартакіади і збірні команди. Бази університету описані тут же, без переходу на чужі сайти.',
      en: 'Sport rankings, university games and teams. Facilities are described here, without a jump to another website.',
    },
    image: 'hero-stadium',
    blocks: [
      { title: { uk: 'Рейтинг', en: 'Ranking' }, text: { uk: 'Положення і результати рейтингу кафедр зі спортивної роботи.', en: 'Rules and results of the departments’ sport-work ranking.' } },
      { title: { uk: 'Масовий спорт', en: 'University sport' }, text: { uk: 'Оцінювання фізичної підготовленості, спартакіади студентів і працівників, календар заходів.', en: 'Fitness assessment, student and staff games, and the events calendar.' } },
      { title: { uk: 'Бази', en: 'Facilities' }, text: { uk: 'Комплекс «Олімпійський стиль», вело-лижна база, центр травматології і науково-дослідний інститут.', en: 'The Olympic Style complex, the ski and cycle base, the trauma centre and the research institute.' } },
    ],
  },
  {
    slug: 'international',
    title: { uk: 'Міжнародна діяльність', en: 'International' },
    lead: {
      uk: 'Вступ для іноземних студентів, програми Erasmus+ і партнери. Англійська версія сайту повторює ту саму структуру.',
      en: 'Admission for international students, Erasmus+ projects and partners. The English site repeats the same structure.',
    },
    image: 'campus-building',
    blocks: [
      { title: { uk: 'Іноземним студентам', en: 'International students' }, text: { uk: 'Про університет, освітні програми і порядок вступу англійською.', en: 'About the university, academic programmes and how to apply, in English.' } },
      { title: { uk: 'Партнери', en: 'Partners' }, text: { uk: 'Каталог університетів-партнерів замість довгого списку голих адрес.', en: 'A directory of partner universities instead of a long list of bare links.' } },
    ],
  },
]

export function findTopic(slug: string): TopicPage | undefined {
  return topics.find((item) => item.slug === slug)
}
