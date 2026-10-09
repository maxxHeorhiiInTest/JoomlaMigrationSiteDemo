import type { L } from '@/types/content'

export interface ErasmusProject {
  slug: string
  code: string
  title: L
  text: L
}

export const erasmusProjects: ErasmusProject[] = [
  {
    slug: 'ire',
    code: 'IRE',
    title: {
      uk: 'Innovative Rehabilitation Education',
      en: 'Innovative Rehabilitation Education',
    },
    text: {
      uk: 'Нові магістерські програми з реабілітації в Україні.',
      en: 'New master programmes in rehabilitation in Ukraine.',
    },
  },
  {
    slug: 'colapa',
    code: 'COLAPA',
    title: {
      uk: 'Collaborative learning in adapted physical activity',
      en: 'Collaborative learning in adapted physical activity',
    },
    text: {
      uk: 'Спільне онлайн- і очне навчання з адаптивної рухової активності.',
      en: 'Online and onsite learning in adapted physical activity.',
    },
  },
  {
    slug: 'pacap',
    code: 'PACAP',
    title: {
      uk: 'Promotion of physical activity for cancer patients',
      en: 'Promotion of physical activity for cancer patients',
    },
    text: {
      uk: 'Рухова активність для людей, які живуть з онкологічним діагнозом.',
      en: 'Physical activity for people living with cancer.',
    },
  },
  {
    slug: 'golftegration',
    code: 'Golftegration',
    title: {
      uk: 'Golf and Pitch & Putt',
      en: 'Golf and Pitch & Putt',
    },
    text: {
      uk: 'Гольф і Pitch & Putt для якості життя людей із різними захворюваннями.',
      en: 'Golf and Pitch & Putt for quality of life across different conditions.',
    },
  },
  {
    slug: 'cycle-paths',
    code: 'Cycle Paths',
    title: {
      uk: 'Social Act plus: Cycling for Inclusion and Wellbeing',
      en: 'Social Act plus: Cycling for Inclusion and Wellbeing',
    },
    text: {
      uk: 'Велорух для включення і добробуту.',
      en: 'Cycling for inclusion and wellbeing.',
    },
  },
  {
    slug: 'genderwise',
    code: 'GENDERWISE',
    title: {
      uk: 'Promoting Gender Equality in Sports Leadership',
      en: 'Promoting Gender Equality in Sports Leadership',
    },
    text: {
      uk: 'Гендерна рівність у спортивному лідерстві.',
      en: 'Gender equality in sports leadership.',
    },
  },
  {
    slug: 'eugovsport',
    code: 'EUGOVSport',
    title: {
      uk: 'EU Sport Values and Governance',
      en: 'EU Sport Values and Governance',
    },
    text: {
      uk: 'Європейські цінності спорту, доброчесність і формування політики.',
      en: 'European sport values, integrity and policy-making.',
    },
  },
]
