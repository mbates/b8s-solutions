'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Session storage key for tracking if animation has played
const ANIMATION_PLAYED_KEY = 'brickAnimationPlayed';

interface BrickLogoProps {
  /** Scale multiplier - 1 is base size, 2 is double, 0.5 is half, etc. */
  scale?: number;
  showTools?: boolean;
  showNavLinks?: boolean;
  showTitle?: boolean;
  animated?: boolean;
  className?: string;
}

// Navigation links for middle row bricks
const navLinks = [
  { href: '/', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Base dimensions (in pixels) - everything scales from these
const BASE = {
  brickWidth: 85,
  brickHeight: 29,
  gap: 8,
  borderRadius: 6,
  fontSize: 14,
  titleFontSize: 48,
};

// Hover movement intensity (scales with size)
const BASE_MOVE_DISTANCE = 8;
const BASE_ROTATE_AMOUNT = 6;
const BASE_EFFECT_RADIUS = 100;

// Loading animation timing - Matrix-style cascade
const ROW_DELAY = 0.35;

// Pre-computed stagger offsets for each brick
const brickStaggerOffsets = [
  0.0, 0.12, 0.05, 0.18, 0.08, 0.1, 0.0, 0.15, 0.06, 0.04, 0.14, 0.0, 0.1, 0.2,
];

interface BrickTransform {
  x: number;
  y: number;
  rotate: number;
}

export function BrickLogo({
  scale = 1,
  showTools = false,
  showNavLinks = false,
  showTitle = false,
  animated = false,
  className = '',
}: BrickLogoProps) {
  const pathname = usePathname();
  const [brickTransforms, setBrickTransforms] = useState<
    Record<number, BrickTransform>
  >({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [animationAlreadyPlayed, setAnimationAlreadyPlayed] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [shovelShaking, setShovelShaking] = useState(false);
  const [forkShaking, setForkShaking] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const brickRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const shovelRef = useRef<HTMLDivElement | null>(null);
  const forkRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);

  // Scaled dimensions
  const brickWidth = BASE.brickWidth * scale;
  const brickHeight = BASE.brickHeight * scale;
  const gap = BASE.gap * scale;
  const borderRadius = BASE.borderRadius * scale;
  const fontSize = BASE.fontSize * scale;
  const titleFontSize = BASE.titleFontSize * scale;

  // Tool height - use measured content height if available, otherwise calculate
  const brickWallHeight = brickHeight * 3 + gap * 2;
  const titleTextHeight = showTitle ? titleFontSize * 2.4 : 0;
  const calculatedHeight = titleTextHeight + (showTitle ? gap : 0) + brickWallHeight;
  const toolHeight = contentHeight > 0 ? contentHeight : calculatedHeight;

  // Scaled hover parameters
  const moveDistance = BASE_MOVE_DISTANCE * scale;
  const rotateAmount = BASE_ROTATE_AMOUNT * scale;
  const effectRadius = BASE_EFFECT_RADIUS * scale;

  // Check sessionStorage on mount to see if animation already played this session
  useEffect(() => {
    try {
      const alreadyPlayed = sessionStorage.getItem(ANIMATION_PLAYED_KEY) === 'true';
      if (alreadyPlayed) {
        setAnimationAlreadyPlayed(true);
        setAnimationComplete(true);
      }
    } catch {
      // sessionStorage not available (SSR or privacy mode)
    }
    setHasLoaded(true);
  }, []);

  // Measure center content height after render
  useEffect(() => {
    if (centerRef.current) {
      setContentHeight(centerRef.current.offsetHeight);
    }
  }, [scale, showTitle]);

  // Set animation complete after animation finishes, and persist to sessionStorage
  useEffect(() => {
    if (!hasLoaded || animationAlreadyPlayed) return;
    const maxDelay = 2 * ROW_DELAY + Math.max(...brickStaggerOffsets);
    const animationDuration = 0.8;
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      try {
        sessionStorage.setItem(ANIMATION_PLAYED_KEY, 'true');
      } catch {
        // sessionStorage not available
      }
    }, (maxDelay + animationDuration) * 1000 + 100);
    return () => clearTimeout(timer);
  }, [hasLoaded, animationAlreadyPlayed]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!animated) return;

      const newTransforms: Record<number, BrickTransform> = {};

      Object.entries(brickRefs.current).forEach(([indexStr, brickEl]) => {
        if (!brickEl) return;
        const index = parseInt(indexStr);

        const rect = brickEl.getBoundingClientRect();
        const brickCenterX = rect.left + rect.width / 2;
        const brickCenterY = rect.top + rect.height / 2;

        const dx = brickCenterX - e.clientX;
        const dy = brickCenterY - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0 && distance < effectRadius) {
          const strength = 1 - distance / effectRadius;
          const x = (dx / distance) * moveDistance * strength;
          const y = (dy / distance) * moveDistance * strength;
          const rotate = (dx / distance) * rotateAmount * strength;
          newTransforms[index] = { x, y, rotate };
        }
      });

      setBrickTransforms(newTransforms);

      // Check proximity to tools for shake effect
      if (shovelRef.current) {
        const rect = shovelRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          (centerX - e.clientX) ** 2 + (centerY - e.clientY) ** 2
        );
        if (distance < effectRadius && !shovelShaking) {
          setShovelShaking(true);
          setTimeout(() => setShovelShaking(false), 400);
        }
      }

      if (forkRef.current) {
        const rect = forkRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          (centerX - e.clientX) ** 2 + (centerY - e.clientY) ** 2
        );
        if (distance < effectRadius && !forkShaking) {
          setForkShaking(true);
          setTimeout(() => setForkShaking(false), 400);
        }
      }
    },
    [
      animated,
      effectRadius,
      moveDistance,
      rotateAmount,
      shovelShaking,
      forkShaking,
    ]
  );

  const handleMouseLeave = useCallback(() => {
    setBrickTransforms({});
  }, []);

  const getTransform = (index: number) => {
    const transform = brickTransforms[index];
    if (!transform) return undefined;
    return `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotate}deg)`;
  };

  const getRowForBrick = (index: number) => {
    if (index < 5) return 2;
    if (index < 9) return 1;
    return 0;
  };

  const brickStyle: React.CSSProperties = {
    width: brickWidth,
    height: brickHeight,
    borderRadius: borderRadius,
  };

  const renderBrick = (index: number, keyPrefix: string) => {
    const row = getRowForBrick(index);
    const stagger = brickStaggerOffsets[index] || 0;
    const animationDelay = `${row * ROW_DELAY + stagger}s`;

    let stateClass = 'animate-brick-drop';
    if (animationComplete) {
      stateClass = '';
    }

    return (
      <div
        key={`${keyPrefix}-${index}`}
        className='relative'
        ref={(el) => {
          brickRefs.current[index] = el;
        }}
      >
        <div
          className={`bg-bates-orange transition-transform duration-300 ease-out ${stateClass}`}
          style={{
            ...brickStyle,
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
    // For root path, only match exact. For others, match prefix for sub-pages
    const isActive = nav.href === '/'
      ? pathname === '/'
      : pathname === nav.href || pathname?.startsWith(nav.href + '/');

    let stateClass = 'animate-brick-drop';
    if (animationComplete) {
      stateClass = '';
    }

    // Active brick is navy blue, others are orange
    const bgClass = isActive
      ? 'bg-bates-navy hover:bg-blue-800'
      : 'bg-bates-orange hover:bg-bates-orange-light';

    return (
      <div
        key={`nav-${index}`}
        className='relative'
        ref={(el) => {
          brickRefs.current[index] = el;
        }}
      >
        <Link
          href={nav.href}
          className={`${bgClass} cursor-pointer flex items-center justify-center transition-all duration-300 ease-out ${stateClass}`}
          style={{
            ...brickStyle,
            transform: animationComplete ? getTransform(index) : undefined,
            animationDelay: !animationComplete ? animationDelay : undefined,
            animationPlayState: hasLoaded ? 'running' : 'paused',
          }}
        >
          <span
            className='text-white font-heading font-semibold'
            style={{ fontSize }}
          >
            {nav.label}
          </span>
        </Link>
      </div>
    );
  };

  const bricks = (
    <div
      className='inline-flex flex-col'
      style={{ gap }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className='flex' style={{ gap }}>
        {[0, 1, 2, 3, 4].map((i) => renderBrick(i, 'r1'))}
      </div>

      <div className='flex justify-center' style={{ gap }}>
        {showNavLinks
          ? [5, 6, 7, 8].map((i, navIdx) => renderNavBrick(i, navIdx))
          : [5, 6, 7, 8].map((i) => renderBrick(i, 'r2'))}
      </div>

      <div className='flex' style={{ gap }}>
        {[9, 10, 11, 12, 13].map((i) => renderBrick(i, 'r3'))}
      </div>
    </div>
  );

  const title = showTitle ? (
    <h1
      className='font-logo font-bold text-bates-navy flex flex-col items-center'
      style={{ fontSize: titleFontSize, lineHeight: 1.1 }}
    >
      <span style={{ letterSpacing: '0.35em' }}>Bates</span>
      <span>Groundworks</span>
    </h1>
  ) : null;

  if (!showTools) {
    return (
      <div className={className}>
        {title}
        {bricks}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`} style={{ gap }}>
      <div
        ref={shovelRef}
        className={shovelShaking ? 'animate-tool-shake' : ''}
      >
        <img
          src='/shovel.svg'
          alt='Shovel'
          style={{ height: `${toolHeight}px`, width: 'auto' }}
        />
      </div>

      <div ref={centerRef} className='flex flex-col items-center' style={{ gap }}>
        {title}
        {bricks}
      </div>

      <div ref={forkRef} className={forkShaking ? 'animate-tool-shake' : ''}>
        <img
          src='/garden-fork.svg'
          alt='Garden Fork'
          style={{ height: `${toolHeight}px`, width: 'auto' }}
        />
      </div>
    </div>
  );
}
