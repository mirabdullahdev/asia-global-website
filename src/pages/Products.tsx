import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { EASE } from '@/lib/motion'

// Order-matched to `products.categories`; slugs stay language-agnostic.
const CATEGORY_IMAGES = [
  '/categories/denim.jpg',
  '/categories/knitwear.jpg',
  '/categories/chinos.jpg',
  '/categories/outerwear.jpg',
]
const CATEGORY_SLUGS = ['denim', 'knitwear', 'chinos', 'outerwear']

export default function Products() {
  const { t } = useTranslation()
  const categories = t('products.categories', { returnObjects: true }) as string[]

  return (
    <>
      {/* ── Cover ──────────────────────────────────────────── */}
      <section className="relative flex h-[62vh] min-h-[420px] items-center justify-center overflow-hidden">
        <img
          src="/backgrounds/product-cover.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-10 px-6 text-center text-white"
        >
          <h1 className="font-hero text-3xl leading-[1.1] drop-shadow-lg sm:text-5xl lg:text-6xl">
            {t('productsPage.title')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
            {t('productsPage.intro')}
          </p>
        </motion.div>
      </section>

      {/* ── Category grid ──────────────────────────────────── */}
      <section className="bg-cream-50 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {t('productsPage.rangeTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/60">
              {t('productsPage.rangeSubtitle')}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
            {categories.map((cat, i) => (
              <Reveal key={cat} delay={(i % 2) * 0.08}>
                <Link
                  to={`/products/${CATEGORY_SLUGS[i]}`}
                  className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-3xl bg-clay-900"
                >
                  <img
                    src={CATEGORY_IMAGES[i]}
                    alt={cat}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-colors duration-300 group-hover:from-black/80" />
                  <div className="relative z-10 flex w-full items-center justify-between p-6 sm:p-8">
                    <div>
                      <h3 className="font-display text-2xl font-medium text-white drop-shadow sm:text-3xl">
                        {cat}
                      </h3>
                      <span className="mt-1 inline-block text-sm text-white/70">
                        {t('productsPage.viewRange')}
                      </span>
                    </div>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:bg-clay-500">
                      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Not-a-retailer note + CTA */}
          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col items-start gap-6 rounded-3xl border border-cream-200 bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <p className="max-w-2xl text-lg leading-relaxed text-ink/70">
                {t('productsPage.note')}
              </p>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 font-medium text-white transition-colors hover:bg-clay-600"
              >
                {t('productsPage.cta')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
