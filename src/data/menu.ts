import type { MenuItem } from '@/types/content'

export const menu: MenuItem[] = [
  {
    id: 'university',
    label: { uk: 'Університет', en: 'University' },
    groups: [
      {
        title: { uk: 'Про університет', en: 'About' },
        links: [
          { label: { uk: 'Загальні відомості', en: 'Overview' }, to: '/university' },
          { label: { uk: 'Керівництво', en: 'Leadership' }, to: '/university#leadership' },
          { label: { uk: 'Вчена рада', en: 'Academic council' }, to: '/university#council' },
        ],
      },
      {
        title: { uk: 'Структура', en: 'Structure' },
        links: [
          { label: { uk: 'Факультети та інститути', en: 'Faculties and institutes' }, to: '/faculties' },
          { label: { uk: 'Відокремлені підрозділи', en: 'Separate units' }, to: '/faculties#colleges' },
          { label: { uk: 'Відділи, центри і бази', en: 'Offices and centres' }, to: '/university#structure' },
        ],
      },
      {
        title: { uk: 'Документи', en: 'Documents' },
        links: [
          { label: { uk: 'Офіційні документи', en: 'Official documents' }, to: '/university#documents' },
          { label: { uk: 'Звіти ректора', en: 'Rector’s reports' }, to: '/university#documents' },
          { label: { uk: 'Фінансова діяльність', en: 'Finances' }, to: '/university#documents' },
        ],
      },
    ],
  },
  {
    id: 'education',
    label: { uk: 'Освіта', en: 'Education' },
    groups: [
      {
        title: { uk: 'Програми', en: 'Programmes' },
        links: [
          { label: { uk: 'Спеціальності', en: 'Fields of study' }, to: '/education' },
          { label: { uk: 'Бакалавр', en: 'Bachelor' }, to: '/education#bachelor' },
          { label: { uk: 'Магістр і аспірантура', en: 'Master and PhD' }, to: '/education#master' },
        ],
      },
      {
        title: { uk: 'Студенту', en: 'Students' },
        links: [
          { label: { uk: 'Розклад і сесія', en: 'Timetable and exams' }, to: '/education#process' },
          { label: { uk: 'Стипендія і оплата', en: 'Scholarships and fees' }, to: '/education#students' },
          { label: { uk: 'Електронне навчання', en: 'E-learning' }, to: '/education#students' },
        ],
      },
      {
        title: { uk: 'Якість', en: 'Quality' },
        links: [
          { label: { uk: 'Ліцензії та акредитація', en: 'Licensing and accreditation' }, to: '/education#quality' },
          { label: { uk: 'Підвищення кваліфікації', en: 'Professional development' }, to: '/education#quality' },
        ],
      },
    ],
  },
  { id: 'admission', label: { uk: 'Вступ', en: 'Admission' }, to: '/admission' },
  { id: 'science', label: { uk: 'Наука', en: 'Research' }, to: '/science' },
  { id: 'sport', label: { uk: 'Спорт', en: 'Sport' }, to: '/sport' },
  { id: 'international', label: { uk: 'Міжнародна', en: 'International' }, to: '/international' },
  { id: 'news', label: { uk: 'Новини', en: 'News' }, to: '/news' },
  { id: 'contacts', label: { uk: 'Контакти', en: 'Contacts' }, to: '/contacts' },
]
