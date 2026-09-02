import type { ReactNode } from 'react';
import { AppWindow, Chip, Line, Meter, Metric, Panel, Spark, Table } from '../AppUi';
import { rupees } from '../../../lib/utils';

const STAGES = [
  { label: 'Enquiry', count: 214, value: 0.98 },
  { label: 'Qualified', count: 132, value: 0.62 },
  { label: 'Proposal', count: 74, value: 0.35 },
  { label: 'Negotiation', count: 41, value: 0.19 },
  { label: 'Won', count: 23, value: 0.11 },
];

const TREND = [112, 118, 126, 121, 134, 148, 156, 162, 178, 184];

const OWNERS = [
  { name: 'Neha D.', value: '₹68L' },
  { name: 'Arjun P.', value: '₹51L' },
  { name: 'Sana R.', value: '₹39L' },
  { name: 'Unassigned', value: '₹26L' },
];

const DEALS: ReactNode[][] = [
  ['Ridge Public School', rupees(1850000), 'Proposal', <Chip key="a">Follow up 2d</Chip>],
  ['Sunmed Diagnostics', rupees(920000), 'Negotiation', <Chip key="b" strong>Hot</Chip>],
  ['Lakeview Resorts', rupees(2400000), 'Qualified', <Chip key="c">Demo booked</Chip>],
  ['Verma Logistics', rupees(640000), 'Enquiry', <Chip key="d">New</Chip>],
];

export function CrmDashboard() {
  return (
    <AppWindow
      product="Business OS"
      nav={['Pipeline', 'Leads', 'Accounts', 'Quotes', 'Invoices', 'Tasks', 'Reports']}
      active="Pipeline"
      title="Pipeline"
      subtitle="Q3 · 4 owners · 128 open deals"
      chip="Forecast 92% conf."
    >
      <div className="grid h-full min-h-0 gap-2.5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Metric value="₹1.84Cr" label="Open pipeline" delta={9.4} hint="weighted ₹71L" />
          <Metric value="31%" label="Win rate" delta={4.1} hint="last 90 days" />
          <Metric value="128" label="Open deals" delta={-3} hint="14 stalled" />
          <Metric value="19 days" label="Avg cycle" delta={-8} hint="enquiry to signature" />
        </div>

        <div className="grid min-h-0 gap-2.5 lg:grid-cols-12">
          <Panel title="Stages" hint="this quarter" className="lg:col-span-5">
            <div className="space-y-2">
              {STAGES.map((stage) => (
                <div key={stage.label}>
                  <div className="mb-1 flex items-baseline justify-between">
                    <p className="text-[10.5px]">{stage.label}</p>
                    <p className="num text-[10.5px] text-[var(--app-dim)]">{stage.count}</p>
                  </div>
                  <Meter value={stage.value} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Pipeline value" hint="10 weeks" className="lg:col-span-4">
            <Spark data={TREND} height={56} />
            <div className="mt-1">
              <Line label="Added this week" value={rupees(2600000)} />
              <Line label="Slipped" value={rupees(480000)} sub="3 deals" />
            </div>
          </Panel>

          <Panel title="Owners" className="lg:col-span-3">
            {OWNERS.map((owner) => (
              <Line key={owner.name} label={owner.name} value={owner.value} />
            ))}
          </Panel>
        </div>

        <Panel title="Needs attention" hint="no activity in 5 days" className="hidden lg:flex" action={<Chip>Assign</Chip>}>
          <Table head={['Account', 'Value', 'Stage', 'Next step']} rows={DEALS} />
        </Panel>
      </div>
    </AppWindow>
  );
}
