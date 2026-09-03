import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, MapPin, CheckCircle2 } from 'lucide-react'
import { EASE } from '@/lib/motion'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/mir@asiaglobaltex.com'
const PUBLIC_EMAIL = 'info@asiaglobaltex.com'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    // Honeypot — bots fill this; humans nekver see it.
    if (fd.get('_honey')) return

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
          _subject: 'New enquiry from asiaglobaltex.com',
          _template: 'table',
        }),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-cream-200 bg-cream-50/60 px-4 py-3.5 text-ink outline-none transition-all placeholder:text-ink/35 hover:border-cream-200 hover:bg-white focus:border-clay-500 focus:bg-white focus:ring-4 focus:ring-clay-500/10'

  return (
    <section className="min-h-dvh bg-cream-50 pb-16 pt-28 sm:pb-20 lg:pb-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — intro + details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1 className="font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
              {t('contactPage.title')}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/60">
              {t('contactPage.subtitle')}
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={`mailto:${PUBLIC_EMAIL}`}
                className="group flex items-center gap-4"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-clay-500 text-white transition-colors group-hover:bg-clay-600">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-ink/45">
                    {t('contactPage.emailLabel')}
                  </span>
                  <span className="text-ink transition-colors group-hover:text-clay-600">
                    {PUBLIC_EMAIL}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-ink/5 text-ink/70">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-ink/45">
                    {t('contactPage.locationLabel')}
                  </span>
                  <span className="text-ink">Pakistan</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            {/* soft glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.25rem] bg-gradient-to-br from-clay-500/25 via-clay-400/10 to-transparent opacity-80 blur-2xl"
            />
            <div className="rounded-3xl border border-white bg-white p-6 shadow-[0_28px_70px_-24px_rgba(0,57,166,0.32)] ring-1 ring-cream-200/70 sm:p-10">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-start justify-center py-8">
                <CheckCircle2 className="size-12 text-clay-500" />
                <h2 className="mt-5 font-display text-2xl font-medium text-ink">
                  {t('contactPage.successTitle')}
                </h2>
                <p className="mt-3 text-ink/60">{t('contactPage.success')}</p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 rounded-full bg-clay-500 px-6 py-3 font-medium text-white transition-colors hover:bg-clay-600"
                >
                  {t('contactPage.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                    {t('contactPage.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t('contactPage.namePlaceholder')}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                    {t('contactPage.email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t('contactPage.emailPlaceholder')}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                    {t('contactPage.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t('contactPage.messagePlaceholder')}
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-brand-500">{t('contactPage.error')}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-full bg-clay-500 px-8 py-4 font-medium text-white shadow-lg shadow-clay-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-600 hover:shadow-xl hover:shadow-clay-500/35 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto sm:px-10"
                >
                  {status === 'sending' ? t('contactPage.sending') : t('contactPage.send')}
                </button>
              </form>
            )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
