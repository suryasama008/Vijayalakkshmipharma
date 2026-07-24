export const SITE = {
  name: 'Vijayalakkshmi Pharma',
  shortName: 'VL Pharma',
  tagline: 'Pharmaceutical & Chemical Raw Materials Supplier in Hyderabad',
  description:
    'Vijayalakkshmi Pharma is a leading supplier of pharmaceutical excipients, solvents, colours, and amino acids in Hyderabad, Telangana. Serving pharma manufacturers across India since decades.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://vijayalakkshmipharma.com').replace(/\/$/, ''),
  phone: '7337227787',
  phone2: '9182950996',
  email: 'vijayalakkshmipharma@rediffmail.com',
  address: 'Plot No. 64, 3-3-414, RTC Colony, L.B. Nagar, Hyderabad - 500074, Telangana',
  mapsQuery: 'Plot No. 64, 3-3-414, RTC Colony, L.B. Nagar, Hyderabad, Telangana 500074',
  gst: '36ACWPN8683J1ZH',
  whatsapp: '917337227787',
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
      'Industrial and pharmaceutical grade solvents including IPA, Methanol, Ethyl Acetate, MDC, Toluene and more.',
    icon: 'Solvents',
    color: 'blue',
  },
  {
    slug: 'colours',
    label: 'Pharma Colours',
    description:
      'IP/BP/USP grade lake colours, iron oxides, titanium dioxide and pearlescent colours for tablet coating and capsule filling.',
    icon: 'Colours',
    color: 'purple',
  },
  {
    slug: 'excipients',
    label: 'Excipients',
    description:
      'Complete range of pharma excipients - binders, disintegrants, lubricants, coatings including MCC, HPMC, Crospovidone, PVP.',
    icon: 'Excipients',
    color: 'green',
  },
  {
    slug: 'amino-acids',
    label: 'Amino Acids & Proteins',
    description:
      'USP grade L-amino acids, BCAA blends and whey protein for nutraceutical and pharmaceutical formulations.',
    icon: 'Amino Acids',
    color: 'orange',
  },
]
