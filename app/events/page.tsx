import { supabase } from '@/lib/supabase'
import type { Event } from '@/lib/types'
import EventsClient from '@/components/events/EventsClient'

export const revalidate = 60

export default async function EventsPage() {
  let events: Event[] = []
  try {
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true })
    events = data ?? []
  } catch {
    events = []
  }

  return (
    <div style={{ background: 'var(--bg)', paddingTop: '68px' }}>
      {/* Page hero */}
      <div style={{
        padding: '80px var(--px) 60px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center top, rgba(230,57,70,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>2026 Season</div>
          <h1 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 7vw, 80px)',
            letterSpacing: '4px', lineHeight: 1, marginBottom: '16px',
          }}>Upcoming Events<br /><span className="text-gradient">New Zealand</span></h1>
          <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Auckland · Wellington · Christchurch. Find your city, find your level.
          </p>
        </div>
      </div>
      <EventsClient events={events} />
    </div>
  )
}
