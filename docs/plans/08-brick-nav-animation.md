# Brick Navigation Animation Plan

**Status: PENDING**

## Objective
Enhance the brick navigation links with a satisfying click animation that provides visual feedback when navigating to a new page.

## Animation Requirements

### 1. Brick Bounce (3D Press Effect)
When a navigation brick is clicked:
- **Scale down** slightly (like pressing a button) - `scale(0.92)`
- **Perspective transform** for 3D depth - subtle `rotateX` tilt
- **Quick bounce back** before navigation occurs
- Duration: ~200-300ms total

### 2. Background Color Transition
On click, animate the page background:
- Transition from current color to `bates-navy` blue
- Smooth fade that begins on click
- Creates a visual "handoff" to the next page

---

## Implementation Approach

### Option A: CSS-Only (Simpler)
- Use `:active` pseudo-class for the press effect
- Add CSS `@keyframes` for the bounce animation
- Background transition via CSS variables + transition

### Option B: React State (More Control)
- `onClick` handler to trigger animation state
- Delay navigation until animation completes
- More control over timing and sequencing
- Can coordinate brick + background animations

**Recommended: Option B** - Gives us control to ensure the animation completes before navigation.

---

## Technical Details

### Files to Modify
- `src/components/ui/BrickLogo.tsx` - Add click animation to nav bricks
- `src/app/globals.css` - Add keyframes for brick-press animation
- `src/app/layout.tsx` - Add background transition wrapper (or context)

### Animation Keyframes

```css
@keyframes brick-press {
  0% {
    transform: scale(1) perspective(500px) rotateX(0deg);
  }
  40% {
    transform: scale(0.92) perspective(500px) rotateX(8deg);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  70% {
    transform: scale(1.02) perspective(500px) rotateX(-2deg);
  }
  100% {
    transform: scale(1) perspective(500px) rotateX(0deg);
  }
}
```

### Navigation Flow
1. User clicks brick
2. Prevent default navigation
3. Apply `brick-press` animation class
4. Start background fade to navy
5. After ~250ms, trigger `router.push(href)`
6. Page navigates (background already transitioning)

### Background Transition
- Wrap app in a container with background color
- Use CSS transition on background-color
- Toggle class or CSS variable to trigger transition
- Duration: ~300-400ms

---

## Considerations

### Accessibility
- Animation should be fast enough not to impede navigation
- Respect `prefers-reduced-motion` - skip animations for users who prefer reduced motion
- Ensure keyboard navigation still works (Enter key should trigger same animation)

### Mobile
- Touch feedback should feel responsive
- Consider `touchstart` for immediate visual feedback

### Performance
- Use `transform` and `opacity` only (GPU accelerated)
- Avoid layout-triggering properties

---

## PR Breakdown

### Single PR: Brick Navigation Animation
**Branch:** `feature/brick-nav-animation`

**Scope:**
- Add `brick-press` keyframe animation
- Update `renderNavBrick` to handle click animation
- Add background transition wrapper
- Add `prefers-reduced-motion` media query support
- Test on desktop and mobile

---

## Current Progress

### Pending
- [ ] Implementation

---

## Notes
- Keep animation snappy (under 300ms) so navigation feels instant
- The 3D effect should be subtle - we're pressing a brick, not flipping it
- Background color should match the navy used in headers/footers
