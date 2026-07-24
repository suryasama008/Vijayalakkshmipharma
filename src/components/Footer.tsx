import Link from 'next/link'
import { SITE, CATEGORIES } from '@/lib/config'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-white font-bold text-lg mb-2">Vijayalakkshmi Pharma</h3>
          <p className="text-sm text-blue-300 mb-4">
            Leading supplier of pharmaceutical raw materials, excipients, solvents, and colours in Hyderabad, Telangana.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
              <span>{SITE.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phone}</a>
              <span>|</span>
              <a href={`tel:${SITE.phone2}`} className="hover:text-white">{SITE.phone2}</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
            </div>
          </div>
          <p className="text-xs text-blue-400 mt-4">GST: {SITE.gst}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">All Products</Link></li>
            {CATEGORIES.map(c => (
              <li key={c.slug}>
                <Link href={`/products/category/${c.slug}`} className="hover:text-white">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp Enquiry
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-900 py-4 text-center text-xs text-blue-400">
        (c) {new Date().getFullYear()} Vijayalakkshmi Pharma. All rights reserved. | L.B. Nagar, Hyderabad - 500074
      </div>
    </footer>
  )
}
