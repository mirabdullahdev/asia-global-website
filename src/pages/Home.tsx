import { motion } from 'framer-motion'
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
import CapabilityCarousel from '@/components/CapabilityCarousel'
import { EASE } from '@/lib/motion'

const PILLAR_ICONS: LucideIcon[] = [Factory, Handshake, MessagesSquare]

// Order-matched to the `products.categories` array (index-based, language-agnostic).
const CATEGORY_IMAGES = [
  '/categories/denim.jpg',
  '/categories/knitwear.jpg',
  '/categories/woven.jpg',
  '/categories/activewear.jpg',
]

type TitleDesc = { title: string; desc: string }

export default function Home() {
  const { t } = useTranslation()

  const capabilities = t('capabilities.items', { returnObjects: true }) as TitleDesc[]
  const categories = t('products.categories', { returnObjects: true }) as string[]
  const services = t('services.items', { returnObjects: true }) as TitleDesc[]
  const introPillars = t('intro.pillars', { returnObjects: true }) as TitleDesc[]

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section id="top" className="relative flex min-h-dvh items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/agt-cover-poster.jpg"
        >
          <source src="/videos/agt-cover.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-32 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
            className="text-white"
          >
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-hero text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-cream-100/85"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#capabilities"
                className="group inline-flex items-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 font-medium text-white transition-colors hover:bg-clay-600"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                {t('hero.ctaSecondary')}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            className="relative h-[220px] w-full overflow-hidden sm:h-[290px] lg:h-[46vh]"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 15%, #000 85%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)',
              WebkitMaskComposite: 'source-in',
              maskImage:
                'linear-gradient(to right, transparent, #000 15%, #000 85%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)',
              maskComposite: 'intersect',
            }}
          >
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/agt-showcase-poster.jpg"
            >
              <source src="/videos/agt-showcase.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
        >
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
            <ArrowDown className="size-4 animate-bounce" />
            {t('hero.scroll')}
          </span>
        </motion.div>
      </section>

      {/* ── Intro ──────────────────────────────────────────── */}
      <section id="about" className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                  {t('intro.title')}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:pt-2">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-ink/70">{t('intro.body')}</p>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t border-cream-200 pt-14 sm:grid-cols-3">
            {introPillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Factory
              return (
                <Reveal key={pillar.title} delay={i * 0.1}>
                  <div className="group h-full rounded-2xl border border-cream-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-clay-500 text-white transition-colors group-hover:bg-clay-600">
                      <Icon className="size-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold text-ink">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{pillar.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Capabilities ───────────────────────────────────── */}
      <section id="capabilities" className="relative overflow-hidden py-24 text-white lg:py-32">
        <img
          src="/backgrounds/end-to-end.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/78 to-black/68" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {t('capabilities.title')}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
                {t('capabilities.subtitle')}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <CapabilityCarousel items={capabilities} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Products ───────────────────────────────────────── */}
      <section id="products" className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {t('products.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/60">
              {t('products.subtitle')}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Reveal key={cat} delay={(i % 4) * 0.08}>
                <div className="group relative flex h-56 items-end overflow-hidden rounded-2xl bg-clay-900">
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────── */}
      <section id="services" className="bg-cream-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {t('services.title')}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
      <section id="contact" className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
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
