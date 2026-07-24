import Link from 'next/link'
import { Product } from '@/lib/types'
import { Package } from 'lucide-react'

const categoryColors: Record<string, string> = {
  solvents: 'bg-blue-100 text-blue-700',
  colours: 'bg-purple-100 text-purple-700',
  excipients: 'bg-green-100 text-green-700',
  'amino-acids': 'bg-orange-100 text-orange-700',
  other: 'bg-gray-100 text-gray-700',
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all p-4 flex flex-col"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <Package className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
            categoryColors[product.category] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {product.category.replace('-', ' ')}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 text-sm leading-snug mb-2">
        {product.name}
      </h3>
      {product.origin && (
        <p className="text-xs text-gray-500 mb-1">Origin: {product.origin}</p>
      )}
      {product.packing && (
        <p className="text-xs text-gray-500">Packing: {product.packing}</p>
      )}
      <div className="mt-auto pt-3">
        <span className="text-xs text-blue-600 font-medium group-hover:underline">
          Enquire Now -&gt;
        </span>
      </div>
    </Link>
  )
}
