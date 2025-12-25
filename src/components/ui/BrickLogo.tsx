'use client';

import Image from 'next/image';

interface BrickLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTools?: boolean;
  className?: string;
}

const sizes = {
  sm: { brick: 'w-6 h-2', gap: 'gap-0.5', rounded: 'rounded-sm', tool: 'h-[1.75rem]' },
  md: { brick: 'w-10 h-3', gap: 'gap-1', rounded: 'rounded', tool: 'h-[2.75rem]' },
  lg: { brick: 'w-14 h-4', gap: 'gap-1', rounded: 'rounded', tool: 'h-[3.5rem]' },
  xl: { brick: 'w-16 h-5', gap: 'gap-1.5', rounded: 'rounded-md', tool: 'h-[4.5rem]' },
  hero: { brick: 'w-20 h-6', gap: 'gap-2', rounded: 'rounded-md', tool: 'h-[5.5rem]' },
};

export function BrickLogo({
  size = 'md',
  showTools = false,
  className = '',
}: BrickLogoProps) {
  const s = sizes[size];

  const bricks = (
    <div className={`inline-flex flex-col ${s.gap}`}>
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
  );

  if (!showTools) {
    return <div className={className}>{bricks}</div>;
  }

  return (
    <div className={`inline-flex items-center ${s.gap} ${className}`}>
      <Image
        src="/shovel.svg"
        alt="Shovel"
        width={48}
        height={96}
        className={`${s.tool} w-auto`}
      />

      {bricks}

      <Image
        src="/garden-fork.svg"
        alt="Garden Fork"
        width={48}
        height={96}
        className={`${s.tool} w-auto`}
      />
    </div>
  );
}
