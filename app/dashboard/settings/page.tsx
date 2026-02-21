'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/profile'
import { profileCompletion } from '@/lib/profile'

const TABS = [
  { key: 'profile', label: 'Athlete Profile' },
  { key: 'account', label: 'Account' },
  { key: 'notifications', label: 'Notifications' },
] as const
type Tab = typeof TABS[number]['key']

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600,
  letterSpacing: '2px', textTransform: 'uppercase',
  color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginBottom: '8px',
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)', borderRadius: '9px',
  color: 'var(--text)', fontSize: '14px',
  outline: 'none', transition: 'border-color 0.2s',
  fontFamily: 'var(--font-outfit)',
}
const selectStyle: React.CSSProperties = {
  ...{
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)', borderRadius: '9px',
    color: 'var(--text)', fontSize: '14px',
    outline: 'none', fontFamily: 'var(--font-outfit)',
    appearance: 'none' as const,
  }
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteText, setDeleteText] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<Partial<Profile>>({
    full_name: '', date_of_birth: '', gender: null,
    profile_photo_url: null, phone: '',
    emergency_contact_name: '', emergency_contact_phone: '',
    medical_notes: '', tshirt_size: null,
    city: '', region: '', fitness_level: null,
    notifications_event_reminders: true,
    notifications_results: true,
    notifications_new_events: true,
    notifications_marketing: false,
  })
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setEmail(user.email ?? '')

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(p => ({ ...p, ...data }))
      }
      setLoading(false)
    }
    load()
  }, [router])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function saveProfile() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: profile.full_name || null,
        date_of_birth: profile.date_of_birth || null,
        gender: profile.gender || null,
        profile_photo_url: profile.profile_photo_url || null,
        phone: profile.phone || null,
        emergency_contact_name: profile.emergency_contact_name || null,
        emergency_contact_phone: profile.emergency_contact_phone || null,
        medical_notes: profile.medical_notes || null,
        tshirt_size: profile.tshirt_size || null,
        city: profile.city || null,
        region: profile.region || null,
        fitness_level: profile.fitness_level || null,
      })

    setSaving(false)
    if (error) { showToast('Error saving — ' + error.message); return }
    showToast('Profile saved ✓')
  }

  async function saveNotifications() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        notifications_event_reminders: profile.notifications_event_reminders,
        notifications_results: profile.notifications_results,
        notifications_new_events: profile.notifications_new_events,
        notifications_marketing: profile.notifications_marketing,
      })

    setSaving(false)
    if (error) { showToast('Error saving — ' + error.message); return }
    showToast('Preferences saved ✓')
  }

  async function changePassword() {
    if (!newPassword || newPassword.length < 8) {
      showToast('Password must be at least 8 characters'); return
    }
    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setSaving(false)
    if (error) { showToast('Error — ' + error.message); return }
    setNewPassword('')
    showToast('Password updated ✓')
  }

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingPhoto(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`
    const { error: uploadErr } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true })

    if (uploadErr) { showToast('Upload failed — ' + uploadErr.message); setUploadingPhoto(false); return }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
    setProfile(p => ({ ...p, profile_photo_url: publicUrl }))
    setUploadingPhoto(false)
    showToast('Photo updated ✓')
  }

  async function handleDeleteAccount() {
    if (deleteText !== 'DELETE') { showToast('Type DELETE to confirm'); return }
    const { error } = await supabase.rpc('delete_own_user')
    if (error) { showToast('Error — ' + error.message); return }
    await supabase.auth.signOut()
    router.push('/')
  }

  const completion = profileCompletion(profile as Profile)

  if (loading) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)', letterSpacing: '2px', fontSize: '12px' }}>LOADING...</div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '68px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px var(--px) 100px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/dashboard" style={{ fontSize: '12px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
          >← Dashboard</Link>
          <div className="section-label" style={{ marginBottom: '6px' }}>Your Account</div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '3px' }}>Settings</h1>
        </div>

        {/* Profile completion bar */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-2)' }}>Profile Complete</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: completion >= 80 ? 'var(--teal)' : completion >= 50 ? 'var(--gold)' : 'var(--red)' }}>{completion}%</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${completion}%`, borderRadius: '3px', transition: 'width 0.6s ease', background: completion >= 80 ? 'var(--teal)' : completion >= 50 ? 'var(--gold)' : 'var(--red)' }} />
            </div>
          </div>
          {completion < 80 && (
            <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.5 }}>
              Complete your profile to register for events faster.
            </p>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '4px', marginBottom: '32px', width: 'fit-content' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '9px 20px', borderRadius: '9px', border: 'none', cursor: 'pointer',
              background: tab === t.key ? 'var(--card)' : 'transparent',
              color: tab === t.key ? 'var(--text)' : 'var(--text-3)',
              fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
              boxShadow: tab === t.key ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── ATHLETE PROFILE TAB ─────────────────────── */}
        {tab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Photo */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', marginBottom: '20px' }}>Profile Photo</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', flexShrink: 0,
                  background: profile.profile_photo_url ? 'transparent' : 'var(--gradient-hero)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', border: '2px solid var(--border)',
                }}>
                  {profile.profile_photo_url
                    ? <img src={profile.profile_photo_url} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>{(profile.full_name ?? '?')[0]?.toUpperCase()}</span>
                  }
                </div>
                <div>
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploadingPhoto}
                    style={{
                      padding: '9px 20px', borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'transparent', cursor: 'pointer',
                      color: 'var(--text-2)', fontSize: '12px', fontWeight: 600,
                      letterSpacing: '1px', textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
                      opacity: uploadingPhoto ? 0.6 : 1,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
                  >
                    {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                  </button>
                  <p style={{ fontSize: '12px', color: 'var(--text-3)', marginTop: '8px' }}>JPG or PNG, max 2MB.</p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadPhoto} />
                </div>
              </div>
            </div>

            {/* Personal info */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', marginBottom: '24px' }}>Personal Info</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '18px' }}>
                <Field label="Full Name *">
                  <input
                    value={profile.full_name ?? ''}
                    onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
                    placeholder="Alex Smith" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </Field>
                <Field label="Date of Birth *">
                  <input
                    type="date"
                    value={profile.date_of_birth ?? ''}
                    onChange={e => setProfile(p => ({ ...p, date_of_birth: e.target.value }))}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </Field>
                <Field label="Gender *">
                  <select
                    value={profile.gender ?? ''}
                    onChange={e => setProfile(p => ({ ...p, gender: (e.target.value || null) as Profile['gender'] }))}
                    style={selectStyle}
                  >
                    <option value="">Select...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </Field>
                <Field label="Phone">
                  <input
                    type="tel" value={profile.phone ?? ''}
                    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+64 21 000 0000" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </Field>
                <Field label="City">
                  <input
                    value={profile.city ?? ''}
                    onChange={e => setProfile(p => ({ ...p, city: e.target.value }))}
                    placeholder="Auckland" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </Field>
                <Field label="Region">
                  <input
                    value={profile.region ?? ''}
                    onChange={e => setProfile(p => ({ ...p, region: e.target.value }))}
                    placeholder="Auckland Region" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </Field>
                <Field label="T-Shirt Size">
                  <select
                    value={profile.tshirt_size ?? ''}
                    onChange={e => setProfile(p => ({ ...p, tshirt_size: (e.target.value || null) as Profile['tshirt_size'] }))}
                    style={selectStyle}
                  >
                    <option value="">Select...</option>
                    <option>XS</option><option>S</option><option>M</option>
                    <option>L</option><option>XL</option><option>XXL</option>
                  </select>
                </Field>
                <Field label="Fitness Level">
                  <select
                    value={profile.fitness_level ?? ''}
                    onChange={e => setProfile(p => ({ ...p, fitness_level: (e.target.value || null) as Profile['fitness_level'] }))}
                    style={selectStyle}
                  >
                    <option value="">Select...</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Emergency contact */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', marginBottom: '6px' }}>Emergency Contact</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px', lineHeight: 1.6 }}>
                Required for event registration. This person will be contacted if something goes wrong on event day.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '18px' }}>
                <Field label="Contact Name *">
                  <input
                    value={profile.emergency_contact_name ?? ''}
                    onChange={e => setProfile(p => ({ ...p, emergency_contact_name: e.target.value }))}
                    placeholder="Jordan Smith" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </Field>
                <Field label="Contact Phone *">
                  <input
                    type="tel"
                    value={profile.emergency_contact_phone ?? ''}
                    onChange={e => setProfile(p => ({ ...p, emergency_contact_phone: e.target.value }))}
                    placeholder="+64 21 000 0001" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </Field>
              </div>
            </div>

            {/* Medical notes */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', marginBottom: '6px' }}>Medical Notes</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '18px', lineHeight: 1.6 }}>
                Optional. Share any conditions, allergies, or notes that event staff should know.
              </p>
              <textarea
                value={profile.medical_notes ?? ''}
                onChange={e => setProfile(p => ({ ...p, medical_notes: e.target.value }))}
                placeholder="e.g. Asthma, nut allergy, prior knee injury"
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="btn-primary"
              style={{ alignSelf: 'flex-start', opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving...' : 'Save Profile →'}
            </button>
          </div>
        )}

        {/* ── ACCOUNT TAB ─────────────────────────────── */}
        {tab === 'account' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Email */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', marginBottom: '20px' }}>Email Address</h2>
              <Field label="Current Email">
                <input value={email} disabled style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }} />
              </Field>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', marginTop: '10px', lineHeight: 1.6 }}>
                To change your email address, contact support.
              </p>
            </div>

            {/* Password */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', marginBottom: '20px' }}>Change Password</h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <Field label="New Password">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    />
                  </Field>
                </div>
                <button
                  onClick={changePassword}
                  disabled={saving || !newPassword}
                  style={{
                    padding: '11px 24px', borderRadius: '9px',
                    background: 'var(--gradient-hero)', border: 'none',
                    color: 'white', fontSize: '12px', fontWeight: 600,
                    letterSpacing: '1px', textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)', cursor: 'pointer',
                    opacity: (!newPassword || saving) ? 0.5 : 1,
                    transition: 'opacity 0.2s', whiteSpace: 'nowrap',
                  }}
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Delete account */}
            <div className="card" style={{ padding: '28px', border: '1px solid rgba(230,57,70,0.2)', background: 'rgba(230,57,70,0.03)' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', marginBottom: '8px', color: 'var(--red)' }}>Danger Zone</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.6, marginBottom: '20px' }}>
                Permanently delete your account and all data. This cannot be undone.
              </p>
              {!deleteConfirm ? (
                <button
                  onClick={() => setDeleteConfirm(true)}
                  style={{
                    padding: '10px 20px', borderRadius: '8px',
                    border: '1px solid rgba(230,57,70,0.4)',
                    background: 'transparent', cursor: 'pointer',
                    color: 'var(--red)', fontSize: '12px', fontWeight: 600,
                    letterSpacing: '1px', textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(230,57,70,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  Delete My Account
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--red)', fontWeight: 600 }}>
                    Type <strong>DELETE</strong> to confirm account deletion.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input
                      value={deleteText}
                      onChange={e => setDeleteText(e.target.value)}
                      placeholder="DELETE"
                      style={{ ...inputStyle, maxWidth: '200px', borderColor: 'rgba(230,57,70,0.4)' }}
                    />
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleteText !== 'DELETE'}
                      style={{
                        padding: '11px 20px', borderRadius: '8px',
                        background: deleteText === 'DELETE' ? 'var(--red)' : 'rgba(230,57,70,0.2)',
                        border: 'none', cursor: deleteText === 'DELETE' ? 'pointer' : 'not-allowed',
                        color: 'white', fontSize: '12px', fontWeight: 600,
                        letterSpacing: '1px', textTransform: 'uppercase',
                        fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
                      }}
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => { setDeleteConfirm(false); setDeleteText('') }}
                      style={{
                        padding: '11px 20px', borderRadius: '8px',
                        border: '1px solid var(--border)', background: 'transparent',
                        cursor: 'pointer', color: 'var(--text-3)',
                        fontSize: '12px', fontWeight: 600,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS TAB ───────────────────────── */}
        {tab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', marginBottom: '6px' }}>Email Preferences</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '28px', lineHeight: 1.6 }}>
                Control what we send to your inbox. We&apos;ll always send essential account emails.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { key: 'notifications_event_reminders' as const, label: 'Event Reminders', desc: 'Day-of and pre-event reminders for events you\'re registered in.' },
                  { key: 'notifications_results' as const, label: 'Results & Scores', desc: 'Your performance results and leaderboard updates after events.' },
                  { key: 'notifications_new_events' as const, label: 'New Events', desc: 'When new events are announced in your city or region.' },
                  { key: 'notifications_marketing' as const, label: 'Marketing & Promotions', desc: 'Merch drops, level unlocks, and community news.' },
                ].map((item, i, arr) => (
                  <div key={item.key} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: '20px', padding: '18px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{item.label}</p>
                      <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => setProfile(p => ({ ...p, [item.key]: !p[item.key] }))}
                      style={{
                        width: '44px', height: '24px', borderRadius: '12px', border: 'none',
                        background: profile[item.key] ? 'var(--teal)' : 'rgba(255,255,255,0.12)',
                        cursor: 'pointer', position: 'relative', flexShrink: 0,
                        transition: 'background 0.2s',
                      }}
                      aria-label={`Toggle ${item.label}`}
                    >
                      <span style={{
                        position: 'absolute', top: '3px',
                        left: profile[item.key] ? '23px' : '3px',
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: 'white', transition: 'left 0.2s',
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={saveNotifications}
              disabled={saving}
              className="btn-primary"
              style={{ alignSelf: 'flex-start', opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving...' : 'Save Preferences →'}
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: '10px', padding: '12px 24px',
          fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '1px',
          color: toast.startsWith('Error') ? 'var(--red)' : 'var(--teal)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 200,
          animation: 'fadeIn 0.2s ease',
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}
