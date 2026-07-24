import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE, CATEGORIES } from '@/lib/config'
import homepageData from '@/data/homepage.json'
import ProductCard from '@/components/ProductCard'
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: homepageData.seo.title,
  description: homepageData.seo.description,
  keywords: homepageData.seo.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: homepageData.seo.title,
    description: homepageData.seo.description,
    images: [
      {
        url: '/pharma-global-banner.png',
        width: 1792,
        height: 1024,
        alt: 'Vijayalakkshmi Pharma pharmaceutical raw materials, solvents, colours, and global supply banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homepageData.seo.title,
    description: homepageData.seo.description,
    images: ['/pharma-global-banner.png'],
  },
}


export default async function HomePage() {
  const featured = await getFeaturedProducts()
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: homepageData.seo.title,
    description: homepageData.seo.description,
    url: SITE.url,
    primaryImageOfPage: `${SITE.url}/pharma-global-banner.png`,
    about: homepageData.whyChooseUs.items.map((item) => item.title),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CATEGORIES.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: category.label,
        url: `${SITE.url}/products/category/${category.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <section
        className="relative overflow-hidden bg-white px-4 py-20 text-slate-950 md:py-24"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 38%, rgba(255,255,255,0.38) 70%, rgba(255,255,255,0.18) 100%), url(/pharma-global-banner.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-blue-700 text-sm font-semibold mb-3 uppercase tracking-widest">
              {homepageData.hero.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight text-blue-950">
              {homepageData.hero.title}
            </h1>
            <p className="text-slate-700 text-lg mb-8 leading-relaxed">
              {homepageData.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="bg-blue-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors text-center"
              >
                {homepageData.hero.primaryAction}
              </Link>
              <Link
                href="/contact"
                className="border-2 border-blue-700 text-blue-800 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                {homepageData.hero.secondaryAction}
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 text-sm text-slate-700 sm:flex sm:flex-wrap">
              {homepageData.hero.trustPoints.map((point) => (
                <span key={point} className="rounded-full bg-white/90 px-4 py-2 font-medium shadow-sm ring-1 ring-blue-100">
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="border border-gray-200 bg-white p-5 rounded-lg">
            <h2 className="text-base font-bold text-gray-900 mb-2">Supplier Location</h2>
            <p className="text-sm text-gray-600">{homepageData.hero.eyebrow}</p>
          </article>
          <article className="border border-gray-200 bg-white p-5 rounded-lg">
            <h2 className="text-base font-bold text-gray-900 mb-2">Core Supply Range</h2>
            <p className="text-sm text-gray-600">{homepageData.categoryIntro.description}</p>
          </article>
          <article className="border border-gray-200 bg-white p-5 rounded-lg">
            <h2 className="text-base font-bold text-gray-900 mb-2">Enquiry Support</h2>
            <p className="text-sm text-gray-600">Pricing, grade, packing, MOQ, and delivery support for every enquiry.</p>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 bg-white">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{homepageData.categoryIntro.title}</h2>
        <p className="text-gray-500 text-center mb-8">{homepageData.categoryIntro.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/products/category/${cat.slug}`}
              className="bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all p-6 flex flex-col"
            >
              <span className="text-sm font-bold text-blue-700 mb-3 uppercase tracking-wide">{cat.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2">{cat.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
              <span className="mt-4 text-blue-600 text-sm font-medium">Browse -&gt;</span>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-white py-14 px-4 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{homepageData.featuredIntro.title}</h2>
            <p className="text-gray-500 text-center mb-8">{homepageData.featuredIntro.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featured.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products"
                className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
                View All 150+ Products
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 py-14 bg-white">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">{homepageData.whyChooseUs.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homepageData.whyChooseUs.items.map(item => (
            <div key={item.title} className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white text-gray-950 py-14 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 text-blue-950">{homepageData.cta.title}</h2>
          <p className="text-gray-600 mb-8">{homepageData.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 bg-blue-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800"
            >
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 border-2 border-blue-700 text-blue-800 font-bold px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              <Mail className="w-4 h-4" /> Enquiry Form
            </Link>
          </div>
          <p className="mt-6 text-gray-600 text-sm flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> {SITE.address}
          </p>
        </div>
      </section>
    </>
  )
}
