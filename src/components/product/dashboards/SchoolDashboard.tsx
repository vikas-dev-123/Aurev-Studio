import type { ReactNode } from 'react';
import { AppWindow, Bars, Chip, Line, Metric, Panel, Ring, Table } from '../AppUi';
import { grouped, rupees } from '../../../lib/utils';

const WEEK = [92.1, 95.4, 93.8, 96.2, 91.4, 94.8];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const FOLLOW_UPS: ReactNode[][] = [
  ['Aarav Menon', 'VIII-B', 'Fee reminder — Term 2', <Chip key="a">Due 4d</Chip>],
  ['Ishita Rao', 'X-A', 'Absent 3 days · call parent', <Chip key="b" strong>Urgent</Chip>],
  ['Bus route 07', 'Transport', 'GPS offline since 07:40', <Chip key="c">Open</Chip>],
  ['Grade IX', 'Exams', 'Unit test marks pending', <Chip key="d">2 of 6</Chip>],
];

/** The fragment used on the home page and on /industries. Numbers are consistent
 *  with the outcomes quoted in data/systems.ts — one source of truth, one story. */
export function SchoolDashboard() {
  return (
    <AppWindow
      product="School OS"
      nav={['Overview', 'Students', 'Attendance', 'Fees', 'Exams', 'Timetable', 'Transport']}
      active="Overview"
      title="Campus overview"
      subtitle="Session 2026–27 · Term 2 · Main campus"
      chip="Synced 08:12"
    >
      <div className="grid h-full min-h-0 gap-2.5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Metric value={grouped(2842)} label="Students" delta={3.1} hint="on one record" />
          <Metric value="94.8%" label="Attendance" delta={0.6} hint="captured today" />
          <Metric value={rupees(1240000)} label="Fees collected" delta={11.4} hint="this term" />
          <Metric value="78" label="Pending tasks" delta={-12} hint="across 6 modules" />
        </div>

        <div className="grid min-h-0 gap-2.5 lg:grid-cols-12">
          <Panel
            title="Attendance"
            hint="this week"
            className="lg:col-span-7"
            action={<Chip>Class-wise</Chip>}
          >
            <Bars data={WEEK} labels={DAYS} height={92} />
          </Panel>

          <Panel title="Fee collection" hint="Term 2" className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Ring value={0.78} label="collected" />
              <div className="min-w-0 flex-1">
                <Line label="Billed" value={rupees(1590000)} />
                <Line label="Collected" value={rupees(1240000)} sub="612 of 784 families" />
                <Line label="Outstanding" value={rupees(350000)} sub="172 families" />
              </div>
            </div>
          </Panel>
        </div>

        <Panel
          title="Today’s follow-ups"
          hint="assigned to office staff"
          className="hidden lg:flex"
          action={<Chip>4 open</Chip>}
        >
          <Table head={['Name', 'Class', 'Action', 'Status']} rows={FOLLOW_UPS} />
        </Panel>
      </div>
    </AppWindow>
  );
}
