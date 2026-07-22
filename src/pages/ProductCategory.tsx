import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import ProductGallery from '@/components/ProductGallery'
import { CATEGORY_SLUGS, type CategorySlug } from '@/lib/products'
import { EASE } from '@/lib/motion'

export default function ProductCategory() {
  const { category } = useParams()
  const { t } = useTranslation()

  const slug = category as CategorySlug
  const index = CATEGORY_SLUGS.indexOf(slug)
  if (index === -1) return <Navigate to="/products" replace />

  const names = t('products.categories', { returnObjects: true }) as string[]
  const name = names[index]

  return (
    <section className="min-h-dvh bg-cream-50 pb-16 pt-28 sm:pb-20 lg:pb-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Breadcrumb — the way back */}
          <nav className="flex items-center gap-1.5 text-sm text-ink/50">
            <Link to="/" className="transition-colors hover:text-ink">
              {t('nav.home')}
            </Link>
            <ChevronRight className="size-3.5" />
            <Link to="/products" className="transition-colors hover:text-ink">
              {t('nav.products')}
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-ink">{name}</span>
          </nav>

          <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            {name}
          </h1>
        </motion.div>

        <div className="mt-10">
          <ProductGallery active={slug} />
        </div>
      </div>
    </section>
  )
}
