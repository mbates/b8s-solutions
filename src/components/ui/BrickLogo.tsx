'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BrickLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTools?: boolean;
  showNavLinks?: boolean;
  animated?: boolean;
  className?: string;
}

// Navigation links for middle row bricks
const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const sizes = {
  sm: { brick: 'w-6 h-2', gap: 'gap-0.5', rounded: 'rounded-sm', tool: 'h-[1.75rem]', text: 'text-[6px]' },
  md: { brick: 'w-10 h-3', gap: 'gap-1', rounded: 'rounded', tool: 'h-[2.75rem]', text: 'text-[8px]' },
  lg: { brick: 'w-14 h-4', gap: 'gap-1', rounded: 'rounded', tool: 'h-[3.5rem]', text: 'text-[10px]' },
  xl: { brick: 'w-16 h-5', gap: 'gap-1.5', rounded: 'rounded-md', tool: 'h-[4.5rem]', text: 'text-xs' },
  hero: { brick: 'w-20 h-6', gap: 'gap-2', rounded: 'rounded-md', tool: 'h-[5.5rem]', text: 'text-sm' },
};

// Hover movement intensity
const MOVE_DISTANCE = 9;
const ROTATE_AMOUNT = 6;
const EFFECT_RADIUS = 80; // pixels - how far the mouse effect reaches

// Loading animation timing - Matrix-style cascade
const ROW_DELAY = 0.35; // seconds between each row

// Pre-computed stagger offsets for each brick - more spread out like Matrix rain
const brickStaggerOffsets = [
  // Row 1 (5 bricks)
  0.0, 0.12, 0.05, 0.18, 0.08,
  // Row 2 (4 bricks)
  0.1, 0.0, 0.15, 0.06,
  // Row 3 (5 bricks)
  0.04, 0.14, 0.0, 0.1, 0.2,
];

interface BrickTransform {
  x: number;
  y: number;
  rotate: number;
}

export function BrickLogo({
  size = 'md',
  showTools = false,
  showNavLinks = false,
  animated = false,
  className = '',
}: BrickLogoProps) {
  const s = sizes[size];
  const [brickTransforms, setBrickTransforms] = useState<Record<number, BrickTransform>>({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const brickRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Trigger loading animation on mount
  useEffect(() => {
    // Small delay to ensure CSS is ready
    const timer = setTimeout(() => setHasLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Mark animation complete after all bricks have dropped
  useEffect(() => {
    if (!hasLoaded) return;
    // Calculate max animation time: last row delay + max stagger + animation duration
    const maxDelay = 2 * ROW_DELAY + Math.max(...brickStaggerOffsets);
    const animationDuration = 0.8; // matches tailwind config
    const timer = setTimeout(() => setAnimationComplete(true), (maxDelay + animationDuration) * 1000 + 100);
    return () => clearTimeout(timer);
  }, [hasLoaded]);

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

  // Get the row number for a brick index (reversed - bottom first)
  const getRowForBrick = (index: number) => {
    if (index < 5) return 2;  // Top row drops last
    if (index < 9) return 1;  // Middle row drops second
    return 0;                  // Bottom row drops first
  };

  const renderBrick = (index: number, keyPrefix: string) => {
    const row = getRowForBrick(index);
    const stagger = brickStaggerOffsets[index] || 0;
    const animationDelay = `${row * ROW_DELAY + stagger}s`;

    // Determine brick state classes
    let stateClass = 'animate-brick-drop'; // Always use animation class
    if (animationComplete) {
      stateClass = ''; // Remove animation class once complete for hover to work
    }

    return (
      <div
        key={`${keyPrefix}-${index}`}
        className="relative"
        ref={(el) => { brickRefs.current[index] = el; }}
      >
        {/* Visible brick */}
        <div
          className={`${brickClass} ${stateClass}`}
          style={{
            transform: animationComplete ? getTransform(index) : undefined,
            animationDelay: !animationComplete ? animationDelay : undefined,
            animationPlayState: hasLoaded ? 'running' : 'paused',
          }}
        />
      </div>
    );
  };

  const renderNavBrick = (index: number, navIndex: number) => {
    const row = getRowForBrick(index);
    const stagger = brickStaggerOffsets[index] || 0;
    const animationDelay = `${row * ROW_DELAY + stagger}s`;
    const nav = navLinks[navIndex];

    // Determine brick state classes
    let stateClass = 'animate-brick-drop';
    if (animationComplete) {
      stateClass = '';
    }

    return (
      <div
        key={`nav-${index}`}
        className="relative"
        ref={(el) => { brickRefs.current[index] = el; }}
      >
        <Link
          href={nav.href}
          className={`${brickClass} ${stateClass} flex items-center justify-center hover:bg-b8s-orange-light cursor-pointer`}
          style={{
            transform: animationComplete ? getTransform(index) : undefined,
            animationDelay: !animationComplete ? animationDelay : undefined,
            animationPlayState: hasLoaded ? 'running' : 'paused',
          }}
        >
          <span className={`text-white font-heading ${s.text} font-semibold`}>
            {nav.label}
          </span>
        </Link>
      </div>
    );
  };

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

      {/* Row 2: 4 bricks (navigation links when enabled) */}
      <div className={`flex ${s.gap} justify-center`}>
        {showNavLinks
          ? [5, 6, 7, 8].map((i, navIdx) => renderNavBrick(i, navIdx))
          : [5, 6, 7, 8].map((i) => renderBrick(i, 'r2'))
        }
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
