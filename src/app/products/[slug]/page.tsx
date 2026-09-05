import type { Metadata } from 'next'
import type { Product } from '@/lib/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import EnquiryForm from '@/components/EnquiryForm'
import ProductCard from '@/components/ProductCard'
import CategoryIcon from '@/components/CategoryIcon'
import { getCategoryColorClasses } from '@/lib/category-colors'
import { CATEGORIES, SITE } from '@/lib/config'
import { ChevronRight, Phone, CheckCircle2, PackageCheck, HelpCircle } from 'lucide-react'
import {
  getProductBySlug,
  getProductStaticParams,
  getRelatedProducts,
  getProductsBySlugs,
} from '@/lib/products'

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getProductStaticParams()
}

function productDescription(product: Product) {
  if (product.metaDescription) return product.metaDescription
  return `Buy ${product.name} from Vijayalakkshmi Pharma, a pharma raw-materials supplier in L.B. Nagar, Hyderabad. ${product.grade ? `Grade: ${product.grade}.` : ''} Contact us for price, MOQ, and dispatch details.`
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { robots: { index: false, follow: false } }

  const category = CATEGORIES.find((item) => item.slug === product.category)
  const title = product.metaTitle || `${product.name} Supplier in Hyderabad`
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
      images: [{ url: '/pharma-global-banner.webp', width: 1717, height: 916, alt: `${product.name} supplier in Hyderabad` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.webp'] },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const curatedRelated = product.relatedSlugs?.length ? await getProductsBySlugs(product.relatedSlugs) : []
  const related = curatedRelated.length > 0 ? curatedRelated : await getRelatedProducts(product.category, product.slug)
  const category = CATEGORIES.find((item) => item.slug === product.category)
  const productUrl = `${SITE.url}/products/${product.slug}`
  const description = productDescription(product)
  const isElaborated = Boolean(product.overview)
  const h1 = product.h1 || `${product.name} Supplier in Hyderabad`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    url: productUrl,
    brand: { '@type': 'Brand', name: SITE.name },
    ...(product.cas ? { sku: product.cas } : {}),
    ...(product.category ? { category: category?.label || product.category } : {}),
    additionalProperty: [
      ...(product.grade ? [{ '@type': 'PropertyValue', name: 'Grade', value: product.grade }] : []),
      ...(product.cas ? [{ '@type': 'PropertyValue', name: 'CAS Number', value: product.cas }] : []),
      ...(product.molecularFormula ? [{ '@type': 'PropertyValue', name: 'Molecular Formula', value: product.molecularFormula }] : []),
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
  const faqSchema = product.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: product.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[var(--brand-700)]">Home</Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link href="/products" className="hover:text-[var(--brand-700)]">Products</Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link href={`/products/category/${product.category}`} className="hover:text-[var(--brand-700)]">
            {category?.label || product.category}
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="text-gray-900" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${getCategoryColorClasses(category?.color).bg}`}>
                    <CategoryIcon slug={product.category} className={`h-5 w-5 ${getCategoryColorClasses(category?.color).text}`} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 bg-[var(--brand-100)] text-[var(--brand-700)] rounded-full">
                    {category?.label || product.category}
                  </span>
                  {product.bestseller && (
                    <span className="text-xs font-semibold px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full">
                      ★ Bestseller
                    </span>
                  )}
                  {product.readyStock && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-green-100 text-green-800 rounded-full">
                      <PackageCheck className="w-3.5 h-3.5" /> Ready Stock
                    </span>
                  )}
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">{h1}</h1>

                {isElaborated && product.overview && (
                  <p className="text-sm leading-relaxed text-gray-700 mb-6">{product.overview}</p>
                )}

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-100">
                      {isElaborated && product.specs
                        ? Object.entries(product.specs).map(([label, value], i) => (
                            <tr key={label} className={i % 2 === 1 ? 'bg-gray-50/60' : undefined}>
                              <td className="py-3 px-4 font-semibold text-gray-600 w-44 align-top">{label}</td>
                              <td className="py-3 px-4 text-gray-900">{value}</td>
                            </tr>
                          ))
                        : (
                          <>
                            {product.grade && <tr><td className="py-3 px-4 font-semibold text-gray-600 w-36">Grade</td><td className="py-3 px-4 text-gray-900">{product.grade}</td></tr>}
                            {product.cas && <tr className="bg-gray-50/60"><td className="py-3 px-4 font-semibold text-gray-600">CAS Number</td><td className="py-3 px-4 text-gray-900">{product.cas}</td></tr>}
                          </>
                        )}
                      <tr className={(isElaborated && product.specs ? Object.keys(product.specs).length : (product.grade ? 1 : 0) + (product.cas ? 1 : 0)) % 2 === 1 ? 'bg-gray-50/60' : undefined}>
                        <td className="py-3 px-4 font-semibold text-gray-600 w-44">Availability</td>
                        <td className="py-3 px-4 text-gray-900">{product.readyStock ? 'Ready Stock' : 'Please enquire'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-gray-600">Supplier</td>
                        <td className="py-3 px-4 text-gray-900">Vijayalakkshmi Pharma, Hyderabad</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {isElaborated && product.applications && product.applications.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-display text-lg font-bold text-gray-900 mb-3">Applications</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.applications.map((app) => (
                        <li key={app} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent-600)] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 p-4 bg-[var(--brand-50)] border border-[var(--brand-100)] rounded-xl text-sm text-[var(--brand-900)]">
                  <strong>Vijayalakkshmi Pharma</strong> supplies {product.name} to pharma manufacturers across Hyderabad and India. Contact us for pricing, minimum order quantity, and delivery schedule.
                </div>

                {isElaborated && product.faq && product.faq.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-display text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[var(--brand-700)]" />
                      Frequently Asked Questions
                    </h2>
                    <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                      {product.faq.map((item) => (
                        <details key={item.q} className="group py-3.5">
                          <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-gray-900 text-sm">
                            {item.q}
                            <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90 shrink-0" aria-hidden="true" />
                          </summary>
                          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
              <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Get Price & Availability</h2>
              <EnquiryForm productName={product.name} />
              <div className="mt-4 text-center text-sm text-gray-500">or call us directly</div>
              <a href={`tel:${SITE.phone}`} className="mt-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg text-sm transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" /> {SITE.phone}
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%20need%20${encodeURIComponent(product.name)}%20-%20please%20share%20price%20and%20availability.`} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-sm transition-colors">
                WhatsApp Enquiry
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-products">
            <h2 id="related-products" className="font-display text-xl font-bold text-gray-900 mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
