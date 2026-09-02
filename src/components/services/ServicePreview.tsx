import type { PreviewKind } from '../../data/services';
import { DeviceFrame } from '../product/DeviceFrame';
import { Screen } from '../product/Screen';
import {
  ChatPreview,
  GrowthPreview,
  IdentityPreview,
  PhoneAppPreview,
  VitalsPreview,
  WorkflowMapPreview,
} from '../product/dashboards/ServicePreviews';

/**
 * One service, one piece of evidence.
 *
 * Every row on /services shows a real screen rather than an icon, and each kind
 * of work gets the artefact it would actually produce: an audit map for strategy,
 * a vitals report for engineering, a phone for the mobile app, a thread for the
 * agent. Everything renders inside a neutral graphite frame, so a yellow row and
 * a white row hold the same monochrome software.
 */
export function ServicePreview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case 'wireframe':
      return (
        <DeviceFrame chrome="app" title="Workflow audit" ratio="16 / 10">
          <WorkflowMapPreview />
        </DeviceFrame>
      );

    case 'dashboard':
      return <Screen screen="school" chrome="app" ratio="16 / 10" />;

    case 'browser':
      return <Screen screen="site" ratio="16 / 10" />;

    case 'vitals':
      return (
        <DeviceFrame chrome="app" title="Core Web Vitals · production" ratio="16 / 10">
          <VitalsPreview />
        </DeviceFrame>
      );

    case 'phone':
      // A phone is 9:16, so it is centred inside the row's slot instead of
      // stretched to it — a wide phone frame reads as a mistake.
      return (
        <div className="mx-auto w-[min(15rem,62%)]">
          <DeviceFrame chrome="phone" ratio="9 / 16">
            <PhoneAppPreview />
          </DeviceFrame>
        </div>
      );

    case 'flow':
      return <Screen screen="automation" chrome="app" ratio="16 / 10" />;

    case 'pipeline':
      return <Screen screen="crm" chrome="app" ratio="16 / 10" />;

    case 'search':
      return <Screen screen="analytics" chrome="app" ratio="16 / 10" />;

    case 'chat':
      return (
        <DeviceFrame chrome="app" title="Enquiry agent · live" ratio="16 / 10">
          <ChatPreview />
        </DeviceFrame>
      );

    case 'growth':
      return (
        <DeviceFrame chrome="app" title="Growth · monthly review" ratio="16 / 10">
          <GrowthPreview />
        </DeviceFrame>
      );

    case 'identity':
      return (
        <DeviceFrame chrome="none" ratio="16 / 10">
          <IdentityPreview />
        </DeviceFrame>
      );
  }
}
