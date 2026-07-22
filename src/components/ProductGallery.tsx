import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ZoomIn } from 'lucide-react'
import Reveal from '@/components/Reveal'
import Lightbox from '@/components/Lightbox'
import {
  CATEGORY_SLUGS,
  PRODUCTS,
  productsByCategory,
  type CategorySlug,
} from '@/lib/products'

/**
 * Filter navigation ("All Products" + categories) plus a hover-zoom product
 * grid. `active` is null on the all-products view, or a category slug on a
 * category page. Categories always link out, so navigation (and "go back")
 * works from anywhere.
 */
export default function ProductGallery({ active }: { active: CategorySlug | null }) {
  const { t } = useTranslation()
  const categoryNames = t('products.categories', { returnObjects: true }) as string[]
  const nameOf = (slug: CategorySlug) => categoryNames[CATEGORY_SLUGS.indexOf(slug)]

  const products = active ? productsByCategory(active) : PRODUCTS
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const tabs: { to: string; label: string; isActive: boolean }[] = [
    { to: '/products', label: t('productsPage.all'), isActive: active === null },
    ...CATEGORY_SLUGS.map((slug) => ({
      to: `/products/${slug}`,
      label: nameOf(slug),
      isActive: active === slug,
    })),
  ]

  return (
    <div>
      {/* Filter / navigation bar — underline tabs */}
      <Reveal>
        <div className="flex items-center gap-x-7 gap-y-3 overflow-x-auto border-b border-cream-200 [scrollbar-width:none] sm:gap-x-9 [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`group relative shrink-0 whitespace-nowrap pb-3.5 text-[15px] transition-colors ${
                tab.isActive ? 'text-ink' : 'text-ink/45 hover:text-ink'
              }`}
            >
              <span className={tab.isActive ? 'font-semibold' : 'font-medium'}>
                {tab.label}
              </span>
              <span
                className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-clay-500 transition-transform duration-300 ${
                  tab.isActive
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-cream-200'
                }`}
              />
            </Link>
          ))}
        </div>
      </Reveal>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <div className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="relative block aspect-[4/5] w-full overflow-hidden border border-cream-200 bg-white"
                >
                  <img
                    src={p.image}
                    alt={nameOf(p.category)}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </button>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-ink/70">{nameOf(p.category)}</p>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-500 transition-colors hover:text-clay-600"
                  >
                    <ZoomIn className="size-4" />
                    {t('productsPage.view')}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="mt-10 flex flex-col items-start gap-4 border border-dashed border-cream-200 bg-white/50 p-10">
            <p className="text-lg text-ink/70">{t('productsPage.emptyCategory')}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-6 py-3 font-medium text-white transition-colors hover:bg-clay-600"
            >
              {t('productsPage.viewAll')}
            </Link>
          </div>
        </Reveal>
      )}

      <Lightbox
        items={products.map((p) => ({ image: p.image, label: nameOf(p.category) }))}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  )
}
