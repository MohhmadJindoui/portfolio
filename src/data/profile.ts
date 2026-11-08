// ─────────────────────────────────────────────────────────────
// Personal information — edit this file to update the site.
// Set any URL to null to hide the related button.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Mohammad Heib',
  intro: "Hello, I'm Mohammad Heib",
  identity: 'Software Developer | Information Systems B.Sc. Student',
  headline: ['Building Software.', 'Solving Real Problems.'],
  description:
    'Information Systems student specializing in Software Technologies, passionate about building scalable applications, intelligent systems, and meaningful digital experiences.',
  roles: ['Software Developer', 'Backend Enthusiast', 'Full-Stack Builder', 'AI & Data Explorer'],
  location: 'Northern Israel',
  languages: ['Arabic', 'Hebrew', 'English'],

  links: {
    linkedin: 'https://www.linkedin.com/in/mohammad-heib-3b7280363',
    // Replace with your preferred GitHub URL if different.
    github: 'https://github.com/MohhmadJindoui' as string | null,
    email: 'jindawemohhmad@gmail.com' as string | null,
    // Put your CV in /public (e.g. public/Mohammad-Heib-CV.pdf) and set:
    // resume: './Mohammad-Heib-CV.pdf'
    resume: null as string | null,
  },

  careerGoals: [
    'Software Engineering',
    'Backend Development',
    'Full-Stack Development',
    'AI & Machine Learning',
    'Data Engineering',
  ],
};

export const aboutFocus = [
  { title: 'Software development', note: 'From requirements to working, tested code.' },
  { title: 'Object-oriented programming', note: 'Inheritance, interfaces, patterns, exceptions.' },
  { title: 'Algorithms & data structures', note: 'Heaps, hashing, graphs, complexity.' },
  { title: 'Database systems', note: 'Relational modeling, normalization, SQL.' },
  { title: 'Computer networks', note: 'Protocols, layers and how the web moves data.' },
  { title: 'Web development', note: 'React, Node.js and responsive interfaces.' },
  { title: 'Machine learning fundamentals', note: 'Clustering, data analysis, model basics.' },
  { title: 'Software architecture', note: 'Services, containers, clean system boundaries.' },
];

export type TimelineItem = {
  kind: 'education' | 'experience';
  title: string;
  org: string;
  period: string;
  status?: string;
  details: string[];
};

export const timeline: TimelineItem[] = [
  {
    kind: 'education',
    title: 'B.Sc. Information Systems — Software Technologies',
    org: 'Yezreel Valley College, Israel',
    period: '2024 — 2027',
    status: 'Third year · in progress',
    details: [
      'Advanced Programming (Java, OOP), Data Structures & Algorithms',
      'Databases & SQL, Systems Analysis & Design, Software Architecture',
      'Computer Networks, Internet Technologies, Machine Learning, Design Thinking',
    ],
  },
];

// Practical experience — add entries here when you have them.
// Example:
// { kind: 'experience', title: 'Software Intern', org: 'Company', period: '2027', details: ['...'] }
export const experience: TimelineItem[] = [];
