'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SITE, CATEGORIES } from '@/lib/config'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="bg-[var(--brand-950)] text-blue-100 text-xs sm:text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:inline tracking-wide">GST: {SITE.gst}</span>
          <span className="sm:hidden tracking-wide">GST Registered</span>
          <a href={`tel:${SITE.phone}`} className="flex items-center gap-1.5 font-medium hover:text-white transition-colors">
            <Phone className="w-3 h-3" /> {SITE.phone}
          </a>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 leading-tight">
          <Image
            src="/vl-pharma-logo-tight.png"
            alt="Vijayalakkshmi Pharma logo"
            width={64}
            height={64}
            priority
            className="h-14 w-14 rounded-full ring-1 ring-gray-100 p-0.5"
          />
          <span className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl text-[var(--brand-900)] leading-tight">Vijayalakkshmi Pharma</span>
            <span className="text-[11px] text-gray-500 tracking-wide">L.B. Nagar, Hyderabad</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-600">
          <Link href="/products" className="hover:text-[var(--brand-700)] transition-colors">All Products</Link>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCategoriesOpen((v) => !v)}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-[var(--brand-700)] transition-colors"
            >
              Categories
              <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {categoriesOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full mt-3 w-[560px] max-w-[90vw] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 shadow-2xl shadow-gray-300/40 grid grid-cols-2 gap-1"
              >
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products/category/${c.slug}`}
                    role="menuitem"
                    onClick={() => setCategoriesOpen(false)}
                    className="rounded-lg px-3 py-2 hover:bg-[var(--brand-50)] hover:text-[var(--brand-700)] transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 text-sm">{c.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="hover:text-[var(--brand-700)] transition-colors">About</Link>
          <Link
            href="/contact"
            className="bg-[var(--brand-800)] text-white px-5 py-2.5 rounded-lg hover:bg-[var(--brand-900)] transition-colors shadow-sm"
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
        <div id="mobile-navigation" className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-1 text-sm font-semibold text-gray-700">
          <Link href="/products" className="py-2" onClick={() => setOpen(false)}>All Products</Link>

          <button
            type="button"
            onClick={() => setMobileCategoriesOpen((v) => !v)}
            aria-expanded={mobileCategoriesOpen}
            className="flex items-center justify-between py-2 text-left"
          >
            Categories
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoriesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {mobileCategoriesOpen && (
            <div className="pl-3 flex flex-col gap-1 border-l-2 border-[var(--brand-100)] mb-1">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/products/category/${c.slug}`}
                  className="py-1.5 font-medium text-gray-600"
                  onClick={() => setOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          )}

          <Link href="/about" className="py-2" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 bg-[var(--brand-800)] text-white px-4 py-2.5 rounded-lg text-center">
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  )
}
