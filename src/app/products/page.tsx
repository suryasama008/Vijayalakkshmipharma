import type { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { CATEGORIES, SITE } from '@/lib/config'
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
    images: [{ url: '/pharma-global-banner.png', width: 1792, height: 1024, alt: 'Vijayalakkshmi Pharma raw materials catalogue' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.png'] },
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
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pharma Raw Materials</h1>
        <p className="text-gray-600 mb-6">
          {products.length > 0 ? `${products.length}+ pharmaceutical raw materials available. Select a product to enquire.` : 'Contact us for current availability, grade, packing, and pricing.'}
        </p>
        <nav aria-label="Product categories" className="flex flex-wrap gap-2 mb-8">
          <Link href="/products" className="px-4 py-2 rounded-full bg-blue-700 text-white text-sm font-medium">All</Link>
          {CATEGORIES.map((category) => (
            <Link key={category.slug} href={`/products/category/${category.slug}`} className="px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 text-sm font-medium">
              {category.label}
            </Link>
          ))}
        </nav>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <section className="border border-gray-200 bg-white rounded-lg p-8 text-center" aria-labelledby="catalogue-enquiry">
            <h2 id="catalogue-enquiry" className="text-xl font-bold text-gray-900">Need a specific material?</h2>
            <p className="mt-2 text-gray-600">Send us the product name, grade, packing, and required quantity for a quick quotation.</p>
            <Link href="/contact" className="inline-block mt-5 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800">Send Enquiry</Link>
          </section>
        )}
      </div>
    </>
  )
}