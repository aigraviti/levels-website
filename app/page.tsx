'use client'
import Link from 'next/link'
import Image from 'next/image'
import { LEVEL_DATA } from '@/lib/types'

const features = [
  { icon: '🎯', title: 'Defined Benchmarks', desc: 'Every level has published standards. You know exactly what you need to hit before you arrive — train for it, show up, earn it.' },
  { icon: '🏋️', title: 'Movements You Already Train', desc: 'Rowers, sleds, kettlebells, assault bikes, wall balls. Standard gym equipment. If you train, you\'re already preparing for this.' },
  { icon: '⚡', title: 'The Level-Up Moment', desc: 'Complete a level and the room knows it. Lights shift, music drops, your name goes up on screen. You earned that moment.' },
  { icon: '🤝', title: 'Solo, Pairs, or Teams', desc: 'Take on the levels alone, with a training partner, or as a crew of four. Every format demands you earn your result individually.' },
]

const eventDay = [
  { icon: '🚪', title: 'Arrive & Lock In', desc: 'Pick up your wristband, walk the course, size up the competition. The atmosphere hits you from the moment you step through the door.' },
  { icon: '🔥', title: 'Warm-Up & Briefing', desc: 'Your coach walks you through every station. You know the standards. You know what\'s required. Now go prove you can hit them.' },
  { icon: '🎯', title: 'Attack Your Level', desc: 'Work through each station. Every rep, every second counts. The level doesn\'t care how you feel — it only cares what you deliver.' },
  { icon: '🎉', title: 'Earn the Level-Up', desc: 'You hit the standard. Lights shift. Your name goes on screen. The whole room erupts. You didn\'t just finish — you earned the next level.' },
  { icon: '🏅', title: 'Claim Your Medal', desc: 'Walk away with your level result and a physical medal. Not a participation ribbon — proof of what you actually earned on the day.' },
  { icon: '📲', title: 'Show What You Earned', desc: 'Your personalised result card is ready the moment you finish. Designed to share. Level 3 athlete. You proved it — now own it.' },
]

const journey = [
  { label: 'Before You Arrive', title: 'Know What You\'re Chasing', desc: 'Every benchmark is published. Study the standards, train specifically for your target level, and arrive knowing you\'ve done the work to earn it.' },
  { label: 'On the Floor', title: 'Earn Every Rep', desc: 'Each level transition is a designed moment — music shift, LED colour change, your name on screen. You don\'t get celebrated for showing up. You get celebrated for hitting the standard.' },
  { label: 'Your Result', title: 'Proof You Earned It', desc: 'Your instant digital results card is built to share — your level, station times, your ranking. Plus a level-specific medal that means something because you worked for it.' },
  { label: 'What\'s Next', title: 'Come Back and Earn the Next One', desc: 'Within 24 hours, a personalised training plan drops for your next level. The next event is on the calendar. You know exactly what you need to do. Get back to work.' },
]

const testimonials = [
  { name: 'James K.', level: 'Level 3 — Competitor', location: 'Auckland', quote: 'I\'ve run marathons and done CrossFit comps. Nothing has given me a result that felt truly earned until LEVELS. Level 3 first event — I\'m already training for 4.' },
  { name: 'Mia T.', level: 'Level 4 — Elite', location: 'Wellington', quote: 'When I hit Level 4 and my name came up on the board, my whole gym erupted. You don\'t get that at a regular race. You earn that moment — it\'s the difference.' },
  { name: 'Tom R.', level: 'Level 2 — Foundation', location: 'Christchurch', quote: 'I was terrified I\'d embarrass myself. But Level 2 isn\'t "finishing last" — it\'s a standard you hit or you don\'t. I hit it. That meant everything. Already signed up again.' },
]

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── TEST DISCLAIMER BANNER ── */}
      <div style={{
        background: 'rgba(255,183,3,0.1)',
        borderBottom: '1px solid rgba(255,183,3,0.25)',
        padding: '10px var(--px)',
        textAlign: 'center',
        position: 'relative', zIndex: 99,
      }}>
        <p style={{ fontSize: '12px', color: 'var(--gold)', fontFamily: 'var(--font-mono)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          ⚠ This site is for demonstration and testing purposes only. No real events, purchases, or payments are active.
        </p>
      </div>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        padding: '120px var(--px) 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="animate-pulse-glow" style={{
          position: 'absolute', top: '-150px', right: '-150px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,57,70,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="animate-pulse-glow" style={{
          position: 'absolute', bottom: '-100px', left: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46,196,182,0.12) 0%, transparent 70%)',
          animationDelay: '3s', pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div className="animate-fade-up" style={{
          position: 'relative', zIndex: 1, marginBottom: '36px',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(230,57,70,0.12) 0%, rgba(46,196,182,0.06) 50%, transparent 75%)',
            filter: 'blur(40px)', pointerEvents: 'none',
          }} />
          <Image
            src="/images/Levels landing page Logo.png"
            alt="LEVELS Logo"
            width={1024}
            height={1024}
            priority
            style={{
              width: 'clamp(180px, 28vw, 320px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 24px rgba(230,57,70,0.35)) drop-shadow(0 0 48px rgba(46,196,182,0.18))',
              position: 'relative',
            }}
          />
        </div>

        <div className="animate-fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 20px', borderRadius: '100px',
          border: '1px solid rgba(230,57,70,0.35)',
          fontSize: '11px', fontWeight: 600, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--red)',
          marginBottom: '32px', position: 'relative', zIndex: 1,
        }}>
          <span className="animate-blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--red)', display: 'inline-block' }} />
          2026 Season — New Zealand
        </div>

        <h1 className="animate-fade-up text-gradient" style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(88px, 14vw, 200px)',
          lineHeight: 0.88,
          letterSpacing: '8px',
          position: 'relative', zIndex: 1,
          animationDelay: '0.1s',
        }}>LEVELS</h1>

        <p className="animate-fade-up" style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: 'clamp(16px, 2vw, 22px)',
          fontWeight: 300,
          color: 'var(--text-2)',
          maxWidth: '580px',
          marginTop: '24px',
          lineHeight: 1.7,
          position: 'relative', zIndex: 1,
          animationDelay: '0.2s',
        }}>
          Earn your level. Prove your place. Come back stronger.{' '}
          <span style={{ color: 'var(--text)' }}>You don&apos;t get given a level — you earn it.</span>
        </p>

        <div className="animate-fade-up" style={{
          display: 'flex', gap: '56px', marginTop: '60px',
          position: 'relative', zIndex: 1, animationDelay: '0.35s',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[
            { val: '5', label: 'Levels to Earn' },
            { val: '30 MIN', label: 'Average Event Duration' },
            { val: '100%', label: 'Everyone Earns Their Level' },
          ].map(s => (
            <div key={s.val} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-bebas)', fontSize: '52px',
                letterSpacing: '2px', color: 'var(--text)', lineHeight: 1,
              }}>{s.val}</div>
              <div style={{
                fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--text-3)', marginTop: '6px',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="animate-fade-up" style={{
          display: 'flex', gap: '16px', marginTop: '48px',
          position: 'relative', zIndex: 1, animationDelay: '0.45s',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <Link href="/events" className="btn-primary">Find Your Next Event →</Link>
          <Link href="/login" className="btn-ghost">Sign Up Now</Link>
        </div>

        <div className="animate-scroll-bounce" style={{
          position: 'absolute', bottom: '36px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: 'var(--text-3)', fontSize: '10px', letterSpacing: '3px',
          textTransform: 'uppercase',
        }}>
          Scroll
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--red), transparent)' }} />
        </div>
      </section>

      <div className="divider" />

      {/* ── THE 5 LEVELS ── */}
      <section style={{ padding: 'var(--py) var(--px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label">The Format</div>
        <h2 style={{
          fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 5vw, 64px)',
          letterSpacing: '3px', lineHeight: 1.05, marginBottom: '20px',
        }}>
          You Earn Every<br />Level You Reach
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '56px' }}>
          Five levels. Published standards. No shortcuts. You&apos;re a Level 3 athlete because you hit every benchmark at Level 3 — not because you showed up.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: '48px', WebkitOverflowScrolling: 'touch', paddingBottom: '4px' } as React.CSSProperties}>
          <div style={{
            display: 'flex', borderRadius: '20px', overflow: 'hidden',
            border: '1px solid var(--border)', minWidth: '650px',
          }}>
            {LEVEL_DATA.map((lvl, i) => (
              <div key={lvl.num}
                style={{
                  flex: '0 0 20%', padding: '32px 16px', textAlign: 'center',
                  background: lvl.bg, borderRight: i < 4 ? '1px solid var(--border)' : 'none',
                  cursor: 'default', transition: 'transform 0.3s, box-shadow 0.3s', minWidth: '130px',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.zIndex = '2'; e.currentTarget.style.boxShadow = `0 0 32px ${lvl.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.zIndex = '1'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{
                  fontFamily: 'var(--font-bebas)', fontSize: '60px',
                  letterSpacing: '2px', color: lvl.color, lineHeight: 1,
                }}>{lvl.num}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
                  color: 'var(--text-2)', margin: '10px 0 14px',
                }}>{lvl.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.6 }}>{lvl.desc}</div>
                <div style={{
                  marginTop: '20px', fontSize: '11px', color: lvl.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '1px',
                  fontWeight: 700,
                }}>{lvl.stats.split(' · ')[2]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-2)', gap: '20px' }}>
          {features.map(f => (
            <div key={f.title} className="card" style={{ padding: '28px', display: 'flex', gap: '18px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(230,57,70,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{
                flexShrink: 0, width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(230,57,70,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
              }}>{f.icon}</div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-outfit)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{f.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── YOUR EVENT DAY ── */}
      <section style={{ padding: 'var(--py) var(--px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label">Your Event Day</div>
        <h2 style={{
          fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 5vw, 64px)',
          letterSpacing: '3px', lineHeight: 1.05, marginBottom: '20px',
        }}>
          Arrive. Grind.<br />Earn Your Level.
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '56px' }}>
          From the moment you walk in to the moment you hold your medal — every minute is designed to push you, test you, and reward the work you&apos;ve put in.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-3)', gap: '20px' }}>
          {eventDay.map((step, i) => (
            <div key={step.title} className="card card-hover" style={{ padding: '36px 28px', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => {
                const el = e.currentTarget; el.style.borderColor = 'rgba(230,57,70,0.3)'; el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'var(--gradient-hero)', opacity: 0, transition: 'opacity 0.3s',
              }} className="card-top-line" />
              <div style={{
                position: 'absolute', top: '20px', right: '20px',
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px',
                color: 'var(--text-3)', opacity: 0.5,
              }}>0{i + 1}</div>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(230,57,70,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '20px',
              }}>{step.icon}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '10px', fontFamily: 'var(--font-outfit)' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── THE EXPERIENCE ── */}
      <section style={{ padding: 'var(--py) var(--px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label">The Experience</div>
        <h2 style={{
          fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 5vw, 64px)',
          letterSpacing: '3px', lineHeight: 1.05, marginBottom: '20px',
        }}>
          Every Level Earned<br />Pulls You Back for More
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '64px' }}>
          The loop is simple and brutal: train, show up, earn your level, go again. There&apos;s always a next level. Always something left to prove.
        </p>

        <div style={{ position: 'relative', paddingLeft: '48px' }}>
          <div style={{
            position: 'absolute', left: '16px', top: '8px', bottom: '8px', width: '2px',
            background: 'linear-gradient(to bottom, var(--teal), var(--gold), var(--red))',
          }} />
          {journey.map((step, i) => {
            const dotColors = ['var(--teal)', 'var(--blue)', 'var(--gold)', 'var(--red)']
            return (
              <div key={step.title} style={{ position: 'relative', paddingBottom: i < 3 ? '48px' : '0' }}>
                <div style={{
                  position: 'absolute', left: '-40px', top: '6px',
                  width: '14px', height: '14px', borderRadius: '50%',
                  border: `2px solid ${dotColors[i]}`,
                  background: dotColors[i] + '40',
                }} />
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  color: dotColors[i], marginBottom: '8px',
                }}>{step.label}</div>
                <h4 style={{ fontFamily: 'var(--font-outfit)', fontSize: '20px', fontWeight: 600, marginBottom: '10px' }}>{step.title}</h4>
                <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '640px' }}>{step.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="divider" />

      {/* ── SHOW WHAT YOU EARNED ── */}
      <section style={{ padding: 'var(--py) var(--px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-split)', gap: 'var(--gap-split)', alignItems: 'center' }}>
          <div>
            <div className="section-label">Wear Your Level</div>
            <h2 style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 5vw, 60px)',
              letterSpacing: '3px', lineHeight: 1.05, marginBottom: '20px',
            }}>Show What<br />You Earned</h2>
            <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
              Your level is your identity. &quot;Level 4 athlete&quot; means you hit the standards — and everyone who&apos;s been through LEVELS knows exactly what that took.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                ['💪', 'You Look Like You Earned It', 'Dynamic, powerful movements designed for athletic aesthetics. You\'ll look strong because the format demands you be strong.'],
                ['🎬', 'Multiple Peak Moments', 'Every level-up is its own celebration. One event, several earned moments — each one louder than the last.'],
                ['🏆', 'A Result That Speaks for Itself', '"Level 4" needs no context. Everyone who sees it knows: that athlete put in the work.'],
                ['🎖️', 'Level-Specific Gear', 'Merch that means something. Your level on your back — because you earned the right to wear it.'],
              ].map(([icon, title, desc]) => (
                <li key={title as string} style={{
                  display: 'flex', gap: '16px', padding: '18px 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{
                    flexShrink: 0, width: '32px', height: '32px', borderRadius: '8px',
                    background: 'rgba(230,57,70,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                  }}>{icon as string}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{title as string}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6 }}>{desc as string}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Athlete testimonials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {testimonials.map((t, i) => {
              const levelColors = ['var(--gold)', 'var(--red)', 'var(--teal)']
              return (
                <div key={t.name} className="card" style={{ padding: '24px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = levelColors[i] + '50')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: levelColors[i], opacity: 0.6,
                  }} />
                  <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{t.name}</div>
                      <div style={{ fontSize: '11px', color: levelColors[i], fontFamily: 'var(--font-mono)', letterSpacing: '1px', marginTop: '2px' }}>{t.level}</div>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>{t.location}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CTA ── */}
      <section style={{
        padding: 'var(--py) var(--px)', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(230,57,70,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 7vw, 88px)',
            letterSpacing: '4px', lineHeight: 1.05, marginBottom: '16px',
          }}>
            Your Level Is Waiting.<br />
            <span className="text-gradient">Go Earn It.</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Find an event near you. Show up prepared. Leave with the level you earned — or come back knowing exactly what you need to fix.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-primary" style={{ fontSize: '14px' }}>Find Your Next Event →</Link>
            <Link href="/login" className="btn-ghost">Sign Up Now — It&apos;s Free</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
