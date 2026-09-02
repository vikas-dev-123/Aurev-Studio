import type { ReactNode } from 'react';
import { AppWindow, Bars, Chip, Line, Metric, Panel, Ring, Table } from '../AppUi';
import { grouped } from '../../../lib/utils';

const SESSIONS = [1180, 1320, 1290, 1460, 1610, 1540, 1720, 1880, 1810, 2040, 2180, 2260];
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const PAGES: ReactNode[][] = [
  ['/school-management-software', '8,412', '3.2%', <Chip key="a" strong>#3</Chip>],
  ['/hospital-management-system', '6,180', '2.8%', <Chip key="b">#6</Chip>],
  ['/hotel-management-software', '4,940', '4.1%', <Chip key="c">#5</Chip>],
  ['/blog/erp-vs-spreadsheets', '3,120', '1.4%', <Chip key="d">#11</Chip>],
];

export function AnalyticsDashboard() {
  return (
    <AppWindow
      product="Growth"
      nav={['Overview', 'Acquisition', 'Pages', 'Keywords', 'Funnels', 'Events', 'Exports']}
      active="Overview"
      title="Search & growth"
      subtitle="Last 30 days vs previous 30"
      chip="GA4 + Search Console"
    >
      <div className="grid h-full min-h-0 gap-2.5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Metric value="48.2K" label="Sessions" delta={38} hint="organic led" />
          <Metric value="3.8%" label="Enquiry rate" delta={1.2} hint="form + WhatsApp" />
          <Metric value="8.4" label="Avg position" delta={-2.1} hint="was 10.5" />
          <Metric value={grouped(612)} label="Qualified leads" delta={22} hint="last 30 days" />
        </div>

        <div className="grid min-h-0 gap-2.5 lg:grid-cols-12">
          <Panel title="Sessions" hint="12 months" className="lg:col-span-7">
            <Bars data={SESSIONS} labels={MONTHS} height={92} />
          </Panel>

          <Panel title="Channel mix" className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Ring value={0.62} label="organic" />
              <div className="min-w-0 flex-1">
                <Line label="Organic search" value="62%" sub="1,842 keywords ranked" />
                <Line label="Direct" value="19%" sub="brand recall" />
                <Line label="Referral" value="12%" sub="directories + partners" />
                <Line label="Paid" value="7%" sub="two campaigns" />
              </div>
            </div>
          </Panel>
        </div>

        <Panel title="Top entry pages" hint="by sessions" className="hidden lg:flex" action={<Chip>Export</Chip>}>
          <Table head={['Page', 'Sessions', 'Enquiry rate', 'Position']} rows={PAGES} />
        </Panel>
      </div>
    </AppWindow>
  );
}
