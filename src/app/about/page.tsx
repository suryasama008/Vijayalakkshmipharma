import { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/config'

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
    images: [{ url: '/pharma-global-banner.png', width: 1792, height: 1024, alt: 'Vijayalakkshmi Pharma pharmaceutical raw materials supplier' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.png'] },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About Vijayalakkshmi Pharma</h1>
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        Vijayalakkshmi Pharma is one of Hyderabad&apos;s trusted suppliers of pharmaceutical raw materials, industrial solvents, pharma colours, and nutraceutical ingredients. Based in L.B. Nagar, we serve pharma manufacturers, formulation companies, and research institutions across Telangana and pan India.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: '150+', sub: 'Products' },
          { label: 'Pan India', sub: 'Supply Network' },
          { label: 'IP/BP/USP', sub: 'Grade Products' },
        ].map(s => (
          <div key={s.label} className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-900">{s.label}</div>
            <div className="text-gray-600 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {SITE.contacts.map(c => (
          <div key={c.name} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 text-lg">{c.name}</h3>
            <p className="text-blue-600 text-sm mb-3">{c.role}</p>
            <a href={`tel:${c.phone}`} className="text-gray-700 hover:text-blue-700 font-medium">
              {c.phone}
            </a>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Supply</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8 columns-2">
        <li>Pharmaceutical Solvents</li>
        <li>Industrial Chemicals</li>
        <li>Pharma Lake Colours</li>
        <li>Iron Oxides & Titanium Dioxide</li>
        <li>Tablet Excipients (MCC, HPMC, CCS)</li>
        <li>Binders & Disintegrants</li>
        <li>Amino Acids (USP grade)</li>
        <li>Vitamins & Nutraceuticals</li>
        <li>PEG & Tween Series</li>
        <li>Carbomers & Polymers</li>
      </ul>
      <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Source?</h2>
        <p className="text-blue-200 mb-6">Contact us for pricing, availability, and delivery information.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="bg-white text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-blue-50">
            Browse Products
          </Link>
          <Link href="/contact" className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800">
            Send Enquiry
          </Link>
        </div>
      </div>
    </div>
  )
}
