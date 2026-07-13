import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

const LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/what-we-do', key: 'nav.whatWeDo' },
  { to: '/products', key: 'nav.products' },
  { to: '/contact', key: 'nav.contact' },
] as const

export default function Navbar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  // Transparent over the hero only on the landing page; solid everywhere else.
  const solid = scrolled || !isHome
  const textColor = solid ? 'text-ink' : 'text-white'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid
            ? 'border-b border-cream-200 bg-cream-50/85 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        } ${textColor}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" aria-label="Asia Global Textiles — home" className="flex items-center">
            <img
              src={solid ? '/brand/asia-logo.png' : '/brand/asia-logo-light.png'}
              alt="Asia Global Textiles"
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            {LINKS.map((l) => {
              const active = pathname === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative py-1 transition-opacity after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 ${
                    active
                      ? 'opacity-100 after:scale-x-100'
                      : 'opacity-85 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100'
                  }`}
                >
                  {t(l.key)}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/contact"
              className="hidden rounded-full bg-clay-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-clay-600 sm:inline-flex"
            >
              {t('nav.cta')}
            </Link>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex lg:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-neutral-900 px-6 pb-10 pt-24 text-white lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 text-left font-display text-2xl"
                  >
                    {t(l.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 rounded-full bg-clay-500 px-6 py-3 text-center font-medium text-white"
            >
              {t('nav.cta')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
