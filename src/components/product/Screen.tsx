import type { DashboardKey } from '../../data/systems';
import { DeviceFrame } from './DeviceFrame';
import { SchoolDashboard } from './dashboards/SchoolDashboard';
import { HospitalDashboard } from './dashboards/HospitalDashboard';
import { HotelDashboard } from './dashboards/HotelDashboard';
import { CrmDashboard } from './dashboards/CrmDashboard';
import { AnalyticsDashboard } from './dashboards/AnalyticsDashboard';
import { AutomationPreview, SitePreview } from './dashboards/SitePreview';

export type ScreenKey = DashboardKey | 'site' | 'automation';

const screens: Record<ScreenKey, () => JSX.Element> = {
  school: SchoolDashboard,
  hospital: HospitalDashboard,
  hotel: HotelDashboard,
  crm: CrmDashboard,
  analytics: AnalyticsDashboard,
  site: SitePreview,
  automation: AutomationPreview,
};

const urls: Record<ScreenKey, string> = {
  school: 'app.schoolos.in/campus/overview',
  hospital: 'care.hospital.in/front-desk',
  hotel: 'stay.hotel.in/today',
  crm: 'app.businessos.in/pipeline',
  analytics: 'growth.dashboard.in/overview',
  site: 'northlinegroup.com',
  automation: 'ops.internal/runs/4182',
};

/** One entry point for every fake screen, so a page never wires a frame by hand. */
export function Screen({
  screen,
  ratio = '16 / 10',
  className,
  chrome = 'browser',
}: {
  screen: ScreenKey;
  ratio?: string;
  className?: string;
  chrome?: 'browser' | 'app' | 'none';
}) {
  const Body = screens[screen];
  return (
    <DeviceFrame chrome={chrome} url={urls[screen]} ratio={ratio} className={className}>
      <Body />
    </DeviceFrame>
  );
}
