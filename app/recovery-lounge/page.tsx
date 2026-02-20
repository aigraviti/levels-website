'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { RecoveryProduct } from '@/lib/types'
import { formatNZD } from '@/lib/types'
import Link from 'next/link'

const CAT_ICONS: Record<string, string> = {
  nutrition: '🥗', recovery: '💆', tech: '⌚', apparel: '👕', wellness: '🌿'
}

export default function RecoveryLoungePage() {
  const [unlocked, setUnlocked] = useState(false)
  const [products, setProducts] = useState<RecoveryProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [claimed, setClaimed] = useState<string[]>([])

  useEffect(() => {
    if (!unlocked) return
    setLoading(true)
    supabase.from('recovery_lounge_products').select('*').order('retail_value', { ascending: false })
      .then(({ data }) => { setProducts(data ?? []); setLoading(false) })
  }, [unlocked])

  if (!unlocked) {
    return (
      <div style={{
        background: '#050508',
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px var(--px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Purple glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(131,56,236,0.15) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ textAlign: 'center', maxWidth: '560px', position: 'relative', zIndex: 1 }}>
          {/* Crown */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '20px',
            background: 'rgba(131,56,236,0.15)', border: '1px solid rgba(131,56,236,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '40px', margin: '0 auto 28px',
            boxShadow: '0 0 48px rgba(131,56,236,0.2)',
          }}>👑</div>

          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '4px',
            textTransform: 'uppercase', color: '#8338EC', marginBottom: '16px',
          }}>Apex Athletes Only</div>

          <h1 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(44px, 7vw, 72px)',
            letterSpacing: '4px', lineHeight: 1, marginBottom: '20px', color: '#E8E8F0',
          }}>
            Athletes<br />Recovery Lounge
          </h1>

          <p style={{ color: '#9898A8', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
            This space is reserved for athletes who have completed <strong style={{ color: '#8338EC' }}>Level 5 — Apex</strong>.
          </p>
          <p style={{ color: '#606070', fontSize: '14px', lineHeight: 1.7, marginBottom: '48px' }}>
            Inside you&apos;ll find complimentary premium products from our sponsor partners, exclusive gear, and recovery tools curated for the elite few who have reached the summit.
          </p>

          {/* Teaser grid (blurred) */}
          <div style={{ position: 'relative', marginBottom: '40px' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px',
              filter: 'blur(8px)', opacity: 0.4, pointerEvents: 'none',
              userSelect: 'none',
            }}>
              {['🥗', '💆', '⌚', '👕', '🌿', '💊'].map((icon, i) => (
                <div key={i} style={{
                  background: '#16161F', border: '1px solid #252530',
                  borderRadius: '12px', padding: '24px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
                  <div style={{ height: '12px', background: '#252530', borderRadius: '4px', marginBottom: '6px' }} />
                  <div style={{ height: '8px', background: '#1A1A22', borderRadius: '4px', width: '70%', margin: '0 auto' }} />
                </div>
              ))}
            </div>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(to bottom, transparent, rgba(5,5,8,0.7))',
            }}>
              <div style={{
                padding: '10px 20px', background: 'rgba(131,56,236,0.15)',
                border: '1px solid rgba(131,56,236,0.4)', borderRadius: '8px',
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px',
                textTransform: 'uppercase', color: '#8338EC',
              }}>🔒 8 Premium Products Inside</div>
            </div>
          </div>

          {/* Unlock button */}
          <button onClick={() => setUnlocked(true)} style={{
            width: '100%', padding: '16px 32px',
            background: 'linear-gradient(135deg, #8338EC 0%, #A855F7 100%)',
            border: 'none', borderRadius: '12px',
            fontFamily: 'var(--font-outfit)', fontSize: '14px', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'white', cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 8px 32px rgba(131,56,236,0.3)',
            marginBottom: '16px',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(131,56,236,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(131,56,236,0.3)' }}
          >
            👑 Enter as Apex Athlete (Demo)
          </button>
          <p style={{ fontSize: '11px', color: '#606070', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
            In production, access is granted only to verified Level 5 completers
          </p>
        </div>
      </div>
    )
  }

  // ── UNLOCKED STATE ──
  return (
    <div style={{ background: '#050508', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Lounge header */}
      <div style={{
        padding: '80px var(--px) 60px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center top, rgba(131,56,236,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '100px', border: '1px solid rgba(131,56,236,0.5)', background: 'rgba(131,56,236,0.1)', marginBottom: '24px' }}>
            <span className="animate-blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8338EC', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8338EC' }}>Apex Access Granted</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 7vw, 80px)',
            letterSpacing: '4px', lineHeight: 1, marginBottom: '16px', color: '#E8E8F0',
          }}>
            Athletes<br />
            <span style={{ background: 'linear-gradient(135deg, #8338EC, #A855F7, #FFB703)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Recovery Lounge
            </span>
          </h1>
          <p style={{ color: '#9898A8', fontSize: '17px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Premium complimentary products from our sponsor partners. Curated exclusively for Level 5 — Apex athletes.
          </p>
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--px) 100px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#606070' }}>Loading your recovery package...</div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {products.map(p => {
            const isClaimed = claimed.includes(p.id)
            return (
              <div key={p.id} style={{
                background: '#111118',
                border: `1px solid ${isClaimed ? 'rgba(131,56,236,0.5)' : '#252530'}`,
                borderRadius: '18px', overflow: 'hidden',
                transition: 'all 0.3s', position: 'relative',
              }}
                onMouseEnter={e => { if (!isClaimed) e.currentTarget.style.borderColor = 'rgba(255,183,3,0.3)' }}
                onMouseLeave={e => { if (!isClaimed) e.currentTarget.style.borderColor = '#252530' }}
              >
                {/* Gold accent top */}
                <div style={{ height: '2px', background: isClaimed ? 'linear-gradient(90deg, #8338EC, #A855F7)' : 'linear-gradient(90deg, #FFB703, #FB8500)' }} />

                {/* Product visual */}
                <div style={{
                  height: '160px', padding: '32px',
                  background: `linear-gradient(135deg, #16161F 0%, rgba(131,56,236,0.08) 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
                }}>
                  <span style={{ fontSize: '52px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
                    {CAT_ICONS[p.category] ?? '🎁'}
                  </span>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px',
                      textTransform: 'uppercase', color: '#FFB703', marginBottom: '6px',
                    }}>Complimentary</div>
                    <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', letterSpacing: '2px', color: '#E8E8F0', lineHeight: 1 }}>
                      {formatNZD(p.retail_value)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#606070', marginTop: '2px' }}>retail value</div>
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '5px', fontSize: '10px',
                      fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase',
                      background: 'rgba(255,183,3,0.1)', border: '1px solid rgba(255,183,3,0.25)', color: '#FFB703',
                    }}>{p.sponsor_brand}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: '5px', fontSize: '10px',
                      fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase',
                      background: 'rgba(255,255,255,0.04)', color: '#606070',
                    }}>{p.category}</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px', color: '#E8E8F0' }}>{p.name}</h3>

                  {p.tagline && (
                    <p style={{
                      fontSize: '13px', fontStyle: 'italic', color: '#FFB703',
                      marginBottom: '10px', lineHeight: 1.5,
                    }}>&ldquo;{p.tagline}&rdquo;</p>
                  )}

                  <p style={{ fontSize: '13px', color: '#9898A8', lineHeight: 1.65, marginBottom: '20px' }}>
                    {(p.description ?? '').slice(0, 110)}{(p.description ?? '').length > 110 ? '...' : ''}
                  </p>

                  <button
                    onClick={() => setClaimed(c => [...c, p.id])}
                    disabled={isClaimed}
                    style={{
                      width: '100%', padding: '13px',
                      background: isClaimed
                        ? 'rgba(131,56,236,0.15)'
                        : 'linear-gradient(135deg, #FFB703, #FB8500)',
                      border: isClaimed ? '1px solid rgba(131,56,236,0.4)' : 'none',
                      borderRadius: '10px',
                      fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: isClaimed ? '#8338EC' : '#0A0A0A',
                      cursor: isClaimed ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {isClaimed ? '✓ Claimed' : 'Claim Your Product →'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <div style={{
          marginTop: '64px', padding: '32px var(--px)',
          background: 'rgba(131,56,236,0.06)', border: '1px solid rgba(131,56,236,0.2)',
          borderRadius: '16px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>👑</div>
          <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '3px', color: '#8338EC', marginBottom: '8px' }}>You Reached The Summit</h3>
          <p style={{ color: '#9898A8', fontSize: '14px', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 24px' }}>
            Your name is now in the LEVELS Apex Registry — a permanent global honour roll of athletes who have completed all five levels.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-ghost" style={{ borderColor: 'rgba(131,56,236,0.4)', color: '#9898A8' }}>Find Next Event</Link>
            <Link href="/merch" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '13px 28px', borderRadius: '100px',
              background: 'linear-gradient(135deg, #8338EC, #A855F7)',
              fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px',
              textTransform: 'uppercase', color: 'white', textDecoration: 'none',
              transition: 'transform 0.2s',
            }}>Shop Apex Collection →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
