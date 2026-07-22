import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import ProductGallery from '@/components/ProductGallery'
import { EASE } from '@/lib/motion'

export default function Products() {
  const { t } = useTranslation()

  return (
    <>
      {/* ── Cover ──────────────────────────────────────────── */}
      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden">
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

      {/* ── All products ───────────────────────────────────── */}
      <section className="bg-cream-50 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {t('productsPage.rangeTitleLead')}
              <span className="text-clay-500">{t('productsPage.rangeTitleAccent')}</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/60">
              {t('productsPage.rangeSubtitle')}
            </p>
          </Reveal>

          <div className="mt-10">
            <ProductGallery active={null} />
          </div>

          {/* Not-a-retailer note + CTA */}
          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col items-start gap-6 border border-cream-200 bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
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
