import type { Department, Faculty, L } from '@/types/content'

const dept = (
  slug: string,
  facultySlug: string,
  name: L,
  image: string,
  teacherSlugs: string[] = [],
): Department => ({
  slug,
  facultySlug,
  name,
  image,
  teacherSlugs,
  email: `${slug}@uni-sport.edu.ua`,
  phone: '+38 (044) 287-54-52',
  summary: {
    uk: `${name.uk} входить до структури університету. На сторінці — склад, освітні компоненти, практика і контакти в одному оформленні.`,
    en: `${name.en} is part of the university. This page keeps staff, courses, placement and contacts in one design.`,
  },
})

export const departments: Department[] = [
  dept('gymnastics', 'coaching', { uk: 'Кафедра гімнастики та складнокоординаційних видів спорту', en: 'Department of Gymnastics and Aesthetic Sports' }, 'gymnastics-hall'),
  dept('adaptive', 'coaching', { uk: 'Кафедра професійного, неолімпійського та адаптивного спорту', en: 'Department of Professional, Non-Olympic and Adaptive Sport' }, 'rehab-session'),
  dept('games', 'coaching', { uk: 'Кафедра спортивних ігор', en: 'Department of Sports Games' }, 'basketball-court', ['prokopenko-anastasiia']),
  dept('football', 'coaching', { uk: 'Кафедра футболу', en: 'Department of Football' }, 'football-training', ['bayrachnyi-oleh']),
  dept('choreography', 'coaching', { uk: 'Кафедра хореографії і танцювальних видів спорту', en: 'Department of Choreography and Dance Sport' }, 'gymnastics-hall'),
  dept('water', 'sport-management', { uk: 'Кафедра водних видів спорту', en: 'Department of Water Sports' }, 'pool-training'),
  dept('athletics', 'sport-management', { uk: 'Кафедра легкої атлетики, зимових видів і велосипедного спорту', en: 'Department of Athletics, Winter Sports and Cycling' }, 'hero-stadium'),
  dept('management', 'sport-management', { uk: 'Кафедра менеджменту і економіки спорту', en: 'Department of Sport Management and Economics' }, 'lecture-hall'),
  dept('martial', 'sport-management', { uk: 'Кафедра спортивних єдиноборств та силових видів спорту', en: 'Department of Combat and Strength Sports' }, 'basketball-court'),
  dept('humanities', 'sport-management', { uk: 'Кафедра соціально-гуманітарних дисциплін', en: 'Department of Social Sciences and Humanities' }, 'lecture-hall'),
  dept('therapy', 'health', { uk: 'Кафедра терапії та реабілітації', en: 'Department of Therapy and Rehabilitation' }, 'rehab-session'),
  dept('recreation', 'health', { uk: 'Кафедра оздоровчо-рекреаційної рухової активності', en: 'Department of Health-Enhancing Physical Activity' }, 'hero-stadium'),
  dept('pe-theory', 'health', { uk: 'Кафедра теорії і методики фізичного виховання', en: 'Department of Theory and Methods of Physical Education' }, 'lecture-hall'),
  dept('esports', 'health', { uk: 'Кафедра кіберспорту та інформаційних технологій', en: 'Department of Esports and Information Technology' }, 'science-lab'),
  dept('public-health', 'health', { uk: 'Кафедра медицини, громадського здоров’я та екології спорту', en: 'Department of Medicine, Public Health and Sport Ecology' }, 'science-lab'),
  dept('kinesiology', 'health', { uk: 'Кафедра кінезіології та фізкультурно-спортивної реабілітації', en: 'Department of Kinesiology and Sport Rehabilitation' }, 'rehab-session'),
  dept('dietology', 'health', { uk: 'Кафедра медичної біології та спортивної дієтології', en: 'Department of Medical Biology and Sport Dietetics' }, 'science-lab'),
  dept('olympic-history', 'olympic', { uk: 'Кафедра історії та теорії олімпійського спорту', en: 'Department of History and Theory of Olympic Sport' }, 'campus-building'),
  dept('languages', 'olympic', { uk: 'Кафедра української та іноземних мов', en: 'Department of Ukrainian and Foreign Languages' }, 'lecture-hall'),
  dept('psychology', 'olympic', { uk: 'Кафедра психології і педагогіки', en: 'Department of Psychology and Pedagogy' }, 'lecture-hall'),
]

export const faculties: Faculty[] = [
  {
    slug: 'coaching',
    kind: 'faculty',
    name: { uk: 'Тренерський факультет', en: 'Coaching Faculty' },
    summary: {
      uk: 'Готує тренерів для клубів, дитячо-юнацьких шкіл і національних команд. Тут зібрані кафедри ігрових, складнокоординаційних і адаптивних видів спорту.',
      en: 'Trains coaches for clubs, youth schools and national teams. It brings together departments of team, aesthetic and adaptive sports.',
    },
    image: 'football-training',
    deanSlug: 'honcharenko-yevhen',
    phone: '+38 (044) 287-05-80',
    email: 'trefa1930@gmail.com',
    departmentSlugs: ['gymnastics', 'adaptive', 'games', 'football', 'choreography'],
    programs: [
      { uk: 'Тренерська діяльність в обраному виді спорту', en: 'Coaching in a chosen sport' },
      { uk: 'Хореографія', en: 'Choreography' },
      { uk: 'Кіберспорт', en: 'Esports' },
    ],
  },
  {
    slug: 'sport-management',
    kind: 'faculty',
    name: { uk: 'Факультет спорту та менеджменту', en: 'Faculty of Sport and Management' },
    summary: {
      uk: 'Поєднує підготовку тренерів водних, легкоатлетичних і силових видів із менеджментом спортивної діяльності.',
      en: 'Combines coaching in water, athletic and strength sports with sport management.',
    },
    image: 'pool-training',
    phone: '+38 (044) 289-41-93',
    email: 'fsm@uni-sport.edu.ua',
    departmentSlugs: ['water', 'athletics', 'management', 'martial', 'humanities'],
    programs: [
      { uk: 'Менеджмент у спортивній діяльності', en: 'Management in sport' },
      { uk: 'Спорт', en: 'Sport' },
    ],
  },
  {
    slug: 'health',
    kind: 'faculty',
    name: { uk: 'Інститут здоров’я, реабілітації та фізичного виховання', en: 'Institute of Health, Rehabilitation and Physical Education' },
    summary: {
      uk: 'Зосереджений на фізичній терапії, громадському здоров’ї, фізичному вихованні і руховій активності.',
      en: 'Focuses on physical therapy, public health, physical education and physical activity.',
    },
    image: 'rehab-session',
    phone: '+38 (044) 287-64-38',
    email: 'health@uni-sport.edu.ua',
    departmentSlugs: ['therapy', 'recreation', 'pe-theory', 'esports', 'public-health', 'kinesiology', 'dietology'],
    programs: [
      { uk: 'Фізична терапія', en: 'Physical therapy' },
      { uk: 'Ерготерапія', en: 'Occupational therapy' },
      { uk: 'Громадське здоров’я', en: 'Public health' },
      { uk: 'Фізичне виховання', en: 'Physical education' },
    ],
  },
  {
    slug: 'olympic',
    kind: 'faculty',
    name: { uk: 'Навчально-науковий олімпійський інститут', en: 'Olympic Institute' },
    summary: {
      uk: 'Досліджує олімпійський спорт, освіту і спадщину. Має власні лабораторії і музей олімпійської слави.',
      en: 'Studies Olympic sport, education and heritage. It has its own laboratories and the Olympic Glory Museum.',
    },
    image: 'hero-stadium',
    phone: '+38 (044) 287-68-21',
    email: 'olympic@uni-sport.edu.ua',
    departmentSlugs: ['olympic-history', 'languages', 'psychology'],
    programs: [
      { uk: 'Олімпійський спорт і освіта', en: 'Olympic sport and education' },
      { uk: 'Спортивна підготовка в олімпійському виді спорту', en: 'Preparation in an Olympic sport' },
    ],
  },
  {
    slug: 'postgraduate',
    kind: 'faculty',
    name: { uk: 'Інститут післядипломної освіти', en: 'Institute of Postgraduate Education' },
    summary: {
      uk: 'Веде заочне навчання бакалаврів і магістрів, курси підвищення кваліфікації та сертифікатні програми.',
      en: 'Runs part-time bachelor and master study, professional development and certificate programmes.',
    },
    image: 'lecture-hall',
    phone: '+38 (044) 287-55-24',
    email: 'ipo@uni-sport.edu.ua',
    departmentSlugs: [],
    programs: [
      { uk: 'Заочна форма бакалаврату і магістратури', en: 'Part-time bachelor and master study' },
      { uk: 'Курси для викладачів фізичного виховання', en: 'Courses for physical education teachers' },
      { uk: 'Сертифікатні програми з терапії, менеджменту і кіберспорту', en: 'Certificate programmes in therapy, management and esports' },
    ],
  },
  {
    slug: 'ivano-frankivsk',
    kind: 'college',
    name: { uk: 'Івано-Франківський фаховий коледж', en: 'Ivano-Frankivsk College' },
    summary: {
      uk: 'Відокремлений структурний підрозділ. Сторінка коледжу живе в дизайні університету: про навчання, контакти і як долучитися.',
      en: 'A separate structural unit. Its page lives in the university design: study, contacts and how to join.',
    },
    image: 'campus-building',
    phone: '+38 (0342) 52-34-10',
    email: 'college@kfv.if.ua',
    departmentSlugs: [],
    programs: [
      { uk: 'Фахова передвища освіта з фізичного виховання', en: 'Professional pre-higher education in physical education' },
    ],
  },
  {
    slug: 'pidubny',
    kind: 'college',
    name: { uk: 'Олімпійський фаховий коледж імені Івана Піддубного', en: 'Ivan Piddubny Olympic College' },
    summary: {
      uk: 'Відокремлений структурний підрозділ для спортсменів, які поєднують навчання і змагальну підготовку.',
      en: 'A separate unit for athletes who combine study with competitive preparation.',
    },
    image: 'gymnastics-hall',
    phone: '+38 (044) 287-61-00',
    email: 'college@olimpic.college',
    departmentSlugs: [],
    programs: [
      { uk: 'Фахова передвища освіта для спортсменів', en: 'Professional pre-higher education for athletes' },
    ],
  },
]

export function findFaculty(slug: string): Faculty | undefined {
  return faculties.find((item) => item.slug === slug)
}

export function findDepartment(slug: string): Department | undefined {
  return departments.find((item) => item.slug === slug)
}

export function facultyDepartments(faculty: Faculty): Department[] {
  return faculty.departmentSlugs
    .map((slug) => findDepartment(slug))
    .filter((item): item is Department => Boolean(item))
}
