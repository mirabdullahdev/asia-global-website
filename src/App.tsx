import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLenis } from 'lenis/react'
import SmoothScroll from '@/components/SmoothScroll'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import ComingSoon from '@/pages/ComingSoon'

/** Reset scroll to the top on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])

  return null
}

// Keep in sync with CATEGORY_SLUGS in Home.tsx (order matches products.categories).
const CATEGORY_SLUGS = ['denim', 'knitwear', 'chinos', 'outerwear']

/** Coming Soon placeholder titled with the localized product-category name. */
function ProductCategory() {
  const { category } = useParams()
  const { t } = useTranslation()
  const index = CATEGORY_SLUGS.indexOf(category ?? '')
  if (index === -1) return <Navigate to="/products" replace />
  const names = t('products.categories', { returnObjects: true }) as string[]
  return <ComingSoon title={names[index]} />
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<ComingSoon titleKey="nav.about" />} />
            <Route path="what-we-do" element={<ComingSoon titleKey="nav.whatWeDo" />} />
            <Route path="products" element={<ComingSoon titleKey="nav.products" />} />
            <Route path="products/:category" element={<ProductCategory />} />
            <Route path="contact" element={<ComingSoon titleKey="nav.contact" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}
