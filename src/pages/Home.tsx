import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  ArrowDown,
  Factory,
  Handshake,
  MessagesSquare,
  type LucideIcon,
} from 'lucide-react'
import Reveal from '@/components/Reveal'
import { EASE } from '@/lib/motion'
import { useIsDesktop } from '@/lib/useIsDesktop'

const PILLAR_ICONS: LucideIcon[] = [Factory, Handshake, MessagesSquare]

// Order-matched to the `products.categories` array (index-based, language-agnostic).
const CATEGORY_IMAGES = [
  '/categories/denim.jpg',
  '/categories/knitwear.jpg',
  '/categories/chinos.jpg',
  '/categories/outerwear.jpg',
]

// Language-agnostic URL slugs, order-matched to `products.categories`.
const CATEGORY_SLUGS = ['denim', 'knitwear', 'chinos', 'outerwear']

type TitleDesc = { title: string; desc: string }

export default function Home() {
  const { t } = useTranslation()
  const isDesktop = useIsDesktop()

  const capabilities = t('capabilities.items', { returnObjects: true }) as TitleDesc[]
  const categories = t('products.categories', { returnObjects: true }) as string[]
  const services = t('services.items', { returnObjects: true }) as TitleDesc[]
  const introPillars = t('intro.pillars', { returnObjects: true }) as TitleDesc[]

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        id="top"
        className="relative flex min-h-dvh items-end overflow-hidden bg-neutral-950 lg:items-center"
      >
        {/* Only one source is rendered (see useIsDesktop) so the browser downloads
            just the portrait file on phones or the landscape file on desktop. */}
        <video
          key={isDesktop ? 'desktop' : 'mobile'}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={
            isDesktop
              ? '/videos/agt-hero-desktop-poster.jpg'
              : '/videos/agt-hero-mobile-poster.jpg'
          }
        >
          <source
            src={isDesktop ? '/videos/agt-hero-desktop.mp4' : '/videos/agt-hero-mobile.mp4'}
            type="video/mp4"
          />
        </video>

        {/* Mobile scrim: bottom-weighted for the overlaid heading, light at top for the navbar. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/85 via-black/55 to-black/30 lg:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-black/60 via-transparent to-black/25 lg:block" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-10 lg:py-32">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
            className="max-w-3xl text-white"
          >
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-hero text-2xl leading-[1.15] drop-shadow-lg sm:text-4xl lg:text-6xl lg:drop-shadow-none"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream-100/85 drop-shadow-md lg:mt-7 lg:text-lg lg:drop-shadow-none"
            >
              {t('hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute inset-x-0 bottom-6 z-10 flex justify-center lg:bottom-8"
        >
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70 sm:text-xs">
            <ArrowDown className="size-4 animate-bounce" />
            {t('hero.scroll')}
          </span>
        </motion.div>
      </section>

      {/* ── Intro ──────────────────────────────────────────── */}
      <section id="about" className="bg-cream-50 py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {t('intro.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/60">
              {t('intro.body')}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:mt-16 sm:grid-cols-3 sm:gap-6 lg:mt-20">
            {introPillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Factory
              return (
                <Reveal key={pillar.title} delay={i * 0.1}>
                  <div className="group flex h-full flex-col rounded-3xl border border-cream-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-clay-200 hover:shadow-xl hover:shadow-ink/[0.06] sm:p-8">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-clay-400 to-clay-600 text-white shadow-lg shadow-clay-500/25 sm:size-16">
                      <Icon className="size-6 sm:size-7" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-ink sm:mt-6">{pillar.title}</h3>
                    <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-ink/55">
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Capabilities ───────────────────────────────────── */}
      <section id="capabilities" className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-32">
        <img
          src="/backgrounds/end-to-end.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/78 to-black/68" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">
            <Reveal className="lg:col-span-2">
              <div className="lg:sticky lg:top-32">
                <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {t('capabilities.title')}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                  {t('capabilities.subtitle')}
                </p>
                <Link
                  to="/what-we-do"
                  className="mt-8 inline-flex items-center whitespace-nowrap rounded-full bg-white px-8 py-3.5 font-medium text-ink shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-500 hover:text-white hover:shadow-xl hover:shadow-clay-500/30 sm:mt-10"
                >
                  {t('capabilities.cta')}
                </Link>
              </div>
            </Reveal>

            <div className="lg:col-span-3">
              {capabilities.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="group cursor-default py-4 sm:py-6">
                    <h3 className="font-display text-xl font-medium text-white transition-all duration-300 sm:text-2xl lg:group-hover:-translate-y-1 lg:group-hover:text-clay-400">
                      {item.title}
                    </h3>
                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                      <p className="mt-1.5 max-w-lg overflow-hidden text-sm leading-relaxed text-white/60 lg:mt-0 lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ───────────────────────────────────────── */}
      <section id="products" className="bg-cream-50 py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {t('products.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/60">
              {t('products.subtitle')}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Reveal key={cat} delay={(i % 4) * 0.08}>
                <Link
                  to={`/products/${CATEGORY_SLUGS[i]}`}
                  className="group relative flex h-56 items-end overflow-hidden rounded-2xl bg-clay-900"
                >
                  <img
                    src={CATEGORY_IMAGES[i]}
                    alt={cat}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="relative z-10 flex w-full items-center justify-between p-6">
                    <h3 className="font-display text-2xl font-medium text-white drop-shadow">{cat}</h3>
                    <ArrowRight className="size-5 text-white/80 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────── */}
      <section id="services" className="bg-cream-100 py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {t('services.title')}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:mt-14 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={(i % 4) * 0.08}>
                <div className="relative h-full border-t border-clay-200 pt-6">
                  <span className="font-display text-4xl font-medium text-clay-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Contact ──────────────────────────────────── */}
      <section id="contact" className="bg-cream-50 py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
              {t('cta.body')}
            </p>
            <a
              href="mailto:info@asiaglobaltex.com"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-clay-500 px-8 py-4 font-medium text-white transition-colors hover:bg-clay-600"
            >
              {t('cta.button')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
