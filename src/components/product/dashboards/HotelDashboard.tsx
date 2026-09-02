import type { ReactNode } from 'react';
import { AppWindow, Bars, Chip, Initials, Line, Metric, Panel, Table } from '../AppUi';
import { rupees } from '../../../lib/utils';

const NIGHTS = [72, 78, 81, 86, 92, 88, 84, 79, 83, 86, 90, 94, 91, 86];
const NIGHT_LABELS = ['', '', '', '', '', '', 'Mon', '', '', '', '', '', '', 'Sun'];

const ARRIVALS: ReactNode[][] = [
  [
    <span key="a" className="flex items-center gap-1.5">
      <Initials name="Rhea Kapoor" /> Rhea Kapoor
    </span>,
    '214 · Deluxe',
    '3 nights',
    <Chip key="b" strong>Checked in</Chip>,
  ],
  [
    <span key="c" className="flex items-center gap-1.5">
      <Initials name="Vikram Shah" /> Vikram Shah
    </span>,
    '308 · Suite',
    '2 nights',
    <Chip key="d">ETA 15:30</Chip>,
  ],
  [
    <span key="e" className="flex items-center gap-1.5">
      <Initials name="Aisha Khan" /> Aisha Khan
    </span>,
    '117 · Twin',
    '1 night',
    <Chip key="f">Airport pickup</Chip>,
  ],
];

export function HotelDashboard() {
  return (
    <AppWindow
      product="Stay OS"
      nav={['Today', 'Reservations', 'Rooms', 'Housekeeping', 'F&B', 'Rates', 'Reports']}
      active="Today"
      title="Today"
      subtitle="42 arrivals · 37 departures · 6 in-house VIPs"
      chip="Channels synced"
    >
      <div className="grid h-full min-h-0 gap-2.5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Metric value="86%" label="Occupancy" delta={4.5} hint="74 of 86 rooms" />
          <Metric value="₹6,410" label="ADR" delta={2.8} hint="average daily rate" />
          <Metric value="₹5,513" label="RevPAR" delta={7.1} hint="per available room" />
          <Metric value="42" label="Arrivals" hint="12 before noon" />
        </div>

        <div className="grid min-h-0 gap-2.5 lg:grid-cols-12">
          <Panel title="Occupancy" hint="last 14 nights" className="lg:col-span-7">
            <Bars data={NIGHTS} labels={NIGHT_LABELS} height={92} />
          </Panel>

          <Panel title="Where bookings come from" className="lg:col-span-5">
            <Line label="OTA" value="44%" sub="Booking · Agoda · MMT" />
            <Line label="Direct" value="38%" sub="website + phone" />
            <Line label="Corporate" value="18%" sub="7 contracted accounts" />
            <div className="mt-2 border-t border-[var(--app-line)] pt-2">
              <Line label="Direct revenue saved" value={rupees(184000)} sub="commission avoided" />
            </div>
          </Panel>
        </div>

        <Panel title="Arrivals" hint="next 4 hours" className="hidden lg:flex" action={<Chip>Assign rooms</Chip>}>
          <Table head={['Guest', 'Room', 'Stay', 'Status']} rows={ARRIVALS} />
        </Panel>
      </div>
    </AppWindow>
  );
}
