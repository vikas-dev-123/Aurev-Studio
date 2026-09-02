import { ArrowUpRight } from 'lucide-react';

const links = ['Solutions', 'Industries', 'Products', 'Services', 'Approach', 'Work', 'Contact'];

export function Footer() {
  return (
    <footer className="px-5 pb-10 pt-8">
      <div className="max-w-6xl mx-auto border-t border-white/10 pt-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full border border-[#a9d6a1]/60 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a9d6a1]" />
              </span>
              <span className="serif text-3xl">
                North<span className="text-[#a9d6a1]">&</span>Fern
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/45 leading-relaxed">
              Digital systems for organizations ready to operate differently.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-[.24em] text-white/35">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            {links
              .filter((item) => item !== 'Services')
              .map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                  {item}
                </a>
              ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[.25em] text-white/35">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#a9d6a1]" />
            Available for new projects
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[10px] uppercase tracking-[.25em] text-white/35">
            <span>© 2026 North & Fern</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#contact" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              Start project <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
