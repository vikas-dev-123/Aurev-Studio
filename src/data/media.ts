/**
 * Hero media configuration.
 *
 * Nothing is hotlinked by default: most stock libraries forbid serving their CDN
 * files from a third-party site, and a hero that depends on someone else's
 * bandwidth is a liability. Drop a URL in `mp4` (or `hls` for an adaptive
 * stream — Cloudflare Stream, Mux, Bunny, your own bucket) and the video layer
 * activates automatically. Until then the generated still plus the animated
 * trace field is the hero, by design rather than by accident.
 */
export const heroMedia = {
  mp4: '',
  /** .m3u8 playlist. Safari plays it natively; hls.js is loaded on demand elsewhere. */
  hls: '',
  poster: '/hero-still.jpg',
  /** Spoken description for the poster, since the video itself is decorative. */
  posterAlt:
    'Dark technical drawing of connected circuit traces and contact pads, suggesting one connected system.',
} as const;
