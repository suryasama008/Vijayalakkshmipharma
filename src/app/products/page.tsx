import type { Metadata } from 'next'
import ProductsBrowser from '@/components/ProductsBrowser'
import { SITE } from '@/lib/config'
import { getAllProducts } from '@/lib/products'

const title = 'All Pharma Raw Materials in Hyderabad'
const description = 'Browse pharmaceutical raw materials including solvents, excipients, pharma colours, and amino acids from Vijayalakkshmi Pharma in Hyderabad, Telangana.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/products' },
  openGraph: {
    type: 'website',
    url: '/products',
    title,
    description,
    images: [{ url: '/pharma-global-banner.webp', width: 1717, height: 916, alt: 'Vijayalakkshmi Pharma raw materials catalogue' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.webp'] },
}

export default async function ProductsPage() {
  const products = await getAllProducts()
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${SITE.url}/products`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${SITE.url}/products/${product.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <div className="bg-[var(--brand-950)] px-4 py-14 text-white">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-500)]">Full Catalogue</span>
          <h1 className="font-display mt-2 text-3xl md:text-4xl font-extrabold text-white">Pharma Raw Materials</h1>
          <p className="mt-3 text-blue-100/85 max-w-2xl">
            {products.length > 0 ? `${products.length}+ pharmaceutical raw materials available. Select a product to enquire.` : 'Contact us for current availability, grade, and pricing.'}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <ProductsBrowser products={products} />
      </div>
    </>
  )
}
