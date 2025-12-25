'use client'

interface BrickLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  className?: string
}

const sizes = {
  sm: { brick: 'w-6 h-2', halfBrick: 'w-3 h-2', gap: 'gap-0.5', rounded: 'rounded-sm' },
  md: { brick: 'w-10 h-3', halfBrick: 'w-5 h-3', gap: 'gap-1', rounded: 'rounded' },
  lg: { brick: 'w-14 h-4', halfBrick: 'w-7 h-4', gap: 'gap-1', rounded: 'rounded' },
  xl: { brick: 'w-16 h-5', halfBrick: 'w-8 h-5', gap: 'gap-1.5', rounded: 'rounded-md' },
  hero: { brick: 'w-20 h-6', halfBrick: 'w-10 h-6', gap: 'gap-2', rounded: 'rounded-md' },
}

export function BrickLogo({ size = 'md', className = '' }: BrickLogoProps) {
  const s = sizes[size]

  return (
    <div className={`inline-flex flex-col ${s.gap} ${className}`}>
      {/* Row 1: 5 bricks */}
      <div className={`flex ${s.gap}`}>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
      </div>

      {/* Row 2: 4 bricks */}
      <div className={`flex ${s.gap} justify-center`}>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
      </div>

      {/* Row 3: 5 bricks */}
      <div className={`flex ${s.gap}`}>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
        <div className={`${s.brick} bg-b8s-orange ${s.rounded}`}></div>
      </div>
    </div>
  )
}
