'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface BrickLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTools?: boolean;
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: { brick: 'w-6 h-2', gap: 'gap-0.5', rounded: 'rounded-sm', tool: 'h-[1.75rem]' },
  md: { brick: 'w-10 h-3', gap: 'gap-1', rounded: 'rounded', tool: 'h-[2.75rem]' },
  lg: { brick: 'w-14 h-4', gap: 'gap-1', rounded: 'rounded', tool: 'h-[3.5rem]' },
  xl: { brick: 'w-16 h-5', gap: 'gap-1.5', rounded: 'rounded-md', tool: 'h-[4.5rem]' },
  hero: { brick: 'w-20 h-6', gap: 'gap-2', rounded: 'rounded-md', tool: 'h-[5.5rem]' },
};

// Movement intensity
const MOVE_DISTANCE = 9;
const ROTATE_AMOUNT = 6;
const EFFECT_RADIUS = 80; // pixels - how far the mouse effect reaches

interface BrickTransform {
  x: number;
  y: number;
  rotate: number;
}

export function BrickLogo({
  size = 'md',
  showTools = false,
  animated = false,
  className = '',
}: BrickLogoProps) {
  const s = sizes[size];
  const [brickTransforms, setBrickTransforms] = useState<Record<number, BrickTransform>>({});
  const brickRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const brickClass = `${s.brick} bg-b8s-orange ${s.rounded} transition-transform duration-300 ease-out`;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!animated) return;

    const newTransforms: Record<number, BrickTransform> = {};

    // Calculate transform for each brick based on mouse position
    Object.entries(brickRefs.current).forEach(([indexStr, brickEl]) => {
      if (!brickEl) return;
      const index = parseInt(indexStr);

      const rect = brickEl.getBoundingClientRect();
      const brickCenterX = rect.left + rect.width / 2;
      const brickCenterY = rect.top + rect.height / 2;

      // Calculate direction away from mouse
      const dx = brickCenterX - e.clientX;
      const dy = brickCenterY - e.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only affect bricks within the effect radius
      if (distance > 0 && distance < EFFECT_RADIUS) {
        // Strength falls off with distance
        const strength = 1 - (distance / EFFECT_RADIUS);

        // Normalize and scale
        const x = (dx / distance) * MOVE_DISTANCE * strength;
        const y = (dy / distance) * MOVE_DISTANCE * strength;
        const rotate = (dx / distance) * ROTATE_AMOUNT * strength;

        newTransforms[index] = { x, y, rotate };
      }
    });

    setBrickTransforms(newTransforms);
  }, [animated]);

  const handleMouseLeave = useCallback(() => {
    setBrickTransforms({});
  }, []);

  const getTransform = (index: number) => {
    const transform = brickTransforms[index];
    if (!transform) return undefined;
    return `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotate}deg)`;
  };

  const renderBrick = (index: number, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${index}`}
      className="relative"
      ref={(el) => { brickRefs.current[index] = el; }}
    >
      {/* Visible brick */}
      <div
        className={brickClass}
        style={{ transform: getTransform(index) }}
      />
    </div>
  );

  const bricks = (
    <div
      className={`inline-flex flex-col ${s.gap}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Row 1: 5 bricks */}
      <div className={`flex ${s.gap}`}>
        {[0, 1, 2, 3, 4].map((i) => renderBrick(i, 'r1'))}
      </div>

      {/* Row 2: 4 bricks */}
      <div className={`flex ${s.gap} justify-center`}>
        {[5, 6, 7, 8].map((i) => renderBrick(i, 'r2'))}
      </div>

      {/* Row 3: 5 bricks */}
      <div className={`flex ${s.gap}`}>
        {[9, 10, 11, 12, 13].map((i) => renderBrick(i, 'r3'))}
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
