import { MetadataRoute } from 'next'
import { CATEGORIES, SITE } from '@/lib/config'
import { getSitemapProducts } from '@/lib/products'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getSitemapProducts()

  const productUrls: MetadataRoute.Sitemap = products.map(p => ({
    url: `${SITE.url}/products/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map(c => ({
    url: `${SITE.url}/products/category/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE.url}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE.url}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    ...categoryUrls,
    ...productUrls,
  ]
}
