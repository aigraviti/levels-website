'use client'
import { useState, useEffect, useRef } from 'react'
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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { count } = useCart()
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false) }, [pathname])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) fetchPhoto(data.user.id)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchPhoto(session.user.id)
      else setPhotoUrl(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchPhoto(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('profile_photo_url')
      .eq('id', userId)
      .single()
    if (data?.profile_photo_url) setPhotoUrl(data.profile_photo_url)
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    setDropdownOpen(false)
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
            <li ref={dropdownRef} style={{ position: 'relative' }}>
              {/* Avatar button */}
              <button
                onClick={() => setDropdownOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '2px',
                }}
                aria-label="Account menu"
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                  background: photoUrl ? 'transparent' : 'var(--gradient-hero)',
                  border: `2px solid ${dropdownOpen ? 'var(--red)' : 'transparent'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', transition: 'border-color 0.2s',
                  fontSize: '12px', fontWeight: 700, color: 'white',
                }}>
                  {photoUrl
                    ? <img src={photoUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : initials
                  }
                </div>
                <span style={{
                  fontSize: '10px', color: 'var(--text-3)',
                  transition: 'transform 0.2s',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                  display: 'inline-block',
                }}>▾</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                  background: 'rgba(14,14,20,0.98)', backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border)', borderRadius: '12px',
                  padding: '8px', minWidth: '180px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  zIndex: 200,
                }}>
                  {/* User info */}
                  <div style={{ padding: '8px 12px 12px', borderBottom: '1px solid var(--border)', marginBottom: '4px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
                      {user.user_metadata?.full_name ?? 'Athlete'}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.email}
                    </p>
                  </div>
                  {[
                    { href: '/dashboard', label: 'Dashboard' },
                    { href: '/dashboard/settings', label: 'Settings' },
                  ].map(item => (
                    <Link key={item.href} href={item.href} style={{
                      display: 'block', padding: '9px 12px', borderRadius: '7px',
                      textDecoration: 'none', color: 'var(--text-2)',
                      fontSize: '13px', fontWeight: 500, transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)' }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', marginTop: '4px', paddingTop: '4px' }}>
                    <button onClick={handleSignOut} style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '9px 12px', borderRadius: '7px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--red)', fontSize: '13px', fontWeight: 500,
                      fontFamily: 'var(--font-outfit)', transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(230,57,70,0.08)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
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
              <Link href="/dashboard/settings" style={{
                color: 'var(--text-2)', textDecoration: 'none',
                fontSize: '13px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                padding: '14px 0', borderBottom: '1px solid var(--border)',
              }}>Settings</Link>
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
