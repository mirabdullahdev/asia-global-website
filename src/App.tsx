import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { useLenis } from 'lenis/react'
import SmoothScroll from '@/components/SmoothScroll'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductCategory from '@/pages/ProductCategory'
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
            <Route path="products" element={<Products />} />
            <Route path="products/:category" element={<ProductCategory />} />
            <Route path="contact" element={<ComingSoon titleKey="nav.contact" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}
