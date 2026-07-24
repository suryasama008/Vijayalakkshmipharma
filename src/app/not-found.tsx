import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
      <p className="text-gray-500 mb-8">Product or page not found.</p>
      <div className="flex gap-4">
        <Link href="/products" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800">
          Browse Products
        </Link>
        <Link href="/" className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
          Home
        </Link>
      </div>
    </div>
  )
}
