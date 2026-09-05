import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE, CATEGORIES } from '@/lib/config'
import homepageData from '@/data/homepage.json'
import ProductCard from '@/components/ProductCard'
import CategoryIcon from '@/components/CategoryIcon'
import { getCategoryColorClasses } from '@/lib/category-colors'
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Layers,
  BadgeCheck,
  Boxes,
  Truck,
  Zap,
  ArrowRight,
} from 'lucide-react'
import { getFeaturedProducts, getAllProducts } from '@/lib/products'

// One icon per "Why choose us" card, in the same order as
// homepageData.whyChooseUs.items in src/data/homepage.json.
const WHY_CHOOSE_ICONS = [ShieldCheck, Layers, BadgeCheck, Boxes, Truck, Zap]

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
        url: '/pharma-global-banner.webp',
        width: 1717,
        height: 916,
        alt: 'Vijayalakkshmi Pharma pharmaceutical raw materials, solvents, colours, and global supply banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homepageData.seo.title,
    description: homepageData.seo.description,
    images: ['/pharma-global-banner.webp'],
  },
}


export default async function HomePage() {
  const featured = await getFeaturedProducts()
  const allProducts = await getAllProducts()
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: homepageData.seo.title,
    description: homepageData.seo.description,
    url: SITE.url,
    primaryImageOfPage: `${SITE.url}/pharma-global-banner.webp`,
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
      <section className="relative overflow-hidden bg-[#f4f7fd] px-4 py-20 md:py-28">
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-50)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand-700)] ring-1 ring-[var(--brand-100)]">
              <MapPin className="w-3.5 h-3.5" />
              {homepageData.hero.eyebrow}
            </span>
            <h1 className="font-display mt-6 text-4xl md:text-6xl font-extrabold leading-[1.08] tracking-tight text-gray-900">
              {homepageData.hero.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {homepageData.hero.description}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand-700)] px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/10 transition-colors hover:bg-[var(--brand-800)]"
              >
                {homepageData.hero.primaryAction}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--brand-200)] bg-white px-8 py-3.5 font-semibold text-[var(--brand-700)] transition-colors hover:bg-[var(--brand-50)]"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {homepageData.hero.trustPoints.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-700 ring-1 ring-gray-200"
                >
                  <BadgeCheck className="w-3.5 h-3.5 text-[var(--brand-700)]" />
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src="/pharma-global-banner.webp"
              alt="Vijayalakkshmi Pharma raw materials"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 md:grid-cols-3">
          <article className="card-hover rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-100)]">
              <MapPin className="h-5 w-5 text-[var(--brand-700)]" />
            </div>
            <h2 className="font-display text-base font-bold text-gray-900 mb-1.5">Supplier Location</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{homepageData.hero.eyebrow}</p>
          </article>
          <article className="card-hover rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-100)]">
              <Boxes className="h-5 w-5 text-[var(--brand-700)]" />
            </div>
            <h2 className="font-display text-base font-bold text-gray-900 mb-1.5">Core Supply Range</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{homepageData.categoryIntro.description}</p>
          </article>
          <article className="card-hover rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-100)]">
              <Zap className="h-5 w-5 text-[var(--brand-700)]" />
            </div>
            <h2 className="font-display text-base font-bold text-gray-900 mb-1.5">Enquiry Support</h2>
            <p className="text-sm text-gray-600 leading-relaxed">Pricing, grade, MOQ, and delivery support for every enquiry.</p>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 bg-white">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-600)]">Catalogue</span>
          <h2 className="font-display mt-2 text-3xl font-extrabold text-gray-900">{homepageData.categoryIntro.title}</h2>
          <p className="mt-3 text-gray-500">{homepageData.categoryIntro.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map(cat => {
            const colors = getCategoryColorClasses(cat.color)
            return (
              <Link
                key={cat.slug}
                href={`/products/category/${cat.slug}`}
                className="group card-hover flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-transparent hover:shadow-xl"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ring-4 ring-transparent transition-all ${colors.ring}`}>
                  <CategoryIcon slug={cat.slug} className={`h-6 w-6 ${colors.text}`} />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{cat.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{cat.description}</p>
                <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${colors.text}`}>
                  Browse <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-[var(--brand-50)] py-16 px-4 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-600)]">In Demand</span>
              <h2 className="font-display mt-2 text-3xl font-extrabold text-gray-900">{homepageData.featuredIntro.title}</h2>
              <p className="mt-3 text-gray-500">{homepageData.featuredIntro.description}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featured.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[var(--brand-800)] text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-[var(--brand-900)] transition-colors shadow-sm"
              >
                View All {allProducts.length}+ Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 py-16 bg-white">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-600)]">Why VL Pharma</span>
          <h2 className="font-display mt-2 text-3xl font-extrabold text-gray-900">{homepageData.whyChooseUs.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homepageData.whyChooseUs.items.map((item, i) => {
            const Icon = WHY_CHOOSE_ICONS[i % WHY_CHOOSE_ICONS.length]
            return (
              <div key={item.title} className="card-hover rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-100)]">
                  <Icon className="h-5 w-5 text-[var(--brand-700)]" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[var(--brand-950)] py-16 px-4"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--brand-950) 0%, var(--brand-900) 55%, var(--brand-800) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-dot-grid-light opacity-30" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-extrabold mb-3 text-white">{homepageData.cta.title}</h2>
          <p className="text-blue-100/90 mb-9 text-lg">{homepageData.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 bg-[var(--accent-500)] text-white font-bold px-7 py-3.5 rounded-lg hover:bg-[var(--accent-600)] transition-colors shadow-lg shadow-teal-900/30"
            >
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 rounded-lg transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-white/30 bg-white/5 text-white font-bold px-7 py-3.5 rounded-lg hover:bg-white/15 backdrop-blur-sm transition-colors"
            >
              <Mail className="w-4 h-4" /> Enquiry Form
            </Link>
          </div>
          <p className="mt-8 text-blue-200/80 text-sm flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> {SITE.address}
          </p>
        </div>
      </section>
    </>
  )
}
