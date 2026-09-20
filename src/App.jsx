import { useMemo, useState } from 'react'

const PRODUCTS = [
  { id: 1, name: 'Ceramic Pour-Over Kit', category: 'Kitchen', price: 48 },
  { id: 2, name: 'Linen Apron', category: 'Kitchen', price: 32 },
  { id: 3, name: 'Walnut Desk Tray', category: 'Office', price: 56 },
  { id: 4, name: 'Brass Desk Lamp', category: 'Office', price: 124 },
  { id: 5, name: 'Merino Throw Blanket', category: 'Home', price: 98 },
  { id: 6, name: 'Stoneware Vase', category: 'Home', price: 41 },
]

const CATEGORIES = ['All', 'Kitchen', 'Office', 'Home']

const currency = (n) => `$${n.toFixed(2)}`

export default function App() {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])

  const visible = useMemo(
    () => (category === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category]
  )

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  const add = (product) =>
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { ...product, qty: 1 }]
    })

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 24px 64px' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          paddingBottom: 24,
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 24, letterSpacing: '-0.01em' }}>eCommerce</h1>
          <p style={{ margin: '6px 0 0', color: 'var(--muted)', fontSize: 14 }}>
            A small storefront running in the Alloy sandbox.
          </p>
        </div>
        <div
          style={{
            border: '1px solid var(--line)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 14,
            whiteSpace: 'nowrap',
          }}
        >
          Cart: {count} item{count === 1 ? '' : 's'} &middot; <strong>{currency(total)}</strong>
        </div>
      </header>

      <nav style={{ display: 'flex', gap: 8, margin: '24px 0' }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              border: '1px solid',
              borderColor: c === category ? 'var(--accent)' : 'var(--line)',
              background: c === category ? 'var(--accent)' : '#fff',
              color: c === category ? '#fff' : 'var(--ink)',
              borderRadius: 999,
              padding: '8px 16px',
              fontSize: 14,
            }}
          >
            {c}
          </button>
        ))}
      </nav>

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {visible.map((p) => (
          <article
            key={p.id}
            className="card"
            style={{
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                background: '#f4f5f7',
                borderRadius: 8,
                height: 120,
                display: 'grid',
                placeItems: 'center',
                color: 'var(--muted)',
                fontSize: 13,
              }}
            >
              {p.category}
            </div>
            <h2 style={{ margin: 0, fontSize: 16 }}>{p.name}</h2>
            <span style={{ color: 'var(--muted)', fontSize: 14 }}>{currency(p.price)}</span>
            <button
              onClick={() => add(p)}
              style={{
                marginTop: 8,
                border: '1px solid var(--accent)',
                background: '#fff',
                color: 'var(--accent)',
                borderRadius: 8,
                padding: '10px 12px',
                fontSize: 14,
              }}
            >
              Add to cart
            </button>
          </article>
        ))}
      </main>
    </div>
  )
}
