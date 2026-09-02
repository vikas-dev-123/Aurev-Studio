import { useEffect, useRef, useState } from 'react';
import { heroMedia } from '../../data/media';
import { useMotionOk } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';

type Connection = { saveData?: boolean };

/**
 * React 18 does not forward `fetchPriority` to the DOM — it warns and drops it —
 * while the platform attribute is all-lowercase. Spreading it keeps the real
 * attribute on the element without a console warning on every page load.
 */
const HIGH_PRIORITY = { fetchpriority: 'high' } as unknown as { fetchPriority?: 'high' };

/**
 * Poster first, video second. The still is always painted, so there is never a
 * blank frame; the video fades in only once it can actually play, and never
 * loads at all under reduced motion, data saver, or when no URL is configured.
 */
export function VideoBackground({ className, dim = 0.45 }: { className?: string; dim?: number }) {
  const motionOk = useMotionOk();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const saveData =
    typeof navigator !== 'undefined' &&
    ((navigator as Navigator & { connection?: Connection }).connection?.saveData ?? false);

  const wanted = Boolean(heroMedia.mp4 || heroMedia.hls) && motionOk && !saveData;

  useEffect(() => {
    const video = videoRef.current;
    if (!wanted || !video) return;

    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    const nativeHls = video.canPlayType('application/vnd.apple.mpegurl') !== '';
    if (heroMedia.hls && !nativeHls) {
      import('hls.js')
        .then(({ default: Hls }) => {
          if (cancelled || !Hls.isSupported()) return;
          const instance = new Hls({ capLevelToPlayerSize: true, maxBufferLength: 12 });
          instance.loadSource(heroMedia.hls);
          instance.attachMedia(video);
          hls = instance;
        })
        .catch(() => {
          /* Fallback is already on screen — nothing to recover. */
        });
    }

    // Pause off-screen: a hero video decoding behind three other sections is
    // pure battery cost.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    return () => {
      cancelled = true;
      observer.disconnect();
      hls?.destroy();
    };
  }, [wanted]);

  return (
    <div aria-hidden className={cn('absolute inset-0 overflow-hidden bg-ink', className)}>
      <img
        src={heroMedia.poster}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
        {...HIGH_PRIORITY}
        decoding="async"
      />

      {wanted ? (
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-expo',
            ready ? 'opacity-100' : 'opacity-0',
          )}
          poster={heroMedia.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onCanPlay={() => setReady(true)}
          onError={() => setReady(false)}
        >
          {heroMedia.mp4 ? <source src={heroMedia.mp4} type="video/mp4" /> : null}
        </video>
      ) : null}

      <TraceField />

      {/* A flat scrim, not a gradient: the block below arrives as a hard cut. */}
      <div className="absolute inset-0 bg-ink" style={{ opacity: dim }} />
    </div>
  );
}

/**
 * The motion in the hero when there is no video: two long traces drawing
 * themselves across the plate, in the same geometry as the logomark. Neutral
 * greys only — the hero block is ink, so nothing here imports a hue.
 */
function TraceField() {
  const motionOk = useMotionOk();
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 810"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g fill="none" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="square">
        <path
          d="M-40 214 H420 L470 164 H900 L950 214 H1480"
          opacity="0.1"
          className={motionOk ? 'trace-live' : undefined}
          style={motionOk ? { strokeDasharray: '260 1400' } : undefined}
        />
        <path
          d="M-40 640 H300 L360 580 H760 L820 640 H1480"
          opacity="0.08"
          className={motionOk ? 'trace-live' : undefined}
          style={motionOk ? { strokeDasharray: '180 1400', animationDelay: '-0.8s' } : undefined}
        />
      </g>
      <g fill="#FAF9F5" opacity="0.16">
        <rect x="466" y="160" width="8" height="8" />
        <rect x="946" y="210" width="8" height="8" />
        <rect x="356" y="576" width="8" height="8" />
      </g>
    </svg>
  );
}
