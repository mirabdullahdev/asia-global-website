import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SmoothScroll from '@/components/SmoothScroll'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}
