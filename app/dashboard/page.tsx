'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LEVEL_DATA, formatNZD, formatDate } from '@/lib/types'
import { profileCompletion, isProfileReadyForEvent } from '@/lib/profile'
import type { Profile } from '@/lib/profile'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

// ── Mock data (replace with Supabase queries when tables are ready) ──

const MOCK_EVENTS = [
  { id: '1', title: 'LEVELS Auckland — Round 3', date: '2026-03-15', venue: 'Shed 10, Waterfront', city: 'Auckland', status: 'Confirmed', ticket_type: 'Standard', price: 89 },
  { id: '2', title: 'LEVELS Wellington — Autumn', date: '2026-04-12', venue: 'TSB Arena', city: 'Wellington', status: 'Confirmed', ticket_type: 'VIP', price: 149 },
]

const MOCK_PURCHASES = [
  { id: 'p1', date: '2026-02-10', item: 'LEVELS Auckland — Round 3', type: 'Event Entry', amount: 89, status: 'Confirmed' },
  { id: 'p2', date: '2026-02-10', item: 'LEVELS Wellington — Autumn (VIP)', type: 'Event Entry', amount: 149, status: 'Confirmed' },
  { id: 'p3', date: '2026-01-28', item: 'LVL 3 Training Kit — Competitor', type: 'Merch', amount: 129, status: 'Shipped' },
  { id: 'p4', date: '2026-01-15', item: 'Foundation Patch — Level 01', type: 'Merch', amount: 24, status: 'Delivered' },
]

const MOCK_PERFORMANCES = [
  {
    id: 'perf1',
    event: 'LEVELS Auckland — Round 1',
    date: '2025-11-08',
    level_earned: 3,
    stations: [
      { name: 'Row 500m', time: '1:42' },
      { name: 'Sled Push 20m', time: '0:38' },
      { name: 'KB Swings ×20', time: '0:52' },
      { name: 'Assault Bike 15 cal', time: '1:05' },
      { name: 'Wall Balls ×15', time: '0:44' },
    ],
    rankings: { overall: { rank: 47, total: 203, percentile: 77 }, age_group: { rank: 12, total: 58, label: '25–34 M', percentile: 79 }, gender: { rank: 38, total: 147, label: 'Male', percentile: 74 } },
  },
  {
    id: 'perf2',
    event: 'LEVELS Wellington — Winter',
    date: '2025-08-23',
    level_earned: 2,
    stations: [
      { name: 'Row 500m', time: '1:51' },
      { name: 'Sled Push 20m', time: '0:44' },
      { name: 'KB Swings ×20', time: '0:58' },
      { name: 'Assault Bike 15 cal', time: '1:14' },
      { name: 'Wall Balls ×15', time: '0:50' },
    ],
    rankings: { overall: { rank: 89, total: 176, percentile: 49 }, age_group: { rank: 24, total: 51, label: '25–34 M', percentile: 53 }, gender: { rank: 71, total: 128, label: 'Male', percentile: 44 } },
  },
]

const CITY_COLORS: Record<string, string> = {
  Auckland: '#E63946', Wellington: '#457B9D', Christchurch: '#2EC4B6',
}

type Tab = 'overview' | 'events' | 'purchases' | 'performances'

function PercentileBadge({ percentile }: { percentile: number }) {
  const color = percentile >= 75 ? 'var(--teal)' : percentile >= 50 ? 'var(--gold)' : 'var(--text-3)'
  const label = percentile >= 90 ? 'Top 10%' : percentile >= 75 ? 'Top 25%' : percentile >= 50 ? 'Top 50%' : 'Bottom 50%'
  return (
    <span style={{
      padding: '3px 8px', borderRadius: '5px', fontSize: '10px',
      fontFamily: 'var(--font-mono)', letterSpacing: '1px', fontWeight: 700,
      background: color + '18', border: `1px solid ${color}40`, color,
    }}>{label}</span>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('overview')
  const [perfRankView, setPerfRankView] = useState<Record<string, 'overall' | 'age_group' | 'gender'>>({})
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
      if (prof) setProfile(prof as Profile)
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '4px', color: 'var(--text-3)', marginBottom: '8px' }}>LEVELS</div>
          <div style={{ fontSize: '13px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px' }}>LOADING YOUR DASHBOARD...</div>
        </div>
      </div>
    )
  }

  const firstName = profile?.full_name?.split(' ')[0] ?? user?.user_metadata?.full_name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'Athlete'
  const completion = profileCompletion(profile)
  const readyForEvent = isProfileReadyForEvent(profile)
  const currentLevel = MOCK_PERFORMANCES.length > 0 ? MOCK_PERFORMANCES[0].level_earned : 0
  const levelInfo = LEVEL_DATA.find(l => l.numInt === currentLevel)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'events', label: 'My Events' },
    { key: 'purchases', label: 'Purchases' },
    { key: 'performances', label: 'Performances' },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Dashboard header */}
      <div style={{
        padding: '48px var(--px) 0',
        maxWidth: '1200px', margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '8px' }}>Athlete Dashboard</div>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '3px', lineHeight: 1.1 }}>
              Welcome back,<br />
              <span className="text-gradient">{firstName}</span>
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/dashboard/settings" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 16px', borderRadius: '8px',
              border: '1px solid var(--border)', textDecoration: 'none',
              color: 'var(--text-3)', fontSize: '12px', fontWeight: 600,
              letterSpacing: '1px', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
            >
              ⚙ Settings
            </Link>
            {levelInfo && (
              <div style={{
                padding: '16px 24px', borderRadius: '14px',
                background: levelInfo.color + '12', border: `1px solid ${levelInfo.color}40`,
                textAlign: 'center', minWidth: '120px',
              }}>
                <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Current Level</div>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', color: levelInfo.color, lineHeight: 1 }}>{levelInfo.num}</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: levelInfo.color, marginTop: '4px', textTransform: 'uppercase' }}>{levelInfo.name}</div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap',
              color: tab === t.key ? 'var(--text)' : 'var(--text-3)',
              borderBottom: `2px solid ${tab === t.key ? 'var(--red)' : 'transparent'}`,
              transition: 'color 0.2s',
              marginBottom: '-1px',
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px var(--px) 100px' }}>

        {/* Profile completion banner */}
        {completion < 80 && (
          <div style={{
            marginBottom: '32px', padding: '16px 24px',
            borderRadius: '12px', display: 'flex',
            alignItems: 'center', gap: '16px', flexWrap: 'wrap',
            background: !readyForEvent ? 'rgba(230,57,70,0.06)' : 'rgba(255,183,3,0.06)',
            border: `1px solid ${!readyForEvent ? 'rgba(230,57,70,0.2)' : 'rgba(255,183,3,0.2)'}`,
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                {!readyForEvent ? 'Complete your profile to register for events' : 'Your profile is almost complete'}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.5 }}>
                {!readyForEvent
                  ? 'Add your emergency contact, date of birth, and gender — required for event entry.'
                  : `${completion}% complete — add a photo and a few more details.`}
              </p>
            </div>
            <Link href="/dashboard/settings" className="btn-primary" style={{ fontSize: '12px', padding: '10px 20px', whiteSpace: 'nowrap' }}>
              Complete Profile →
            </Link>
          </div>
        )}

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div>
            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Current Level', value: levelInfo?.num ?? '—', sub: levelInfo?.name ?? 'Not yet competed', color: levelInfo?.color ?? 'var(--text-3)' },
                { label: 'Events Attended', value: String(MOCK_PERFORMANCES.length), sub: 'Career total', color: 'var(--teal)' },
                { label: 'Upcoming Events', value: String(MOCK_EVENTS.length), sub: 'Registered', color: 'var(--gold)' },
                { label: 'Profile Complete', value: `${completion}%`, sub: completion >= 80 ? 'Looking good!' : 'Tap to finish', color: completion >= 80 ? 'var(--teal)' : completion >= 50 ? 'var(--gold)' : 'var(--red)' },
              ].map((s, i) => (
                i === 3 ? (
                  <Link key={s.label} href="/dashboard/settings" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '24px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>{s.label}</div>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '2px', color: s.color, lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>{s.sub}</div>
                    </div>
                  </Link>
                ) : (
                  <div key={s.label} className="card" style={{ padding: '24px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '2px', color: s.color, lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>{s.sub}</div>
                  </div>
                )
              ))}
            </div>

            {/* Next event */}
            {MOCK_EVENTS.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', letterSpacing: '2px', marginBottom: '16px' }}>Next Event</h2>
                <div className="card" style={{ padding: '28px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '6px', borderRadius: '3px', alignSelf: 'stretch', minHeight: '60px', flexShrink: 0,
                    background: CITY_COLORS[MOCK_EVENTS[0].city] ?? 'var(--red)',
                  }} />
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '2px', marginBottom: '6px' }}>{MOCK_EVENTS[0].title}</div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-2)', flexWrap: 'wrap' }}>
                      <span>📅 {formatDate(MOCK_EVENTS[0].date)}</span>
                      <span>📍 {MOCK_EVENTS[0].venue}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', marginBottom: '4px', textTransform: 'uppercase' }}>{MOCK_EVENTS[0].ticket_type}</div>
                    <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px' }}>{formatNZD(MOCK_EVENTS[0].price)}</div>
                    <div style={{ fontSize: '11px', color: 'var(--teal)', marginTop: '4px', fontWeight: 600 }}>✓ {MOCK_EVENTS[0].status}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Level progression */}
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', letterSpacing: '2px', marginBottom: '16px' }}>Level Progression</h2>
            <div style={{ overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: '8px', minWidth: '500px' }}>
                {LEVEL_DATA.map(lvl => {
                  const earned = MOCK_PERFORMANCES.some(p => p.level_earned >= lvl.numInt)
                  return (
                    <div key={lvl.num} style={{
                      flex: 1, padding: '16px 12px', borderRadius: '12px', textAlign: 'center',
                      background: earned ? lvl.color + '18' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${earned ? lvl.color + '60' : 'var(--border)'}`,
                      transition: 'all 0.3s',
                    }}>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', color: earned ? lvl.color : 'var(--text-3)', lineHeight: 1 }}>{lvl.num}</div>
                      <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '1px', color: earned ? lvl.color : 'var(--text-3)', marginTop: '6px', textTransform: 'uppercase' }}>{lvl.name}</div>
                      <div style={{ fontSize: '16px', marginTop: '8px' }}>{earned ? '✓' : '○'}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/events" className="btn-primary">Find Your Next Event →</Link>
              <button onClick={() => setTab('performances')} className="btn-ghost" style={{ border: '1px solid var(--border)', background: 'none', cursor: 'pointer', color: 'var(--text-2)', fontSize: '13px', fontWeight: 600, padding: '12px 24px', borderRadius: '100px', transition: 'all 0.2s', fontFamily: 'var(--font-outfit)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
              >
                View Performances
              </button>
            </div>
          </div>
        )}

        {/* ── MY EVENTS ── */}
        {tab === 'events' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '2px' }}>Upcoming Events</h2>
              <Link href="/events" className="btn-primary" style={{ fontSize: '12px', padding: '10px 20px' }}>Find More Events →</Link>
            </div>

            {MOCK_EVENTS.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>📅</div>
                <p style={{ color: 'var(--text-2)', fontSize: '16px', marginBottom: '24px' }}>You haven&apos;t registered for any upcoming events yet.</p>
                <Link href="/events" className="btn-primary">Browse Events →</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {MOCK_EVENTS.map(ev => {
                  const color = CITY_COLORS[ev.city] ?? 'var(--red)'
                  return (
                    <div key={ev.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                      <div style={{ height: '4px', background: `linear-gradient(90deg, ${color}, ${color}66)` }} />
                      <div style={{ padding: '24px 28px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <span style={{ padding: '3px 10px', borderRadius: '100px', background: color + '18', border: `1px solid ${color}40`, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color }}>{ev.city}</span>
                            <span style={{ padding: '3px 10px', borderRadius: '100px', background: 'rgba(46,196,182,0.1)', border: '1px solid rgba(46,196,182,0.3)', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: 'var(--teal)' }}>✓ {ev.status}</span>
                          </div>
                          <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '2px', marginBottom: '8px' }}>{ev.title}</h3>
                          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-2)', flexWrap: 'wrap' }}>
                            <span>📅 {formatDate(ev.date)}</span>
                            <span>📍 {ev.venue}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{ev.ticket_type} Ticket</div>
                          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '26px', letterSpacing: '1px' }}>{formatNZD(ev.price)}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── PURCHASES ── */}
        {tab === 'purchases' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '2px', marginBottom: '28px' }}>Purchase History</h2>

            {MOCK_PURCHASES.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🧾</div>
                <p style={{ color: 'var(--text-2)', fontSize: '16px' }}>No purchases yet. Get started below.</p>
              </div>
            ) : (
              <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                {/* Table header */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px', gap: '0', padding: '14px 24px', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                  {['Item', 'Date', 'Amount', 'Status'].map(h => (
                    <div key={h} style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 700 }}>{h}</div>
                  ))}
                </div>
                {MOCK_PURCHASES.map((p, i) => {
                  const statusColor = p.status === 'Confirmed' ? 'var(--teal)' : p.status === 'Shipped' ? 'var(--gold)' : p.status === 'Delivered' ? 'var(--blue)' : 'var(--text-3)'
                  return (
                    <div key={p.id} style={{
                      display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px',
                      gap: '0', padding: '16px 24px',
                      borderBottom: i < MOCK_PURCHASES.length - 1 ? '1px solid var(--border)' : 'none',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '3px' }}>{p.item}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase' }}>{p.type}</div>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-2)', display: 'flex', alignItems: 'center' }}>{formatDate(p.date)}</div>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '1px', display: 'flex', alignItems: 'center' }}>{formatNZD(p.amount)}</div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '1px', fontWeight: 700, background: statusColor + '18', border: `1px solid ${statusColor}40`, color: statusColor }}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div style={{ marginTop: '32px', textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '16px 24px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>Total spent</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '2px' }}>
                  {formatNZD(MOCK_PURCHASES.reduce((s, p) => s + p.amount, 0))}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── PERFORMANCES ── */}
        {tab === 'performances' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '2px', marginBottom: '28px' }}>Past Performances</h2>

            {MOCK_PERFORMANCES.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏋️</div>
                <p style={{ color: 'var(--text-2)', fontSize: '16px', marginBottom: '24px' }}>No completed events yet. Go earn your first level.</p>
                <Link href="/events" className="btn-primary">Find an Event →</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {MOCK_PERFORMANCES.map(perf => {
                  const lvlInfo = LEVEL_DATA.find(l => l.numInt === perf.level_earned)
                  const rankView = perfRankView[perf.id] ?? 'overall'
                  const ranking = perf.rankings[rankView]

                  return (
                    <div key={perf.id} className="card" style={{ padding: '28px', overflow: 'hidden', position: 'relative' }}>
                      {lvlInfo && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: lvlInfo.color }} />
                      )}

                      {/* Performance header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '2px', marginBottom: '4px' }}>{perf.event}</h3>
                          <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>📅 {formatDate(perf.date)}</p>
                        </div>
                        {lvlInfo && (
                          <div style={{ padding: '12px 20px', borderRadius: '10px', background: lvlInfo.color + '15', border: `1px solid ${lvlInfo.color}50`, textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Level Earned</div>
                            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', color: lvlInfo.color, lineHeight: 1 }}>{lvlInfo.num}</div>
                            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: lvlInfo.color, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>{lvlInfo.name}</div>
                          </div>
                        )}
                      </div>

                      {/* Station times */}
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Station Times</div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {perf.stations.map(s => (
                            <div key={s.name} style={{
                              padding: '10px 14px', borderRadius: '8px',
                              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                              minWidth: '100px',
                            }}>
                              <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', marginBottom: '6px', textTransform: 'uppercase' }}>{s.name}</div>
                              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '1px', color: 'var(--text)' }}>{s.time}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rankings */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase' }}>Rankings:</span>
                          {(['overall', 'age_group', 'gender'] as const).map(view => (
                            <button key={view} onClick={() => setPerfRankView(r => ({ ...r, [perf.id]: view }))} style={{
                              padding: '5px 12px', borderRadius: '6px', border: `1px solid ${rankView === view ? 'var(--border-hover)' : 'var(--border)'}`,
                              background: rankView === view ? 'rgba(255,255,255,0.06)' : 'transparent',
                              color: rankView === view ? 'var(--text)' : 'var(--text-3)',
                              fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                              fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase',
                            }}>
                              {view === 'overall' ? 'Overall' : view === 'age_group' ? 'Age Group' : 'Gender'}
                            </button>
                          ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', flexWrap: 'wrap' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '2px', lineHeight: 1 }}>
                              #{ranking.rank}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>of {ranking.total} athletes{rankView !== 'overall' && ` · ${(ranking as { rank: number; total: number; label: string; percentile: number }).label}`}</div>
                          </div>
                          <div style={{ flex: 1, minWidth: '140px' }}>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                              <div style={{ height: '100%', width: `${ranking.percentile}%`, background: 'var(--gradient-hero)', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '12px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>Top {100 - ranking.percentile + 1}%</span>
                              <PercentileBadge percentile={ranking.percentile} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
