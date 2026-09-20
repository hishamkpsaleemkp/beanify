// Generates stylised placeholder "photography" (bean bags, rooms, close-ups) as WebP files.
// Replace any output in public/images with a real photo (and update its path in src/data) when ready.
// Usage: node scripts/generate-art.mjs
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("public/images");

// ───────────────────────── colour helpers ─────────────────────────
const hex2rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgb2hex = (c) => "#" + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
const mix = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A.map((v, i) => v + (B[i] - v) * t)); };
const lighten = (c, t) => mix(c, "#ffffff", t);
const darken = (c, t) => mix(c, "#000000", t);

const P = {
  bone: "#F9F6EE", cream: "#FFFDF8", sand: "#EFE6D8", sand2: "#E4D6C2", blush: "#EBD7CD",
  sage: "#C5CDB4", sage2: "#9DAA88", terracotta: "#C98F76", garnet: "#781C2E", dark: "#24161A",
  wood: "#C9A27E", woodDark: "#A9805C",
};

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ───────────────────────── svg plumbing ─────────────────────────
let defsBuf = [];
let uid = 0;
const id = (p) => `${p}${++uid}`;
const def = (s) => { defsBuf.push(s); };

function svgDoc(W, H, body, outW) {
  const outH = Math.round((outW * H) / W);
  const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="0 0 ${W} ${H}">
<defs>
<filter id="blur" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="blurL" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter>
${defsBuf.join("\n")}
</defs>
${body}
</svg>`;
  defsBuf = [];
  return doc;
}

// ───────────────────────── bean bag shapes ─────────────────────────
function fanSeams(top, x0, x1, baseY, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const xb = x0 + ((x1 - x0) * (i + 0.5)) / n;
    const dx = xb - top[0];
    s += `M ${top[0]} ${top[1]} C ${top[0] + dx * 0.6} ${top[1] + (baseY - top[1]) * 0.25}, ${xb + dx * 0.14} ${baseY - (baseY - top[1]) * 0.35}, ${xb} ${baseY + 6} `;
  }
  return s;
}
function ribSeams(tops, xs, baseY) {
  let s = "";
  tops.forEach((t, i) => {
    const xb = xs[i];
    const dx = xb - t[0];
    s += `M ${t[0]} ${t[1]} C ${t[0] + dx * 0.4 - 10} ${t[1] + (baseY - t[1]) * 0.35}, ${xb + 12} ${baseY - (baseY - t[1]) * 0.3}, ${xb} ${baseY + 6} `;
  });
  return s;
}

const SHAPES = {
  pear: {
    d: "M -160 -10 C -180 -72 -152 -158 -102 -218 C -64 -266 -24 -298 22 -298 C 58 -298 70 -272 84 -246 C 100 -216 130 -196 150 -148 C 176 -98 182 -56 166 -18 C 160 8 100 14 0 14 C -100 14 -152 6 -160 -10 Z",
    pip: "M -160 -10 C -152 6 -100 14 0 14 C 100 14 158 8 166 -18",
    w: 340, h: 314,
    inner: () => fanSeams([14, -250], -140, 156, 8, 4),
    dent: "M -52 -262 C -20 -236 46 -246 96 -222",
  },
  lounger: {
    d: "M -222 -6 C -236 -62 -206 -116 -150 -140 C -118 -186 -46 -206 16 -198 C 88 -188 152 -160 196 -118 C 238 -80 246 -30 230 -4 C 220 14 150 16 0 16 C -150 16 -214 14 -222 -6 Z",
    pip: "M -222 -6 C -214 14 -150 16 0 16 C 150 16 220 14 230 -4",
    w: 470, h: 214,
    inner: () => ribSeams([[-150, -140], [-80, -186], [10, -198], [100, -180], [182, -130]], [-172, -90, 0, 104, 204], 12),
    dent: "M -120 -150 C -60 -175 20 -170 110 -140",
  },
  pouf: {
    d: "M -118 -8 C -130 -74 -88 -152 0 -162 C 88 -152 130 -74 118 -8 C 110 14 62 16 0 16 C -62 16 -110 14 -118 -8 Z",
    pip: "M -118 -8 C -110 14 -62 16 0 16 C 62 16 110 14 118 -8",
    w: 240, h: 178,
    inner: () => fanSeams([0, -158], -108, 108, 10, 6),
    button: [0, -150],
  },
  cushion: {
    d: "M -128 -242 Q 0 -264 128 -242 Q 142 -125 128 -8 Q 0 14 -128 -8 Q -142 -125 -128 -242 Z",
    pip: "M -128 -242 Q 0 -264 128 -242 Q 142 -125 128 -8 Q 0 14 -128 -8 Q -142 -125 -128 -242 Z",
    w: 270, h: 256,
    inner: () => "M -120 -236 L 0 -125 L 120 -236 M -120 -14 L 0 -125 L 120 -14",
    button: [0, -125],
    shadowScale: 0.7,
  },
};

function pattern(kind, color) {
  const pid = id("pt");
  if (kind === "boucle") {
    def(`<pattern id="${pid}" width="26" height="26" patternUnits="userSpaceOnUse">
<circle cx="5" cy="6" r="3.2" fill="#fff" opacity=".24"/><circle cx="17" cy="9" r="2.6" fill="#000" opacity=".12"/>
<circle cx="11" cy="19" r="3.4" fill="#fff" opacity=".2"/><circle cx="22" cy="21" r="2.4" fill="#000" opacity=".1"/></pattern>`);
    return pid;
  }
  if (kind === "stars") {
    const c = lighten(color, 0.55);
    def(`<pattern id="${pid}" width="64" height="64" patternUnits="userSpaceOnUse">
<path d="M16 8 l2.6 6 6.4.4 -4.9 4.2 1.6 6.3 -5.7 -3.4 -5.7 3.4 1.6 -6.3 -4.9 -4.2 6.4 -.4z" fill="${c}" opacity=".7"/>
<circle cx="48" cy="44" r="3" fill="${c}" opacity=".6"/></pattern>`);
    return pid;
  }
  return null;
}

function beanBag({ kind = "pear", color, x = 0, y = 0, s = 1, texture = null, piping = null, flip = false, shadow = true, rot = 0 }) {
  const sh = SHAPES[kind];
  const gid = id("g"), cid = id("c"), rid = id("r"), bid = id("b");
  const hi = lighten(color, 0.24), lo = darken(color, 0.3);
  const seam = darken(color, 0.22), seamHi = lighten(color, 0.18);
  const pip = piping || darken(color, 0.14);
  def(`<linearGradient id="${gid}" x1="0.15" y1="0" x2="0.85" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset=".45" stop-color="${color}"/><stop offset="1" stop-color="${lo}"/></linearGradient>
<radialGradient id="${rid}" cx=".32" cy=".26" r=".55"><stop offset="0" stop-color="#fff" stop-opacity=".36"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="${bid}" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
<clipPath id="${cid}"><path d="${sh.d}"/></clipPath>`);
  const pt = texture ? pattern(texture, color) : null;
  const inner = sh.inner();
  const btn = sh.button
    ? `<ellipse cx="${sh.button[0]}" cy="${sh.button[1]}" rx="15" ry="9" fill="${darken(color, 0.3)}" opacity=".85"/><ellipse cx="${sh.button[0] - 2}" cy="${sh.button[1] - 2}" rx="8" ry="4" fill="${lighten(color, 0.3)}" opacity=".5"/>`
    : "";
  const dent = sh.dent ? `<path d="${sh.dent}" stroke="${darken(color, 0.3)}" stroke-width="10" fill="none" opacity=".16" stroke-linecap="round" filter="url(#blur)"/>` : "";
  const sc = sh.shadowScale ?? 1;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})">
${shadow ? `<ellipse cx="0" cy="14" rx="${sh.w * 0.6 * sc}" ry="${16 * sc}" fill="#24161A" opacity=".26" filter="url(#blur)"/>` : ""}
<path d="${sh.d}" fill="url(#${gid})"/>
<g clip-path="url(#${cid})">
<path d="${inner}" stroke="${seam}" stroke-width="2.2" fill="none" opacity=".32"/>
<path d="${inner}" transform="translate(3.5 1.5)" stroke="${seamHi}" stroke-width="1.6" fill="none" opacity=".4"/>
${pt ? `<path d="${sh.d}" fill="url(#${pt})"/>` : ""}
${dent}
</g>
<path d="${sh.d}" fill="url(#${rid})"/>
<path d="${sh.d}" fill="url(#${bid})"/>
${btn}
<path d="${sh.pip}" stroke="${pip}" stroke-width="5.5" fill="none" stroke-linecap="round" opacity=".95"/>
<path d="${sh.pip}" stroke="${lighten(pip, 0.3)}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".5" transform="translate(0 -2.2)"/>
</g>`;
}

// ───────────────────────── props ─────────────────────────
function leaf(len, ang, w, fill) {
  return `<path transform="rotate(${ang})" d="M0 0 C ${w} ${-len * 0.3}, ${w * 0.8} ${-len * 0.8}, 0 ${-len} C ${-w * 0.8} ${-len * 0.8}, ${-w} ${-len * 0.3}, 0 0 Z" fill="${fill}"/>`;
}
function plant(x, y, s = 1, { pot = P.terracotta, tall = 1, greens = ["#6B7B57", "#84956B", "#56673F"] } = {}) {
  let l = "";
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = -72 + (144 * i) / (n - 1) + (i % 2 ? 6 : -6);
    l += leaf((150 + (i % 3) * 42) * tall, a, 34 + (i % 2) * 10, greens[i % 3]);
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">
<ellipse cx="0" cy="6" rx="52" ry="9" fill="#24161A" opacity=".2" filter="url(#blur)"/>
<g transform="translate(0 -66)">${l}</g>
<path d="M -38 -72 L 38 -72 L 29 0 Q 0 9 -29 0 Z" fill="${pot}"/>
<path d="M -38 -72 L 38 -72 L 36 -58 L -36 -58 Z" fill="${darken(pot, 0.14)}"/>
</g>`;
}
function lamp(x, y, s = 1, h = 340, shade = "#FFF3DC") {
  const g = id("lg");
  def(`<radialGradient id="${g}"><stop offset="0" stop-color="#FFE3AE" stop-opacity=".6"/><stop offset="1" stop-color="#FFE3AE" stop-opacity="0"/></radialGradient>`);
  return `<g transform="translate(${x} ${y}) scale(${s})">
<circle cx="0" cy="${-h - 30}" r="230" fill="url(#${g})"/>
<ellipse cx="0" cy="4" rx="36" ry="7" fill="#24161A" opacity=".22"/>
<rect x="-3" y="${-h}" width="6" height="${h}" rx="3" fill="#3A2A2E"/>
<ellipse cx="0" cy="0" rx="30" ry="6" fill="#3A2A2E"/>
<path d="M -46 ${-h + 6} L 46 ${-h + 6} L 32 ${-h - 64} L -32 ${-h - 64} Z" fill="${shade}"/>
<path d="M 8 ${-h + 6} L 46 ${-h + 6} L 32 ${-h - 64} L 8 ${-h - 64} Z" fill="${darken(shade, 0.06)}" opacity=".6"/>
</g>`;
}
function archWindow(x, y, w, h, { sky = ["#FFF9EA", "#F5E2C8"], frame = P.wood, mull = true, foliage = true } = {}) {
  const g = id("aw"), cid = id("ac"), r = w / 2;
  const d = `M ${x} ${y + h} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${y + h} Z`;
  const d2 = `M ${x + 14} ${y + h - 14} L ${x + 14} ${y + r} A ${r - 14} ${r - 14} 0 0 1 ${x + w - 14} ${y + r} L ${x + w - 14} ${y + h - 14} Z`;
  def(`<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient><clipPath id="${cid}"><path d="${d2}"/></clipPath>`);
  return `<path d="${d}" fill="${frame}"/><path d="${d2}" fill="url(#${g})"/>
${foliage ? `<g clip-path="url(#${cid})" opacity=".55" filter="url(#blur)"><ellipse cx="${x + w * 0.25}" cy="${y + h * 0.72}" rx="${w * 0.32}" ry="${h * 0.16}" fill="#A7B78D"/><ellipse cx="${x + w * 0.8}" cy="${y + h * 0.84}" rx="${w * 0.3}" ry="${h * 0.14}" fill="#8FA475"/></g>` : ""}
${mull ? `<path d="M ${x + w / 2} ${y + 14} L ${x + w / 2} ${y + h - 14} M ${x + 14} ${y + h * 0.5} L ${x + w - 14} ${y + h * 0.5}" stroke="${frame}" stroke-width="9"/>` : ""}
<rect x="${x - 12}" y="${y + h - 4}" width="${w + 24}" height="14" rx="4" fill="${darken(frame, 0.08)}"/>`;
}
function lightPatch(x, w, floorY, H, dx = 120) {
  const g = id("lp");
  def(`<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6E0" stop-opacity=".55"/><stop offset="1" stop-color="#FFF6E0" stop-opacity=".05"/></linearGradient>`);
  return `<polygon points="${x},${floorY} ${x + w},${floorY} ${x + w + dx},${H} ${x + dx * 0.4},${H}" fill="url(#${g})" filter="url(#blurL)"/>`;
}
function frame(x, y, w, h, art = 0, { mat = P.cream, border = "#3A2A2E" } = {}) {
  const cid = id("fc");
  const ix = x + 14, iy = y + 14, iw = w - 28, ih = h - 28;
  def(`<clipPath id="${cid}"><rect x="${ix}" y="${iy}" width="${iw}" height="${ih}"/></clipPath>`);
  let a = "";
  if (art === 0) a = `<circle cx="${ix + iw * 0.5}" cy="${iy + ih * 0.38}" r="${iw * 0.24}" fill="${P.terracotta}"/><path d="M ${ix} ${iy + ih} L ${ix} ${iy + ih * 0.7} Q ${ix + iw * 0.5} ${iy + ih * 0.45} ${ix + iw} ${iy + ih * 0.72} L ${ix + iw} ${iy + ih} Z" fill="${P.garnet}"/>`;
  if (art === 1) a = `<path d="M ${ix} ${iy + ih * 0.5} q ${iw * 0.25} -${ih * 0.16} ${iw * 0.5} 0 t ${iw * 0.5} 0 V ${iy + ih} H ${ix} Z" fill="${P.sage2}"/><path d="M ${ix} ${iy + ih * 0.7} q ${iw * 0.25} -${ih * 0.14} ${iw * 0.5} 0 t ${iw * 0.5} 0 V ${iy + ih} H ${ix} Z" fill="${P.woodDark}" opacity=".8"/>`;
  if (art === 2) a = `<path d="M ${ix + iw * 0.22} ${iy + ih * 0.7} C ${ix + iw * 0.05} ${iy + ih * 0.35}, ${ix + iw * 0.4} ${iy + ih * 0.12}, ${ix + iw * 0.62} ${iy + ih * 0.3} C ${ix + iw * 0.95} ${iy + ih * 0.5}, ${ix + iw * 0.8} ${iy + ih * 0.88}, ${ix + iw * 0.5} ${iy + ih * 0.84} C ${ix + iw * 0.35} ${iy + ih * 0.82}, ${ix + iw * 0.3} ${iy + ih * 0.78}, ${ix + iw * 0.22} ${iy + ih * 0.7} Z" fill="${P.garnet}"/>`;
  if (art === 3) a = [0, 1, 2, 3, 4].map((i) => `<rect x="${ix + (iw / 5) * i}" y="${iy}" width="${iw / 5}" height="${ih}" fill="${[P.blush, P.terracotta, P.sand2, P.garnet, P.sage][i]}"/>`).join("");
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${border}"/><rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" fill="${mat}"/><g clip-path="url(#${cid})">${a}</g>`;
}
function rug(cx, cy, rx, ry, fill = P.sand2, stripe = P.cream) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/><ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.86}" ry="${ry * 0.82}" fill="none" stroke="${stripe}" stroke-width="5" opacity=".7"/><ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.7}" ry="${ry * 0.64}" fill="none" stroke="${stripe}" stroke-width="2.5" opacity=".5" stroke-dasharray="14 10"/>`;
}
function bookRow(x, y, n, seed, maxH = 150) {
  const r = rng(seed);
  const cols = [P.garnet, P.sand2, P.dark, P.sage2, P.terracotta, P.cream, P.blush];
  let out = "", cx = x;
  for (let i = 0; i < n; i++) {
    const bw = 22 + r() * 22, bh = maxH * (0.7 + r() * 0.3);
    out += `<rect x="${cx}" y="${y - bh}" width="${bw}" height="${bh}" rx="2" fill="${cols[Math.floor(r() * cols.length)]}"/><rect x="${cx + 4}" y="${y - bh + 14}" width="${bw - 8}" height="3" fill="#fff" opacity=".35"/>`;
    cx += bw + 3;
  }
  return out;
}
function shelf(x, y, w, rows = 2, seed = 3) {
  let out = "";
  for (let i = 0; i < rows; i++) {
    const yy = y + i * 190;
    out += bookRow(x + 16, yy, Math.floor(w / 46), seed + i, 150);
    out += `<rect x="${x}" y="${yy}" width="${w}" height="16" rx="3" fill="${P.wood}"/><rect x="${x}" y="${yy + 12}" width="${w}" height="5" fill="${P.woodDark}" opacity=".6"/>`;
  }
  return out;
}
function stack(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-60" y="-24" width="120" height="24" rx="3" fill="${P.dark}"/><rect x="-52" y="-46" width="106" height="22" rx="3" fill="${P.garnet}"/><rect x="-56" y="-66" width="112" height="20" rx="3" fill="${P.sand2}"/>
<path d="M -20 -66 v -10 q 10 -14 20 0" fill="none" stroke="${P.dark}" stroke-width="2" opacity=".5"/></g>`;
}
function mug(x, y, s = 1, c = P.cream) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -18 -34 H 18 V -4 Q 18 4 10 4 H -10 Q -18 4 -18 -4 Z" fill="${c}"/><path d="M 18 -26 q 16 2 0 16" fill="none" stroke="${c}" stroke-width="5"/><ellipse cx="0" cy="-34" rx="18" ry="4" fill="${P.woodDark}"/></g>`;
}
function sofa(x, y, w, color = "#B9A48C") {
  const h = w * 0.44;
  return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="10" rx="${w * 0.52}" ry="16" fill="#24161A" opacity=".2" filter="url(#blur)"/>
<rect x="${-w / 2 + 14}" y="-12" width="14" height="22" rx="3" fill="${P.woodDark}"/><rect x="${w / 2 - 28}" y="-12" width="14" height="22" rx="3" fill="${P.woodDark}"/>
<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h * 0.82}" rx="34" fill="${darken(color, 0.06)}"/>
<rect x="${-w / 2 + 38}" y="${-h * 0.5}" width="${w - 76}" height="${h * 0.42}" rx="24" fill="${lighten(color, 0.1)}"/>
<rect x="${-w / 2}" y="${-h * 0.62}" width="44" height="${h * 0.62}" rx="22" fill="${color}"/><rect x="${w / 2 - 44}" y="${-h * 0.62}" width="44" height="${h * 0.62}" rx="22" fill="${color}"/></g>`;
}
function bed(x, y, w) {
  return `<g transform="translate(${x} ${y})"><ellipse cx="${w / 2}" cy="6" rx="${w * 0.56}" ry="14" fill="#24161A" opacity=".2" filter="url(#blur)"/>
<rect x="0" y="-400" width="${w}" height="330" rx="40" fill="${mix(P.blush, P.terracotta, 0.25)}"/>
<rect x="-10" y="-190" width="${w + 20}" height="150" rx="16" fill="${P.cream}"/>
<rect x="-10" y="-120" width="${w + 20}" height="90" rx="14" fill="${P.garnet}"/><rect x="-10" y="-124" width="${w + 20}" height="14" rx="6" fill="${darken(P.garnet, 0.15)}"/>
<rect x="30" y="-236" width="${w * 0.36}" height="86" rx="30" fill="#fff"/><rect x="${w * 0.5}" y="-232" width="${w * 0.36}" height="86" rx="30" fill="${P.sand}"/>
<rect x="-10" y="-40" width="${w + 20}" height="40" rx="8" fill="${P.wood}"/></g>`;
}
function nightstand(x, y) {
  return `<g transform="translate(${x} ${y})"><rect x="-46" y="-120" width="92" height="120" rx="6" fill="${P.wood}"/><rect x="-40" y="-110" width="80" height="44" rx="4" fill="${lighten(P.wood, 0.14)}"/><circle cx="0" cy="-88" r="4" fill="${P.woodDark}"/>
<rect x="-14" y="-152" width="28" height="32" rx="8" fill="${P.cream}"/>${lamp(0, -120, 0.4, 130)}</g>`;
}
function teepee(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="8" rx="210" ry="18" fill="#24161A" opacity=".18" filter="url(#blur)"/>
<line x1="-8" y1="-330" x2="-30" y2="-380" stroke="${P.woodDark}" stroke-width="7"/><line x1="8" y1="-330" x2="34" y2="-384" stroke="${P.woodDark}" stroke-width="7"/><line x1="0" y1="-330" x2="0" y2="-392" stroke="${P.woodDark}" stroke-width="7"/>
<path d="M 0 -336 L -190 0 L 190 0 Z" fill="${P.cream}"/>
<path d="M 0 -336 L 60 0 L 190 0 Z" fill="${P.blush}"/>
<path d="M 0 -336 L -70 0 L -190 0 Z" fill="${P.sand}"/>
<path d="M 0 -336 L -40 -120 L 40 -120 Z" fill="${P.terracotta}" opacity=".85"/>
<path d="M -62 0 L 0 -210 L 62 0 Z" fill="${P.garnet}"/><path d="M 0 -210 L 62 0 L 20 0 Z" fill="${darken(P.garnet, 0.2)}"/></g>`;
}
function garland(x1, y1, x2, y2, sag, n, colors) {
  const cx = (x1 + x2) / 2, cy = Math.max(y1, y2) + sag;
  let out = `<path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" stroke="${P.woodDark}" stroke-width="3" fill="none"/>`;
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1), mt = 1 - t;
    const px = mt * mt * x1 + 2 * mt * t * cx + t * t * x2;
    const py = mt * mt * y1 + 2 * mt * t * cy + t * t * y2;
    const dx = 2 * mt * (cx - x1) + 2 * t * (x2 - cx), dy = 2 * mt * (cy - y1) + 2 * t * (y2 - cy);
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    out += `<g transform="translate(${px} ${py}) rotate(${ang})"><path d="M -20 0 L 20 0 L 0 46 Z" fill="${colors[i % colors.length]}"/></g>`;
  }
  return out;
}
function blocks(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="-60" width="60" height="60" rx="10" fill="${P.garnet}"/><rect x="66" y="-60" width="60" height="60" rx="10" fill="${P.sage2}"/><rect x="33" y="-120" width="60" height="60" rx="10" fill="${P.sand2}"/><circle cx="63" cy="-90" r="14" fill="${P.terracotta}"/></g>`;
}
function gamingDesk(x, y, w) {
  const g = id("mg");
  def(`<linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A1E33"/><stop offset=".55" stop-color="${P.garnet}"/><stop offset="1" stop-color="#C8425A"/></linearGradient>`);
  const mw = w * 0.56, mh = mw * 0.56;
  return `<g transform="translate(${x} ${y})">
<rect x="0" y="-210" width="${w}" height="16" rx="5" fill="#3B2A2E"/><rect x="14" y="-194" width="10" height="194" fill="#2A1C20"/><rect x="${w - 24}" y="-194" width="10" height="194" fill="#2A1C20"/>
<rect x="${w / 2 - 6}" y="-${210 + 40}" width="12" height="40" fill="#1A1013"/><rect x="${w / 2 - 50}" y="-214" width="100" height="8" rx="3" fill="#1A1013"/>
<rect x="${w / 2 - mw / 2}" y="${-250 - mh}" width="${mw}" height="${mh}" rx="10" fill="#1A1013"/><rect x="${w / 2 - mw / 2 + 8}" y="${-250 - mh + 8}" width="${mw - 16}" height="${mh - 16}" rx="5" fill="url(#${g})"/>
<circle cx="${w * 0.84}" cy="-226" r="16" fill="#1A1013"/><circle cx="${w * 0.84}" cy="-226" r="7" fill="${P.garnet}"/>
</g>`;
}

// ───────────────────────── scenes ─────────────────────────
const DW = 1000;

function base(W, H, floorY, wall, floor) {
  const wg = id("wg"), fg = id("fg"), vg = id("vg"), lg = id("lg");
  def(`<linearGradient id="${wg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${wall[0]}"/><stop offset="1" stop-color="${wall[1]}"/></linearGradient>
<linearGradient id="${fg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${floor[0]}"/><stop offset="1" stop-color="${floor[1]}"/></linearGradient>
<radialGradient id="${vg}" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#24161A" stop-opacity="0"/><stop offset="1" stop-color="#24161A" stop-opacity=".16"/></radialGradient>
<linearGradient id="${lg}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>`);
  return {
    back: `<rect width="${W}" height="${H}" fill="url(#${wg})"/><rect y="${floorY}" width="${W}" height="${H - floorY}" fill="url(#${fg})"/><rect y="${floorY - 12}" width="${W}" height="14" fill="${darken(wall[1], 0.06)}"/><rect y="${floorY + 2}" width="${W}" height="6" fill="#000" opacity=".06"/>`,
    front: `<rect width="${W}" height="${H}" fill="url(#${lg})"/><rect width="${W}" height="${H}" fill="url(#${vg})"/>`,
  };
}

/** Scenes are designed on a DW-wide canvas; H follows the aspect ratio. */
function scene(theme, W, H, bag) {
  const fl = H * 0.7;
  const b = (o) => beanBag({ ...bag, ...o });
  if (theme === "living") {
    const s = base(W, H, fl, ["#F4ECDF", "#EADFCB"], ["#DCC7A9", "#C8AB86"]);
    const k = Math.min(W, H * 0.8) / 1000;
    return s.back
      + archWindow(W * 0.58, H * 0.08, W * 0.3, H * 0.44) + lightPatch(W * 0.56, W * 0.32, fl, H, 140)
      + frame(W * 0.1, H * 0.16, W * 0.16, H * 0.16, 0) + frame(W * 0.29, H * 0.22, W * 0.12, H * 0.13, 2)
      + lamp(W * 0.1, fl + 60 * k, 1.1 * k, 330) + plant(W * 0.9, fl + 70 * k, 1.15 * k)
      + rug(W * 0.5, H * 0.9, W * 0.52, H * 0.09) + b({ x: W * 0.5, y: H * 0.93, s: 1.55 * k * (bag.kind === "lounger" ? 0.85 : 1) })
      + beanBag({ kind: "cushion", color: P.sage2, x: W * 0.18, y: H * 0.95, s: 0.7 * k }) + s.front;
  }
  if (theme === "sofa") {
    const s = base(W, H, fl, ["#F2E7DA", "#E8D9C6"], ["#D9C2A2", "#C6A883"]);
    const k = Math.min(W, H * 0.8) / 1000;
    return s.back + archWindow(W * 0.08, H * 0.1, W * 0.26, H * 0.4) + frame(W * 0.5, H * 0.12, W * 0.2, H * 0.2, 1) + frame(W * 0.74, H * 0.16, W * 0.13, H * 0.15, 3)
      + rug(W * 0.5, H * 0.88, W * 0.55, H * 0.09) + sofa(W * 0.5, H * 0.86, W * 0.9, "#B8A28A")
      + beanBag({ kind: "cushion", color: bag.color, x: W * 0.28, y: H * 0.78, s: 0.95 * k, texture: bag.texture, piping: bag.piping })
      + beanBag({ kind: "cushion", color: P.cream, x: W * 0.72, y: H * 0.78, s: 0.85 * k, rot: 8 })
      + plant(W * 0.93, fl + 60 * k, 0.9 * k) + s.front;
  }
  if (theme === "reading") {
    const s = base(W, H, fl, ["#F0DFD3", "#E6D0C0"], ["#D6BC9C", "#C2A27C"]);
    const k = Math.min(W, H * 0.8) / 1000;
    return s.back + shelf(W * 0.05, H * 0.3, W * 0.42, 2, 11)
      + archWindow(W * 0.62, H * 0.1, W * 0.26, H * 0.38, { sky: ["#FFFAF0", "#F8E7D0"] }) + lightPatch(W * 0.6, W * 0.3, fl, H, 100)
      + lamp(W * 0.55, fl + 50 * k, 1.05 * k, 320) + plant(W * 0.93, fl + 60 * k, 1 * k, { pot: P.wood })
      + rug(W * 0.48, H * 0.9, W * 0.5, H * 0.09, P.sage, P.cream)
      + b({ x: W * 0.46, y: H * 0.93, s: (bag.kind === "lounger" ? 1.3 : 1.45) * k }) + stack(W * 0.82, H * 0.92, 1 * k) + mug(W * 0.83, H * 0.92 - 66 * k, 1 * k) + s.front;
  }
  if (theme === "bedroom") {
    const s = base(W, H, fl, ["#EBDDCB", "#E0CFB8"], ["#D3B995", "#BE9E77"]);
    const k = Math.min(W, H * 0.8) / 1000;
    return s.back + archWindow(W * 0.62, H * 0.1, W * 0.26, H * 0.36) + frame(W * 0.36, H * 0.14, W * 0.16, H * 0.18, 2) + lightPatch(W * 0.6, W * 0.3, fl, H, 100)
      + bed(W * 0.02, fl + 40 * k, W * 0.5) + nightstand(W * 0.6, fl + 44 * k)
      + rug(W * 0.66, H * 0.92, W * 0.42, H * 0.08, P.blush, P.cream) + b({ x: W * 0.74, y: H * 0.95, s: (bag.kind === "pouf" ? 1.7 : 1.15) * k })
      + plant(W * 0.94, fl + 60 * k, 0.8 * k) + s.front;
  }
  if (theme === "kids") {
    const s = base(W, H, fl, ["#F8E7DE", "#F0D8CC"], ["#E5CBA9", "#D3B189"]);
    const k = Math.min(W, H * 0.8) / 1000;
    return s.back + garland(-10, H * 0.08, W * 1.02, H * 0.1, 90 * k, 9, [P.garnet, P.terracotta, P.sage2, P.sand2])
      + frame(W * 0.08, H * 0.24, W * 0.16, H * 0.16, 3) + frame(W * 0.7, H * 0.26, W * 0.14, H * 0.14, 0)
      + teepee(W * 0.28, fl + 40 * k, 1.05 * k) + rug(W * 0.62, H * 0.92, W * 0.46, H * 0.08, P.sage, P.cream)
      + b({ x: W * 0.68, y: H * 0.94, s: 1.15 * k }) + blocks(W * 0.86, H * 0.93, 0.85 * k) + plant(W * 0.06, fl + 60 * k, 0.75 * k, { pot: P.blush }) + s.front;
  }
  if (theme === "gaming") {
    const s = base(W, H, fl, ["#2B1A20", "#3D232B"], ["#20141A", "#150C10"]);
    const k = Math.min(W, H * 0.8) / 1000;
    const gg = id("gg");
    def(`<radialGradient id="${gg}"><stop offset="0" stop-color="#E2506F" stop-opacity=".5"/><stop offset="1" stop-color="#E2506F" stop-opacity="0"/></radialGradient>`);
    return s.back + `<circle cx="${W * 0.36}" cy="${H * 0.36}" r="${W * 0.5}" fill="url(#${gg})"/>`
      + `<rect x="0" y="${H * 0.12}" width="${W}" height="8" fill="#E2506F" opacity=".9"/><rect x="0" y="${H * 0.12 - 6}" width="${W}" height="20" fill="#E2506F" opacity=".25" filter="url(#blur)"/>`
      + frame(W * 0.66, H * 0.2, W * 0.18, H * 0.2, 2, { mat: "#2B1A20", border: "#5A3540" })
      + gamingDesk(W * 0.06, fl + 30 * k, W * 0.5)
      + rug(W * 0.62, H * 0.92, W * 0.46, H * 0.08, "#3A2229", "#6B3A47")
      + b({ x: W * 0.68, y: H * 0.95, s: 1.3 * k }) + plant(W * 0.94, fl + 60 * k, 0.8 * k, { pot: "#4A2B33", greens: ["#42563A", "#56703F", "#324429"] }) + s.front;
  }
  throw new Error("unknown theme " + theme);
}

function studio(W, H, bg, bag, fitW) {
  const sh = SHAPES[bag.kind];
  const s = fitW / sh.w;
  const bgG = id("sb"), flG = id("sf");
  const horizon = H * 0.78;
  def(`<linearGradient id="${bgG}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lighten(bg, 0.5)}"/><stop offset="1" stop-color="${bg}"/></linearGradient>
<linearGradient id="${flG}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${darken(bg, 0.06)}"/><stop offset="1" stop-color="${darken(bg, 0.13)}"/></linearGradient>`);
  const archW = W * 0.66, archX = (W - archW) / 2, archY = H * 0.1;
  return `<rect width="${W}" height="${H}" fill="url(#${bgG})"/>
<path d="M ${archX} ${horizon} L ${archX} ${archY + archW / 2} A ${archW / 2} ${archW / 2} 0 0 1 ${archX + archW} ${archY + archW / 2} L ${archX + archW} ${horizon} Z" fill="${lighten(bg, 0.55)}" opacity=".7"/>
<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#${flG})"/>
${beanBag({ ...bag, x: W / 2, y: H * 0.86, s })}`;
}

function detail(W, H, bag) {
  const s = 3.1 * (bag.kind === "cushion" ? 1.1 : 1);
  const focus = bag.kind === "pear" ? [30, -70] : bag.kind === "lounger" ? [60, -60] : bag.kind === "pouf" ? [10, -60] : [0, -125];
  const g = id("db");
  def(`<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${darken(bag.color, 0.1)}"/><stop offset="1" stop-color="${darken(bag.color, 0.4)}"/></linearGradient>`);
  const tx = W / 2 - focus[0] * s, ty = H / 2 - focus[1] * s;
  return `<rect width="${W}" height="${H}" fill="url(#${g})"/>${beanBag({ ...bag, x: tx, y: ty, s, shadow: false })}`;
}

// ───────────────────────── catalogue (keep in sync with src/data/products.ts) ─────────────────────────
const COLORS = {
  burgundy: { hex: "#781C2E", bg: "#EFE5D6" },
  beige: { hex: "#D8C4A4", bg: "#E8D3C8" },
  black: { hex: "#2B2426", bg: "#EAE0D0" },
  sage: { hex: "#97A583", bg: "#F1E6DA" },
  tan: { hex: "#B27A4A", bg: "#EEE5D6" },
  blush: { hex: "#E2B2A8", bg: "#EDE5D4" },
  charcoal: { hex: "#4A4547", bg: "#EFE5D8" },
  ivory: { hex: "#EFE6D5", bg: "#D9BFAF" },
};

const PRODUCTS = [
  { slug: "beanify-classic", kind: "pear", fit: 640, theme: "living", colors: ["burgundy", "beige", "black"] },
  { slug: "beanify-lounger", kind: "lounger", fit: 800, theme: "reading", colors: ["beige", "burgundy", "sage"] },
  { slug: "beanify-xl", kind: "pear", fit: 720, theme: "living", colors: ["black", "burgundy", "tan"] },
  { slug: "beanify-kids", kind: "pear", fit: 440, theme: "kids", texture: "stars", colors: ["blush", "burgundy", "sage"] },
  { slug: "beanify-premium", kind: "pear", fit: 660, theme: "living", texture: "boucle", colors: ["ivory", "burgundy", "charcoal"] },
  { slug: "beanify-floor-pouf", kind: "pouf", fit: 600, theme: "bedroom", colors: ["blush", "burgundy", "beige"] },
  { slug: "beanify-cloud-cushion", kind: "cushion", fit: 470, theme: "sofa", colors: ["beige", "burgundy", "sage", "black"] },
  { slug: "beanify-gamer", kind: "pear", fit: 650, theme: "gaming", piping: "#E2506F", colors: ["black", "burgundy", "charcoal"] },
];

async function write(file, svg) {
  const full = path.join(OUT, file);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await sharp(Buffer.from(svg)).webp({ quality: 84, effort: 5 }).toFile(full);
}

// Products: 4:5, three shots per colour
const PW = DW, PH = 1250;
for (const p of PRODUCTS) {
  for (const cn of p.colors) {
    const c = COLORS[cn];
    const bag = { kind: p.kind, color: c.hex, texture: p.texture ?? null, piping: p.piping ?? null };
    await write(`products/${p.slug}/${cn}-front.webp`, svgDoc(PW, PH, studio(PW, PH, c.bg, bag, p.fit), 960));
    await write(`products/${p.slug}/${cn}-room.webp`, svgDoc(PW, PH, scene(p.theme, PW, PH, bag), 960));
    await write(`products/${p.slug}/${cn}-detail.webp`, svgDoc(PW, PH, detail(PW, PH, bag), 960));
  }
  console.log("product", p.slug);
}

// Editorial / marketing scenes
const burg = { kind: "pear", color: COLORS.burgundy.hex };
const jobs = [
  ["scenes/hero.webp", "living", 1000, 1250, burg, 1200],
  ["scenes/category-living-room.webp", "living", 1000, 1250, { kind: "pear", color: COLORS.beige.hex }, 900],
  ["scenes/category-bedroom.webp", "bedroom", 1000, 1250, { kind: "pouf", color: COLORS.blush.hex }, 900],
  ["scenes/category-kids-room.webp", "kids", 1000, 1250, { kind: "pear", color: COLORS.burgundy.hex, texture: "stars" }, 900],
  ["scenes/category-gaming.webp", "gaming", 1000, 1250, { kind: "pear", color: COLORS.black.hex, piping: "#E2506F" }, 900],
  ["scenes/category-reading-corner.webp", "reading", 1000, 1250, { kind: "lounger", color: COLORS.beige.hex }, 900],
  ["scenes/lifestyle.webp", "reading", 1600, 1000, { kind: "lounger", color: COLORS.burgundy.hex }, 1800],
  ["scenes/about-story.webp", "living", 1000, 1250, { kind: "pear", color: COLORS.burgundy.hex, texture: "boucle" }, 1000],
  ["scenes/about-promise.webp", "sofa", 1000, 1000, { kind: "cushion", color: COLORS.burgundy.hex }, 1000],
  ["scenes/about-philosophy.webp", "bedroom", 1400, 1000, { kind: "pouf", color: COLORS.burgundy.hex }, 1400],
  ["scenes/contact.webp", "reading", 1000, 1000, { kind: "pear", color: COLORS.sage.hex }, 1000],
  ["scenes/ig-1.webp", "reading", 1000, 1250, { kind: "lounger", color: COLORS.beige.hex }, 800],
  ["scenes/ig-2.webp", "gaming", 1000, 1000, { kind: "pear", color: COLORS.black.hex, piping: "#E2506F" }, 800],
  ["scenes/ig-3.webp", "kids", 1000, 1250, { kind: "pear", color: COLORS.sage.hex, texture: "stars" }, 800],
  ["scenes/ig-4.webp", "living", 1000, 1000, { kind: "pear", color: COLORS.burgundy.hex }, 800],
  ["scenes/ig-5.webp", "bedroom", 1000, 1000, { kind: "pouf", color: COLORS.blush.hex }, 800],
  ["scenes/ig-6.webp", "sofa", 1000, 1250, { kind: "cushion", color: COLORS.sage.hex }, 800],
];
for (const [file, theme, w, h, bag, outW] of jobs) {
  await write(file, svgDoc(w, h, scene(theme, w, h, bag), outW));
  console.log(file);
}

// Open Graph card 1200x630 (bone background, bean bag right, logo left)
{
  const W = 1200, H = 630;
  const body = `<rect width="${W}" height="${H}" fill="${P.bone}"/><path d="M 640 ${H} L 640 250 A 270 270 0 0 1 1180 250 L 1180 ${H} Z" fill="${P.blush}" opacity=".6"/>
${beanBag({ kind: "pear", color: COLORS.burgundy.hex, x: 910, y: 560, s: 1.35 })}`;
  const bg = await sharp(Buffer.from(svgDoc(W, H, body, W))).png().toBuffer();
  const logo = await sharp(path.resolve("public/assets/logo.png")).resize({ width: 460 }).toBuffer();
  await sharp(bg).composite([{ input: logo, left: 90, top: 230 }]).webp({ quality: 88 }).toFile(path.resolve("public/og.webp"));
  await sharp(bg).composite([{ input: logo, left: 90, top: 230 }]).jpeg({ quality: 88 }).toFile(path.resolve("public/og.jpg"));
}
console.log("done");
