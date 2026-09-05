import type { ComponentType } from 'react'
import * as Icons from 'lucide-react'
import { FlaskConical } from 'lucide-react'
import { CATEGORY_ICON_NAMES } from '@/lib/category-colors'

type IconsModule = typeof Icons

export default function CategoryIcon({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const name = CATEGORY_ICON_NAMES[slug]
  const Icon =
    (name && (Icons as unknown as IconsModule)[name as keyof IconsModule]) || FlaskConical
  const Component = Icon as ComponentType<{ className?: string }>
  return <Component className={className} />
}
