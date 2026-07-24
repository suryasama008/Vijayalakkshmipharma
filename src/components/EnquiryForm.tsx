'use client'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { SITE } from '@/lib/config'

export default function EnquiryForm({ productName }: { productName?: string }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: productName ? `I am interested in ${productName}. Please share price and availability.` : '',
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      setError('Name and phone are required.')
      return
    }
    setError('')

    // No backend/database - the enquiry is sent straight to WhatsApp.
    const lines = [
      `Enquiry${productName ? ` for ${productName}` : ''}`,
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean)

    const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircle className="mx-auto mb-2 h-9 w-9 text-green-600" aria-hidden="true" />
        <h3 className="font-bold text-green-800 text-lg">Opening WhatsApp...</h3>
        <p className="text-green-700 mt-1">Send the message and we will get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {productName && (
        <div className="bg-blue-50 text-blue-800 text-sm rounded-lg px-4 py-2">
          Enquiry for: <strong>{productName}</strong>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            id="enquiry-name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="enquiry-company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            name="company"
            id="enquiry-company"
            value={form.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Company name"
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="enquiry-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            id="enquiry-phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mobile number"
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </div>
        <div>
          <label htmlFor="enquiry-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            id="enquiry-email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email address"
            autoComplete="email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="enquiry-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          name="message"
          id="enquiry-message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Quantity, grade, any specific requirements..."
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Send Enquiry via WhatsApp
      </button>
    </form>
  )
}
