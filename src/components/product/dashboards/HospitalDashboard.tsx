import type { ReactNode } from 'react';
import { AppWindow, Bars, Chip, Line, Metric, Panel, Spark, Table } from '../AppUi';
import { rupees } from '../../../lib/utils';

const DEPARTMENTS = [148, 96, 74, 52, 38, 21];
const DEPT_LABELS = ['Gen', 'Ortho', 'Paeds', 'ENT', 'Derm', 'Cardio'];
const WAIT_TREND = [21, 19, 17, 18, 15, 14, 12];

const QUEUE: ReactNode[][] = [
  ['T-208', 'Dr. Kulkarni · Gen', '2 min', <Chip key="a" strong>In room</Chip>],
  ['T-209', 'Dr. Nair · Ortho', '6 min', <Chip key="b">Waiting</Chip>],
  ['T-210', 'Dr. Rathi · Paeds', '9 min', <Chip key="c">Waiting</Chip>],
  ['T-211', 'Lab · CBC + LFT', '—', <Chip key="d">Sample taken</Chip>],
];

export function HospitalDashboard() {
  return (
    <AppWindow
      product="Care OS"
      nav={['Front desk', 'OPD', 'IPD', 'Pharmacy', 'Lab', 'Billing', 'Reports']}
      active="Front desk"
      title="Front desk"
      subtitle="Tuesday · 11:42 · 3 doctors on floor"
      chip="Live queue"
    >
      <div className="grid h-full min-h-0 gap-2.5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Metric value="214" label="OPD today" delta={8.2} hint="registered" />
          <Metric value="78/96" label="Beds occupied" delta={2.4} hint="4 discharges due" />
          <Metric value="12 min" label="Avg wait" delta={-31} hint="was 21 min" />
          <Metric value={rupees(320000)} label="Pharmacy" delta={5.9} hint="today" />
        </div>

        <div className="grid min-h-0 gap-2.5 lg:grid-cols-12">
          <Panel title="Department load" hint="patients today" className="lg:col-span-5">
            <Bars data={DEPARTMENTS} labels={DEPT_LABELS} height={92} markLast={false} />
          </Panel>

          <Panel title="Wait time" hint="last 7 days" className="lg:col-span-3">
            <Spark data={WAIT_TREND} height={52} />
            <div className="mt-1">
              <Line label="Peak hour" value="10–11" />
              <Line label="No-shows" value="4.1%" />
            </div>
          </Panel>

          <Panel
            title="Ward status"
            hint="occupancy"
            className="lg:col-span-4"
          >
            <Line label="General ward" value="38/44" sub="6 free" />
            <Line label="Private rooms" value="21/24" sub="3 free" />
            <Line label="ICU" value="11/16" sub="5 free" />
            <Line label="Day care" value="8/12" sub="4 free" />
          </Panel>
        </div>

        <Panel title="Token queue" hint="OPD counter 2" className="hidden lg:flex" action={<Chip>Auto-call</Chip>}>
          <Table head={['Token', 'Assigned', 'Waiting', 'Status']} rows={QUEUE} />
        </Panel>
      </div>
    </AppWindow>
  );
}
