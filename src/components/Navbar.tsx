'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { SITE, CATEGORIES } from '@/lib/config'
import { Menu, X, Phone } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="bg-blue-900 text-white text-sm py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>GST: {SITE.gst}</span>
          <a href={`tel:${SITE.phone}`} className="flex items-center gap-1 hover:text-blue-200">
            <Phone className="w-3 h-3" /> {SITE.phone}
          </a>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 leading-tight">
          <Image
            src="/vl-pharma-logo.png"
            alt="Vijayalakkshmi Pharma logo"
            width={48}
            height={48}
            priority
            className="h-12 w-12 rounded-full"
          />
          <span className="flex flex-col">
            <span className="font-bold text-xl text-blue-900">Vijayalakkshmi Pharma</span>
            <span className="text-xs text-gray-500">L.B. Nagar, Hyderabad</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/products" className="hover:text-blue-700">All Products</Link>
          {CATEGORIES.map(c => (
            <Link key={c.slug} href={`/products/category/${c.slug}`} className="hover:text-blue-700">
              {c.label}
            </Link>
          ))}
          <Link href="/about" className="hover:text-blue-700">About</Link>
          <Link
            href="/contact"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            Enquire Now
          </Link>
        </div>
        <button
          className="md:hidden"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-navigation" className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
          <Link href="/products" onClick={() => setOpen(false)}>All Products</Link>
          {CATEGORIES.map(c => (
            <Link key={c.slug} href={`/products/category/${c.slug}`} onClick={() => setOpen(false)}>
              {c.label}
            </Link>
          ))}
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-center">
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  )
}
