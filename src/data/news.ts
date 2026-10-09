import type { NewsArticle } from '@/types/content'

export const news: NewsArticle[] = [
  {
    id: 1,
    slug: 'korobeinikov-derzhavna-nahoroda',
    title: {
      uk: 'Вітаємо Коробейнікова Георгія Валерійовича з державною нагородою',
      en: 'Heorhii Korobeinikov receives a state award',
    },
    excerpt: {
      uk: 'Указом Президента України професора НУФВСУ нагороджено орденом «За заслуги» III ступеня.',
      en: 'By presidential decree, a NUPES professor has received the Order of Merit, III class.',
    },
    paragraphs: [
      {
        uk: 'Указом Президента України Георгія Валерійовича Коробейнікова, професора Національного університету фізичного виховання і спорту України, нагороджено орденом «За заслуги» III ступеня.',
        en: 'By a decree of the President of Ukraine, Heorhii Korobeinikov, a professor at the National University of Ukraine on Physical Education and Sport, has received the Order of Merit, III class.',
      },
      {
        uk: 'Відзнака відзначає багаторічну наукову і викладацьку роботу у сфері фізичної культури і спорту. Університет дякує професору за дослідження, які підсилюють підготовку спортсменів і фахівців.',
        en: 'The award recognises years of research and teaching in physical culture and sport. The university thanks the professor for work that strengthens the training of athletes and specialists.',
      },
      {
        uk: 'Офіційне джерело — Указ Президента України. Повний текст документа розміщено на сайті глави держави.',
        en: 'The official source is the presidential decree. The full text is published on the website of the head of state.',
      },
    ],
    image: 'lecture-hall',
    publishedAt: '2026-10-08',
    category: { uk: 'Університет', en: 'University' },
  },
  {
    id: 2,
    slug: 'bulatova-vitseprezydentka-nok',
    title: {
      uk: 'Марію Булатову переобрано на посаду віцепрезидентки НОК України',
      en: 'Mariia Bulatova re-elected vice-president of the NOC of Ukraine',
    },
    excerpt: {
      uk: 'Директорка Навчально-наукового олімпійського інституту продовжить роботу в Національному олімпійському комітеті.',
      en: 'The director of the Olympic Institute will continue her work at the National Olympic Committee.',
    },
    paragraphs: [
      {
        uk: 'Марію Михайлівну Булатову переобрано віцепрезиденткою Національного олімпійського комітету України. Вона очолює Навчально-науковий олімпійський інститут НУФВСУ.',
        en: 'Mariia Bulatova has been re-elected vice-president of the National Olympic Committee of Ukraine. She leads the university’s Olympic Institute.',
      },
      {
        uk: 'Університет вітає це рішення і дякує за послідовну роботу на стику олімпійської освіти, науки і спорту.',
        en: 'The university welcomes the decision and thanks her for steady work at the meeting point of Olympic education, research and sport.',
      },
    ],
    image: 'campus-building',
    publishedAt: '2026-10-06',
    category: { uk: 'Спорт', en: 'Sport' },
  },
  {
    id: 3,
    slug: 'bronza-chempionatu-yevropy-skelelazinnia',
    title: {
      uk: 'Студентка НУФВСУ — бронзова призерка чемпіонату Європи зі скелелазіння',
      en: 'A NUPES student wins European climbing bronze',
    },
    excerpt: {
      uk: 'Результат підтверджено протоколом змагань. Вітаємо спортсменку і тренерську групу.',
      en: 'The result is confirmed by the competition protocol. We congratulate the athlete and her coaches.',
    },
    paragraphs: [
      {
        uk: 'Студентка Національного університету фізичного виховання і спорту України здобула бронзову медаль чемпіонату Європи зі скелелазіння.',
        en: 'A student of the National University of Ukraine on Physical Education and Sport won a bronze medal at the European Climbing Championships.',
      },
      {
        uk: 'Університет вітає спортсменку і кафедру, яка супроводжувала підготовку. Офіційні результати опубліковані організатором змагань.',
        en: 'The university congratulates the athlete and the department that supported her preparation. Official results are published by the organiser.',
      },
    ],
    image: 'climbing',
    publishedAt: '2026-10-02',
    category: { uk: 'Спорт', en: 'Sport' },
  },
  {
    id: 4,
    slug: 'sportosvita-mapa-studentskoho-sportu',
    title: {
      uk: 'НУФВСУ представлено на платформі «Sportosvita»',
      en: 'NUPES joins the Sportosvita student sport map',
    },
    excerpt: {
      uk: 'На мапі студентського спорту зібрано інфраструктуру, види спорту і кадри університету.',
      en: 'The student sport map shows the university’s facilities, sports and staff.',
    },
    paragraphs: [
      {
        uk: 'Університет долучився до всеукраїнського проєкту про спортивну інфраструктуру закладів вищої освіти. Профіль НУФВСУ на платформі «Sportosvita» містить відомості про бази, види спорту і можливості для тренувань.',
        en: 'The university joined a national project on the sports facilities of higher education institutions. The NUPES profile on Sportosvita lists bases, sports and training opportunities.',
      },
      {
        uk: 'Матеріал корисний вступникам, які поєднують навчання і спорт. Посилання на профіль є в розділі «Спорт».',
        en: 'The profile is useful for applicants who combine study and sport. A link is available in the Sport section.',
      },
    ],
    image: 'hero-stadium',
    publishedAt: '2026-06-30',
    category: { uk: 'Вступ', en: 'Admission' },
  },
  {
    id: 5,
    slug: 'final-chempionatu-kyieva-basketbol',
    title: {
      uk: 'Збірна НУФВСУ виграла фінал чемпіонату Києва з баскетболу',
      en: 'The NUPES team wins the Kyiv basketball final',
    },
    excerpt: {
      uk: 'Чоловіча молодіжна команда завершила міський сезон перемогою у фіналі.',
      en: 'The men’s youth team closed the city season with a final win.',
    },
    paragraphs: [
      {
        uk: 'Збірна команда університету здобула перемогу у фіналі чемпіонату міста Києва з баскетболу серед молодіжних чоловічих команд.',
        en: 'The university team won the final of the Kyiv basketball championship among men’s youth teams.',
      },
      {
        uk: 'Матч підготувала кафедра спортивних ігор. Вітаємо гравців і тренерів.',
        en: 'The Department of Sports Games prepared the match. We congratulate the players and coaches.',
      },
    ],
    image: 'basketball-court',
    publishedAt: '2026-05-18',
    category: { uk: 'Факультети', en: 'Faculties' },
  },
  {
    id: 6,
    slug: 'konferentsiia-kafedry-futbolu',
    title: {
      uk: 'На кафедрі футболу відбулася студентська наукова конференція',
      en: 'The football department hosts a student research conference',
    },
    excerpt: {
      uk: 'Студенти представили роботи про сучасний футбол: підготовку, аналітику і методику.',
      en: 'Students presented papers on modern football: preparation, analysis and methods.',
    },
    paragraphs: [
      {
        uk: 'Кафедра футболу провела студентську наукову конференцію «Сучасний футбол: погляд молодих дослідників». Учасники обговорили підготовку гравців, аналіз матчів і роботу тренера в дитячо-юнацькому спорті.',
        en: 'The Department of Football held the student conference “Modern football: a view from young researchers”. Participants discussed player preparation, match analysis and coaching in youth sport.',
      },
      {
        uk: 'Кращі доповіді кафедра рекомендує до студентського наукового товариства.',
        en: 'The department recommends the strongest papers to the student research society.',
      },
    ],
    image: 'football-training',
    publishedAt: '2026-04-22',
    category: { uk: 'Наука', en: 'Research' },
  },
]

export function findNews(slug: string): NewsArticle | undefined {
  return news.find((item) => item.slug === slug)
}
