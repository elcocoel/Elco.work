/**
 * Closed path in `objectBoundingBox` space (0–1) for clip-path:
 * a rectangle with a **regular sine perturbation** on each edge.
 * Integer `cyclesH` / `cyclesV` so sin = 0 at corners → continuous silhouette.
 */
export function buildWavyRectPathD(options?: {
  pad?: number;
  amp?: number;
  cyclesH?: number;
  cyclesV?: number;
  segmentsPerEdge?: number;
}): string {
  const pad = options?.pad ?? 0.068;
  const amp = options?.amp ?? 0.011;
  const cyclesH = options?.cyclesH ?? 9;
  const cyclesV = options?.cyclesV ?? 7;
  const n = options?.segmentsPerEdge ?? 56;
  const twoPi = Math.PI * 2;

  const parts: string[] = [];

  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = pad + t * (1 - 2 * pad);
    const y = pad + amp * Math.sin(twoPi * cyclesH * t);
    parts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(5)},${y.toFixed(5)}`);
  }

  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const y = pad + t * (1 - 2 * pad);
    const x = 1 - pad + amp * Math.sin(twoPi * cyclesV * t);
    parts.push(`L${x.toFixed(5)},${y.toFixed(5)}`);
  }

  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const x = 1 - pad - t * (1 - 2 * pad);
    const y = 1 - pad + amp * Math.sin(twoPi * cyclesH * t);
    parts.push(`L${x.toFixed(5)},${y.toFixed(5)}`);
  }

  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const y = 1 - pad - t * (1 - 2 * pad);
    const x = pad + amp * Math.sin(twoPi * cyclesV * t);
    parts.push(`L${x.toFixed(5)},${y.toFixed(5)}`);
  }

  parts.push('Z');
  return parts.join(' ');
}

/**
 * Discovery FAB clip — **perfect circle** mean radius with **acute** radial sine scallops only
 * (no secondary blob harmonic). Integer `cyclesAround` closes the loop; `wavePhase` animates
 * the traveling ripple.
 */
export const DISCOVERY_FAB_CLIP_DEFAULTS = {
  centerX: 0.5,
  centerY: 0.5,
  /** Mean radius (objectBoundingBox). */
  baseRadius: 0.36,
  /** Scallop depth — higher = sharper badge read (watch copy clearance). */
  waveAmp: 0.028,
  /** Full sine waves around the perimeter (integer → seamless loop with phase). */
  cyclesAround: 16,
  /** Samples for smooth high-frequency edge. */
  segments: 192,
} as const;

export type DiscoveryFabClipDefaults = typeof DISCOVERY_FAB_CLIP_DEFAULTS;

export function buildWavyRadialBadgePathD(
  options?: Partial<DiscoveryFabClipDefaults> & {
    /** Radians; animate for traveling scallops. */
    wavePhase?: number;
  },
): string {
  const cx = options?.centerX ?? DISCOVERY_FAB_CLIP_DEFAULTS.centerX;
  const cy = options?.centerY ?? DISCOVERY_FAB_CLIP_DEFAULTS.centerY;
  const baseR = options?.baseRadius ?? DISCOVERY_FAB_CLIP_DEFAULTS.baseRadius;
  const waveAmp = options?.waveAmp ?? DISCOVERY_FAB_CLIP_DEFAULTS.waveAmp;
  const cycles = options?.cyclesAround ?? DISCOVERY_FAB_CLIP_DEFAULTS.cyclesAround;
  const n = options?.segments ?? DISCOVERY_FAB_CLIP_DEFAULTS.segments;
  const wavePhase = options?.wavePhase ?? 0;
  const twoPi = Math.PI * 2;

  const parts: string[] = [];

  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const θ = t * twoPi;
    const r = baseR + waveAmp * Math.sin(cycles * θ + wavePhase);
    const x = cx + r * Math.cos(θ);
    const y = cy + r * Math.sin(θ);
    parts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(5)},${y.toFixed(5)}`);
  }

  parts.push('Z');
  return parts.join(' ');
}
