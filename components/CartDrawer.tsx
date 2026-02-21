'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatNZD } from '@/lib/types'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, total, count } = useCart()

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: '100%', maxWidth: '420px',
        background: 'var(--card)',
        borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '2px' }}>Your Bag</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', marginTop: '2px' }}>
              {count} ITEM{count !== 1 ? 'S' : ''}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-3)', fontSize: '20px', lineHeight: 1, padding: '4px',
          }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛍️</div>
              <p style={{ color: 'var(--text-2)', fontSize: '15px', marginBottom: '6px' }}>Your bag is empty</p>
              <p style={{ color: 'var(--text-3)', fontSize: '13px', lineHeight: 1.6 }}>
                Find an event or grab some merch and get ready to earn your level.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '8px', flexShrink: 0,
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', fontSize: '24px',
                  }}>
                    {item.image_url
                      ? <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : item.type === 'event' ? '🏆' : '👕'
                    }
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginBottom: '4px' }}>{item.name}</p>
                    <p style={{
                      fontSize: '11px', color: 'var(--text-3)',
                      fontFamily: 'var(--font-mono)', letterSpacing: '1px',
                      textTransform: 'uppercase', marginBottom: '10px',
                    }}>
                      {item.type === 'event' ? 'Event Entry' : item.category ?? 'Product'}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {item.type === 'product' ? (
                        <div style={{
                          display: 'flex', alignItems: 'center',
                          border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden',
                        }}>
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-2)', fontSize: '16px', padding: '4px 10px', lineHeight: 1,
                          }}>−</button>
                          <span style={{ fontSize: '13px', padding: '4px 8px', fontFamily: 'var(--font-mono)' }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-2)', fontSize: '16px', padding: '4px 10px', lineHeight: 1,
                          }}>+</button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>×1</span>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '1px' }}>
                          {formatNZD(item.price * item.quantity)}
                        </span>
                        <button onClick={() => removeItem(item.id)} style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'var(--text-3)', fontSize: '14px', padding: '2px',
                          transition: 'color 0.2s',
                        }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                        >✕</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-2)' }}>Order Total</span>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', letterSpacing: '2px' }}>{formatNZD(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-primary"
              style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              Proceed to Checkout →
            </Link>
            <p style={{ fontSize: '11px', color: 'var(--text-3)', textAlign: 'center', marginTop: '12px', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
              FREE SHIPPING ON ORDERS OVER $100
            </p>
          </div>
        )}
      </div>
    </>
  )
}
