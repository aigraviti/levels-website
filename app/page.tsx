'use client'
import Link from 'next/link'
import { LEVEL_DATA } from '@/lib/types'

const problems = [
  { icon: '⏱️', title: 'Too Long', desc: 'Hyrox takes 60–90+ minutes. Modern attention spans and busy lives demand shorter, more intense formats that still deliver meaningful achievement.' },
  { icon: '😰', title: 'Fear of Failure', desc: 'Time-based events create losers. Finishing last or DNF\'ing is embarrassing, not shareable. Participants need to leave feeling successful, regardless of fitness level.' },
  { icon: '📵', title: 'Not Content-Ready', desc: 'Existing events produce one shareable moment: the finish line. Influencers need multiple content beats — visual milestones, celebratory moments, aesthetic backdrops throughout.' },
  { icon: '🔄', title: 'No Repeat Loop', desc: 'Improving a Hyrox time from 1:32 to 1:28 doesn\'t feel like a breakthrough. There\'s no clear progression system that drives repeat purchases and long-term engagement.' },
  { icon: '👕', title: 'Weak Merch Identity', desc: '"I did Hyrox" is generic. A level-based identity system (like karate belts) creates status-signalling merchandise that people genuinely want to wear and buy repeatedly.' },
  { icon: '🏢', title: 'Hard to Scale', desc: 'Large-format events need massive venues and complex logistics. The market needs a format that works in a local gym on Tuesday night AND a stadium on Saturday.' },
]

const features = [
  { icon: '🎮', title: 'Gaming Psychology', desc: 'The level-up mechanic is the most addictive loop in gaming history. Clear milestones, visible progression, and the pull of "one more level" drives repeat participation like nothing else.' },
  { icon: '🏋️', title: 'Gym-Transferable Movements', desc: 'Every station uses equipment found in standard gyms — rowers, sleds, kettlebells, assault bikes, wall balls. No Olympic lifting. Your audience is already training for this.' },
  { icon: '⚡', title: 'Level-Up Moments', desc: 'Each level transition is a designed celebration — lights, sound, your name on screen. Multiple filmable peak moments per participant, not just one finish line.' },
  { icon: '🤝', title: 'Doubles & Team Formats', desc: 'Pairs and teams of four tackle levels together. The social element amplified with shared level achievements and a format that celebrates every participant.' },
]

const journey = [
  { label: 'Pre-Event', title: 'Set Your Target', desc: 'The app\'s benchmark predictor estimates your level from training data. You set a personal target, reframing the event from "survive it" to "achieve my goal."' },
  { label: 'Event Day', title: 'Level-Up Moments', desc: 'Each level completion triggers a designed celebration — music shift, LED colour change, your name displayed. Spectators cheer every level-up because progress is visible to everyone.' },
  { label: 'Post-Event', title: 'Shareable Achievement', desc: 'Instant digital results card designed for social sharing — your level, station times, and a graphic that looks stunning on stories. Level-specific physical medal.' },
  { label: 'The Hook', title: 'Chase the Next Level', desc: 'Within 24 hours, a personalised "Next Level" training plan hits the app. Your level-specific merch is available. The countdown to the next event begins. The loop closes.' },
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
          The world&apos;s first achievement-based fitness sport. Not a race. A progression system.{' '}
          <span style={{ color: 'var(--text)' }}>Powered by gaming psychology, built for the content era.</span>
        </p>

        {/* Stats */}
        <div className="animate-fade-up" style={{
          display: 'flex', gap: '56px', marginTop: '60px',
          position: 'relative', zIndex: 1, animationDelay: '0.35s',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[
            { val: '$4.8B', label: 'Global Fitness Event Market' },
            { val: '340%', label: 'Hyrox Growth (2021–2025)' },
            { val: '5', label: 'Levels of Achievement' },
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
          <Link href="/events" className="btn-primary">Find Your Level →</Link>
          <Link href="/format" className="btn-ghost">How It Works</Link>
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

      {/* ── THE PROBLEM ── */}
      <section style={{ padding: 'var(--py) var(--px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label">The Opportunity</div>
        <h2 style={{
          fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 5vw, 64px)',
          letterSpacing: '3px', lineHeight: 1.05, marginBottom: '20px',
        }}>
          Fitness Events Are Broken<br />for the Modern Consumer
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '56px' }}>
          The average gym-goer wants to compete, achieve, and share — but existing formats leave massive gaps. LEVELS is designed to fill every one of them.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'var(--cols-3)', gap: '20px',
        }}>
          {problems.map(p => (
            <div key={p.title} className="card card-hover" style={{ padding: '36px 28px', position: 'relative', overflow: 'hidden' }}
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
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(230,57,70,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '20px',
              }}>{p.icon}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '10px', fontFamily: 'var(--font-outfit)' }}>{p.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
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
          Progressive Achievement,<br />Not Competitive Racing
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '640px', lineHeight: 1.8, marginBottom: '56px' }}>
          Every person finishes at their level — there&apos;s no DNF, no &quot;coming last.&quot; You&apos;re a Level 3 athlete. She&apos;s a Level 4. It&apos;s identity, not ranking.
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

      {/* ── THE EXPERIENCE ── */}
      <section style={{ padding: 'var(--py) var(--px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label">The Experience</div>
        <h2 style={{
          fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 5vw, 64px)',
          letterSpacing: '3px', lineHeight: 1.05, marginBottom: '20px',
        }}>
          Nobody Leaves<br />Feeling Like They Failed
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

      {/* ── CONTENT ERA ── */}
      <section style={{ padding: 'var(--py) var(--px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-split)', gap: 'var(--gap-split)', alignItems: 'center' }}>
          <div>
            <div className="section-label">The Growth Engine</div>
            <h2 style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 5vw, 60px)',
              letterSpacing: '3px', lineHeight: 1.05, marginBottom: '20px',
            }}>Built for the<br />Content Era</h2>
            <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
              LEVELS doesn&apos;t need influencers — it makes everyone who participates into a content creator. Every design decision optimises for organic sharing.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                ['💪', 'You Look Good Doing It', 'Stations are designed for athletic aesthetics — sled pushes, dynamic movements. Influencers look strong, not destroyed.'],
                ['🎬', '5 Content Beats Per Event', 'Each level-up is a filmable celebration. One event generates an entire story arc.'],
                ['🏆', 'Instantly Legible Achievement', '"I hit Level 4!" needs zero context. Levels are universal social currency.'],
                ['🛡️', 'Ego Protection', 'No influencer risks embarrassment. A Level 3 result is an achievement, not a failure.'],
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

          {/* Mock social post */}
          <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: '-40%', right: '-40%',
              width: '80%', height: '80%',
              background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 60%)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'var(--gradient-hero)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, color: 'white', fontSize: '16px',
                }}>S</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>sarah_lifts</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>@sarah_lifts · Sponsored</div>
                </div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, var(--red) 0%, #FF6B6B 100%)',
                borderRadius: '14px', padding: '40px 24px', textAlign: 'center', marginBottom: '16px',
              }}>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '72px', letterSpacing: '4px', color: 'white', lineHeight: 1 }}>LEVEL 4</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginTop: '6px' }}>ELITE — Auckland Event 2026</div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.65 }}>
                <strong style={{ color: 'var(--text)' }}>sarah_lifts</strong> Three months ago I was Level 2. Today I hit Level 4 ELITE. Actual tears at the level-up station 😭🔥 Coming for that Level 5 next quarter. Use code SARAH20 for 20% off entry 💪 <span style={{ color: 'var(--red)' }}>#LEVELS #LevelUp</span>
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '14px', fontSize: '13px', color: 'var(--text-3)' }}>
                <span>♡ 12,847</span><span>💬 943</span><span>↗ 2,106</span>
              </div>
            </div>
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
            The Future of Fitness<br />
            <span className="text-gradient">Has Levels</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Join thousands of athletes across New Zealand finding their level. Your progression starts now.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-primary" style={{ fontSize: '14px' }}>View Upcoming Events →</Link>
            <Link href="/register" className="btn-ghost">Register Interest</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
