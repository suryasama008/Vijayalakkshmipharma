import productsData from '@/data/products.json'
import type { Product } from '@/lib/types'

// All products live in a local JSON file (src/data/products.json).
// No database, no network calls, no build-time file parsing - this
// works identically in `next dev`, `next build`, and on Cloudflare.
const allProducts = productsData as Product[]

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

export async function getProductStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }))
}

export async function getSitemapProducts(): Promise<Pick<Product, 'slug' | 'created_at'>[]> {
  return allProducts.map(({ slug, created_at }) => ({ slug, created_at }))
}
