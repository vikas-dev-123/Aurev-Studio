import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

const needs = ['Website', 'ERP', 'CRM', 'Mobile App', 'Automation', 'AI Solution', 'Custom Software', 'Branding', 'SEO'];
const industries = ['Education', 'Healthcare', 'Hospitality', 'Business', 'Other'];
const steps = ['Need', 'Industry', 'Project', 'Details'];

export function ProjectConfigurator() {
  const [current, setCurrent] = useState(0);
  const [selectedNeed, setSelectedNeed] = useState('Website');
  const [industry, setIndustry] = useState('Education');
  const [summary, setSummary] = useState('We need a clear digital workflow for our team and customers.');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const total = steps.length;
  const stepProgress = useMemo(() => ((current + 1) / total) * 100, [current, total]);

  return (
    <section className="px-5 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1511] p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[.35em] uppercase text-white/35">Project configurator</p>
              <h2 className="serif text-4xl md:text-6xl mt-4">What are we building?</h2>
            </div>

            <div className="w-full max-w-md">
              <div className="flex justify-between text-[10px] uppercase tracking-[.25em] text-white/35 mb-2">
                <span>Step {current + 1}</span>
                <span>{steps[current]}</span>
              </div>
              <div className="h-px bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#a9d6a1] to-[#f1a26d] transition-all"
                  style={{ width: `${stepProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 mt-10">
            <div className="space-y-8">
              <div className="space-y-4">
                {current === 0 && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {needs.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSelectedNeed(item);
                          setCurrent(1);
                        }}
                        className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                          selectedNeed === item
                            ? 'border-[#a9d6a1]/50 bg-[#a9d6a1]/10 text-white'
                            : 'border-white/10 bg-white/[.02] text-white/70 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{item}</span>
                          {selectedNeed === item && <Check size={14} className="text-[#a9d6a1]" />}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {current === 1 && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {industries.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setIndustry(item);
                          setCurrent(2);
                        }}
                        className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                          industry === item
                            ? 'border-[#f1a26d]/50 bg-[#f1a26d]/10 text-white'
                            : 'border-white/10 bg-white/[.02] text-white/70 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{item}</span>
                          {industry === item && <Check size={14} className="text-[#f1a26d]" />}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {current === 2 && (
                  <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-[.25em] text-white/35">Tell us about it</label>
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      rows={7}
                      className="w-full rounded-[1.25rem] border border-white/10 bg-[#07110d] px-4 py-3 text-sm text-white/75 outline-none focus:border-[#a9d6a1]/50"
                    />
                    <button
                      onClick={() => setCurrent(3)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.02] px-5 py-3 text-sm text-white/80"
                    >
                      Continue <ChevronRight size={15} />
                    </button>
                  </div>
                )}

                {current === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[.25em] text-white/35 mb-2">Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#07110d] px-4 py-3 text-sm text-white/80 outline-none focus:border-[#a9d6a1]/50"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[.25em] text-white/35 mb-2">Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#07110d] px-4 py-3 text-sm text-white/80 outline-none focus:border-[#a9d6a1]/50"
                        placeholder="you@company.com"
                        type="email"
                      />
                    </div>

                    <a
                      href={`mailto:hello@northandfern.in?subject=${encodeURIComponent(`New project: ${selectedNeed}`)}&body=${encodeURIComponent(`${summary}\n\nName: ${name}\nEmail: ${email}\nIndustry: ${industry}`)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#f4f3ed] text-[#07110d] px-6 py-3 text-sm font-medium"
                    >
                      Start a project <ArrowRight size={16} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[1.75rem] border border-white/10 bg-[#07110d] p-5 md:p-6"
            >
              <p className="text-[10px] uppercase tracking-[.3em] text-white/35">Summary</p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[.02] p-4">
                  <div className="text-[10px] uppercase tracking-[.24em] text-white/35">Need</div>
                  <div className="mt-3 text-xl serif">{selectedNeed}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[.02] p-4">
                  <div className="text-[10px] uppercase tracking-[.24em] text-white/35">Industry</div>
                  <div className="mt-3 text-xl serif">{industry}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[.02] p-4">
                  <div className="text-[10px] uppercase tracking-[.24em] text-white/35">Project</div>
                  <p className="mt-3 text-sm text-white/55 leading-relaxed">{summary}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
