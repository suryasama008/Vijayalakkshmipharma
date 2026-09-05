export type ProductCategory =
  | 'solvents'
  | 'colours'
  | 'excipients'
  | 'amino-acids'
  | 'pellets'
  | 'carbonates'
  | 'phosphates'
  | 'silicon-dioxide'
  | 'vitamins'
  | 'oils'
  | 'flavours'
  | 'api'
  | 'food-nutra'
  | 'other'

export type ProductFAQ = {
  q: string
  a: string
}

export type Product = {
  id: string
  name: string
  slug: string
  category: ProductCategory
  grade?: string
  featured: boolean
  created_at: string

  // --- Phase 2: elaborated content -------------------------------------
  // All optional and populated incrementally, product by product. The
  // product detail page renders a rich layout when `overview` is present,
  // and falls back to the minimal layout otherwise - so partially-filled
  // data never breaks a page. See HANDOFF-PHASE-2.md for the rollout plan.
  metaTitle?: string
  metaDescription?: string
  h1?: string
  overview?: string
  specs?: Record<string, string>
  applications?: string[]
  relatedSlugs?: string[]
  faq?: ProductFAQ[]
  bestseller?: boolean
  readyStock?: boolean
  cas?: string
  molecularFormula?: string
  molecularWeight?: string
  appearance?: string
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
