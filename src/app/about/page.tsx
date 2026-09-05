import { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/config'
import { Boxes, Truck, BadgeCheck, Phone, CheckCircle2, ArrowRight } from 'lucide-react'

const title = 'About Vijayalakkshmi Pharma in Hyderabad'
const description = 'Learn about Vijayalakkshmi Pharma, a pharmaceutical and chemical raw-materials supplier based in L.B. Nagar, Hyderabad, serving manufacturers across India.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    title,
    description,
    images: [{ url: '/pharma-global-banner.webp', width: 1717, height: 916, alt: 'Vijayalakkshmi Pharma pharmaceutical raw materials supplier' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.webp'] },
}

const STATS = [
  { label: '292+', sub: 'Products', icon: Boxes },
  { label: 'Pan India', sub: 'Supply Network', icon: Truck },
  { label: 'IP/BP/USP', sub: 'Grade Products', icon: BadgeCheck },
]

const SUPPLY_ITEMS = [
  'Pharmaceutical Solvents',
  'Industrial Chemicals',
  'Lake Colours',
  'Iron Oxides & Titanium Dioxide',
  'Tablet Excipients (MCC, HPMC, CCS)',
  'Binders & Disintegrants',
  'Amino Acids (USP grade)',
  'Vitamins & Nutraceuticals',
  'PEG & Tween Series',
  'Carbomers & Polymers',
]

export default function AboutPage() {
  return (
    <>
      <div
        className="relative overflow-hidden bg-[var(--brand-950)] px-4 py-16 text-white"
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--brand-950) 0%, var(--brand-900) 55%, var(--brand-800) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-dot-grid-light opacity-30" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-500)]">About Us</span>
          <h1 className="font-display mt-2 text-3xl md:text-4xl font-extrabold text-white">About Vijayalakkshmi Pharma</h1>
          <p className="mt-4 text-blue-100/90 leading-relaxed max-w-2xl">
            Vijayalakkshmi Pharma is one of Hyderabad&apos;s trusted suppliers of pharmaceutical raw materials, industrial solvents, colours, and nutraceutical ingredients. Based in L.B. Nagar, we serve pharma manufacturers, formulation companies, and research institutions across Telangana and pan India.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {STATS.map(s => (
            <div
              key={s.label}
              className="card-hover rounded-xl border border-[var(--brand-100)] bg-[var(--brand-50)] p-6 text-center"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm">
                <s.icon className="h-5 w-5 text-[var(--brand-700)]" aria-hidden="true" />
              </div>
              <div className="font-display text-2xl font-extrabold text-[var(--brand-900)]">{s.label}</div>
              <div className="text-gray-600 mt-1 text-sm">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {SITE.contacts.map(c => (
            <div key={c.name} className="card-hover bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-gray-900 text-lg">{c.name}</h3>
              <p className="text-[var(--accent-600)] text-sm font-semibold mb-3">{c.role}</p>
              <a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 text-gray-700 hover:text-[var(--brand-700)] font-medium">
                <Phone className="w-4 h-4" aria-hidden="true" />
                {c.phone}
              </a>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">What We Supply</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-14">
          {SUPPLY_ITEMS.map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-600)] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div
          className="relative overflow-hidden rounded-2xl p-10 text-center text-white"
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--brand-950) 0%, var(--brand-900) 55%, var(--brand-800) 100%)',
          }}
        >
          <div className="absolute inset-0 bg-dot-grid-light opacity-30" aria-hidden="true" />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold mb-3">Ready to Source?</h2>
            <p className="text-blue-100/90 mb-7">Contact us for pricing, availability, and delivery information.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[var(--accent-500)] text-white font-bold px-6 py-3 rounded-lg hover:bg-[var(--accent-600)] transition-colors shadow-lg shadow-teal-900/30"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/5 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/15 backdrop-blur-sm transition-colors"
              >
                Send Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
