'use client'
import Link from 'next/link'

const cols = [
  {
    heading: 'Events',
    links: [
      { label: 'Auckland', href: '/events?city=Auckland' },
      { label: 'Wellington', href: '/events?city=Wellington' },
      { label: 'Christchurch', href: '/events?city=Christchurch' },
      { label: 'All Events', href: '/events' },
    ],
  },
  {
    heading: 'Shop',
    links: [
      { label: 'Clothing', href: '/merch?cat=clothing' },
      { label: 'Backpacks', href: '/merch?cat=backpack' },
      { label: 'Footwear', href: '/merch?cat=footwear' },
      { label: 'Patches', href: '/merch?cat=patch' },
    ],
  },
  {
    heading: 'LEVELS',
    links: [
      { label: 'The Format', href: '/format' },
      { label: 'Login / Sign Up', href: '/login' },
      { label: 'Recovery Lounge', href: '/recovery-lounge' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px var(--px) 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-footer)', gap: 'var(--gap-footer)', marginBottom: '64px' }}>
          {/* Brand col */}
          <div>
            <div style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '32px',
              letterSpacing: '6px',
              background: 'var(--gradient-hero)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
            }}>LEVELS</div>
            <p style={{ color: 'var(--text-2)', fontSize: '14px', lineHeight: 1.8, maxWidth: '260px' }}>
              The world's first achievement-based fitness sport. Not a race. A progression system.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {['01', '02', '03', '04', '05'].map((n, i) => {
                const colors = ['#2EC4B6', '#457B9D', '#FFB703', '#E63946', '#8338EC']
                return (
                  <div key={n} style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    background: colors[i] + '22', border: `1px solid ${colors[i]}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-bebas)', fontSize: '13px', color: colors[i],
                    letterSpacing: '1px',
                  }}>{n}</div>
                )
              })}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.heading}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--text-3)', marginBottom: '20px',
              }}>{col.heading}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} style={{
                      color: 'var(--text-2)', textDecoration: 'none',
                      fontSize: '13px', transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
                    >{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: 'var(--text-3)', fontSize: '12px' }}>
            © 2026 LEVELS. All rights reserved. New Zealand.
          </p>
          <p style={{ color: 'var(--text-3)', fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
            DESIGNED FOR ATHLETES · OPTIMISED FOR CONTENT · ENGINEERED FOR GROWTH
          </p>
        </div>
      </div>
    </footer>
  )
}
