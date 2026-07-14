import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { EASE } from '@/lib/motion'

/** Placeholder page shown for sections that aren't built yet. */
export default function ComingSoon({
  titleKey,
  title,
}: {
  titleKey?: string
  title?: string
}) {
  const { t } = useTranslation()
  const label = title ?? (titleKey ? t(titleKey) : '')

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-cream-50 px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex flex-col items-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-clay-500">
          {label}
        </p>
        <h1 className="mt-5 font-hero text-4xl font-medium tracking-tight text-ink sm:text-6xl">
          {t('comingSoon.title')}
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">
          {t('comingSoon.body')}
        </p>
        <Link
          to="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 font-medium text-white transition-colors hover:bg-clay-600"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          {t('comingSoon.back')}
        </Link>
      </motion.div>
    </section>
  )
}
