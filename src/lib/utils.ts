import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Indian numbering, e.g. 1240000 -> "12.4L". Used across the product UI. */
export function lakh(value: number, digits = 1): string {
  if (value >= 1_00_00_000) return `${(value / 1_00_00_000).toFixed(digits)}Cr`;
  if (value >= 1_00_000) return `${(value / 1_00_000).toFixed(digits)}L`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(digits)}K`;
  return String(value);
}

export function rupees(value: number, digits = 1): string {
  return `₹${lakh(value, digits)}`;
}

export function grouped(value: number): string {
  return value.toLocaleString('en-IN');
}

/** Two-digit sequence label, e.g. 3 -> "03". Only used where content is a real sequence. */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Builds an SVG polyline for a sparkline from raw values.
 * Kept dependency-free so the product UI has no chart library behind it.
 */
export function sparkPoints(values: number[], width: number, height: number, pad = 1): string {
  if (values.length < 2) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = (width - pad * 2) / (values.length - 1);
  return values
    .map((v, i) => {
      const x = pad + i * stepX;
      const y = pad + (height - pad * 2) * (1 - (v - min) / span);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}
