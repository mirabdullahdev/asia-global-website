import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '@/i18n'

/**
 * EN/ES toggle. Inactive buttons inherit the surrounding text color
 * (`border-current`) so it reads well both transparent-over-hero and solid.
 */
export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const active = i18n.resolvedLanguage

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-current/25 p-0.5 text-xs font-medium">
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => void i18n.changeLanguage(lng)}
          aria-pressed={active === lng}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-all ${
            active === lng
              ? 'bg-clay-500 text-white'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          {lng}
        </button>
      ))}
    </div>
  )
}
