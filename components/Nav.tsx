'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/cart-context'
import CartDrawer from '@/components/CartDrawer'
import type { User } from '@supabase/supabase-js'

const links = [
  { href: '/events', label: 'Events' },
  { href: '/merch', label: 'Merch' },
  { href: '/format', label: 'The Format' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { count } = useCart()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?'

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
        <ul style={{ gap: '32px', listStyle: 'none', alignItems: 'center' }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{
                color: pathname === l.href ? 'var(--text)' : 'var(--text-2)',
                textDecoration: 'none',
                fontSize: '12px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? 'var(--text)' : 'var(--text-2)')}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Cart icon */}
          <li>
            <button onClick={() => setCartOpen(true)} style={{
              position: 'relative', background: 'none', border: 'none',
              cursor: 'pointer', color: 'var(--text-2)', fontSize: '18px',
              display: 'flex', alignItems: 'center', padding: '4px',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
              aria-label="Open cart"
            >
              🛍️
              {count > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'var(--red)', color: 'white',
                  fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-mono)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{count > 9 ? '9+' : count}</span>
              )}
            </button>
          </li>

          {/* Auth */}
          {user ? (
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link href="/dashboard" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                textDecoration: 'none', color: 'var(--text-2)',
                fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
              >
                <span style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'var(--gradient-hero)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0,
                }}>{initials}</span>
                Dashboard
              </Link>
              <button onClick={handleSignOut} style={{
                background: 'none', border: '1px solid var(--border)', cursor: 'pointer',
                color: 'var(--text-3)', fontSize: '11px', fontWeight: 600,
                letterSpacing: '1px', textTransform: 'uppercase',
                padding: '6px 12px', borderRadius: '6px', transition: 'all 0.2s',
                fontFamily: 'var(--font-mono)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link href="/login" style={{
                color: 'var(--text-2)', textDecoration: 'none',
                fontSize: '12px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
              >
                Login
              </Link>
              <Link href="/events" className="btn-primary" style={{ padding: '10px 24px', fontSize: '11px' }}>
                Earn Your Level →
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile right side: cart + hamburger */}
        <div className="flex md:hidden" style={{ alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setCartOpen(true)} style={{
            position: 'relative', background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--text-2)', fontSize: '18px',
            display: 'flex', alignItems: 'center', padding: '4px',
          }} aria-label="Open cart">
            🛍️
            {count > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: 'var(--red)', color: 'white',
                fontSize: '9px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{count > 9 ? '9+' : count}</span>
            )}
          </button>

          <button
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
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 99,
          background: 'rgba(8,8,12,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '24px var(--px) 32px',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              color: pathname === l.href ? 'var(--text)' : 'var(--text-2)',
              textDecoration: 'none',
              fontSize: '13px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '14px 0', borderBottom: '1px solid var(--border)',
            }}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" style={{
                color: 'var(--text-2)', textDecoration: 'none',
                fontSize: '13px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                padding: '14px 0', borderBottom: '1px solid var(--border)',
              }}>Dashboard</Link>
              <button onClick={handleSignOut} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--red)', fontSize: '13px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                padding: '14px 0', textAlign: 'left',
                fontFamily: 'var(--font-outfit)',
              }}>Sign Out</button>
            </>
          ) : (
            <Link href="/login" style={{
              color: 'var(--text-2)', textDecoration: 'none',
              fontSize: '13px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '14px 0', borderBottom: '1px solid var(--border)',
            }}>Login / Sign Up</Link>
          )}
          <Link href="/events" className="btn-primary" style={{ marginTop: '20px', justifyContent: 'center' }}>
            Earn Your Level →
          </Link>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
