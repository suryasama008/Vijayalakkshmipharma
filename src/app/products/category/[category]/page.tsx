import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES, SITE } from '@/lib/config'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getProductsByCategory } from '@/lib/products'

type CategoryPageProps = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const item = CATEGORIES.find((entry) => entry.slug === category)
  if (!item) return { robots: { index: false, follow: false } }

  const title = `${item.label} Supplier in Hyderabad`
  const description = `${item.description} Available in bulk and retail quantities from Vijayalakkshmi Pharma in L.B. Nagar, Hyderabad, Telangana.`
  const url = `/products/category/${item.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [{ url: '/pharma-global-banner.png', width: 1792, height: 1024, alt: `${item.label} supplier in Hyderabad` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.png'] },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const item = CATEGORIES.find((entry) => entry.slug === category)
  if (!item) notFound()

  const items = await getProductsByCategory(item.slug)
  const url = `${SITE.url}/products/category/${item.slug}`
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${item.label} Supplier in Hyderabad`,
    description: item.description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${SITE.url}/products/${product.slug}`,
      })),
    },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.url}/products` },
      { '@type': 'ListItem', position: 3, name: item.label, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="text-gray-900" aria-current="page">{item.label}</span>
        </nav>
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Vijayalakkshmi Pharma</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{item.label} Supplier in Hyderabad</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">{item.description}</p>
          <p className="text-sm text-blue-700 font-medium mt-2">{items.length} products available</p>
        </header>
        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="border border-gray-200 bg-white rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">Products available on enquiry </h2>
            <p className="mt-2 text-gray-600">Contact us for current availability, grade, packing, and pricing for {item.label.toLowerCase()}.</p>
            <Link href="/contact" className="inline-block mt-5 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800">Send Enquiry</Link>
          </div>
        )}
      </div>
    </>
  )
}
