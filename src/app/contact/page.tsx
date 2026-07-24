import { Metadata } from 'next'
import EnquiryForm from '@/components/EnquiryForm'
import { SITE } from '@/lib/config'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const title = 'Contact Vijayalakkshmi Pharma in Hyderabad'
const description = 'Contact Vijayalakkshmi Pharma for pharmaceutical raw-material enquiries. Call 7337227787 or WhatsApp for pricing, grade, packing, and availability.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: '/contact',
    title,
    description,
    images: [{ url: '/pharma-global-banner.png', width: 1792, height: 1024, alt: 'Contact Vijayalakkshmi Pharma in Hyderabad' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/pharma-global-banner.png'] },
}

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">Send us an enquiry or reach out directly. We respond within 24 hours.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="font-bold text-xl text-gray-900 mb-6">Send Enquiry</h2>
          <EnquiryForm />
        </div>
        <div className="space-y-6">
          <div className="bg-blue-900 text-white rounded-lg p-8">
            <h2 className="font-bold text-xl mb-6">Get in Touch</h2>
            <div className="space-y-4">
              {SITE.contacts.map(c => (
                <div key={c.name}>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-blue-300 text-sm">{c.role}</p>
                  <a href={`tel:${c.phone}`} className="text-white hover:text-blue-200 flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4" /> {c.phone}
                  </a>
                </div>
              ))}
            </div>
            <hr className="border-blue-700 my-6" />
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>{SITE.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-blue-200">{SITE.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Mon-Sat: 9 AM - 6 PM</span>
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-lg transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
          <div className="rounded-lg overflow-hidden border border-gray-200 h-48">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
              title="Vijayalakkshmi Pharma location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
