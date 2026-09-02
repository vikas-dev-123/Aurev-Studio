import { ColorBlock } from '../components/color-blocks/ColorBlock';
import { BlockTag, Shell } from '../components/color-blocks/Shell';
import { Statement } from '../components/animations/Statement';
import { Reveal, RevealGroup, RevealItem } from '../components/animations/Reveal';
import { Action } from '../components/ui/Action';
import { Logomark } from '../components/navigation/Logomark';
import { FinalCta } from '../components/ui/FinalCta';
import { useSeo, breadcrumb } from '../hooks/useSeo';
import { organizationLd } from '../data/schema';
import { stats, values } from '../data/approach';
import { routeFor, site } from '../data/site';

const route = routeFor('/about')!;
const jsonLd = [organizationLd, breadcrumb(route.label, route.path)];

/** The story, kept as data so the JSX below stays readable. */
const STORY = [
  `We started in ${site.founded} doing what most studios do — a website, then a booking form, then a parent portal. The pattern that kept repeating was never a design problem. It was a school with attendance in a paper register, fees in one package, results in a spreadsheet, and one person who understood all three reconciling them by hand every term.`,
  'So we stopped selling pages and started building the thing underneath them. Four systems exist now because four sectors kept asking the same question in different vocabulary: one record per person, one screen somebody opens first thing, one number at the end of the month that nobody has to defend.',
  'It is also why we do not arrive with a discovery deck. The specification is already in your building — in the shadow spreadsheets, the WhatsApp group the front desk actually runs on, and the report somebody rebuilds by hand every Monday morning. Our job is to find it and turn it into software.',
  'And we stay small on purpose. It means we turn down work that needs forty people. It also means the person who designed your permission model is still reachable in year three, and still remembers why it works the way it does.',
];

const SETUP = [
  {
    label: 'Small by design',
    note: 'The people on the first call are the people who build it. No handover to an account manager after signing.',
  },
  {
    label: 'Remote, with boots on site',
    note: 'Discovery and training happen in your building. The rest happens wherever the work is done best.',
  },
  {
    label: 'Fortnightly, in the open',
    note: 'A staging link, a short written update and the next two weeks’ plan. Never a monthly reveal.',
  },
  {
    label: 'Yours at the end',
    note: 'Source, data model, documentation, credentials. Leaving should always be possible, even if you never do.',
  },
];

const NOT_US = [
  'We do not resell somebody else’s licence and call it a system.',
  'We do not staff the build with juniors once the pitch is won.',
  'We do not bill by the hour for work we scoped wrong.',
];

/** Keyed by label rather than index, so reordering `stats` cannot mismatch a note. */
const STAT_NOTES: Record<string, string> = {
  'Core industries': 'Education, healthcare, hospitality and business operations.',
  'Digital capabilities': 'Strategy through support, delivered by the same team.',
  'Custom workflows': 'Because no two operations run the same way twice.',
  'Long-term partner': 'One relationship instead of four vendors pointing at each other.',
};

/**
 * The neutral route. Ink header, one yellow band carrying the four numbers, the
 * story on paper, and the ink close — the only page where a brand hue appears as a
 * single accent block rather than as the page's own colour.
 */
export function AboutPage() {
  useSeo({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd,
  });

  return (
    <>
      <ColorBlock tone="ink" pad="lg" grid labelledBy="about-title">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <BlockTag>{route.hint}</BlockTag>
              </Reveal>
              <Reveal delay={0.08}>
                <Statement id="about-title" as="h1" size="statement" className="mt-6">
                  {'WE BUILD THE|SOFTWARE A|BUSINESS _runs_ ON.'}
                </Statement>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="lede mt-8 max-w-[52ch] text-dim">
                  {site.name} is a small engineering and design studio. We build the operational
                  software behind schools, hospitals, hotels and growing companies — and then stay
                  with it, because the second year is when a system either becomes indispensable or
                  gets quietly abandoned.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Action to="/contact" size="lg" arrow="↗" cursor="open">
                    Talk to us
                  </Action>
                  <Action to="/work" variant="outline" arrow="→" cursor="view">
                    What we have built
                  </Action>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.18}>
                <Logomark size={168} title={`${site.name} monogram`} className="opacity-95" />
                <p className="mt-8 max-w-[34ch] text-[0.8125rem] leading-relaxed text-faint">
                  A signal trace that turns, terminates in two contact pads and holds a node in the
                  opening. It reads as a C, and it reads as a routed connection — the same drawing
                  language as the diagrams inside the product.
                </p>
              </Reveal>
            </div>
          </div>
        </Shell>
      </ColorBlock>

      <ColorBlock tone="yellow" pad="md" label="By the numbers">
        <Shell>
          <RevealGroup as="dl" className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem key={stat.label} className="border-t rule-strong pt-6">
                <dt className="display text-[clamp(3rem,7vw,5rem)] leading-[0.85] tabular-nums">
                  {stat.value}
                </dt>
                <dd className="mt-5">
                  <span className="eyebrow block">{stat.label}</span>
                  <span className="mt-2.5 block max-w-[26ch] text-[0.8125rem] leading-relaxed opacity-70">
                    {STAT_NOTES[stat.label]}
                  </span>
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </Shell>
      </ColorBlock>
      <ColorBlock tone="paper" pad="lg" labelledBy="story-title">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <Statement id="story-title" as="h2" size="statement">
                  {'WE STARTED WITH|WEBSITES. THE|_pattern_ STOPPED US.'}
                </Statement>
              </Reveal>
              <div className="mt-9 grid gap-5">
                {STORY.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 24)} delay={0.06 + index * 0.04}>
                    <p className="measure text-[1.0625rem] leading-relaxed">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.12}>
                <p className="eyebrow text-faint">How we are set up</p>
              </Reveal>
              <RevealGroup as="dl" className="mt-4 border-t rule">
                {SETUP.map((item) => (
                  <RevealItem key={item.label} className="border-b rule py-4">
                    <dt className="text-[0.9375rem] font-medium tracking-[-0.01em]">{item.label}</dt>
                    <dd className="mt-1.5 text-[0.8125rem] leading-relaxed text-dim">{item.note}</dd>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.16}>
                <p className="eyebrow mt-10 text-faint">And what we do not do</p>
              </Reveal>
              <RevealGroup as="ul" className="mt-4 grid gap-2.5">
                {NOT_US.map((line) => (
                  <RevealItem
                    key={line}
                    as="li"
                    className="flex items-baseline gap-2.5 text-[0.8125rem] leading-relaxed"
                  >
                    <span aria-hidden className="mt-[0.4rem] h-1 w-1 shrink-0 bg-[currentColor]" />
                    {line}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
          <section
            aria-labelledby="values-title"
            className="mt-16 border-t rule-strong pt-10 lg:mt-24"
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <Reveal>
                  <p className="eyebrow text-faint">How we work</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <Statement id="values-title" as="h2" size="title" className="mt-5">
                    {'FOUR THINGS WE|_do not_ NEGOTIATE.'}
                  </Statement>
                </Reveal>
              </div>
              <div className="lg:col-span-8">
                <RevealGroup as="dl" className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  {values.map((value, index) => (
                    <RevealItem key={value.title} className="border-t rule pt-5">
                      <dt className="flex items-baseline gap-3 text-[1rem] font-medium tracking-[-0.01em]">
                        <span aria-hidden className="text-[0.6875rem] tabular-nums text-faint">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {value.title}
                      </dt>
                      <dd className="mt-2.5 max-w-[38ch] text-[0.875rem] leading-relaxed text-dim">
                        {value.detail}
                      </dd>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </section>
        </Shell>
      </ColorBlock>

      <FinalCta
        headline={'IF IT SOUNDS|LIKE _your_ MESS,|SAY HELLO.'}
        note="Tell us which part of the operation you would fix first. We will tell you honestly whether we are the right people for it, and what it would take."
        action={{ label: 'Start the conversation', to: '/contact' }}
      />
    </>
  );
}

