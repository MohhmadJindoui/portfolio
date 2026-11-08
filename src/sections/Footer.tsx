import { ArrowUp } from 'lucide-react';
import { NAV } from '../components/Navbar';
import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm text-fg-dim">{profile.identity}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="hover:text-fg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <p className="font-mono text-[12px] text-fg-dim">© {new Date().getFullYear()} · Built with React & TypeScript</p>
          <a href="#top" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-electric/50" aria-label="Back to top">
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
