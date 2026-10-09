import type { Leader, Teacher } from '@/types/content'

export const leaders: Leader[] = [
  {
    name: { uk: 'Москаленко Олександр Вікторович', en: 'Oleksandr Moskalenko' },
    role: { uk: 'В. о. ректора', en: 'Acting rector' },
    image: 'portrait-rector',
    email: 'rectorat@uni-sport.edu.ua',
  },
  {
    name: { uk: 'Борисова Ольга Володимирівна', en: 'Olha Borysova' },
    role: { uk: 'Проректорка з науково-педагогічної роботи', en: 'Vice-rector for academic affairs' },
    image: 'portrait-dean',
    email: 'oborysova@uni-sport.edu.ua',
  },
  {
    name: { uk: 'Шинкарук Оксана Анатоліївна', en: 'Oksana Shynkaruk' },
    role: { uk: 'Проректорка з навчально-методичної роботи', en: 'Vice-rector for education' },
  },
  {
    name: { uk: 'Семененко В’ячеслав Петрович', en: 'Viacheslav Semenenko' },
    role: { uk: 'Проректор з науково-педагогічної роботи', en: 'Vice-rector for academic affairs' },
  },
  {
    name: { uk: 'Возний Богдан Сергійович', en: 'Bohdan Voznyi' },
    role: { uk: 'Проректор з адміністративно-господарської роботи', en: 'Vice-rector for operations' },
  },
]

export const teachers: Teacher[] = [
  {
    slug: 'honcharenko-yevhen',
    name: { uk: 'Гончаренко Євген Володимирович', en: 'Yevhen Honcharenko' },
    position: { uk: 'Декан тренерського факультету', en: 'Dean of the Coaching Faculty' },
    degree: { uk: 'Кандидат наук з фізичного виховання і спорту, доцент', en: 'PhD in physical education and sport, associate professor' },
    email: 'trefa1930@gmail.com',
    phone: '+38 (044) 287-05-80',
    image: 'portrait-dean-man',
    departmentSlug: 'football',
    disciplines: [
      { uk: 'Теорія і методика обраного виду спорту', en: 'Theory and methods of the chosen sport' },
      { uk: 'Професійна діяльність тренера', en: 'Professional coaching practice' },
    ],
    bio: [
      {
        uk: 'Очолює тренерський факультет. Відповідає за освітні програми, розклад і взаємодію кафедр, які готують тренерів для клубів, шкіл і збірних команд.',
        en: 'Leads the Coaching Faculty. Responsible for programmes, the timetable and the departments that train coaches for clubs, schools and national teams.',
      },
    ],
    publications: [
      { uk: 'Методичні матеріали з практики тренера в ігрових видах спорту.', en: 'Teaching notes on coaching practice in team sports.' },
    ],
  },
  {
    slug: 'bayrachnyi-oleh',
    name: { uk: 'Байрачний Олег Васильович', en: 'Oleh Bairachnyi' },
    position: { uk: 'Завідувач кафедри футболу', en: 'Head of the Department of Football' },
    degree: { uk: 'Кандидат наук з фізичного виховання і спорту, доцент', en: 'PhD in physical education and sport, associate professor' },
    email: 'football@uni-sport.edu.ua',
    phone: '+38 (044) 287-05-80',
    image: 'portrait-coach',
    departmentSlug: 'football',
    disciplines: [
      { uk: 'Теорія і методика футболу', en: 'Theory and methods of football' },
      { uk: 'Техніко-тактична підготовка', en: 'Technical and tactical preparation' },
      { uk: 'Практика в дитячо-юнацьких школах', en: 'Placement in youth sport schools' },
    ],
    bio: [
      {
        uk: 'Керує кафедрою футболу тренерського факультету. Поєднує викладання, наукову роботу студентів і супровід команд університету.',
        en: 'Leads the Department of Football at the Coaching Faculty. Combines teaching, student research and support for university teams.',
      },
      {
        uk: 'На сторінці зібрано дисципліни, бази практики і публікації. Контакти кафедри дублюються тут, щоб не відправляти людину на інший сайт.',
        en: 'This page gathers courses, placement bases and publications. Department contacts stay here instead of sending people to another website.',
      },
    ],
    publications: [
      { uk: 'Сучасний футбол: методичний погляд на підготовку студентських команд.', en: 'Modern football: a methodological view of student team preparation.' },
      { uk: 'Матеріали студентської конференції кафедри футболу, 2026.', en: 'Proceedings of the department’s student conference, 2026.' },
    ],
  },
  {
    slug: 'prokopenko-anastasiia',
    name: { uk: 'Прокопенко Анастасія Олександрівна', en: 'Anastasiia Prokopenko' },
    position: { uk: 'Старша викладачка кафедри спортивних ігор', en: 'Senior lecturer, Department of Sports Games' },
    degree: { uk: 'Магістр фізичної культури і спорту', en: 'Master of physical culture and sport' },
    email: 'games@uni-sport.edu.ua',
    phone: '+38 (044) 287-05-80',
    image: 'portrait-student',
    departmentSlug: 'games',
    disciplines: [
      { uk: 'Баскетбол', en: 'Basketball' },
      { uk: 'Волейбол', en: 'Volleyball' },
    ],
    bio: [
      {
        uk: 'Викладає ігрові види спорту і супроводжує студентські команди тренерського факультету.',
        en: 'Teaches team sports and supports student teams of the Coaching Faculty.',
      },
    ],
    publications: [
      { uk: 'Навчальні матеріали з баскетболу для бакалаврських груп.', en: 'Basketball teaching materials for bachelor groups.' },
    ],
  },
]

export function findTeacher(slug: string): Teacher | undefined {
  return teachers.find((item) => item.slug === slug)
}
