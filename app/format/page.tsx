'use client'
import { LEVEL_DATA } from '@/lib/types'

const stations = [
  { icon: '🚣', name: 'Rowing', desc: 'Concept2 ergometer. Measured by distance within a time cap or calories.', tags: ['Cardio'] },
  { icon: '🚴', name: 'Assault Bike', desc: 'Echo or Assault bike. Calories for work, all-out sprint format.', tags: ['Cardio'] },
  { icon: '🛷', name: 'Sled Push', desc: 'Weighted prowler push over 25m track. Load scales by level.', tags: ['Strength'] },
  { icon: '⛓️', name: 'Sled Pull', desc: 'Hand-over-hand rope sled pull. 25m track, load scales by level.', tags: ['Strength'] },
  { icon: '🏀', name: 'Wall Balls', desc: 'Medicine ball to target height. Reps and ball weight scale by level.', tags: ['Hybrid'] },
  { icon: '🔔', name: 'Kettlebell Swings', desc: 'Russian-style to eye height. Weight and reps scale by level.', tags: ['Hybrid'] },
  { icon: '🧳', name: 'Farmers Carry', desc: 'Dual-handle carry over measured distance. Weight scales by level.', tags: ['Strength', 'Full Body'] },
  { icon: '🏔️', name: 'Ski Erg', desc: 'Concept2 SkiErg. Distance or calorie target within time cap.', tags: ['Cardio'] },
  { icon: '📦', name: 'Box Jumps / Step-Ups', desc: 'Standard plyo box. Box height and reps scale. Step-ups always permitted.', tags: ['Hybrid'] },
  { icon: '🏋️', name: 'Sandbag Over Shoulder', desc: 'Ground to over-shoulder throw. Bag weight and reps scale by level.', tags: ['Strength', 'Full Body'] },
  { icon: '🏃', name: 'Shuttle Run', desc: '25m out-and-back sprints. Total distance scales by level.', tags: ['Cardio'] },
  { icon: '⬆️', name: 'Burpee Broad Jumps', desc: 'Burpee into forward jump over marked distance. Total distance scales.', tags: ['Full Body', 'Cardio'] },
]

const tagColors: Record<string, string> = {
  Cardio: 'var(--teal)', Strength: 'var(--red)', Hybrid: 'var(--gold)', 'Full Body': 'var(--purple)',
}

const levelWorkouts: Record<string, { station: string; rx: string; standard: string }[]> = {
  '01': [
    { station: 'Rowing', rx: '500m', standard: 'Any pace. Must complete full distance. No time cap.' },
    { station: 'Wall Balls', rx: '20 reps @ 6/4kg — Target: 9ft / 8ft', standard: 'Full squat below parallel. Ball must contact target. Break as needed.' },
    { station: 'Farmers Carry', rx: '50m @ 16/12kg per hand', standard: 'Continuous forward movement. May set down and rest. 25m out, 25m back.' },
  ],
  '02': [
    { station: 'Sled Push', rx: '2 × 25m @ 60/40kg', standard: 'Low handle position. Must cross finish line. Walk-back recovery between lengths.' },
    { station: 'Assault Bike', rx: '15/12 calories', standard: 'Arms and legs must be moving. No time cap.' },
    { station: 'Kettlebell Swings', rx: '25 reps @ 20/12kg', standard: 'Hip hinge, full extension at top, bell to eye height minimum.' },
  ],
  '03': [
    { station: 'Ski Erg', rx: '500m ⏱ 2:30 cap', standard: 'Must complete distance within time cap. Failure = level not cleared.' },
    { station: 'Sled Pull', rx: '25m @ 80/50kg', standard: 'Seated or standing. Hand-over-hand on rope. No time cap.' },
    { station: 'Box Jump / Step-Up', rx: '30 reps @ 24″/20″ ⏱ 3:00 cap', standard: 'Full hip extension at top. Step-down permitted. Jump or step allowed.' },
    { station: 'Sandbag Over Shoulder', rx: '10 reps @ 30/20kg', standard: 'Bag must start on ground and pass over either shoulder. Any technique permitted.' },
  ],
  '04': [
    { station: 'Assault Bike', rx: '30/22 calories ⏱ 2:00 cap', standard: 'All-out effort required. Must hit calorie target within cap.' },
    { station: 'Sled Push — Heavy', rx: '4 × 25m @ 100/70kg ⏱ 4:00 cap', standard: 'Low handle. Walk-back between lengths counts against cap.' },
    { station: 'Wall Balls', rx: '40 reps @ 9/6kg — Target: 10ft / 9ft', standard: 'Below parallel squat. Ball must hit target. No-rep for missed targets.' },
    { station: 'Burpee Broad Jumps', rx: '50m total ⏱ 4:00 cap', standard: 'Chest to floor on burpee. Distance from takeoff to landing. Must complete 50m.' },
  ],
  '05': [
    { station: 'Rowing', rx: '1,000m ⏱ 3:30 cap', standard: 'Sub-3:30 required. Sets the metabolic tone for the entire level.' },
    { station: 'Sled Push + Pull Combo', rx: '4 × 25m push @ 120/80kg + 4 × 25m pull @ 100/65kg ⏱ 6:00 cap', standard: 'Alternating push and pull lengths. All 8 lengths within combined cap.' },
    { station: 'Shuttle Run + KB Complex', rx: '5 rounds: 50m sprint + 10 KB swings @ 32/24kg ⏱ 8:00 cap', standard: '25m out, 25m back. Touch line each end. Continuous rounds.' },
    { station: 'Sandbag Over Shoulder', rx: '15 reps @ 50/35kg ⏱ 3:00 cap', standard: 'Heavy bag, fast turnover. No rest between reps. One rep per ~12 seconds required.' },
  ],
}

const levelGates = {
  '01': { icon: '🔔', text: 'Bell sounds, LED strip changes to Level 2 colour. Wristband scanned. 90-second mandatory rest before Level 2.' },
  '02': { icon: '🔔', text: 'Music shifts, venue lighting changes to warm gold. Name displayed on event screen. Athletes choosing to finish proceed to Achievement Station.' },
  '03': { icon: '🔥', text: 'Full venue celebration — pyrotechnics cue, crowd engagement. If any capped station missed, athlete finishes at Level 2 with partial Level 3 credit. 2-minute rest before Level 4.' },
  '04': { icon: '🏆', text: 'All time caps must be met. Top 15% globally. Full arena celebration. Name broadcast live. 2-minute rest. Only those who choose to continue enter the Apex zone.' },
  '05': { icon: '👑', text: 'Full venue blackout followed by spotlight on athlete, confetti cannon, APEX medal presentation. Name enters the LEVELS Apex Registry — a permanent global honour roll.' },
}

export default function FormatPage() {
  return (
    <div style={{ background: 'var(--bg)', paddingTop: '68px' }}>

      {/* Hero */}
      <section style={{ padding: '80px var(--px) 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(230,57,70,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Official Competition Format</div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 7vw, 80px)', letterSpacing: '4px', lineHeight: 1, marginBottom: '16px' }}>
            The Complete<br /><span className="text-gradient">Event Design</span>
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Five levels. Twelve stations. One format designed for achievement, content, and repeat participation.
          </p>
          {/* Overview stats */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}>
            {[
              { icon: '🏋️', val: '5', label: 'Levels' },
              { icon: '⚡', val: '3–4', label: 'Stations / Level' },
              { icon: '⏱️', val: '45–75', label: 'Minutes Total' },
              { icon: '🔁', val: '12', label: 'Station Pool' },
            ].map(s => (
              <div key={s.val} className="card" style={{ padding: '24px 28px', textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '2px', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-3)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: '0 var(--px)' }} />

      {/* Event Flow */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--py) var(--px)' }}>
        <div className="section-label">Event Flow</div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '2px', marginBottom: '16px' }}>Athlete Journey Through the Event</h2>
        <p style={{ color: 'var(--text-2)', fontSize: '16px', marginBottom: '48px', maxWidth: '600px' }}>Athletes move through levels sequentially. Each level-up transition is a designed celebration moment.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-6)', gap: '4px', borderRadius: '14px', overflow: 'hidden' }}>
          {[
            { time: 'T–10 min', name: 'Check-In & Warm-Up', detail: 'Wristband scan, dynamic warm-up zone, athlete briefing', color: 'rgba(46,196,182,0.08)' },
            { time: '0:00', name: 'Heat Start', detail: 'Waves of 10–20 athletes, staggered 5-min intervals', color: 'rgba(69,123,157,0.08)' },
            { time: 'Active', name: 'Work Levels', detail: '3–4 stations per level, 90sec rest between levels', color: 'rgba(255,183,3,0.08)' },
            { time: 'Per Level', name: 'Level-Up Gate', detail: 'Standards verified, celebration trigger, proceed or finish', color: 'rgba(230,57,70,0.08)' },
            { time: 'Your Peak', name: 'Achievement Station', detail: 'Photo, results card, medal presentation', color: 'rgba(131,56,236,0.08)' },
            { time: 'Post', name: 'Festival Zone', detail: 'Merch, food, social area, photo walls, cool-down', color: 'rgba(230,57,70,0.1)' },
          ].map((step, i) => (
            <div key={step.name} style={{ background: step.color, padding: '24px 14px', textAlign: 'center', borderRight: i < 5 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', marginBottom: '8px', letterSpacing: '1px' }}>{step.time}</div>
              <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '6px', letterSpacing: '0.5px' }}>{step.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-3)', lineHeight: 1.5 }}>{step.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: '0 var(--px)' }} />

      {/* Station Library */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--py) var(--px)' }}>
        <div className="section-label">Station Library</div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '2px', marginBottom: '16px' }}>The 12-Station Pool</h2>
        <p style={{ color: 'var(--text-2)', fontSize: '16px', marginBottom: '48px', maxWidth: '640px' }}>All movements use standard gym equipment. No Olympic lifts, no gymnastics, no high-skill barriers. Every station is scalable across all five levels.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-stations)', gap: '14px' }}>
          {stations.map(s => (
            <div key={s.name} className="card" style={{ padding: '22px', display: 'flex', gap: '14px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(230,57,70,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{s.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5, marginBottom: '8px' }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {s.tags.map(t => (
                    <span key={t} style={{
                      padding: '2px 8px', borderRadius: '4px', fontSize: '9px',
                      fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase',
                      color: tagColors[t], background: tagColors[t] + '15', border: `1px solid ${tagColors[t]}30`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: '0 var(--px)' }} />

      {/* Level Detail Sections */}
      {LEVEL_DATA.map(lvl => {
        const workouts = levelWorkouts[lvl.num] ?? []
        const gate = levelGates[lvl.num as keyof typeof levelGates]
        return (
          <section key={lvl.num} style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--py) var(--px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
              <div style={{
                width: '96px', height: '96px', borderRadius: '18px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-bebas)', fontSize: '52px', letterSpacing: '2px',
                color: lvl.color, border: `2px solid ${lvl.color}`, background: lvl.bg,
              }}>{lvl.num}</div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '3px', marginBottom: '6px' }}>
                  Level {lvl.num} — {lvl.name.toUpperCase()}
                </h2>
                <p style={{ color: 'var(--text-2)', fontSize: '14px', marginBottom: '10px' }}>{lvl.desc}</p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {lvl.stats.split(' · ').map(s => (
                    <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '1px' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Workout table */}
            <div className="table-scroll">
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'separate', borderSpacing: 0, borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '16px' }}>
                <thead>
                  <tr style={{ background: 'var(--surface)' }}>
                    {['#', 'Station', 'Prescription', 'Movement Standard'].map(h => (
                      <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-3)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((w, i) => (
                    <tr key={i} style={{ transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.015)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '16px 18px', borderBottom: i < workouts.length - 1 ? '1px solid rgba(37,37,48,0.5)' : 'none', fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '1px', color: lvl.color, width: '52px' }}>{String(i + 1).padStart(2, '0')}</td>
                      <td style={{ padding: '16px 18px', borderBottom: i < workouts.length - 1 ? '1px solid rgba(37,37,48,0.5)' : 'none', fontWeight: 700, fontSize: '15px' }}>{w.station}</td>
                      <td style={{ padding: '16px 18px', borderBottom: i < workouts.length - 1 ? '1px solid rgba(37,37,48,0.5)' : 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text)', whiteSpace: 'pre-line' }}>{w.rx}</td>
                      <td style={{ padding: '16px 18px', borderBottom: i < workouts.length - 1 ? '1px solid rgba(37,37,48,0.5)' : 'none', fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.5 }}>{w.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gate note */}
            {gate && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px 20px',
                background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px',
              }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{gate.icon}</span>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.65 }}>
                  <strong style={{ color: 'var(--text)' }}>Level-Up Gate: </strong>{gate.text}
                </p>
              </div>
            )}

            {lvl.num !== '05' && <div className="divider" style={{ margin: '80px 0 0' }} />}
          </section>
        )
      })}

      {/* Scoring */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--py) var(--px)' }}>
        <div className="section-label">Rules & Scoring</div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '2px', marginBottom: '48px' }}>Competition Standards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'var(--cols-rules)', gap: '16px' }}>
          {[
            { title: 'SCORING SYSTEM', content: 'Your score is your highest completed level. Station times are recorded for personal benchmarking. Primary result is binary: Level Cleared or Level Attempted.', rules: ['Primary: Highest level completed (1–5)', 'Secondary: Total elapsed time across completed levels', 'Tertiary: Individual station split times', 'Tiebreaker: Total time at same level achieved'] },
            { title: 'TIME CAPS', content: 'Time caps are introduced at Level 3 and become progressively tighter. If any capped station is not completed within the cap, the athlete finishes at their previous level.', rules: ['Levels 1–2: No time caps. Complete at your own pace', 'Levels 3–5: Individual station caps enforced by judges', 'Missed cap = level not cleared, finish at previous level', 'Partial credit shown (e.g., "Level 3 + 2 stations")'] },
            { title: 'OPT-OUT RULE', content: 'Athletes may choose to stop at any level-up gate. Completing Level 3 and choosing not to attempt Level 4 is a valid and respected result. This protects the participant experience and prevents forced failure.', rules: [] },
            { title: 'JUDGING', content: 'One judge per 2–3 athletes at Levels 1–2. One dedicated judge per athlete at Levels 3–5. Judges verify movement standards and time caps. No-reps are called in real-time with clear hand signals.', rules: [] },
          ].map(c => (
            <div key={c.title} className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '2px', marginBottom: '10px', color: 'var(--text)' }}>{c.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: c.rules.length > 0 ? '16px' : '0' }}>{c.content}</p>
              {c.rules.length > 0 && (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {c.rules.map(r => (
                    <li key={r} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-2)' }}>
                      <span style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '2px', flexShrink: 0 }}>→</span>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
