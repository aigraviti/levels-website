'use client'
import { useState } from 'react'
import type { Event, Registration } from '@/lib/types'
import { formatDate, formatNZD } from '@/lib/types'
import { supabase } from '@/lib/supabase'

const CITIES = ['All', 'Auckland', 'Wellington', 'Christchurch']
const CITY_COLORS: Record<string, string> = {
  Auckland: '#E63946', Wellington: '#457B9D', Christchurch: '#2EC4B6',
}

export default function EventsClient({ events }: { events: Event[] }) {
  const [city, setCity] = useState('All')
  const [modal, setModal] = useState<Event | null>(null)
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', ticket_type: 'standard' as 'standard' | 'vip' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const filtered = city === 'All' ? events : events.filter(e => e.city === city)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!modal) return
    setSubmitting(true)
    setError('')
    try {
      const reg: Registration = { ...form, event_id: modal.id }
      const { error: err } = await supabase.from('registrations').insert(reg)
      if (err) throw err
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function closeModal() {
    setModal(null); setSuccess(false); setError('')
    setForm({ first_name: '', last_name: '', email: '', phone: '', ticket_type: 'standard' })
  }

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--px) 100px' }}>
        {/* City filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {CITIES.map(c => (
            <button key={c} onClick={() => setCity(c)} style={{
              padding: '10px 24px', borderRadius: '100px', border: '1px solid',
              borderColor: city === c ? 'var(--red)' : 'var(--border)',
              background: city === c ? 'rgba(230,57,70,0.12)' : 'transparent',
              color: city === c ? 'var(--text)' : 'var(--text-2)',
              fontSize: '13px', fontWeight: 600, letterSpacing: '1px',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {c !== 'All' && <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: CITY_COLORS[c], marginRight: '8px', verticalAlign: 'middle' }} />}
              {c}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📅</div>
            <p style={{ color: 'var(--text-2)', fontSize: '16px' }}>No events found. Check back soon.</p>
          </div>
        )}

        {/* Event grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '24px' }}>
          {filtered.map(ev => {
            const pct = Math.round((ev.registered_count / ev.capacity) * 100)
            const almostFull = pct >= 80
            const color = CITY_COLORS[ev.city] ?? 'var(--red)'
            return (
              <div key={ev.id} className="card" style={{ overflow: 'hidden', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '60'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {/* Color header */}
                <div style={{
                  height: '6px',
                  background: `linear-gradient(90deg, ${color}, ${color}88)`,
                }} />
                <div style={{ padding: '28px' }}>
                  {/* City badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '100px',
                      background: color + '18', border: `1px solid ${color}40`,
                      fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                      textTransform: 'uppercase', color,
                    }}>{ev.city}</span>
                    {almostFull && (
                      <span style={{
                        padding: '4px 10px', borderRadius: '100px',
                        background: 'rgba(255,183,3,0.12)', border: '1px solid rgba(255,183,3,0.3)',
                        fontSize: '10px', fontWeight: 700, letterSpacing: '1px',
                        textTransform: 'uppercase', color: 'var(--gold)',
                      }}>Almost Full</span>
                    )}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '26px', letterSpacing: '2px', lineHeight: 1.1, marginBottom: '12px' }}>{ev.title}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px' }}>📅</span>
                      <span style={{ fontSize: '14px', color: 'var(--text-2)' }}>{formatDate(ev.date)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px' }}>📍</span>
                      <span style={{ fontSize: '14px', color: 'var(--text-2)' }}>{ev.venue}</span>
                    </div>
                  </div>

                  {/* Capacity bar */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{ev.registered_count} / {ev.capacity} registered</span>
                      <span style={{ fontSize: '12px', color: pct >= 80 ? 'var(--gold)' : 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{pct}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? 'var(--gold)' : color, borderRadius: '2px', transition: 'width 0.8s ease' }} />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-3)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>Standard</div>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '1px' }}>{formatNZD(ev.price_standard)}</div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,183,3,0.06)', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(255,183,3,0.15)' }}>
                      <div style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>VIP</div>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '1px', color: 'var(--gold)' }}>{formatNZD(ev.price_vip)}</div>
                    </div>
                  </div>

                  <button onClick={() => { setModal(ev); setSuccess(false) }} style={{
                    width: '100%', padding: '13px', background: 'var(--gradient-hero)',
                    border: 'none', borderRadius: '10px',
                    fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px',
                    textTransform: 'uppercase', color: 'white', cursor: 'pointer',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    Register Now →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── REGISTRATION MODAL ── */}
      {modal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }} onClick={closeModal}>
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '480px',
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-3)', fontSize: '20px', lineHeight: 1,
            }}>✕</button>

            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '56px', marginBottom: '20px' }}>🎉</div>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '32px', letterSpacing: '2px', marginBottom: '12px' }}>You&apos;re Registered!</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                  See you at <strong style={{ color: 'var(--text)' }}>{modal.title}</strong>. Check your email for confirmation details.
                </p>
                <button onClick={closeModal} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Done</button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '28px' }}>
                  <div className="section-label">Registration</div>
                  <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '26px', letterSpacing: '2px', lineHeight: 1.1 }}>{modal.title}</h3>
                  <p style={{ color: 'var(--text-3)', fontSize: '13px', marginTop: '6px' }}>📍 {modal.venue} · 📅 {formatDate(modal.date)}</p>
                </div>

                {/* Ticket type */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                  {['standard', 'vip'].map(t => (
                    <button key={t} onClick={() => setForm(f => ({ ...f, ticket_type: t as 'standard' | 'vip' }))} style={{
                      flex: 1, padding: '12px', borderRadius: '10px',
                      border: `1px solid ${form.ticket_type === t ? (t === 'vip' ? 'rgba(255,183,3,0.6)' : 'rgba(230,57,70,0.5)') : 'var(--border)'}`,
                      background: form.ticket_type === t ? (t === 'vip' ? 'rgba(255,183,3,0.08)' : 'rgba(230,57,70,0.08)') : 'transparent',
                      color: form.ticket_type === t ? 'var(--text)' : 'var(--text-2)',
                      cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px', color: t === 'vip' && form.ticket_type === 'vip' ? 'var(--gold)' : 'inherit' }}>{t}</div>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: t === 'vip' ? 'var(--gold)' : 'var(--text)' }}>
                        {formatNZD(t === 'standard' ? modal.price_standard : modal.price_vip)}
                      </div>
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="r-form-row">
                    <input required placeholder="First name" value={form.first_name}
                      onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                      style={inputStyle} />
                    <input required placeholder="Last name" value={form.last_name}
                      onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                      style={inputStyle} />
                  </div>
                  <input required type="email" placeholder="Email address" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={{ ...inputStyle, width: '100%' }} />
                  <input type="tel" placeholder="Phone (optional)" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={{ ...inputStyle, width: '100%' }} />

                  {error && <p style={{ color: 'var(--red)', fontSize: '13px' }}>{error}</p>}

                  <button type="submit" disabled={submitting} className="btn-primary" style={{ justifyContent: 'center', marginTop: '8px', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Registering...' : `Secure My Spot — ${formatNZD(form.ticket_type === 'standard' ? modal.price_standard : modal.price_vip)}`}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const inputStyle: React.CSSProperties = {
  flex: 1, padding: '13px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)', borderRadius: '10px',
  color: 'var(--text)', fontSize: '14px',
  outline: 'none', transition: 'border-color 0.2s',
  fontFamily: 'var(--font-outfit)',
}
