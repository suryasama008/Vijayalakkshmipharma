import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductsBrowser from '@/components/ProductsBrowser'
import CategoryIcon from '@/components/CategoryIcon'
import { getCategoryColorClasses } from '@/lib/category-colors'
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
      images: [{ url: '/pharma-global-banner.webp', width: 1717, height: 916, alt: `${item.label} supplier in Hyderabad` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.webp'] },
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
      <div className="bg-[var(--brand-950)] px-4 py-14 text-white">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-blue-200/80 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-white" aria-current="page">{item.label}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className={`hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${getCategoryColorClasses(item.color).bg}`}>
              <CategoryIcon slug={item.slug} className={`h-7 w-7 ${getCategoryColorClasses(item.color).text}`} />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white">{item.label} Supplier in Hyderabad</h1>
              <p className="mt-3 text-blue-100/85 max-w-2xl">{item.description}</p>
              <p className="text-sm text-[var(--accent-500)] font-semibold mt-3">{items.length} products available</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {items.length > 0 ? (
          <ProductsBrowser
            products={items}
            showTabs={false}
            searchPlaceholder={`Search within ${item.label}...`}
          />
        ) : (
          <div className="border border-gray-200 bg-white rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">Products available on enquiry </h2>
            <p className="mt-2 text-gray-600">Contact us for current availability, grade, and pricing for {item.label.toLowerCase()}.</p>
            <Link href="/contact" className="inline-block mt-5 bg-[var(--brand-800)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--brand-900)]">Send Enquiry</Link>
          </div>
        )}
      </div>
    </>
  )
}
