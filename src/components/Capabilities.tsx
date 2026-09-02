import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  BotMessageSquare,
  BrainCircuit,
  FileText,
  MessageCircle,
  Mic,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const capabilities = [
  { title: 'AI Agents', icon: BotMessageSquare, desc: 'Decision-making assistants for operations, staff and customer journeys.' },
  { title: 'AI Chatbots', icon: MessageCircle, desc: 'Conversational experiences that answer questions and route action.' },
  { title: 'WhatsApp Automation', icon: Workflow, desc: 'Enrich operational flows without forcing users into a web portal.' },
  { title: 'Voice AI', icon: Mic, desc: 'Faster intake, support and processing across service teams.' },
  { title: 'Document Intelligence', icon: FileText, desc: 'Turn forms, PDFs and records into searchable structured knowledge.' },
  { title: 'Predictive Analytics', icon: BarChart3, desc: 'Flag risk, trend and activity before they become operational friction.' },
];

const stages = ['Message', 'Understand', 'Decide', 'Act', 'Report'];

export function Capabilities() {
  return (
    <section className="py-28 md:py-40 px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="AI with intent"
          title={
            <>
              Let the system <span className="text-[#f1a26d] italic">think</span> with you.
            </>
          }
        >
          We design AI where it actually reduces friction: intake, operations, communication, reporting and decision support.
        </SectionHeading>

        <div className="mt-10 grid lg:grid-cols-[1.1fr_.9fr] gap-6 items-stretch">
          <div className="space-y-3">
            {capabilities.map(({ title, icon: Icon, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group border border-white/10 rounded-[1.5rem] bg-[#0b1511] p-4 md:p-5 flex items-center justify-between gap-4 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[.02] flex items-center justify-center">
                    <Icon size={18} className="text-[#a9d6a1]" />
                  </span>
                  <div>
                    <h3 className="serif text-2xl md:text-3xl">{title}</h3>
                    <p className="text-sm text-white/45 mt-1">{desc}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-white/30 group-hover:text-[#f1a26d] transition-colors" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-[#07110d] p-6 md:p-8 overflow-hidden"
          >
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[.28em] text-white/35">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a9d6a1]" />
              Intelligent workflow
            </div>

            <div className="mt-8 space-y-4">
              {stages.map((stage, index) => (
                <div key={stage} className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] ${
                      index === 2
                        ? 'bg-[#f1a26d]/12 border-[#f1a26d]/40 text-[#f1a26d]'
                        : 'bg-[#a9d6a1]/10 border-[#a9d6a1]/30 text-[#a9d6a1]'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 h-px bg-white/10" />
                  <div className="text-sm uppercase tracking-[.22em] text-white/50">{stage}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[.02] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#a9d6a1]/10 flex items-center justify-center">
                    <BrainCircuit size={16} className="text-[#a9d6a1]" />
                  </span>
                  <p className="text-[10px] uppercase tracking-[.28em] text-white/40">Insight engine</p>
                </div>
                <span className="text-[10px] uppercase tracking-[.25em] text-[#f1a26d]">LIVE</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Admissions</span>
                  <span className="text-[#a9d6a1]">92% auto-triaged</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#a9d6a1] to-[#f1a26d]" />
                </div>

                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Support queue</span>
                  <span className="text-[#f1a26d]">38% faster</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[73%] rounded-full bg-gradient-to-r from-[#f1a26d] to-[#a9d6a1]" />
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-2 text-xs text-white/45">
              <Sparkles size={14} className="text-[#a9d6a1]" />
              Designed for operational clarity, not hype.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
