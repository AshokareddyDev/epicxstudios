export const pages = [
  {
    href: "/",
    index: "00",
    label: "Home",
    summary: "The curriculum platform, the training LMS, and the software around them.",
  },
  {
    href: "/services",
    index: "01",
    label: "Services",
    summary:
      "K12 for state and CBSE syllabi, training for higher study, then applications and sites.",
  },
  {
    href: "/about",
    index: "02",
    label: "About",
    summary: "How the studio works when the syllabus and the classroom set the brief.",
  },
  {
    href: "/contact",
    index: "03",
    label: "Contact",
    summary: "A short brief: the board or program, the device, and who teaches.",
  },
] as const;

export type PageLink = (typeof pages)[number];

export const practices = [
  {
    href: "/services/k12-education",
    index: "01",
    nav: "K–12",
    title: "K12 curriculum",
    headline: "The syllabus, on a platform teachers can extend.",
    summary:
      "A curriculum LMS for state syllabi and CBSE, with a studio, a library, and classrooms teachers open themselves.",
    lede: "The main product is a learning platform for K12. Lessons follow state syllabi and CBSE, and the same course opens on a phone, a PC, a tablet, or an AR/VR device. Teachers extend it themselves: a studio for material they add, a library where they create it, and classrooms they open for their own students.",
    points: [
      "Syllabus-aligned lessons for state boards and CBSE, so a chapter can be the period a class runs today.",
      "One course on mobile, PC, tablets, and AR/VR devices. The room picks the screen. The chapter stays the same.",
      "A studio for material teachers add, a library where they create it, and classrooms they set up themselves.",
    ],
    detailTitle: "What a school holds.",
    details: [
      {
        index: "01",
        title: "Studio",
        body: "Teachers add their own lessons, files, and checks. The course can grow after it is installed, without waiting on a new release from the studio.",
      },
      {
        index: "02",
        title: "Library",
        body: "A place to create content and keep it. A department can draft a lesson once and reuse it across sections that share the same syllabus.",
      },
      {
        index: "03",
        title: "Classrooms",
        body: "A teacher opens a class, assigns the syllabus path, and works with the students in that room. The roster and the lesson stay together.",
      },
      {
        index: "04",
        title: "Devices",
        body: "Phones, computers, tablets, and AR/VR headsets open the same course. The room picks the screen. The chapter stays the same.",
      },
    ],
  },
  {
    href: "/services/training-lms",
    index: "02",
    nav: "Training",
    title: "Training LMS",
    headline: "A training platform for the programs after school.",
    summary:
      "An LMS for higher education, engineering, nursing, and medical training, and for other domains that teach by practice.",
    lede: "The second product is a training LMS. It is built for higher education and for domains that teach by doing: engineering, nursing, and medical education, and other programs that need a cohort, a curriculum, and a record. The course, the group, and the assessment live in one place.",
    points: [
      "Programs for colleges and institutes, structured as terms, modules, and the assessments those programs already use.",
      "Engineering, nursing, and medical training, where a lab, a ward, or a procedure is part of the lesson.",
      "The same LMS shape for other training domains. A new field starts from a cohort and a curriculum already in place.",
    ],
    detailTitle: "Where the training runs.",
    details: [
      {
        index: "01",
        title: "Higher education",
        body: "Courses and cohorts for colleges and institutes. Faculty can see the term, the module, and who has finished the work.",
      },
      {
        index: "02",
        title: "Engineering",
        body: "Labs, drawings, and problem sets stay attached to the module they belong to. Practice lives in the course.",
      },
      {
        index: "03",
        title: "Nursing and medicine",
        body: "Training sequences a learner can repeat, with a record of what was practiced and finished. The platform carries the program the institute already teaches.",
      },
      {
        index: "04",
        title: "Other domains",
        body: "Any training field that needs a curriculum, a cohort, and a record can use the same shape. The syllabus changes. The platform holds.",
      },
    ],
  },
  {
    href: "/services/software-mobile",
    index: "03",
    nav: "Software",
    title: "Custom applications",
    headline: "Applications for the work around the course.",
    summary:
      "Custom software and mobile products for schools, institutes, and the teams that run a training platform.",
    lede: "When the LMS is not the whole job, the studio builds the applications around it. A student app, a faculty tool, enrollment, content operations, support. The software is for training and education, and it is held to the same standard as the course.",
    points: [
      "Mobile and desktop applications for the people who teach, learn, and run the program.",
      "Tools for enrollment, content operations, and support, sitting with the LMS.",
      "Shaped for school and institute networks: shared devices, interrupted connections, and a release a team can stage.",
    ],
    detailTitle: "The software beside the LMS.",
    details: [
      {
        index: "01",
        title: "Student and teacher apps",
        body: "Applications for phones, tablets, and computers. The person in the lesson and the person running it each get a tool that matches the work.",
      },
      {
        index: "02",
        title: "Operations",
        body: "Enrollment, content operations, and support tools for the team behind the program. They share the same records as the course.",
      },
      {
        index: "03",
        title: "The network in the building",
        body: "Shared devices, connections that drop, and releases a small team can stage. The application has to keep working on the day the lab is full.",
      },
    ],
  },
  {
    href: "/services/web-dev",
    index: "04",
    nav: "Web",
    title: "Education websites",
    headline: "Sites that can explain the program.",
    summary:
      "Websites for training platforms, schools, and institutes in education.",
    lede: "The public site is how a school, an institute, or a training platform explains the program. It names the syllabus, the people who teach, and how someone starts. It stays fast when the content is real.",
    points: [
      "Sites for training platforms: the product, the program, and a clear way to begin.",
      "Sites for schools and education groups, written around the syllabus and the faculty.",
      "Exact type, a readable structure, and motion kept off the path a visitor is reading.",
    ],
    detailTitle: "Pages with a program behind them.",
    details: [
      {
        index: "01",
        title: "Training platforms",
        body: "A public site for the product itself. Who it is for, how a course runs, and where a school or an institute starts.",
      },
      {
        index: "02",
        title: "Schools and institutes",
        body: "Pages a family, a student, or a partner can read: the syllabus, the faculty, and the program, in that order.",
      },
      {
        index: "03",
        title: "The reading path",
        body: "Type and structure come first. Motion stays off the sentences. The site has to hold when the syllabus and the cohort are both on the page.",
      },
    ],
  },
] as const;

export type Practice = (typeof practices)[number];

export function getPractice(href: Practice["href"]): Practice {
  const practice = practices.find((item) => item.href === href);
  if (!practice) {
    throw new Error(`Unknown practice: ${href}`);
  }
  return practice;
}

export function nextPractice(href: string): Practice {
  const current = practices.findIndex((practice) => practice.href === href);
  const index = current === -1 ? 0 : (current + 1) % practices.length;
  return practices[index] ?? practices[0];
}

export function previousPractice(href: string): Practice {
  const current = practices.findIndex((practice) => practice.href === href);
  const index = current <= 0 ? practices.length - 1 : current - 1;
  return practices[index] ?? practices[0];
}

export const views = [
  {
    src: "/gallery/tablet-lesson.jpg",
    href: "/services/k12-education",
    kicker: "Education",
    title: "On a tablet.",
    caption: "The chapter and the diagram, read at a desk.",
    alt: "A tablet on a wooden desk showing a lesson about white light passing through a prism.",
  },
  {
    src: "/gallery/laptop-chapter.jpg",
    href: "/services/k12-education",
    kicker: "Education",
    title: "On a laptop.",
    caption: "The same syllabus, open in the classroom.",
    alt: "A laptop in an empty classroom showing a chapter about the plant cell.",
  },
  {
    src: "/gallery/phone-practice.jpg",
    href: "/services/k12-education",
    kicker: "Education",
    title: "On a phone.",
    caption: "A short practice card beside the notebook.",
    alt: "A phone on a desk showing a practice card about a convex lens.",
  },
  {
    src: "/gallery/ar-desk.jpg",
    href: "/services/k12-education",
    kicker: "AR",
    title: "Above the page.",
    caption: "The diagram lifts off the textbook.",
    alt: "An open textbook with a three-dimensional plant cell floating above the page and a tablet behind it.",
  },
  {
    src: "/gallery/vr-headset.jpg",
    href: "/services/training-lms",
    kicker: "VR",
    title: "In the room.",
    caption: "The model is large enough to walk around.",
    alt: "An adult seen from behind, wearing a headset, looking at a large model of a heart.",
  },
] as const;

export type View = (typeof views)[number];

