import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'
import MerchClient from '@/components/merch/MerchClient'

export const revalidate = 60

export default async function MerchPage() {
  let products: Product[] = []
  try {
    const { data } = await supabase.from('products').select('*').order('level_association', { ascending: true, nullsFirst: false })
    products = data ?? []
  } catch {
    products = []
  }

  return (
    <div style={{ background: 'var(--bg)', paddingTop: '68px' }}>
      <div style={{
        padding: '80px var(--px) 60px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center top, rgba(131,56,236,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>LEVELS Store</div>
          <h1 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 7vw, 80px)',
            letterSpacing: '4px', lineHeight: 1, marginBottom: '16px',
          }}>Wear Your<br /><span className="text-gradient">Achievement</span></h1>
          <p style={{ color: 'var(--text-2)', fontSize: '17px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Your level is your identity. Level-specific drops, training gear, and the Apex collection.
          </p>
        </div>
      </div>
      <MerchClient products={products} />
    </div>
  )
}
