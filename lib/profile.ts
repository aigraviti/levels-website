export type Profile = {
  id: string
  full_name: string | null
  date_of_birth: string | null
  gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say' | null
  profile_photo_url: string | null
  phone: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  medical_notes: string | null
  tshirt_size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | null
  city: string | null
  region: string | null
  fitness_level: 'Beginner' | 'Intermediate' | 'Advanced' | null
  notifications_event_reminders: boolean
  notifications_results: boolean
  notifications_new_events: boolean
  notifications_marketing: boolean
  created_at: string
  updated_at: string
}

// Fields that count toward completion and their weights
const COMPLETION_FIELDS: (keyof Profile)[] = [
  'full_name',
  'date_of_birth',
  'gender',
  'profile_photo_url',
  'phone',
  'emergency_contact_name',
  'emergency_contact_phone',
  'tshirt_size',
  'city',
  'fitness_level',
]

export function profileCompletion(profile: Profile | null): number {
  if (!profile) return 0
  const filled = COMPLETION_FIELDS.filter(f => {
    const v = profile[f]
    return v !== null && v !== undefined && String(v).trim() !== ''
  }).length
  return Math.round((filled / COMPLETION_FIELDS.length) * 100)
}

export function isProfileReadyForEvent(profile: Profile | null): boolean {
  if (!profile) return false
  return !!(
    profile.full_name &&
    profile.date_of_birth &&
    profile.gender &&
    profile.emergency_contact_name &&
    profile.emergency_contact_phone
  )
}
