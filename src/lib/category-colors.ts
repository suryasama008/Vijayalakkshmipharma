// Tailwind's compiler only picks up class names it can see as literal
// strings — it cannot resolve `bg-${color}-100` at runtime. So every
// combination used by the `color` field in CATEGORIES (src/lib/config.ts)
// is spelled out here in full. If a new category color is added to
// config.ts, add its entry here too or it will silently fall back to slate.
export const CATEGORY_COLOR_CLASSES: Record<string, { bg: string; text: string; ring: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', ring: 'group-hover:ring-blue-200' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', ring: 'group-hover:ring-purple-200' },
  green: { bg: 'bg-green-100', text: 'text-green-700', ring: 'group-hover:ring-green-200' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', ring: 'group-hover:ring-orange-200' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700', ring: 'group-hover:ring-slate-200' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-700', ring: 'group-hover:ring-teal-200' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', ring: 'group-hover:ring-indigo-200' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700', ring: 'group-hover:ring-cyan-200' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-700', ring: 'group-hover:ring-pink-200' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'group-hover:ring-amber-200' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-700', ring: 'group-hover:ring-rose-200' },
  red: { bg: 'bg-red-100', text: 'text-red-700', ring: 'group-hover:ring-red-200' },
  lime: { bg: 'bg-lime-100', text: 'text-lime-700', ring: 'group-hover:ring-lime-200' },
}

export function getCategoryColorClasses(color?: string) {
  return CATEGORY_COLOR_CLASSES[color || ''] || CATEGORY_COLOR_CLASSES.slate
}

// Maps each category slug (src/lib/config.ts CATEGORIES) to a lucide-react
// icon name. Kept separate from config.ts so config.ts doesn't need to
// import a component library. Falls back to FlaskConical if a slug is
// missing (e.g. a newly added category).
export const CATEGORY_ICON_NAMES: Record<string, string> = {
  solvents: 'FlaskConical',
  colours: 'Palette',
  excipients: 'Pill',
  'amino-acids': 'Dna',
  pellets: 'Beaker',
  carbonates: 'TestTube',
  phosphates: 'Atom',
  'silicon-dioxide': 'CircleDot',
  vitamins: 'Citrus',
  oils: 'Droplet',
  flavours: 'Candy',
  api: 'ShieldCheck',
  'food-nutra': 'Wheat',
}
