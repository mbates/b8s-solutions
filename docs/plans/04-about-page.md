# About Page Plan

## Objective
Create an about page that builds trust and showcases the people behind Bates Groundworks.

## Page Sections

### 1. Company Story
- Brief history of Bates Groundworks
- How the business started
- Mission and values
- What sets us apart

### 2. Meet the Team
- Owner/founder profile with photo
- Key team members (if applicable)
- Qualifications and experience

### 3. Our Values
- Quality workmanship
- Reliability and punctuality
- Clear communication
- Customer satisfaction
- Environmental responsibility

### 4. Accreditations & Insurance
- Public liability insurance
- Any trade accreditations
- Certifications (if any)

### 5. Service Area
- Map showing coverage area
- List of areas served
- Travel policy

### 6. Call to Action
- Reuse existing CallToAction component

## Page Structure

```
/src/app/about/page.tsx
/src/components/sections/
  TeamMember.tsx
  ValueCard.tsx
  ServiceAreaMap.tsx (optional)
```

## Technical Tasks

- [ ] Create `/src/app/about/page.tsx`
- [ ] Create team member component
- [ ] Create values grid component
- [ ] Add team photos to `/public/team/`
- [ ] Optional: Integrate Google Maps for service area
- [ ] Add meta tags for SEO

## Content Needed

- [ ] Company story/history text
- [ ] Owner bio and photo
- [ ] Team member photos (if applicable)
- [ ] List of qualifications/certifications
- [ ] Service area details
- [ ] Insurance/accreditation logos

## Design Notes

- Professional but approachable tone
- Use real photos where possible
- Include social proof elements
- Keep text concise and scannable
- Mobile-first design

## Optional Enhancements

- Customer testimonials carousel
- Years in business counter
- Projects completed counter
- Google Maps embed for service area
