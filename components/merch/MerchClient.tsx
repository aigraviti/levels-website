'use client'
import { useState } from 'react'
import type { Product } from '@/lib/types'
import { getLevelColor, formatNZD, LEVEL_DATA } from '@/lib/types'
import { useCart } from '@/lib/cart-context'

const CATS = [
  { key: 'all', label: 'All' },
  { key: 'clothing', label: '👕 Clothing' },
  { key: 'backpack', label: '🎒 Backpacks' },
  { key: 'footwear', label: '👟 Footwear' },
  { key: 'patch', label: '🔖 Patches' },
]

export default function MerchClient({ products }: { products: Product[] }) {
  const [cat, setCat] = useState('all')
  const [level, setLevel] = useState(0)
  const { addItem, items } = useCart()

  const filtered = products
    .filter(p => cat === 'all' || p.category === cat)
    .filter(p => level === 0 || p.level_association === level)

  function addToBag(product: Product) {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category,
      type: 'product',
    })
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--px) 100px' }}>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
        {/* Category */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c.key} onClick={() => setCat(c.key)} style={{
              padding: '9px 20px', borderRadius: '100px',
              border: `1px solid ${cat === c.key ? 'var(--red)' : 'var(--border)'}`,
              background: cat === c.key ? 'rgba(230,57,70,0.12)' : 'transparent',
              color: cat === c.key ? 'var(--text)' : 'var(--text-2)',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}>{c.label}</button>
          ))}
        </div>
        {/* Level filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginRight: '4px' }}>Level:</span>
          <button onClick={() => setLevel(0)} style={{
            padding: '7px 16px', borderRadius: '100px',
            border: `1px solid ${level === 0 ? 'var(--border-hover)' : 'var(--border)'}`,
            background: level === 0 ? 'rgba(255,255,255,0.06)' : 'transparent',
            color: level === 0 ? 'var(--text)' : 'var(--text-3)',
            fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
          }}>All</button>
          {LEVEL_DATA.map(lvl => (
            <button key={lvl.numInt} onClick={() => setLevel(lvl.numInt)} style={{
              padding: '7px 16px', borderRadius: '100px',
              border: `1px solid ${level === lvl.numInt ? lvl.color + '80' : 'var(--border)'}`,
              background: level === lvl.numInt ? lvl.color + '18' : 'transparent',
              color: level === lvl.numInt ? lvl.color : 'var(--text-3)',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'var(--font-mono)',
            }}>{lvl.num}</button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p style={{ color: 'var(--text-3)', fontSize: '13px', fontFamily: 'var(--font-mono)', marginBottom: '32px', letterSpacing: '1px' }}>
        {filtered.length} PRODUCT{filtered.length !== 1 ? 'S' : ''}
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '20px' }}>
        {filtered.map(p => {
          const lvlColor = getLevelColor(p.level_association)
          const isInBag = items.some(i => i.id === p.id)
          const catIcons: Record<string, string> = { backpack: '🎒', patch: '🔖', clothing: '👕', footwear: '👟' }

          return (
            <div key={p.id} className="card" style={{ overflow: 'hidden', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = lvlColor + '50'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {/* Product image */}
              <div style={{
                height: '200px',
                background: `linear-gradient(135deg, ${p.colour_hex ?? '#1A1A22'} 0%, ${lvlColor}22 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '64px', position: 'relative', overflow: 'hidden',
              }}>
                {p.image_url
                  ? <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>{catIcons[p.category] ?? '📦'}</span>
                }
                {p.level_association && (
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    padding: '4px 10px', borderRadius: '6px',
                    background: lvlColor + '25', border: `1px solid ${lvlColor}60`,
                    fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                    fontFamily: 'var(--font-mono)', color: lvlColor,
                  }}>
                    LVL {String(p.level_association).padStart(2, '0')}
                  </div>
                )}
                {p.featured && (
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    padding: '4px 10px', borderRadius: '6px',
                    background: 'rgba(255,183,3,0.2)', border: '1px solid rgba(255,183,3,0.4)',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '1px',
                    fontFamily: 'var(--font-mono)', color: 'var(--gold)',
                  }}>★ FEATURED</div>
                )}
              </div>

              <div style={{ padding: '20px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {p.category}
                </p>
                <h3 style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {(p.description ?? '').slice(0, 90)}{(p.description ?? '').length > 90 ? '...' : ''}
                </p>

                {p.size_options && p.size_options.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {p.size_options.slice(0, 6).map(s => (
                      <span key={s} style={{
                        padding: '3px 8px', borderRadius: '4px',
                        border: '1px solid var(--border)', fontSize: '11px',
                        color: 'var(--text-3)', fontFamily: 'var(--font-mono)',
                      }}>{s}</span>
                    ))}
                    {p.size_options.length > 6 && <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>+{p.size_options.length - 6}</span>}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '26px', letterSpacing: '1px', color: 'var(--text)' }}>
                    {formatNZD(p.price)}
                  </div>
                  <button
                    onClick={() => addToBag(p)}
                    style={{
                      padding: '9px 20px', borderRadius: '8px',
                      background: isInBag ? 'rgba(46,196,182,0.12)' : 'var(--gradient-hero)',
                      border: isInBag ? '1px solid rgba(46,196,182,0.4)' : 'none',
                      color: isInBag ? 'var(--teal)' : 'white',
                      fontSize: '12px', fontWeight: 600, letterSpacing: '1px',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {isInBag ? '✓ In Bag' : 'Add to Bag'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>👕</div>
          <p style={{ color: 'var(--text-2)', fontSize: '16px' }}>No products match that filter. Try a different combination.</p>
        </div>
      )}
    </div>
  )
}
