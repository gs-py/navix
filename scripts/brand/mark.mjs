/**
 * Navix mark: the hero's green ribbon crossed by a white stroke, forming the "X".
 * Pure paths (no fonts) so it renders identically as a favicon, app icon or in a browser tab.
 *
 * @param {{ radius?: number, inset?: number }} opts
 *   radius: corner radius of the black tile (0 = full-bleed square, for iOS / maskable icons)
 *   inset:  0–1 shrink of the glyph inside the tile (maskable icons keep it inside the safe zone)
 */
export function markSvg({ radius = 14, inset = 0 } = {}) {
  const s = 1 - inset;
  const t = (64 - 64 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="#000000"/>
  <g transform="translate(${t} ${t}) scale(${s})">
    <path d="M15 13 L49 51" stroke="#F7F7F7" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M58 16 H44 C40 16 37.6 17.4 35.4 20.4 L13 51" stroke="#13FF00" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
</svg>`;
}
