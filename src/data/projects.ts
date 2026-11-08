// ─────────────────────────────────────────────────────────────
// Projects — edit freely.
// github / demo: set a URL to show the button, leave null to hide it.
// screenshot: path to an image in /public (e.g. './projects/zinab.png').
//             While null, a labeled placeholder preview is shown.
// ─────────────────────────────────────────────────────────────

export type ProjectStatus = 'Completed' | 'In development' | 'Design Thinking / UX' | null;

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  status: ProjectStatus;
  problem: string;
  description: string;
  stack: string[];
  features: { label: string; inDevelopment?: boolean }[];
  caseStudy: { heading: string; body: string }[];
  github: string | null;
  demo: string | null;
  screenshot: string | null;
  accent: 'blue' | 'cyan' | 'violet';
  preview: 'flow' | 'booking' | 'shop' | 'classes' | 'pipeline';
};

export const projects: Project[] = [
  {
    id: 'fixit',
    index: '01',
    title: 'FixIt',
    tagline: 'Home maintenance, without the guesswork.',
    category: 'Product design',
    status: 'Design Thinking / UX',
    problem:
      'Finding a reliable professional for a home repair usually means phone calls, unclear prices and no visibility into progress.',
    description:
      'A digital platform concept that connects people with home maintenance professionals — from reporting an issue to tracking the job until it is done. Developed through the Design Thinking process: research, problem definition, ideation and prototyping.',
    stack: ['Design Thinking', 'User Research', 'Prototyping'],
    features: [
      { label: 'Maintenance issue reporting' },
      { label: 'Professional discovery and matching' },
      { label: 'Service comparison' },
      { label: 'Booking workflow' },
      { label: 'Communication and progress tracking' },
    ],
    caseStudy: [
      { heading: 'Empathize', body: 'Mapped how homeowners currently find, compare and trust repair professionals.' },
      { heading: 'Define', body: 'Framed the core problem as low transparency across the whole repair journey.' },
      { heading: 'Ideate & prototype', body: 'Designed an end-to-end flow: report → match → compare → book → track.' },
    ],
    github: null,
    demo: null,
    screenshot: null,
    accent: 'cyan',
    preview: 'flow',
  },
  {
    id: 'jandawi-sweets',
    index: '02',
    title: 'Jandawi Sweets',
    tagline: 'An online storefront for a sweets business.',
    category: 'E-commerce',
    status: 'In development',
    problem:
      'Sweets are sold by weight and quantity, which generic shop templates handle poorly.',
    description:
      'An e-commerce front end built with React and Vite, designed around how sweets are actually sold: by weight, by box and by quantity, for a multilingual customer base.',
    stack: ['React', 'Vite', 'JavaScript'],
    features: [
      { label: 'Product catalog' },
      { label: 'Product weight and quantity selection' },
      { label: 'Shopping cart' },
      { label: 'Order workflow', inDevelopment: true },
      { label: 'Multilingual customer experience', inDevelopment: true },
    ],
    caseStudy: [
      { heading: 'Focus', body: 'A product model where price depends on the selected weight, not only on quantity.' },
      { heading: 'Next', body: 'Completing the order workflow and full multilingual support.' },
    ],
    github: null,
    demo: null,
    screenshot: null,
    accent: 'violet',
    preview: 'shop',
  },
  {
    id: 'rescue',
    index: '03',
    title: 'Rescue Management System',
    tagline: 'Object-oriented emergency response.',
    category: 'Java · OOP',
    status: 'Completed',
    problem:
      'An emergency authority must pick the right responders for each incident, quickly and by clear rules.',
    description:
      'A Java system that models responders, incidents and response workflows with a clean class hierarchy. Data is loaded from CSV files and validated through a custom exception hierarchy.',
    stack: ['Java', 'OOP', 'Collections', 'CSV'],
    features: [
      { label: 'Responder management' },
      { label: 'Emergency response workflows' },
      { label: 'Role-based entities (abstract classes & interfaces)' },
      { label: 'Custom exception handling' },
      { label: 'CSV file processing' },
    ],
    caseStudy: [
      { heading: 'Design', body: 'Singleton for the central authority; abstract base classes for responder roles.' },
      { heading: 'Data structures', body: 'HashMap, TreeMap, HashSet and LinkedList chosen per lookup and ordering need.' },
    ],
    github: null,
    demo: null,
    screenshot: null,
    accent: 'blue',
    preview: 'classes',
  },
  {
    id: 'ai-articles',
    index: '04',
    title: 'AI Articles Analyzer',
    tagline: 'Turning a stream of articles into insight.',
    category: 'AI · Data · Architecture',
    status: 'Completed',
    problem:
      'Large volumes of open-source articles are hard to classify and compare by hand.',
    description:
      'An AI-powered analysis system built for a software architecture course. Articles are stored in PostgreSQL, analysed by an LLM agent through MindsDB, and presented in charts — all running in Docker containers.',
    stack: ['Python', 'Docker', 'PostgreSQL', 'MindsDB', 'LLM integration'],
    features: [
      { label: 'Article classification and analysis' },
      { label: 'Source and category insights' },
      { label: 'Data visualization' },
      { label: 'AI-assisted text analysis' },
    ],
    caseStudy: [
      { heading: 'Architecture', body: 'Containerised services: database, API layer, AI agent and a charting front end.' },
      { heading: 'AI layer', body: 'MindsDB agent backed by a hosted LLM to answer questions over the stored articles.' },
    ],
    github: null,
    demo: null,
    screenshot: null,
    accent: 'cyan',
    preview: 'pipeline',
  },
];
