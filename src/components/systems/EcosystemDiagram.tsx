import { motion } from 'framer-motion';
import { useMotionOk } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';

type Node = { label: string; caption: string; x: number; y: number; path: string };

/**
 * Left and right satellites, drawn with the chamfered orthogonal traces the
 * logomark uses — the same geometry at a different scale. Exported because the
 * diagram is unreadable at phone widths, so small screens get the same six
 * labels as a plain list instead of a shrunken drawing.
 */
export const ECOSYSTEM_NODES: Node[] = [
  {
    label: 'Website & SEO',
    caption: 'the front door',
    x: 40,
    y: 54,
    path: 'M180 82 H 280 L 330 132 V 252 H 380',
  },
  {
    label: 'CRM & sales',
    caption: 'every enquiry, tracked',
    x: 40,
    y: 244,
    path: 'M180 272 H 380',
  },
  {
    label: 'Billing & GST',
    caption: 'invoices that reconcile',
    x: 40,
    y: 434,
    path: 'M180 462 H 280 L 330 412 V 308 H 380',
  },
  {
    label: 'WhatsApp & alerts',
    caption: 'reaches people where they are',
    x: 780,
    y: 54,
    path: 'M780 82 H 680 L 630 132 V 252 H 580',
  },
  {
    label: 'Reports & MIS',
    caption: 'one number, not four',
    x: 780,
    y: 244,
    path: 'M780 272 H 580',
  },
  {
    label: 'Staff & field app',
    caption: 'works offline, syncs later',
    x: 780,
    y: 434,
    path: 'M780 462 H 680 L 630 412 V 308 H 580',
  },
];

const PADS = [
  [176, 78],
  [176, 268],
  [176, 458],
  [776, 78],
  [776, 268],
  [776, 458],
];

export function EcosystemDiagram({ className }: { className?: string }) {
  const motionOk = useMotionOk();

  return (
    <svg
      viewBox="0 0 960 560"
      className={cn('w-full', className)}
      role="img"
      aria-label="Six parts of a business — website, CRM, billing, messaging, reporting and a staff app — all wired into one central system holding a single record."
    >
      <g stroke="currentColor" fill="none" strokeWidth="1.75" strokeLinecap="square">
        {ECOSYSTEM_NODES.map((node, index) => (
          <motion.path
            key={node.label}
            d={node.path}
            opacity={0.45}
            initial={motionOk ? { pathLength: 0 } : false}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </g>

      <g fill="currentColor" opacity="0.55">
        {PADS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" />
        ))}
      </g>

      {ECOSYSTEM_NODES.map((node, index) => (
        <motion.g
          key={node.label}
          initial={motionOk ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
        >
          <rect
            x={node.x}
            y={node.y}
            width="140"
            height="56"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.32"
          />
          <text x={node.x + 14} y={node.y + 25} fontSize="15" fontWeight="500" fill="currentColor">
            {node.label}
          </text>
          <text
            x={node.x + 14}
            y={node.y + 42}
            fontSize="11"
            fill="currentColor"
            fillOpacity="0.62"
          >
            {node.caption}
          </text>
        </motion.g>
      ))}

      <motion.g
        initial={motionOk ? { opacity: 0, scale: 0.94 } : false}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '480px 280px' }}
      >
        <rect x="380" y="224" width="200" height="112" fill="currentColor" />
        <text
          x="480"
          y="268"
          fontSize="21"
          fontWeight="600"
          letterSpacing="-0.5"
          textAnchor="middle"
          fill="var(--bg)"
        >
          ONE SYSTEM
        </text>
        <text
          x="480"
          y="292"
          fontSize="11.5"
          textAnchor="middle"
          fill="var(--bg)"
          fillOpacity="0.72"
        >
          one record · one login · one truth
        </text>
        <rect x="470" y="310" width="20" height="4" fill="var(--bg)" fillOpacity="0.45" />
      </motion.g>
    </svg>
  );
}
