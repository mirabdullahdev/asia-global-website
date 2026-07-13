import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

const EXPLORE = [
  { to: '/about', key: 'nav.about' },
  { to: '/what-we-do', key: 'nav.whatWeDo' },
  { to: '/products', key: 'nav.products' },
  { to: '/contact', key: 'nav.contact' },
] as const

const EMAIL = 'info@asiaglobaltex.com'

export default function Footer() {
  const { t } = useTranslation()

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
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-white">
                    {t(l.key)}
                  </Link>
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
