'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatNZD } from '@/lib/types'

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600,
  letterSpacing: '2px', textTransform: 'uppercase',
  color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginBottom: '8px',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)', borderRadius: '9px',
  color: 'var(--text)', fontSize: '14px',
  outline: 'none', transition: 'border-color 0.2s',
  fontFamily: 'var(--font-outfit)',
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '' })
  const [placed, setPlaced] = useState(false)

  if (items.length === 0 && !placed) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px var(--px)' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px' }}>🛍️</div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '40px', letterSpacing: '3px', marginBottom: '12px' }}>Your Bag is Empty</h1>
          <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
            Add some merch or an event entry to get started.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/merch" className="btn-primary">Shop Merch →</Link>
            <Link href="/events" className="btn-ghost">Find Events</Link>
          </div>
        </div>
      </div>
    )
  }

  if (placed) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px var(--px)' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏆</div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 6vw, 56px)', letterSpacing: '4px', marginBottom: '16px', background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Order Received
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.8, marginBottom: '12px' }}>
            Thanks, <strong style={{ color: 'var(--text)' }}>{form.first_name}</strong>. Your order has been placed.
          </p>
          <p style={{ color: 'var(--text-3)', fontSize: '14px', lineHeight: 1.7, marginBottom: '40px' }}>
            We&apos;ll send confirmation to <strong style={{ color: 'var(--text-2)' }}>{form.email}</strong> once payment is integrated. For now, this is a demonstration — no charge has been made.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-primary">Find Your Next Event →</Link>
            <Link href="/merch" className="btn-ghost">Keep Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  function handlePlace(e: React.FormEvent) {
    e.preventDefault()
    clearCart()
    setPlaced(true)
  }

  return (
    <div style={{ background: 'var(--bg)', paddingTop: '68px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px var(--px) 120px' }}>

        <div className="section-label" style={{ marginBottom: '8px' }}>Checkout</div>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '3px', marginBottom: '48px' }}>
          Complete Your Order
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-split)', gap: 'var(--gap-split)', alignItems: 'start' }}>

          {/* Left: contact form */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', letterSpacing: '2px', marginBottom: '24px' }}>Contact Details</h2>
            <form onSubmit={handlePlace} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input required value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                    placeholder="Alex" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input required value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                    placeholder="Smith" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email Address *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="alex@email.com" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Phone (optional)</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+64 21 000 0000" style={inputStyle} />
              </div>

              {/* Payment placeholder */}
              <div style={{
                padding: '20px 24px', borderRadius: '12px',
                background: 'rgba(255,183,3,0.06)', border: '1px solid rgba(255,183,3,0.2)',
                marginTop: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '18px' }}>🔒</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>Payment Integration Coming Soon</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.6 }}>
                  Secure payment via Stripe is coming shortly. Placing an order now saves your details — no charge will be made.
                </p>
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '8px', fontSize: '14px' }}>
                Place Order — {formatNZD(total)}
              </button>
              <p style={{ fontSize: '11px', color: 'var(--text-3)', textAlign: 'center', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
                NO PAYMENT WILL BE TAKEN — DEMO ONLY
              </p>
            </form>
          </div>

          {/* Right: order summary */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', letterSpacing: '2px', marginBottom: '24px' }}>Order Summary</h2>
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', fontSize: '20px',
                    }}>
                      {item.image_url
                        ? <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : item.type === 'event' ? '🏆' : '👕'
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.3 }}>{item.name}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', marginTop: '2px' }}>
                        {item.type === 'event' ? 'Event Entry' : item.category} · ×{item.quantity}
                      </p>
                    </div>
                    <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '1px', flexShrink: 0 }}>
                      {formatNZD(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>Subtotal</span>
                  <span style={{ fontSize: '13px' }}>{formatNZD(total)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>Shipping</span>
                  <span style={{ fontSize: '13px', color: 'var(--teal)' }}>{total >= 100 ? 'FREE' : formatNZD(8.5)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', letterSpacing: '2px', background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {formatNZD(total >= 100 ? total : total + 8.5)}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/merch" style={{ display: 'block', textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-3)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
