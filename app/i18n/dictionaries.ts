// Bilingual copy for the marketing page. Bulgarian is a first-pass draft —
// have a native speaker proof it. Brand names, project titles, gear, client
// names, social handles and the email are intentionally not translated.
//
// `en` is the source of truth for shape; `bg` must mirror it (enforced by
// the `: Dict` annotation). Array items line up by index with the structural
// arrays kept inside each component.

export type Locale = "en" | "bg";

export const en = {
  common: {
    rights: "All rights reserved",
  },
  nav: {
    home: "Home",
    work: "Work",
    story: "My Story",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  hero: {
    roles: ["Videography", "Photography", "Drone", "Video-editing"],
  },
  camera: {
    words: ["FRAME", "LIGHT", "MOTION", "STORY"],
  },
  about: {
    heading: "About Me",
    body: "I'm Ivan, the videographer behind Kramskoy Visuals. Working with companies, content creators, and everyday people, I've learned what clients truly need. Storytelling is the heart of my work, and my goal is to make something that genuinely means something to you.",
    readStory: "Read my full story",
  },
  story: {
    heading: "My Story",
    paragraphs: [
      "I graduated in Film, Television, and Video from LUCA School of Arts in Brussels in 2025. During my studies I made many short-form documentaries about people's lives and hobbies. Seeing the reactions of the people I filmed is exactly why I fell in love with this work. As a Christian, one of my principles is to bring joy to others, and I quickly realised that videography lets me do exactly that.",
      "I'm based in Dobrich, Bulgaria, where I work with agro companies such as Bayer and Agredo, and as a video editor for Hevesh 5. But I'm not only active in Bulgaria — I'm behind every video published by the Dutch Domino Team. I work across Europe, and longer-distance travel is also possible.",
      "What I truly care about is telling your story in the best possible way: understanding the roots of your ideas and why you do what you do, then capturing that passion and emotion in the final video. That's why it matters so much to me to understand the person I'm working with, so they feel comfortable sharing their story with the world.",
    ],
    closing: "Let's create the best possible video for you, together.",
  },
  work: {
    heading: "Selected Work",
    intro: "A recent film. Press play.",
    watch: "Watch",
    // Lines up by index with WORK in Work.tsx.
    items: [
      { category: "Documentary", meta: ["Dutch Domino Team", "2024"] },
    ],
  },
  services: {
    heading: "Services",
    intro: "Three ways to work together. Each one starts with a conversation, not a template.",
    enquire: "Enquire about {title}",
    items: [
      {
        title: "Documentaries",
        tag: "Film",
        blurb: "Share your story with the world in the most beautiful way. From short features to full-length docs, I'll help you capture real people, real moments, and the heart of what you do.",
        included: [
          "Short & long-form",
          "Interview & story direction",
          "Cinematic edit & color",
          "Music & sound",
        ],
      },
      {
        title: "Real Estate",
        tag: "Property",
        blurb: "High-quality videos and photos of your properties, made to attract buyers, build trust, and help your listings stand out.",
        included: [
          "Video walkthroughs",
          "Photography",
          "Drone & aerial",
          "Fast turnaround",
        ],
      },
      {
        title: "Social Media Marketing",
        tag: "Content",
        blurb: "Grow your audience with consistent, professional social content, shot and edited to fit your brand and perform on every platform.",
        included: [
          "Reels & short-form",
          "Platform-ready formats",
          "Consistent content",
          "Shot & edited in-house",
        ],
      },
    ],
  },
  process: {
    heading: "My Practice",
    intro: "Four steps from first conversation to final files. Simple, clear, and built so you always know what comes next.",
    steps: [
      {
        tag: "Direction",
        title: "Direction & Story",
        body: "We start with a short meeting, online or in person, where you share your idea, goals, and the style you want. I suggest a clear approach and we agree on a plan: locations, schedule, and deliverables.",
      },
      {
        tag: "Production",
        title: "Shoot",
        body: "On shoot day I handle everything needed to capture strong, cinematic visuals.",
      },
      {
        tag: "Post",
        title: "Post-production",
        body: "I deliver the first cut within three weeks of the shoot. The first revision round is free of charge, so we can fine-tune it together.",
      },
      {
        tag: "Delivery",
        title: "Delivery",
        body: "You receive the final video in the formats you need — web, social, or broadcast — optimized for your platforms, with easy-to-download files.",
      },
    ],
  },
  faq: {
    heading: "FAQ",
    intro: "The questions I get asked most. If yours isn't here, just ask.",
    getInTouch: "Get in touch",
    items: [
      {
        q: "How much does a project cost?",
        a: "Every project is priced to scope. After a short call I send a fixed quote, so you know the number before anything is booked and there are no surprises later.",
      },
      {
        q: "How far in advance should I book?",
        a: "For dated events, the earlier the better. Popular weekends go months ahead. Brand and commercial work can often start within a couple of weeks.",
      },
      {
        q: "Do you travel for shoots?",
        a: "Yes, anywhere. Travel and accommodation are added at cost and agreed up front, so they are never a surprise on the invoice.",
      },
      {
        q: "How long until I get the final film?",
        a: "Most edits land within two to four weeks, depending on length and revisions. Rush delivery is possible when the schedule allows.",
      },
      {
        q: "Who owns the finished work?",
        a: "You get full usage rights to the final films and photos. I keep the raw files archived and the right to show the work in my own portfolio.",
      },
      {
        q: "Can I get the raw footage?",
        a: "Usually yes, as an add-on. That said, most clients find the graded, finished film is what they actually need.",
      },
      {
        q: "What are the payment terms?",
        a: "A deposit secures your date, with the balance due on delivery. The exact split is set out in your project agreement before we start.",
      },
    ],
  },
  testimonials: {
    heading: "Kind Words",
    prev: "Previous testimonial",
    next: "Next testimonial",
    goTo: "Go to testimonial {n}",
    // Lines up by index with the structural list in Testimonials.tsx.
    items: [
      {
        quote:
          "Ivan reads a room before he lifts the camera. The film he handed back was the night, exactly as we remembered it.",
        role: "Creative Director",
        client: "Lumen Studio",
        project: "Brand launch film",
      },
      {
        quote:
          "We booked one shoot day and got a brand people actually rewatch. Calm on set, ruthless in the edit.",
        role: "Founder",
        client: "Halden Coffee",
        project: "Brand film",
      },
      {
        quote:
          "He shot our wedding like he'd known us for years. Not a single staged moment, and it's the thing we share most.",
        role: "Couple",
        client: "Private commission",
        project: "Wedding film",
      },
      {
        quote:
          "The grade is what sold me. Our footage suddenly looked like the references we'd given up on hitting.",
        role: "Label Manager",
        client: "Northsound Records",
        project: "Music video",
      },
    ],
  },
  clients: {
    label: "Worked with",
  },
  contact: {
    heading: "Let's make something.",
    intro: "Tell me what you're picturing. I read every message myself and reply within a couple of days.",
    booking: "Currently booking 2026",
    types: ["Documentary", "Real Estate", "Social Media", "Something else"],
    labels: { name: "Name", email: "Email", type: "Project type", message: "Message" },
    placeholders: { message: "What are you making, and when?" },
    errors: {
      name: "Your name, please.",
      email: "A valid email helps me reply.",
      message: "A line or two about the project.",
      send: "Something went wrong. Email me directly or try again in a moment.",
    },
    send: "Send message",
    sending: "Sending…",
    success: {
      title: "Thanks, {first}.",
      body: "Your message is in. I'll get back to you within a couple of days.",
      again: "Send another",
    },
  },
  footer: {
    cols: { navigate: "Navigate", elsewhere: "Elsewhere", contact: "Contact", legal: "Legal" },
    nav: ["Home", "Work", "Services", "My Story", "Contact"],
    legal: ["Privacy", "Terms", "Cookies"],
    travel: "Available for travel",
    backToTop: "Back to top",
  },
  cookie: {
    text: "This site uses cookies to understand how it's used and make it better. See the {policy}.",
    policy: "cookie policy",
    accept: "Accept",
    essential: "Only essential",
  },
  // Legal copy. Bodies use a tiny markdown subset rendered by renderRich in
  // LegalPage.tsx: [label](href) for links and **word** for bold. Bracketed
  // [notes like this] are placeholders for the owner to fill in / confirm with
  // a professional — keep them in both languages so nothing is silently lost.
  legal: {
    backHome: "← Back home",
    lastUpdated: "Last updated:",
    updated: "11 June 2026",
    privacy: {
      title: "Privacy Policy",
      intro:
        "Kramskoy Visuals (“I”, “me”) respects your privacy. This policy explains what I collect when you use this site or get in touch, and what I do with it. For anything unclear, email [kramskoy.visuals@gmail.com](mailto:kramskoy.visuals@gmail.com).",
      sections: [
        {
          heading: "What I collect",
          body: "When you send the contact form, I receive the name, email, project type, and message you provide. When you browse, basic technical data (such as IP address, browser, and pages viewed) may be collected through cookies and analytics. There are no accounts and no payment details handled on this site.",
        },
        {
          heading: "How I use it",
          body: "I use your information to reply to enquiries, plan and deliver work you commission, keep the site working, and improve it. I do not sell your data or use it for advertising.",
        },
        {
          heading: "Legal basis",
          body: "Where applicable, I process data on the basis of your consent (cookies), my legitimate interest in responding to you and running the site, and the performance of a contract when you book a project. [Adjust to your jurisdiction with a professional.]",
        },
        {
          heading: "Sharing",
          body: "I rely on a small number of service providers who process data on my behalf, such as email delivery, website hosting, and analytics. They may only use the data to provide their service to me. [List the specific providers once chosen, for example email and hosting partners.]",
        },
        {
          heading: "Retention",
          body: "Enquiry messages are kept while they are relevant and then deleted. Files relating to a commissioned project are archived in line with your project agreement.",
        },
        {
          heading: "Your rights",
          body: "You can ask to access, correct, delete, or port your data, or object to its use. Email me to make a request. If you are in a region with a data protection authority, you also have the right to lodge a complaint with it.",
        },
        {
          heading: "Cookies",
          body: "This site uses cookies as described in the [Cookie Policy](/cookies).",
        },
        {
          heading: "Changes & contact",
          body: "I may update this policy; the date above shows the latest version. Questions go to [kramskoy.visuals@gmail.com](mailto:kramskoy.visuals@gmail.com).",
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      intro:
        "These terms cover your use of this website. By browsing the site you agree to them. Work commissioned from Kramskoy Visuals is governed by a separate project agreement.",
      sections: [
        {
          heading: "Using this site",
          body: "You may use the site for lawful, personal purposes. The content here is provided for information and to showcase work; please do not misuse, disrupt, or attempt to break the site.",
        },
        {
          heading: "Intellectual property",
          body: "All films, photographs, text, and design on this site are owned by Kramskoy Visuals or its clients and are protected by copyright. You may not copy, reuse, or republish them without written permission.",
        },
        {
          heading: "Enquiries and quotes",
          body: "Sending the contact form is an enquiry, not a contract. Any quote I provide is an estimate until both sides sign a written project agreement, which sets out scope, deliverables, and timing.",
        },
        {
          heading: "Bookings, deposits and payment",
          body: "A deposit secures your date. Payment terms, deposits, and what happens on cancellation are defined in your project agreement, not on this site.",
        },
        {
          heading: "Liability",
          body: "The site is provided “as is”. To the extent permitted by law, I am not liable for indirect or consequential loss arising from your use of it, or from any temporary unavailability.",
        },
        {
          heading: "Third-party links",
          body: "Some links lead to external services such as YouTube or social platforms. I am not responsible for their content or their privacy practices.",
        },
        {
          heading: "Governing law",
          body: "These terms are governed by the laws of [your jurisdiction]. [Confirm with a professional, especially if you operate in the EU.]",
        },
        {
          heading: "Changes & contact",
          body: "I may update these terms; the date above shows the latest version. Questions go to [kramskoy.visuals@gmail.com](mailto:kramskoy.visuals@gmail.com).",
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      intro:
        "Cookies are small files stored on your device that help a website work and understand how it is used. This page explains how this site uses them.",
      sections: [
        {
          heading: "Cookies I use",
          body: "**Essential** cookies keep the site working and remember your cookie choice. **Analytics** cookies help me see how the site is used so I can improve it. [Name the specific analytics tool once chosen.]",
        },
        {
          heading: "Managing cookies",
          body: "You can accept or limit cookies using the banner shown on your first visit. You can also clear or block cookies in your browser settings, though declining essential cookies may affect how the site works.",
        },
        {
          heading: "Your consent",
          body: "Your choice is stored locally on your device. You can change it at any time by clearing this site’s data in your browser, which brings the banner back.",
        },
        {
          heading: "Changes & contact",
          body: "I may update this policy; the date above shows the latest version. Questions go to [kramskoy.visuals@gmail.com](mailto:kramskoy.visuals@gmail.com).",
        },
      ],
    },
  },
};

export type Dict = typeof en;

export const bg: Dict = {
  common: {
    rights: "Всички права запазени",
  },
  nav: {
    home: "Начало",
    work: "Проекти",
    story: "Моята история",
    contact: "Контакт",
    menu: "Меню",
    close: "Затвори",
    language: "Език",
  },
  hero: {
    roles: ["Видеография", "Фотография", "Дрон", "Видео монтаж"],
  },
  camera: {
    words: ["КАДЪР", "СВЕТЛИНА", "ДВИЖЕНИЕ", "ИСТОРИЯ"],
  },
  about: {
    heading: "За мен",
    body: "Аз съм Иван, видеографът зад Kramskoy Visuals. Работейки с компании, създатели на съдържание и обикновени хора, разбрах от какво наистина имат нужда клиентите. Разказването на истории е сърцето на моята работа, а целта ми е да създам нещо, което наистина значи нещо за теб.",
    readStory: "Прочети цялата история",
  },
  story: {
    heading: "Моята история",
    paragraphs: [
      "Завърших „Филм, телевизия и видео“ в LUCA School of Arts в Брюксел през 2025 г. По време на следването си направих много късометражни документални филми за живота и хобитата на хората. Реакциите на хората, които снимах, са точно причината да се влюбя в тази работа. Като християнин, един от принципите ми е да нося радост на другите, и бързо осъзнах, че видеографията ми позволява да правя точно това.",
      "Базиран съм в Добрич, България, където работя с агро компании като Bayer и Agredo, както и като видео монтажист за Hevesh 5. Но не съм активен само в България — зад всяко видео на нидерландския Dutch Domino Team стоя аз. Работя из цяла Европа, а по-далечни пътувания също са възможни.",
      "Това, което истински ме вълнува, е да разкажа твоята история по възможно най-добрия начин: да разбера корените на идеите ти и защо правиш това, което правиш, и после да уловя тази страст и емоция във финалното видео. Затова е толкова важно за мен да разбера човека, с когото работя, за да се чувства спокоен да сподели историята си със света.",
    ],
    closing: "Нека създадем възможно най-доброто видео за теб, заедно.",
  },
  work: {
    heading: "Избрани проекти",
    intro: "Скорошен филм. Натисни play.",
    watch: "Гледай",
    items: [
      { category: "Документален филм", meta: ["Dutch Domino Team", "2024"] },
    ],
  },
  services: {
    heading: "Услуги",
    intro: "Три начина да работим заедно. Всеки започва с разговор, не с шаблон.",
    enquire: "Запитване за {title}",
    items: [
      {
        title: "Документални филми",
        tag: "Филм",
        blurb: "Сподели историята си със света по възможно най-красивия начин. От кратки филми до пълнометражни документални, ще ти помогна да уловиш истински хора, истински моменти и сърцето на това, което правиш.",
        included: [
          "Кратки и дълги форми",
          "Режисура на интервюта и история",
          "Кинематографичен монтаж и цвят",
          "Музика и звук",
        ],
      },
      {
        title: "Недвижими имоти",
        tag: "Имоти",
        blurb: "Висококачествени видеа и снимки на твоите имоти, създадени да привличат купувачи, да изграждат доверие и да открояват обявите ти.",
        included: [
          "Видео обиколки",
          "Фотография",
          "Дрон и въздушни кадри",
          "Бързо изпълнение",
        ],
      },
      {
        title: "Маркетинг в социалните мрежи",
        tag: "Съдържание",
        blurb: "Разрасти аудиторията си с последователно, професионално съдържание, заснето и монтирано да пасва на бранда ти и да работи на всяка платформа.",
        included: [
          "Reels и кратки форми",
          "Формати, готови за всяка платформа",
          "Последователно съдържание",
          "Заснето и монтирано лично",
        ],
      },
    ],
  },
  process: {
    heading: "Моят подход",
    intro: "Четири стъпки от първия разговор до финалните файлове. Просто, ясно и така, че винаги да знаеш какво следва.",
    steps: [
      {
        tag: "Режисура",
        title: "Режисура и история",
        body: "Започваме с кратка среща, онлайн или на живо, на която споделяш идеята, целите и стила, който искаш. Предлагам ясен подход и се разбираме за план: локации, график и резултати.",
      },
      {
        tag: "Продукция",
        title: "Снимки",
        body: "В снимачния ден поемам всичко необходимо, за да уловя силна, кинематографична визия.",
      },
      {
        tag: "Пост",
        title: "Пост-продукция",
        body: "Предавам първия монтаж до три седмици след снимките. Първият кръг корекции е безплатен, за да го изпипаме заедно.",
      },
      {
        tag: "Предаване",
        title: "Предаване",
        body: "Получаваш финалното видео във форматите, от които имаш нужда — уеб, социални мрежи или излъчване — оптимизирано за твоите платформи и лесно за сваляне.",
      },
    ],
  },
  faq: {
    heading: "Въпроси",
    intro: "Въпросите, които ми задават най-често. Ако твоят го няма, просто питай.",
    getInTouch: "Свържи се",
    items: [
      {
        q: "Колко струва един проект?",
        a: "Всеки проект се остойностява спрямо обхвата. След кратък разговор изпращам фиксирана оферта, така че знаеш сумата, преди да е резервирано нещо, и няма изненади после.",
      },
      {
        q: "Колко предварително да резервирам?",
        a: "За събития с дата важи колкото по-рано, толкова по-добре. Популярните уикенди се запазват месеци напред. Бранд и рекламни проекти често могат да започнат до няколко седмици.",
      },
      {
        q: "Пътуваш ли за снимки?",
        a: "Да, навсякъде. Пътуването и настаняването се добавят по себестойност и се договарят предварително, така че никога не са изненада във фактурата.",
      },
      {
        q: "Колко време до финалния филм?",
        a: "Повечето монтажи са готови за две до четири седмици, в зависимост от дължината и корекциите. Експресно предаване е възможно, когато графикът позволява.",
      },
      {
        q: "Кой притежава готовата работа?",
        a: "Получаваш пълни права за използване на финалните филми и снимки. Аз пазя архив на суровите файлове и правото да показвам работата в собственото си портфолио.",
      },
      {
        q: "Мога ли да получа суровия материал?",
        a: "Обикновено да, като допълнение. Все пак повечето клиенти откриват, че готовият, обработен филм е това, от което наистина имат нужда.",
      },
      {
        q: "Какви са условията за плащане?",
        a: "Депозит запазва датата ви, а остатъкът е дължим при предаване. Точното разпределение е описано в договора за проекта, преди да започнем.",
      },
    ],
  },
  testimonials: {
    heading: "Отзиви",
    prev: "Предишен отзив",
    next: "Следващ отзив",
    goTo: "Към отзив {n}",
    items: [
      {
        quote:
          "Иван разчита залата, преди да вдигне камерата. Филмът, който върна, беше самата вечер, точно както я помнехме.",
        role: "Творчески директор",
        client: "Lumen Studio",
        project: "Филм за пускане на бранд",
      },
      {
        quote:
          "Запазихме един снимачен ден и получихме бранд, който хората наистина гледат отново. Спокоен на площадката, безпощаден в монтажа.",
        role: "Основател",
        client: "Halden Coffee",
        project: "Бранд филм",
      },
      {
        quote:
          "Засне сватбата ни, сякаш ни познава от години. Нито един постановъчен момент, и това е нещото, което споделяме най-много.",
        role: "Двойка",
        client: "Частна поръчка",
        project: "Сватбен филм",
      },
      {
        quote:
          "Цветът ме спечели. Материалът ни изведнъж заприлича на референциите, които бяхме се отказали да постигнем.",
        role: "Мениджър на лейбъл",
        client: "Northsound Records",
        project: "Музикален клип",
      },
    ],
  },
  clients: {
    label: "Работил с",
  },
  contact: {
    heading: "Да създадем нещо.",
    intro: "Кажи ми какво си представяш. Чета всяко съобщение лично и отговарям до няколко дни.",
    booking: "Записвам проекти за 2026",
    types: ["Документален филм", "Недвижими имоти", "Социални мрежи", "Нещо друго"],
    labels: { name: "Име", email: "Имейл", type: "Тип проект", message: "Съобщение" },
    placeholders: { message: "Какво правиш и кога?" },
    errors: {
      name: "Името ти, моля.",
      email: "Валиден имейл помага да отговоря.",
      message: "Един-два реда за проекта.",
      send: "Нещо се обърка. Пиши ми директно или опитай отново след малко.",
    },
    send: "Изпрати съобщение",
    sending: "Изпращане…",
    success: {
      title: "Благодаря, {first}.",
      body: "Съобщението ти пристигна. Ще се свържа с теб до няколко дни.",
      again: "Изпрати друго",
    },
  },
  footer: {
    cols: { navigate: "Навигация", elsewhere: "Другаде", contact: "Контакт", legal: "Правно" },
    nav: ["Начало", "Проекти", "Услуги", "Моята история", "Контакт"],
    legal: ["Поверителност", "Условия", "Бисквитки"],
    travel: "Достъпен за пътуване",
    backToTop: "Към началото",
  },
  cookie: {
    text: "Този сайт използва бисквитки, за да разбере как се използва и да го подобри. Виж {policy}.",
    policy: "политиката за бисквитки",
    accept: "Приемам",
    essential: "Само необходимите",
  },
  legal: {
    backHome: "← Към начало",
    lastUpdated: "Последна актуализация:",
    updated: "11 юни 2026 г.",
    privacy: {
      title: "Политика за поверителност",
      intro:
        "Kramskoy Visuals („аз“, „мен“) зачита вашата поверителност. Тази политика обяснява какво събирам, когато използвате този сайт или се свържете с мен, и какво правя с него. За всичко неясно, пишете на [kramskoy.visuals@gmail.com](mailto:kramskoy.visuals@gmail.com).",
      sections: [
        {
          heading: "Какво събирам",
          body: "Когато изпратите формата за контакт, получавам името, имейла, типа проект и съобщението, които предоставяте. Когато разглеждате сайта, чрез бисквитки и анализи могат да се събират основни технически данни (като IP адрес, браузър и разгледани страници). На този сайт няма потребителски акаунти и не се обработват платежни данни.",
        },
        {
          heading: "Как го използвам",
          body: "Използвам информацията ви, за да отговарям на запитвания, да планирам и изпълнявам поръчаната работа, да поддържам сайта работещ и да го подобрявам. Не продавам данните ви и не ги използвам за реклама.",
        },
        {
          heading: "Правно основание",
          body: "Където е приложимо, обработвам данни на основание вашето съгласие (бисквитки), моя законен интерес да ви отговоря и да поддържам сайта, както и изпълнението на договор, когато резервирате проект. [Съгласувайте със специалист според вашата юрисдикция.]",
        },
        {
          heading: "Споделяне",
          body: "Разчитам на малък брой доставчици на услуги, които обработват данни от мое име, като доставка на имейли, хостинг на уебсайта и анализи. Те могат да използват данните само за да ми предоставят своята услуга. [Избройте конкретните доставчици, след като бъдат избрани, например имейл и хостинг партньори.]",
        },
        {
          heading: "Съхранение",
          body: "Съобщенията със запитвания се пазят, докато са актуални, и след това се изтриват. Файловете, свързани с поръчан проект, се архивират в съответствие с договора за проекта.",
        },
        {
          heading: "Вашите права",
          body: "Можете да поискате достъп, корекция, изтриване или преносимост на данните си, или да възразите срещу използването им. Пишете ми, за да отправите искане. Ако сте в регион с орган за защита на данните, имате и правото да подадете жалба до него.",
        },
        {
          heading: "Бисквитки",
          body: "Този сайт използва бисквитки, както е описано в [Политиката за бисквитки](/cookies).",
        },
        {
          heading: "Промени и контакт",
          body: "Мога да актуализирам тази политика; датата по-горе показва най-новата версия. Въпроси изпращайте на [kramskoy.visuals@gmail.com](mailto:kramskoy.visuals@gmail.com).",
        },
      ],
    },
    terms: {
      title: "Условия за ползване",
      intro:
        "Тези условия уреждат използването на този уебсайт. С разглеждането на сайта се съгласявате с тях. Работата, поръчана от Kramskoy Visuals, се урежда с отделен договор за проект.",
      sections: [
        {
          heading: "Използване на сайта",
          body: "Можете да използвате сайта за законни, лични цели. Съдържанието тук е предоставено с информационна цел и за представяне на работата; моля, не злоупотребявайте със сайта, не го нарушавайте и не се опитвайте да го увредите.",
        },
        {
          heading: "Интелектуална собственост",
          body: "Всички филми, снимки, текст и дизайн на този сайт са собственост на Kramskoy Visuals или негови клиенти и са защитени с авторско право. Не можете да ги копирате, използвате повторно или публикувате без писмено разрешение.",
        },
        {
          heading: "Запитвания и оферти",
          body: "Изпращането на формата за контакт е запитване, а не договор. Всяка оферта, която предоставям, е ориентировъчна, докато двете страни не подпишат писмен договор за проект, който определя обхвата, резултатите и сроковете.",
        },
        {
          heading: "Резервации, депозити и плащане",
          body: "Депозит запазва вашата дата. Условията за плащане, депозитите и какво се случва при анулиране са определени във вашия договор за проект, а не на този сайт.",
        },
        {
          heading: "Отговорност",
          body: "Сайтът се предоставя „както е“. Доколкото е позволено от закона, не нося отговорност за непреки или последващи вреди, произтичащи от използването му или от временна недостъпност.",
        },
        {
          heading: "Връзки към трети страни",
          body: "Някои връзки водят към външни услуги като YouTube или социални платформи. Не нося отговорност за тяхното съдържание или практики за поверителност.",
        },
        {
          heading: "Приложимо право",
          body: "Тези условия се уреждат от законите на [вашата юрисдикция]. [Потвърдете със специалист, особено ако извършвате дейност в ЕС.]",
        },
        {
          heading: "Промени и контакт",
          body: "Мога да актуализирам тези условия; датата по-горе показва най-новата версия. Въпроси изпращайте на [kramskoy.visuals@gmail.com](mailto:kramskoy.visuals@gmail.com).",
        },
      ],
    },
    cookies: {
      title: "Политика за бисквитки",
      intro:
        "Бисквитките са малки файлове, съхранявани на вашето устройство, които помагат на уебсайта да работи и да разбере как се използва. Тази страница обяснява как този сайт ги използва.",
      sections: [
        {
          heading: "Бисквитки, които използвам",
          body: "**Необходимите** бисквитки поддържат сайта работещ и запомнят избора ви за бисквитки. **Аналитичните** бисквитки ми помагат да видя как се използва сайтът, за да го подобря. [Посочете конкретния инструмент за анализ, след като бъде избран.]",
        },
        {
          heading: "Управление на бисквитките",
          body: "Можете да приемете или ограничите бисквитките чрез банера, показан при първото ви посещение. Можете също да изчистите или блокирате бисквитките в настройките на браузъра си, въпреки че отказът на необходимите бисквитки може да повлияе на работата на сайта.",
        },
        {
          heading: "Вашето съгласие",
          body: "Изборът ви се съхранява локално на вашето устройство. Можете да го промените по всяко време, като изчистите данните на този сайт в браузъра си, което връща банера.",
        },
        {
          heading: "Промени и контакт",
          body: "Мога да актуализирам тази политика; датата по-горе показва най-новата версия. Въпроси изпращайте на [kramskoy.visuals@gmail.com](mailto:kramskoy.visuals@gmail.com).",
        },
      ],
    },
  },
};

export const dictionaries: Record<Locale, Dict> = { en, bg };
