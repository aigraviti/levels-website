'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/events', label: 'Events' },
  { href: '/merch', label: 'Merch' },
  { href: '/format', label: 'The Format' },
  { href: '/register', label: 'Register' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 var(--px)', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(8,8,12,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(37,37,48,0.8)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-bebas, Bebas Neue)',
            fontSize: '28px',
            letterSpacing: '6px',
            background: 'var(--gradient-hero)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>LEVELS</span>
        </Link>

        {/* Desktop links */}
        <ul style={{
          gap: '32px', listStyle: 'none', alignItems: 'center',
        }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{
                color: pathname === l.href ? 'var(--text)' : 'var(--text-2)',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? 'var(--text)' : 'var(--text-2)')}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/events" className="btn-primary" style={{ padding: '10px 24px', fontSize: '11px' }}>
              Find Your Level →
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text)' }}
          aria-label="Menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: menuOpen ? 'var(--red)' : 'var(--text)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text)', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: menuOpen ? 'var(--red)' : 'var(--text)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 99,
          background: 'rgba(8,8,12,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '24px 40px 32px',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              color: pathname === l.href ? 'var(--text)' : 'var(--text-2)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '14px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/events" className="btn-primary" style={{ marginTop: '20px', justifyContent: 'center' }}>
            Find Your Level →
          </Link>
        </div>
      )}
    </>
  )
}
