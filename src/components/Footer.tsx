import { useTranslation } from 'react-i18next'
import { useLenis } from 'lenis/react'
import { Mail } from 'lucide-react'

const EXPLORE = [
  { id: 'capabilities', key: 'nav.capabilities' },
  { id: 'products', key: 'nav.products' },
  { id: 'services', key: 'nav.services' },
] as const

const EMAIL = 'info@asiaglobaltex.com'

export default function Footer() {
  const { t } = useTranslation()
  const lenis = useLenis()

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -72 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img
              src="/brand/asia-logo-light.png"
              alt="Asia Global Textiles"
              className="h-16 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-clay-400">
              {t('footer.explore')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              {EXPLORE.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => goTo(l.id)}
                    className="transition-colors hover:text-white"
                  >
                    {t(l.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-clay-400">
              {t('footer.contact')}
            </h3>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <Mail className="size-4" />
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-neutral-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Asia Global Textiles. {t('footer.rights')}
          </p>
          <p>Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
