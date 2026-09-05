import Link from 'next/link'
import { Product } from '@/lib/types'
import { CATEGORIES } from '@/lib/config'

const categoryLabel: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label])
)

const MAX_TAG_LENGTH = 20

// Grade strings in the data range from short pharmacopoeia codes ("IP / BP
// / USP") to full descriptive phrases ("K30 (lower-viscosity grade,
// K-value ~30)"). Naively splitting every value on "/" mangles anything
// with a slash inside parentheses (e.g. "Glacial (IP/Technical)" would
// become "Glacial (IP" + "Technical)"). Only treat a value as a set of
// short badge-able codes when it has no parentheses/commas and every
// segment is short; otherwise show it as a plain descriptive line.
function getGradeDisplay(product: Product): { tags: string[]; text?: string } {
  const raw = (product.grade || product.specs?.['Grade'])?.trim()
  if (!raw) return { tags: [] }

  const looksDescriptive = /[(),]/.test(raw)
  if (!looksDescriptive) {
    const segments = raw
      .split('/')
      .map((tag) => tag.trim())
      .filter(Boolean)
    if (segments.length > 0 && segments.every((tag) => tag.length <= MAX_TAG_LENGTH)) {
      return { tags: segments.slice(0, 4) }
    }
  }
  return { tags: [], text: raw }
}

export default function ProductCard({ product }: { product: Product }) {
  const grade = getGradeDisplay(product)
  const cas = product.cas || product.specs?.['CAS Number']
  const snippet = product.specs?.['Appearance'] || product.overview

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[var(--brand-600)]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-100)]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="min-w-0 truncate text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {categoryLabel[product.category] || product.category.replace(/-/g, ' ')}
        </span>
        {product.bestseller && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
            Bestseller
          </span>
        )}
      </div>

      <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-gray-900 group-hover:text-[var(--brand-700)]">
        {product.name}
      </h3>

      {grade.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {grade.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[var(--brand-50)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--brand-700)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {grade.text && (
        <p className="mt-2 text-xs text-gray-500">Grade: {grade.text}</p>
      )}

      {cas && <p className="mt-1 text-xs text-gray-500">CAS: {cas}</p>}

      {snippet && (
        <p className="mt-1 text-xs leading-snug text-gray-600 line-clamp-2">{snippet}</p>
      )}

      <div className="mt-3 pt-2">
        <span className="text-xs font-semibold text-[var(--brand-700)] group-hover:underline">
          Enquire →
        </span>
      </div>
    </Link>
  )
}
