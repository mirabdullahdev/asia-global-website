/**
 * Product catalogue. Category order matches `products.categories` in the locale
 * files, and slugs stay language-agnostic. Add items here as the client sends
 * photos — the Products pages update automatically.
 */

export type CategorySlug = 'denim' | 'knitwear' | 'chinos' | 'outerwear'

export const CATEGORY_SLUGS: CategorySlug[] = [
  'denim',
  'knitwear',
  'chinos',
  'outerwear',
]

// Cover image shown for each category tile / filter.
export const CATEGORY_COVER: Record<CategorySlug, string> = {
  denim: '/categories/denim.jpg',
  knitwear: '/categories/knitwear.jpg',
  chinos: '/categories/chinos.jpg',
  outerwear: '/categories/outerwear.jpg',
}

export type Product = {
  id: string
  category: CategorySlug
  image: string
}

export const PRODUCTS: Product[] = [
  { id: 'denim-1', category: 'denim', image: '/products/denim-1.jpg' },
  { id: 'denim-3', category: 'denim', image: '/products/denim-3.jpg' },
  { id: 'knit-1', category: 'knitwear', image: '/products/knit-1.jpg' },
  { id: 'knit-2', category: 'knitwear', image: '/products/knit-2.jpg' },
  { id: 'knit-3', category: 'knitwear', image: '/products/knit-3.jpg' },
  { id: 'knit-4', category: 'knitwear', image: '/products/knit-4.jpg' },
  { id: 'knit-5', category: 'knitwear', image: '/products/knit-5.jpg' },
]

export function productsByCategory(slug: CategorySlug) {
  return PRODUCTS.filter((p) => p.category === slug)
}
