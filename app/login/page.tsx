'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

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

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  function switchTab(t: 'login' | 'signup') {
    setTab(t); setError(''); setSuccess('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true); setError(''); setSuccess('')
    try {
      if (tab === 'login') {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
        if (err) throw err
        router.push('/dashboard')
      } else {
        const { error: err } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } },
        })
        if (err) throw err
        setSuccess('Account created! Check your email to confirm, then sign in.')
        setTab('login')
        setForm(f => ({ ...f, password: '' }))
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{
      background: 'var(--bg)', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px var(--px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(230,57,70,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', letterSpacing: '6px', background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '24px' }}>
            LEVELS
          </div>
          <h1 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(32px, 6vw, 48px)',
            letterSpacing: '3px', lineHeight: 1.1, marginBottom: '8px',
          }}>
            {tab === 'login' ? 'Welcome Back' : 'Join the Movement'}
          </h1>
          <p style={{ color: 'var(--text-3)', fontSize: '14px', lineHeight: 1.6 }}>
            {tab === 'login'
              ? 'Sign in to track your levels and manage events'
              : 'Create your free athlete account — it takes 30 seconds'}
          </p>
        </div>

        {/* Tab toggle */}
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.04)',
          borderRadius: '12px', padding: '4px', marginBottom: '28px',
        }}>
          {(['login', 'signup'] as const).map(t => (
            <button key={t} onClick={() => switchTab(t)} style={{
              flex: 1, padding: '10px', borderRadius: '9px', border: 'none', cursor: 'pointer',
              background: tab === t ? 'var(--card)' : 'transparent',
              color: tab === t ? 'var(--text)' : 'var(--text-3)',
              fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
              boxShadow: tab === t ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
            }}>
              {t === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="card" style={{ padding: '36px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {tab === 'signup' && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  placeholder="Alex Smith"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>
            )}

            <div>
              <label style={labelStyle}>Email Address *</label>
              <input
                required type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Password *</label>
              <input
                required type="password"
                placeholder={tab === 'signup' ? 'Minimum 8 characters' : '••••••••'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            {error && (
              <p style={{ color: 'var(--red)', fontSize: '13px', lineHeight: 1.5, padding: '10px 14px', background: 'rgba(230,57,70,0.08)', borderRadius: '8px', border: '1px solid rgba(230,57,70,0.2)' }}>
                {error}
              </p>
            )}
            {success && (
              <p style={{ color: 'var(--teal)', fontSize: '13px', lineHeight: 1.5, padding: '10px 14px', background: 'rgba(46,196,182,0.08)', borderRadius: '8px', border: '1px solid rgba(46,196,182,0.2)' }}>
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ justifyContent: 'center', marginTop: '4px', opacity: submitting ? 0.7 : 1 }}
            >
              {submitting
                ? (tab === 'login' ? 'Signing in...' : 'Creating account...')
                : (tab === 'login' ? 'Sign In →' : 'Create Account →')
              }
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-3)' }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => switchTab(tab === 'login' ? 'signup' : 'login')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--red)', fontSize: '13px', fontWeight: 600,
            fontFamily: 'var(--font-outfit)',
          }}>
            {tab === 'login' ? 'Sign up free' : 'Log in'}
          </button>
        </p>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', lineHeight: 1.7 }}>
          BY SIGNING UP YOU AGREE TO OUR TERMS OF SERVICE.<br />NO SPAM. ATHLETE DATA STAYS PRIVATE.
        </p>
      </div>
    </div>
  )
}
