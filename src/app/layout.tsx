import type { Metadata } from 'next'
import './globals.css'
import { SITE } from '@/lib/config'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Pharma Raw Materials Supplier Hyderabad`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'pharma raw materials supplier Hyderabad',
    'pharmaceutical excipients supplier Hyderabad',
    'chemical solvents supplier Hyderabad',
    'IPA supplier Hyderabad',
    'MDC supplier Hyderabad',
    'HPMC supplier Hyderabad',
    'pharma colours supplier Hyderabad',
    'lake colours pharma Hyderabad',
    'amino acids supplier Hyderabad',
    'Vijayalakkshmi Pharma',
    'LB Nagar pharma supplier',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/vl-pharma-logo.png',
    apple: '/vl-pharma-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Pharma Raw Materials Supplier Hyderabad`,
    description: SITE.description,
    images: [
      {
        url: '/pharma-global-banner.png',
        width: 1792,
        height: 1024,
        alt: 'Vijayalakkshmi Pharma pharmaceutical and chemical raw materials supplier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | Pharma Raw Materials Supplier Hyderabad`,
    description: SITE.description,
    images: ['/pharma-global-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: SITE.name,
  alternateName: SITE.shortName,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/vl-pharma-logo.png`,
  image: `${SITE.url}/pharma-global-banner.png`,
  telephone: SITE.phone,
  email: SITE.email,
  taxID: SITE.gst,
  areaServed: ['Hyderabad', 'Telangana', 'India'],
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 64, 3-3-414, RTC Colony, L.B. Nagar',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500074',
    addressCountry: 'IN',
  },
  contactPoint: SITE.contacts.map((contact) => ({
    '@type': 'ContactPoint',
    contactType: contact.role,
    name: contact.name,
    telephone: contact.phone,
    areaServed: 'IN',
    availableLanguage: ['en', 'te', 'hi'],
  })),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-white text-gray-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <a
          href={`https://wa.me/${SITE.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </body>
    </html>
  )
}
