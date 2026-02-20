'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LEVEL_DATA } from '@/lib/types'
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    city_interest: '', current_level: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true); setError('')
    try {
      const { error: err } = await supabase.from('email_captures').insert({
        email: form.email,
        first_name: form.first_name || undefined,
        last_name: form.last_name || undefined,
        city_interest: form.city_interest || undefined,
        current_level: form.current_level,
      })
      if (err && err.code !== '23505') throw err // ignore duplicate email
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 40px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '72px', marginBottom: '24px' }}>🏆</div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 64px)', letterSpacing: '4px', marginBottom: '16px', background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>You&apos;re In</h1>
          <p style={{ color: 'var(--text-2)', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px' }}>
            Welcome to the LEVELS community. You&apos;ll be the first to know about events in your city, new drops, and early access tickets.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-primary">View Events →</Link>
            <Link href="/merch" className="btn-ghost">Shop Merch</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', paddingTop: '68px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px var(--px) 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-split)', gap: 'var(--gap-split)', alignItems: 'start' }}>

          {/* Left: copy */}
          <div>
            <div className="section-label">Join the Movement</div>
            <h1 style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(44px, 6vw, 68px)',
              letterSpacing: '3px', lineHeight: 1, marginBottom: '20px',
            }}>
              Find<br /><span className="text-gradient">Your Level</span>
            </h1>
            <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
              Register your interest and be the first to know about LEVELS events near you, early-bird pricing, and exclusive drops for registered athletes.
            </p>

            {/* Level preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {LEVEL_DATA.map(lvl => (
                <div key={lvl.num} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '14px 18px', borderRadius: '10px',
                  background: lvl.bg, border: `1px solid ${lvl.border}`,
                }}>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', color: lvl.color, letterSpacing: '2px', width: '32px', flexShrink: 0 }}>{lvl.num}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: lvl.color, width: '80px', flexShrink: 0 }}>{lvl.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>{lvl.stats.split(' · ')[2]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="card" style={{ padding: '36px' }}>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '2px', marginBottom: '28px' }}>Register Interest</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                    placeholder="Alex" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                    placeholder="Smith" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email Address *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="alex@email.com" style={{ ...inputStyle, width: '100%' }} />
              </div>

              <div>
                <label style={labelStyle}>City of Interest</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {['', 'Auckland', 'Wellington', 'Christchurch'].map(c => (
                    <button key={c} type="button" onClick={() => setForm(f => ({ ...f, city_interest: c }))} style={{
                      padding: '8px 16px', borderRadius: '8px',
                      border: `1px solid ${form.city_interest === c ? 'var(--red)' : 'var(--border)'}`,
                      background: form.city_interest === c ? 'rgba(230,57,70,0.12)' : 'transparent',
                      color: form.city_interest === c ? 'var(--text)' : 'var(--text-2)',
                      fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                    }}>{c || 'All Cities'}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Current Level (self-assessed)</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => setForm(f => ({ ...f, current_level: 0 }))} style={{
                    padding: '8px 14px', borderRadius: '8px',
                    border: `1px solid ${form.current_level === 0 ? 'var(--border-hover)' : 'var(--border)'}`,
                    background: form.current_level === 0 ? 'rgba(255,255,255,0.06)' : 'transparent',
                    color: 'var(--text-2)', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s',
                  }}>Not competed yet</button>
                  {LEVEL_DATA.map(lvl => (
                    <button type="button" key={lvl.numInt} onClick={() => setForm(f => ({ ...f, current_level: lvl.numInt }))} style={{
                      padding: '8px 14px', borderRadius: '8px',
                      border: `1px solid ${form.current_level === lvl.numInt ? lvl.color + '80' : 'var(--border)'}`,
                      background: form.current_level === lvl.numInt ? lvl.color + '18' : 'transparent',
                      color: form.current_level === lvl.numInt ? lvl.color : 'var(--text-3)',
                      fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                      fontFamily: 'var(--font-mono)',
                    }}>LVL {lvl.num}</button>
                  ))}
                </div>
              </div>

              {error && <p style={{ color: 'var(--red)', fontSize: '13px' }}>{error}</p>}

              <button type="submit" disabled={submitting} className="btn-primary" style={{ justifyContent: 'center', marginTop: '8px', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Submitting...' : 'Join the Movement →'}
              </button>
              <p style={{ fontSize: '11px', color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6 }}>
                No spam. Early access to events and drops for registered athletes only.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

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
