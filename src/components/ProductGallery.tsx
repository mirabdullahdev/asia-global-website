import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '@/components/Reveal'
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

  const tabClass = (isActive: boolean) =>
    `rounded-full px-5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-clay-500 text-white'
        : 'border border-cream-200 bg-white text-ink/70 hover:border-clay-300 hover:text-ink'
    }`

  return (
    <div>
      {/* Filter / navigation bar */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/products" className={tabClass(active === null)}>
            {t('productsPage.all')}
          </Link>
          {CATEGORY_SLUGS.map((slug) => (
            <Link key={slug} to={`/products/${slug}`} className={tabClass(active === slug)}>
              {nameOf(slug)}
            </Link>
          ))}
        </div>
      </Reveal>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <div className="group relative aspect-[3/4] overflow-hidden bg-cream-100">
                <img
                  src={p.image}
                  alt={nameOf(p.category)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 text-sm font-medium text-white drop-shadow">
                  {nameOf(p.category)}
                </span>
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
    </div>
  )
}
