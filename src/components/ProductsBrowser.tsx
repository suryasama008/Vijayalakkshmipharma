'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/types'
import { CATEGORIES } from '@/lib/config'

type Category = { slug: string; label: string }

const categoryLabelBySlug: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label])
)

function normalize(value: string) {
  return value.toLowerCase().trim()
}

export default function ProductsBrowser({
  products,
  categories = CATEGORIES,
  showTabs = true,
  searchPlaceholder = 'Search by product name or CAS number...',
}: {
  products: Product[]
  categories?: Category[]
  showTabs?: boolean
  searchPlaceholder?: string
}) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const product of products) {
      counts[product.category] = (counts[product.category] || 0) + 1
    }
    return counts
  }, [products])

  const tabs = useMemo(
    () =>
      [{ slug: 'all', label: 'All Categories' }, ...categories]
        .map((c) => ({ ...c, count: c.slug === 'all' ? products.length : categoryCounts[c.slug] || 0 }))
        .filter((c) => c.slug === 'all' || c.count > 0),
    [categories, categoryCounts, products.length]
  )

  const filtered = useMemo(() => {
    const q = normalize(query)
    return products.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) return false
      if (!q) return true
      const cas = product.cas || product.specs?.['CAS Number'] || ''
      const categoryText = categoryLabelBySlug[product.category] || product.category
      const haystack = normalize(`${product.name} ${cas} ${product.category} ${categoryText}`)
      return haystack.includes(q)
    })
  }, [products, activeCategory, query])

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
        <input
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label="Search products"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--brand-600)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-100)]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category tabs */}
      {showTabs && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const active = tab.slug === activeCategory
            return (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setActiveCategory(tab.slug)}
                aria-pressed={active}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-[var(--brand-800)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-[var(--brand-50)] hover:text-[var(--brand-700)]'
                }`}
              >
                {tab.label} <span className={active ? 'text-blue-100' : 'text-gray-400'}>({tab.count})</span>
              </button>
            )
          })}
        </div>
      )}

      <p className="mb-4 text-sm text-gray-500">
        {filtered.length} of {products.length} products
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900">No products match your search</h2>
          <p className="mt-2 text-gray-600">Try a different keyword, or send us the product name directly and we&apos;ll confirm availability.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setActiveCategory('all')
              }}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Clear filters
            </button>
            <Link href="/contact" className="rounded-lg bg-[var(--brand-800)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-900)]">
              Send Enquiry
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
