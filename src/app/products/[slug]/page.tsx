import type { Metadata } from 'next'
import type { Product } from '@/lib/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import EnquiryForm from '@/components/EnquiryForm'
import { CATEGORIES, SITE } from '@/lib/config'
import { Package, ChevronRight, Phone } from 'lucide-react'
import { getProductBySlug, getProductStaticParams, getRelatedProducts } from '@/lib/products'

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getProductStaticParams()
}

function productDescription(product: Product) {
  return `Buy ${product.name} from Vijayalakkshmi Pharma, a pharma raw-materials supplier in L.B. Nagar, Hyderabad. ${product.grade ? `Grade: ${product.grade}.` : ''} ${product.packing ? `Packing: ${product.packing}.` : ''} Origin: ${product.origin || 'available on enquiry'}. Contact us for price, MOQ, and dispatch details.`
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { robots: { index: false, follow: false } }

  const category = CATEGORIES.find((item) => item.slug === product.category)
  const title = `${product.name} Supplier in Hyderabad`
  const description = productDescription(product)
  const url = `/products/${product.slug}`

  return {
    title,
    description,
    keywords: [
      `${product.name} supplier Hyderabad`,
      `${product.name} supplier India`,
      `buy ${product.name} pharma`,
      product.grade || '',
      category?.label || '',
    ].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [{ url: '/pharma-global-banner.png', width: 1792, height: 1024, alt: `${product.name} supplier in Hyderabad` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.png'] },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.category, product.slug)
  const category = CATEGORIES.find((item) => item.slug === product.category)
  const productUrl = `${SITE.url}/products/${product.slug}`
  const description = productDescription(product)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    url: productUrl,
    brand: { '@type': 'Brand', name: SITE.name },
    ...(product.cas_number ? { sku: product.cas_number } : {}),
    ...(product.category ? { category: category?.label || product.category } : {}),
    additionalProperty: [
      ...(product.grade ? [{ '@type': 'PropertyValue', name: 'Grade', value: product.grade }] : []),
      ...(product.origin ? [{ '@type': 'PropertyValue', name: 'Origin', value: product.origin }] : []),
      ...(product.packing ? [{ '@type': 'PropertyValue', name: 'Packing', value: product.packing }] : []),
    ],
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.url}/products` },
      { '@type': 'ListItem', position: 3, name: category?.label || product.category, item: `${SITE.url}/products/category/${product.category}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: productUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link href={`/products/category/${product.category}`} className="hover:text-blue-600">
            {category?.label || product.category}
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="text-gray-900" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-10 h-10 text-blue-600" aria-hidden="true" />
                <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {category?.label || product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.name} Supplier in Hyderabad</h1>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {product.grade && <tr><td className="py-3 font-medium text-gray-600 w-36">Grade</td><td className="py-3 text-gray-900">{product.grade}</td></tr>}
                  {product.origin && <tr><td className="py-3 font-medium text-gray-600">Origin / Make</td><td className="py-3 text-gray-900">{product.origin}</td></tr>}
                  {product.packing && <tr><td className="py-3 font-medium text-gray-600">Packing</td><td className="py-3 text-gray-900">{product.packing}</td></tr>}
                  {product.cas_number && <tr><td className="py-3 font-medium text-gray-600">CAS Number</td><td className="py-3 text-gray-900">{product.cas_number}</td></tr>}
                  <tr><td className="py-3 font-medium text-gray-600">Availability</td><td className="py-3 text-gray-900">Please enquire</td></tr>
                  <tr><td className="py-3 font-medium text-gray-600">Supplier</td><td className="py-3 text-gray-900">Vijayalakkshmi Pharma, Hyderabad</td></tr>
                </tbody>
              </table>
              {product.description && (
                <div className="mt-6 text-sm leading-relaxed text-gray-600">
                  <h2 className="text-lg font-semibold text-gray-800">About {product.name}</h2>
                  <p className="mt-2">{product.description}</p>
                </div>
              )}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                <strong>Vijayalakkshmi Pharma</strong> supplies {product.name} to pharma manufacturers across Hyderabad and India. Contact us for pricing, minimum order quantity, and delivery schedule.
              </div>
            </div>
          </div>

          <aside>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Get Price & Availability</h2>
              <EnquiryForm productName={product.name} />
              <div className="mt-4 text-center text-sm text-gray-500">or call us directly</div>
              <a href={`tel:${SITE.phone}`} className="mt-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg text-sm">
                <Phone className="w-4 h-4" aria-hidden="true" /> {SITE.phone}
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%20need%20${encodeURIComponent(product.name)}%20-%20please%20share%20price%20and%20availability.`} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg text-sm">
                WhatsApp Enquiry
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related-products">
            <h2 id="related-products" className="text-xl font-bold text-gray-900 mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((item) => (
                <Link key={item.id} href={`/products/${item.slug}`} className="bg-white border border-gray-200 hover:border-blue-400 rounded-lg p-4 text-sm font-medium text-gray-800 hover:text-blue-700 transition-all">
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}