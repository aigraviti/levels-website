'use client'
import Link from 'next/link'
import { LEVEL_DATA } from '@/lib/types'

const features = [
  { icon: '🎯', title: 'Clear Goals, No Guesswork', desc: 'Every level has defined benchmarks. You know exactly what you\'re working towards — and exactly what it feels like when you crush it.' },
  { icon: '🏋️', title: 'Movements You Already Train', desc: 'Rowers, sleds, kettlebells, assault bikes, wall balls. Standard gym equipment. If you train, you\'re already preparing for this.' },
  { icon: '⚡', title: 'Level-Up Celebrations', desc: 'Each level completion triggers a designed moment — lights, music, your name on screen. Every win is loud, felt, and real.' },
  { icon: '🤝', title: 'Solo, Pairs, or Teams', desc: 'Take on the levels alone, with a training partner, or as a crew of four. Every format celebrates every athlete\'s individual achievement.' },
]

const eventDay = [
  { icon: '🚪', title: 'Arrive & Get Ready', desc: 'Pick up your wristband, walk the course, meet your fellow athletes. The atmosphere is electric before you\'ve even touched a barbell.' },
  { icon: '🔥', title: 'Warm-Up & Briefing', desc: 'Your coach walks you through every station. No surprises — just clarity and confidence heading into your first level attempt.' },
  { icon: '🎯', title: 'Attack Your First Level', desc: 'Work through each station at your power, your pace. Every rep counts toward one clear goal: completing the level.' },
  { icon: '🎉', title: 'The Level-Up Moment', desc: 'Lights shift. Music drops. Your name goes up on screen. The entire room erupts. This is the moment you\'ll talk about for months.' },
  { icon: '🏅', title: 'Collect Your Achievement', desc: 'Walk away with your level result and a physical medal — tangible proof of exactly what you accomplished on the day.' },
  { icon: '📲', title: 'Share It Instantly', desc: 'Your personalised result card is ready the moment you finish. Designed to look stunning on stories. Level 3 athlete. That\'s your identity now.' },
]

const journey = [
  { label: 'Before You Arrive', title: 'Set Your Sights', desc: 'Every benchmark is published. You can train specifically for your goal level and arrive on event day knowing exactly what you\'re chasing.' },
  { label: 'On the Floor', title: 'Feel the Energy', desc: 'Each level transition is a designed celebration — music shift, LED colour change, your name on screen. Spectators cheer every single level-up because progress is visible to everyone.' },
  { label: 'Your Result', title: 'Take Home an Achievement', desc: 'Your instant digital results card is built to share — your level, station times, and a graphic that looks stunning on stories. Plus a level-specific physical medal.' },
  { label: 'What\'s Next', title: 'Chase the Next Level', desc: 'Within 24 hours, a personalised training plan arrives for your next target. Level-specific merch drops. The next event is on the calendar. The journey never stops.' },
]

const testimonials = [
  { name: 'James K.', level: 'Level 3 — Competitor', location: 'Auckland', quote: 'I\'ve run marathons and done CrossFit comps. Nothing has given me a result I actually wanted to put on my wall — until LEVELS. Level 3 first event, chasing 4 next month.' },
  { name: 'Mia T.', level: 'Level 4 — Elite', location: 'Wellington', quote: 'When I hit Level 4 and my name came up on the board, my whole gym erupted. My coach cried. I cried. There\'s nothing like that moment — it felt like I\'d actually won something.' },
  { name: 'Tom R.', level: 'Level 2 — Foundation', location: 'Christchurch', quote: 'I was terrified of finishing last at a fitness event. At LEVELS I didn\'t finish last — I achieved Level 2. That framing changed everything for me. I\'m already registered for my next one.' },
]

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
        padding: '120px var(--px) 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow orbs */}
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

        {/* Badge */}
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

        {/* Main title */}
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
          The fitness event where everyone leaves with an achievement.{' '}
          <span style={{ color: 'var(--text)' }}>Five levels. One unforgettable day. Your name on the board.</span>
        </p>

        {/* Stats */}
        <div className="animate-fade-up" style={{
          display: 'flex', gap: '56px', marginTop: '60px',
          position: 'relative', zIndex: 1, animationDelay: '0.35s',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[
            { val: '5', label: 'Levels to Conquer' },
            { val: '30 MIN', label: 'Average Level Duration' },
            { val: '100%', label: 'Athletes Leave with an Achievement' },
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

        {/* CTA buttons */}
        <div className="animate-fade-up" style={{
          display: 'flex', gap: '16px', marginTop: '48px',
          position: 'relative', zIndex: 1, animationDelay: '0.45s',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <Link href="/events" className="btn-primary">Find Your Next Event →</Link>
          <Link href="/register" className="btn-ghost">Register Free</Link>
        </div>

        {/* Scroll indicator */}
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
          Five Levels.<br />Your Progression.
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '56px' }}>
          Every athlete finishes at their level — there&apos;s no DNF, no coming last. You&apos;re a Level 3 athlete. She&apos;s a Level 4. It&apos;s your identity, not a ranking.
        </p>

        {/* Level blocks */}
        <div style={{ overflowX: 'auto', marginBottom: '48px', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
        <div style={{
          display: 'flex', borderRadius: '20px', overflow: 'hidden',
          border: '1px solid var(--border)', minWidth: '560px',
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
              {/* Pass rate bar */}
              <div style={{ marginTop: '20px', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${lvl.passRate}%`, background: lvl.color, borderRadius: '2px', transition: 'width 1s ease' }} />
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '6px', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
                {lvl.passRate}% pass rate
              </div>
            </div>
          ))}
        </div>
        </div>{/* end scroll wrapper */}

        {/* Features grid */}
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
          From First Arrival<br />to Final Achievement
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '56px' }}>
          Every moment of your LEVELS event is designed to feel incredible — from the warm-up buzz to the medal in your hand. Here&apos;s what to expect.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'var(--cols-3)', gap: '20px',
        }}>
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
          You Will Leave<br />Wanting More
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '64px' }}>
          Every touchpoint is designed to create achievement, community, and the irresistible pull of &quot;next time, I&apos;ll go higher.&quot;
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

      {/* ── SHARE YOUR JOURNEY ── */}
      <section style={{ padding: 'var(--py) var(--px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-split)', gap: 'var(--gap-split)', alignItems: 'center' }}>
          <div>
            <div className="section-label">Built to Celebrate You</div>
            <h2 style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 5vw, 60px)',
              letterSpacing: '3px', lineHeight: 1.05, marginBottom: '20px',
            }}>Share Your<br />Achievement</h2>
            <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
              Your result is something to be proud of. Every element of LEVELS is designed so that sharing your achievement feels natural, exciting, and worth celebrating.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                ['💪', 'You Look Like an Athlete', 'Stations are built for dynamic, powerful movement. You\'ll look — and feel — incredible doing this.'],
                ['🎬', 'Multiple Peak Moments', 'Every level-up is its own celebration. One event, multiple unforgettable moments to relive.'],
                ['🏆', 'A Result Worth Sharing', '"I hit Level 4!" says everything. Levels are instantly understood — no context required.'],
                ['🎖️', 'Every Result is an Achievement', 'Level 2 is an achievement. Level 5 is a legend. Every athlete walks away with something real.'],
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
            Your Next Level<br />
            <span className="text-gradient">Starts Here</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Find an event near you, register your interest, and start training for the level you want to hit. New Zealand&apos;s most exciting fitness event is waiting.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-primary" style={{ fontSize: '14px' }}>Find Your Next Event →</Link>
            <Link href="/register" className="btn-ghost">Register Now — It&apos;s Free</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
