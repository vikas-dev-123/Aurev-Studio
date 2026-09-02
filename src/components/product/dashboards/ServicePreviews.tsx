import { Bars, Chip, Line, Meter, Metric, Panel, Table } from '../AppUi';

/**
 * The five previews that no dashboard already covers. Same monochrome discipline
 * as the rest of the fake software: real numbers, real labels, no colour.
 */

/** Strategy — the audit output: where the truth lives today, and where it moves to. */
export function WorkflowMapPreview() {
  const today: [string, string][] = [
    ['Enquiry', 'WhatsApp · front desk phone'],
    ['Admission form', 'Paper file · office cupboard'],
    ['Fee receipt', 'Tally · accounts laptop'],
    ['Attendance', 'Register · staff room'],
    ['Result sheet', 'Excel · principal’s laptop'],
  ];

  return (
    <div className="flex h-full flex-col gap-2 p-2.5">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
        <Panel title="Today" hint="5 systems of record">
          <div className="-mt-1">
            {today.map(([step, where]) => (
              <Line key={step} label={step} sub={where} value={<Chip>manual</Chip>} />
            ))}
          </div>
        </Panel>
        <Panel title="Proposed" hint="1 system of record">
          <div className="-mt-1">
            <Line label="Student record" sub="Enquiry → alumni" value={<Chip strong>School OS</Chip>} />
            <Line label="Fees ledger" sub="Auto-reconciled daily" value={<Chip strong>module</Chip>} />
            <Line label="Attendance" sub="Teacher app, offline-first" value={<Chip strong>module</Chip>} />
            <Line label="Results" sub="Publish in 11 minutes" value={<Chip strong>module</Chip>} />
            <Line label="Tally export" sub="Nightly, read-only" value={<Chip>integration</Chip>} />
          </div>
        </Panel>
      </div>
      <div className="panel flex items-center justify-between gap-3 px-2.5 py-2">
        <p className="text-[10.5px] text-[var(--app-dim)]">Build sequence agreed</p>
        <div className="flex items-center gap-2">
          <Chip>Phase 1 · fees</Chip>
          <Chip>Phase 2 · attendance</Chip>
          <Chip>Phase 3 · results</Chip>
        </div>
      </div>
    </div>
  );
}

/** Web development — what "fast and accessible" looks like as evidence. */
export function VitalsPreview() {
  return (
    <div className="flex h-full flex-col gap-2 p-2.5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Metric value="1.2s" label="LCP" delta={-38} hint="mobile, 4G" />
        <Metric value="84ms" label="INP" delta={-52} />
        <Metric value="0.02" label="CLS" />
        <Metric value="99" label="Lighthouse" hint="a11y 100" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-5">
        <Panel title="Bundle budget" hint="180 kB ceiling" className="sm:col-span-2">
          <div className="space-y-2">
            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-[10.5px]">JavaScript</p>
                <p className="num text-[10px] text-[var(--app-dim)]">142 kB</p>
              </div>
              <Meter value={0.79} className="mt-1" />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-[10.5px]">CSS</p>
                <p className="num text-[10px] text-[var(--app-dim)]">18 kB</p>
              </div>
              <Meter value={0.22} className="mt-1" />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-[10.5px]">Fonts</p>
                <p className="num text-[10px] text-[var(--app-dim)]">64 kB</p>
              </div>
              <Meter value={0.44} className="mt-1" />
            </div>
          </div>
        </Panel>
        <Panel title="Pipeline" hint="main" className="sm:col-span-3">
          <Table
            head={['Check', 'Result', 'Time']}
            rows={[
              ['Typecheck', 'passed', '11s'],
              ['Unit tests', '128 passed', '24s'],
              ['Axe a11y scan', '0 violations', '9s'],
              ['Preview deploy', 'ready', '38s'],
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}

/** Mobile — the attendance screen a class teacher actually uses, offline. */
export function PhoneAppPreview() {
  const students: [string, string][] = [
    ['Aarav Menon', 'present'],
    ['Diya Sharma', 'present'],
    ['Ishaan Rao', 'late'],
    ['Kabir Nair', 'present'],
    ['Meera Iyer', 'absent'],
    ['Rohan Gupta', 'present'],
  ];

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-[var(--app-line)] px-3 py-2.5">
        <p className="text-[11px] font-semibold">Class 8-B · Attendance</p>
        <p className="text-[9.5px] text-[var(--app-faint)]">Mon 12 Aug · period 1</p>
      </header>

      <div className="flex items-center justify-between gap-2 border-b border-[var(--app-line)] px-3 py-1.5">
        <p className="text-[9.5px] text-[var(--app-dim)]">3 queued · offline</p>
        <Chip>syncs on reconnect</Chip>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-3">
        {students.map(([name, state]) => (
          <div
            key={name}
            className="flex items-center justify-between gap-2 border-b border-[var(--app-line)] py-[0.45rem]"
          >
            <p className="truncate text-[10.5px]">{name}</p>
            {state === 'present' ? (
              <Chip strong>P</Chip>
            ) : state === 'late' ? (
              <Chip>L</Chip>
            ) : (
              <Chip>A</Chip>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--app-line)] p-3">
        <div className="rounded-md bg-[var(--app-fg)] px-3 py-2 text-center text-[10.5px] font-medium text-[var(--app-bg)]">
          Submit 34 records
        </div>
      </div>
    </div>
  );
}

/** AI automation — the thread, including the handoff. That last line is the point. */
export function ChatPreview() {
  const thread: { from: 'them' | 'agent'; text: string; meta?: string }[] = [
    { from: 'them', text: 'Fee balance for Aarav, class 8-B?', meta: '9:41pm' },
    {
      from: 'agent',
      text: '₹8,400 due for Term 2, payable by 20 Aug. Payment link sent to your registered number.',
      meta: 'from fees ledger · 1.1s',
    },
    { from: 'them', text: 'Can we split it in two?' },
    {
      from: 'agent',
      text: 'Instalments need an approval from the accounts office. I have raised request #2041 and Priya will reply by 11am tomorrow.',
      meta: 'escalated · rule: no financial commitments',
    },
  ];

  return (
    <div className="flex h-full flex-col p-2.5">
      <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
        {thread.map((message, index) => (
          <div
            key={index}
            className={message.from === 'agent' ? 'flex justify-end' : 'flex justify-start'}
          >
            <div
              className={
                message.from === 'agent'
                  ? 'max-w-[76%] rounded-lg rounded-br-sm bg-[var(--app-fg)] px-2.5 py-1.5 text-[10.5px] leading-snug text-[var(--app-bg)]'
                  : 'max-w-[76%] rounded-lg rounded-bl-sm bg-[var(--app-panel-2)] px-2.5 py-1.5 text-[10.5px] leading-snug'
              }
            >
              <p>{message.text}</p>
              {message.meta ? (
                <p
                  className={
                    message.from === 'agent'
                      ? 'mt-1 text-[9px] opacity-60'
                      : 'mt-1 text-[9px] text-[var(--app-faint)]'
                  }
                >
                  {message.meta}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-[var(--app-line)] pt-2">
        <p className="text-[9.5px] text-[var(--app-faint)]">Handled 61% end to end this week</p>
        <Chip>human in 39%</Chip>
      </div>
    </div>
  );
}

/** Digital growth — the funnel and the experiments that moved it. */
export function GrowthPreview() {
  const funnel: [string, string, number][] = [
    ['Sessions', '48,210', 1],
    ['Programme pages', '18,940', 0.39],
    ['Enquiry started', '3,120', 0.065],
    ['Enquiry sent', '1,842', 0.038],
    ['Admission visit', '612', 0.013],
  ];

  return (
    <div className="flex h-full flex-col gap-2 p-2.5">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-5">
        <Panel title="Funnel" hint="last 30 days" className="sm:col-span-2">
          <div className="space-y-1.5">
            {funnel.map(([label, value, share]) => (
              <div key={label}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[10.5px]">{label}</p>
                  <p className="num text-[10px] text-[var(--app-dim)]">{value}</p>
                </div>
                <Meter value={share} className="mt-1" />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Experiments" hint="shipped this quarter" className="sm:col-span-3">
          <Table
            head={['Change', 'Metric', 'Result']}
            rows={[
              ['Fee calculator on programme page', 'Enquiry rate', '+31%'],
              ['Single-field first step', 'Form completion', '+18%'],
              ['WhatsApp instead of call-back', 'First response', '−2.1 days'],
              ['Prospectus behind email', 'Qualified leads', 'no change'],
            ]}
          />
        </Panel>
      </div>
      <Panel title="Enquiries by month" bodyClassName="pt-2">
        <Bars
          data={[210, 236, 248, 262, 258, 291, 318, 344, 362, 388, 402, 441]}
          labels={['A', 'S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J']}
          height={54}
        />
      </Panel>
    </div>
  );
}

/** Branding — a specimen, deliberately monochrome so no second hue enters the block. */
export function IdentityPreview() {
  const steps = ['100', '300', '500', '700', '900'];

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--app-faint)]">Wordmark</p>
          <p className="mt-1.5 text-[1.375rem] font-semibold leading-none tracking-[-0.03em]">
            NORTHLINE
          </p>
        </div>
        <div className="flex gap-1.5">
          <span aria-hidden className="grid h-8 w-8 place-items-center bg-[var(--app-fg)] text-[11px] font-semibold text-[var(--app-bg)]">
            N
          </span>
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center border border-[var(--app-line-strong)] text-[11px] font-semibold"
          >
            N
          </span>
        </div>
      </div>

      <div className="border-t border-[var(--app-line)] pt-3">
        <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--app-faint)]">Type system</p>
        <p className="mt-1.5 text-[1.0625rem] leading-tight">Aa — display, 600</p>
        <p className="text-[0.8125rem] leading-snug text-[var(--app-dim)]">
          Aa — working face, 400 · tabular numerals for every ledger
        </p>
      </div>

      <div className="border-t border-[var(--app-line)] pt-3">
        <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--app-faint)]">Tonal steps</p>
        <div className="mt-2 flex gap-1">
          {steps.map((step, index) => (
            <div key={step} className="flex-1">
              <div
                aria-hidden
                className="h-7 w-full bg-[var(--app-fg)]"
                style={{ opacity: 0.16 + index * 0.21 }}
              />
              <p className="mt-1 text-center text-[9px] text-[var(--app-faint)]">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-[var(--app-line)] pt-2.5">
        <p className="text-[9.5px] text-[var(--app-faint)]">Prospectus · signage · social · UI kit</p>
        <Chip>one system</Chip>
      </div>
    </div>
  );
}

