# 📋 Update Service Icons Plan

**Status: PLANNED**

## Objective
Create and update icons for Landscape Gardening and Garden Maintenance services to improve visual consistency and branding.

## Current State
- ServicesPreview component uses emoji placeholders or basic icons
- Need professional, consistent iconography

## Icon Requirements

### Landscape Gardening Icon
Options to consider:
- Stylized tree/plant
- Garden layout/plan view
- Combination of plant + design elements
- Trowel with seedling

### Garden Maintenance Icon
Options to consider:
- Lawn mower
- Hedge trimmer/shears
- Rake or garden tools
- Plant with care symbol

### General Building Icon
- Brick/wall pattern
- Trowel with bricks
- Hard hat or construction elements

## Design Guidelines

### Style Consistency
- Match the existing shovel and garden fork SVG style
- Line weight: Similar to existing tool icons
- Colors:
  - Primary: bates-orange (#D97706 or similar)
  - Outline/details: bates-navy or neutral
- Rounded corners to match brick border-radius
- Consistent sizing (base ~64x64, scalable SVG)

### File Format
- SVG format for scalability
- Optimized for web (minimal file size)
- Clean paths, no embedded fonts

## Implementation Tasks

### Phase 1: Icon Design
- [ ] Design Landscape Gardening icon
- [ ] Design Garden Maintenance icon
- [ ] Design General Building icon (if needed)
- [ ] Create icon variations (filled, outline, mono)

### Phase 2: Integration
- [ ] Add SVG files to `/public/icons/`
- [ ] Update ServicesPreview component to use new icons
- [ ] Update Services page (when created) to use icons
- [ ] Ensure icons scale properly with different sizes

### Phase 3: Optional Enhancements
- [ ] Add hover states/animations
- [ ] Create icon sprite for performance
- [ ] Add dark mode variants

## File Locations

```
/public/icons/
  landscape-gardening.svg
  garden-maintenance.svg
  general-building.svg
```

## Component Updates

```tsx
// ServicesPreview.tsx
const serviceIcons = {
  landscaping: '/icons/landscape-gardening.svg',
  maintenance: '/icons/garden-maintenance.svg',
  building: '/icons/general-building.svg',
};
```

## Icon Sources/Options

1. **Custom Design** - Create from scratch to match brand
2. **Icon Libraries** (with customization):
   - Heroicons
   - Lucide
   - Phosphor Icons
   - Tabler Icons
3. **Commission** - Hire designer for custom icons

## Notes
- Icons should work at small sizes (24px) and large (128px+)
- Consider accessibility - icons should have proper alt text
- May need multiple variants for different contexts
