import { AppWindow, Chip, Line, Metric, Panel } from '../AppUi';

/**
 * A marketing site rendered inside the product UI scope — still monochrome, so
 * a "website" preview can sit in a yellow or pink block without fighting it.
 */
export function SitePreview() {
  return (
    <div className="app-light flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 border-b border-[var(--app-line)] px-3 py-2.5">
        <span aria-hidden className="h-3 w-3 rounded-[3px] bg-[var(--app-fg)]" />
        <p className="text-[11px] font-semibold">Northline Group</p>
        <nav className="ml-auto hidden gap-3 text-[10px] text-[var(--app-dim)] xs:flex">
          <span>Solutions</span>
          <span>Sectors</span>
          <span>Insight</span>
          <span className="pill px-2 py-0.5 text-[9.5px]">Contact</span>
        </nav>
      </header>

      <div className="min-h-0 flex-1 p-3">
        <div className="grid h-full min-h-0 gap-2.5 lg:grid-cols-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--app-faint)]">
              Industrial infrastructure
            </p>
            <p className="mt-1.5 text-[clamp(0.95rem,2.6vw,1.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Twenty-one plants.
              <br />
              One operating picture.
            </p>
            <p className="mt-2 max-w-[38ch] text-[10.5px] leading-[1.45] text-[var(--app-dim)]">
              A corporate site that doubles as a sales instrument: sector pages, live plant data
              and a quote request that reaches the right desk in one step.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <Chip strong>Request a quote</Chip>
              <Chip>Download capability deck</Chip>
            </div>
          </div>

          <div className="hidden gap-2.5 lg:col-span-5 lg:grid">
            <div className="grid grid-cols-2 gap-2.5">
              <Metric value="21" label="Plants" />
              <Metric value="4.2M t" label="Annual output" />
            </div>
            <Panel title="Enquiries" hint="this month">
              <Line label="Quote requests" value="182" />
              <Line label="Spec downloads" value="640" />
              <Line label="Avg response" value="3h 10m" />
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A compact automation log — used where the story is a workflow, not a screen. */
export function AutomationPreview() {
  return (
    <AppWindow
      product="Ops"
      nav={['Runs', 'Flows', 'Queues', 'Alerts', 'Logs']}
      active="Runs"
      title="Invoice intake"
      subtitle="Run #4,182 · 00:00:41"
      chip="Live"
    >
      <div className="grid h-full min-h-0 gap-2.5 lg:grid-cols-12">
        <Panel title="Steps" className="lg:col-span-7">
          <Line label="1 · Mail received" value="00:00" sub="vendor@supplier.co.in" />
          <Line label="2 · Document read" value="00:06" sub="GST + line items extracted" />
          <Line label="3 · Matched to PO" value="00:11" sub="PO-2291 · 98% confidence" />
          <Line label="4 · Exception raised" value="00:19" sub="rate differs by ₹4,120" />
          <Line label="5 · Sent for approval" value="00:41" sub="finance@ · SLA 4h" />
        </Panel>
        <div className="grid gap-2.5 lg:col-span-5">
          <Metric value="1,284" label="Invoices this month" delta={12} hint="automated" />
          <Metric value="91%" label="Straight-through" delta={6} hint="no human touch" />
          <Metric value="4.2 min" label="Saved per invoice" hint="≈ 90 hours / month" />
        </div>
      </div>
    </AppWindow>
  );
}
