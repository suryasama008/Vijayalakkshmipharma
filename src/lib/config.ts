export const SITE = {
  name: 'Vijayalakkshmi Pharma',
  shortName: 'VL Pharma',
  tagline: 'Pharmaceutical & Chemical Raw Materials Supplier in Hyderabad',
  description:
    'Vijayalakkshmi Pharma is a leading supplier of pharmaceutical excipients, solvents, colours, and amino acids in Hyderabad, Telangana. Serving pharma manufacturers across India since decades.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://vijayalakkshmipharma.com').replace(/\/$/, ''),
  phone: '9182950996',
  phone2: '7337227787',
  email: 'vijayalakkshmipharma@rediffmail.com',
  address: 'Plot No. 64, 3-3-414, RTC Colony, L.B. Nagar, Hyderabad - 500074, Telangana',
  mapsQuery: 'Plot No. 64, 3-3-414, RTC Colony, L.B. Nagar, Hyderabad, Telangana 500074',
  gst: '36ACWPN8683J1ZH',
  whatsapp: '9182950996',
  contacts: [
    { name: 'Venkat Ram Reddi', role: 'Proprietor', phone: '7337227787' },
    { name: 'Sathish Reddy', role: 'Sales & Marketing Executive', phone: '9182950996' },
  ],
}

export const CATEGORIES = [
  {
    slug: 'solvents',
    label: 'Solvents & Chemicals',
    description:
      'Industrial and pharmaceutical grade solvents including IPA, Methanol, Ethyl Acetate, MDC, Toluene, Glycerine and Propylene Glycol.',
    icon: 'Solvents',
    color: 'blue',
  },
  {
    slug: 'colours',
    label: 'Colours',
    description:
      'IP/BP/USP grade lake colours, iron oxides, titanium dioxide and pearlescent colours for tablet coating, capsule filling and food colouring.',
    icon: 'Colours',
    color: 'purple',
  },
  {
    slug: 'excipients',
    label: 'Excipients',
    description:
      'Complete range of pharma excipients - binders, disintegrants, lubricants, preservatives and coatings including MCC, HPMC, Crospovidone, PVP and Magnesium Stearate.',
    icon: 'Excipients',
    color: 'green',
  },
  {
    slug: 'amino-acids',
    label: 'Amino Acids & Proteins',
    description:
      'USP grade L-amino acids, BCAA blends, Alpha Lipoic Acid and whey protein for nutraceutical and pharmaceutical formulations.',
    icon: 'Amino Acids',
    color: 'orange',
  },
  {
    slug: 'pellets',
    label: 'Caustic & Hydroxide Pellets',
    description:
      'Sodium Hydroxide, Potassium Hydroxide and Calcium Hydroxide pellets for pH adjustment, saponification and industrial neutralisation.',
    icon: 'Pellets',
    color: 'slate',
  },
  {
    slug: 'carbonates',
    label: 'Carbonates & Bicarbonates',
    description:
      'Sodium Carbonate, Sodium Bicarbonate, Potassium Carbonate, Potassium Bicarbonate and Calcium Carbonate for pharma, food and industrial buffering.',
    icon: 'Carbonates',
    color: 'teal',
  },
  {
    slug: 'phosphates',
    label: 'Phosphates',
    description:
      'Di-basic and tri-basic sodium, potassium and calcium phosphates used as buffering agents, nutrient sources and mineral fortificants.',
    icon: 'Phosphates',
    color: 'indigo',
  },
  {
    slug: 'silicon-dioxide',
    label: 'Silicon Dioxide (Aerosil Grades)',
    description:
      'Aerosil 200, Aerosil R972 and Aeroperl 300 Pharma colloidal silicon dioxide grades used as glidants and anti-caking agents in tablet and capsule manufacturing.',
    icon: 'Silicon Dioxide',
    color: 'cyan',
  },
  {
    slug: 'vitamins',
    label: 'Vitamins',
    description:
      'Pharma-grade Vitamin B-complex, Vitamin C, D2, D3, E and related vitamin raw materials for nutraceutical and pharmaceutical formulations.',
    icon: 'Vitamins',
    color: 'pink',
  },
  {
    slug: 'oils',
    label: 'Oils & Lipids',
    description:
      'Hydrogenated Vegetable Oil, Soya Bean Oil, Sunflower Oil, MCT Oil and other pharma and food-grade oils for softgel, nutraceutical and cosmetic use.',
    icon: 'Oils',
    color: 'amber',
  },
  {
    slug: 'flavours',
    label: 'Flavours',
    description:
      'Powder and liquid flavours - Strawberry, Vanilla, Orange, Chocolate, Mixed Fruit and more - for oral pharmaceutical syrups, sachets and nutraceutical formulations.',
    icon: 'Flavours',
    color: 'rose',
  },
  {
    slug: 'api',
    label: 'Active Pharmaceutical Ingredients (API)',
    description:
      'Bulk drug and API supply including Paracetamol IP and other pharmacopoeial active ingredients for formulation manufacturers.',
    icon: 'API',
    color: 'red',
  },
  {
    slug: 'food-nutra',
    label: 'Food & Nutraceutical Raw Materials',
    description:
      'Protein isolates, gums, preservatives and food-grade additives - Whey Protein, Xanthan Gum, Potassium Sorbate and more - for nutraceutical and food manufacturers.',
    icon: 'Food & Nutra',
    color: 'lime',
  },
]
