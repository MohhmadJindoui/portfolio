import type { LucideIcon } from 'lucide-react';
import { Code2, Layout, Server, Database, Workflow, BrainCircuit, Wrench } from 'lucide-react';

export type SkillCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: Code2,
    blurb: 'The languages I write most of my coursework and projects in.',
    skills: ['Java', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Layout,
    blurb: 'Component-based interfaces that work on every screen.',
    skills: ['React', 'Vite', 'Responsive Web Design'],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    blurb: 'Server logic and APIs behind the interface.',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: Database,
    blurb: 'Relational design, constraints and queries.',
    skills: ['SQL Server', 'PostgreSQL'],
  },
  {
    id: 'engineering',
    label: 'Software Engineering',
    icon: Workflow,
    blurb: 'The fundamentals that make code last.',
    skills: [
      'OOP',
      'Data Structures & Algorithms',
      'Git & GitHub',
      'Software Architecture',
      'Networking Fundamentals',
      'QA Fundamentals',
    ],
  },
  {
    id: 'ai',
    label: 'AI & Data',
    icon: BrainCircuit,
    blurb: 'Exploring data and machine learning with Python.',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Machine Learning Fundamentals', 'Data Analysis'],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Wrench,
    blurb: 'Everyday tooling.',
    skills: ['VS Code', 'Docker', 'Git', 'Figma'],
  },
];
