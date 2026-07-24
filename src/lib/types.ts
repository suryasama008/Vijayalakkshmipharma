export type Product = {
  id: string
  name: string
  slug: string
  category: 'solvents' | 'colours' | 'excipients' | 'amino-acids' | 'other'
  grade?: string
  origin?: string
  packing?: string
  description?: string
  cas_number?: string
  featured: boolean
  created_at: string
}

export type Enquiry = {
  id?: string
  product_name?: string
  name: string
  company?: string
  phone: string
  email?: string
  message?: string
}
