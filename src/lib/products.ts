import productsData from '@/data/products.json'
import type { Product } from '@/lib/types'

// All products live in a local JSON file (src/data/products.json).
// No database, no network calls, no build-time file parsing - this
// works identically in `next dev`, `next build`, and on Cloudflare.
//
// The `unknown` hop is required (not stylistic): each product's `specs`
// object only has the keys relevant to that product (e.g. "CAS Number" vs
// "Protein Content"), so TypeScript infers 291 slightly different object
// shapes for `specs` across the JSON array. When narrowed to `Product[]`
// directly, TS sees some inferred shapes as having optional/undefined
// properties for keys they don't happen to use, which it considers
// incompatible with `specs?: Record<string, string>` even though every
// value actually present is a plain string at runtime. Casting through
// `unknown` first (TS's own suggested fix for this exact error) skips that
// structural comparison; it doesn't loosen anything the app actually reads.
const allProducts = productsData as unknown as Product[]

export async function getAllProducts(): Promise<Product[]> {
  return [...allProducts].sort((a, b) => a.name.localeCompare(b.name))
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return allProducts.filter((product) => product.featured).slice(0, 8)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return allProducts
    .filter((product) => product.category === category)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return allProducts.find((product) => product.slug === slug) || null
}

export async function getRelatedProducts(category: string, currentSlug: string): Promise<Product[]> {
  return allProducts
    .filter((product) => product.category === category && product.slug !== currentSlug)
    .slice(0, 4)
}

// Resolves an ordered list of slugs (from a product's `relatedSlugs`) to
// actual Product records, silently dropping any slug that no longer
// exists. Order is preserved so hand-curated "related product" ordering
// survives.
export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const bySlug = new Map(allProducts.map((product) => [product.slug, product]))
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is Product => Boolean(product))
}

export async function getProductStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }))
}

export async function getSitemapProducts(): Promise<Pick<Product, 'slug' | 'created_at'>[]> {
  return allProducts.map(({ slug, created_at }) => ({ slug, created_at }))
}
