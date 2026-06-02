---
name: Peak Performance
colors:
  surface: '#081425'
  surface-dim: '#081425'
  surface-bright: '#2f3a4c'
  surface-container-lowest: '#040e1f'
  surface-container-low: '#111c2d'
  surface-container: '#152031'
  surface-container-high: '#1f2a3c'
  surface-container-highest: '#2a3548'
  on-surface: '#d8e3fb'
  on-surface-variant: '#c5c8b7'
  inverse-surface: '#d8e3fb'
  inverse-on-surface: '#263143'
  outline: '#8f9282'
  outline-variant: '#44483b'
  surface-tint: '#b3d17a'
  primary: '#ffffff'
  on-primary: '#243600'
  primary-container: '#ceee93'
  on-primary-container: '#536d22'
  inverse-primary: '#4d661c'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ceee93'
  primary-fixed-dim: '#b3d17a'
  on-primary-fixed: '#131f00'
  on-primary-fixed-variant: '#364e03'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#081425'
  on-background: '#d8e3fb'
  surface-variant: '#2a3548'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The brand personality is high-octane, disciplined, and uncompromising. Designed for the elite athlete and the dedicated optimizer, the visual language evokes a sense of kinetic energy and clinical precision. 

The design style is **High-Contrast / Bold** mixed with elements of **Glassmorphism**. It utilizes a dark-mode foundation to make high-intensity accents pop, creating a "theater" for the products. The interface should feel like a high-end performance dashboard—technical yet premium. High-quality, desaturated photography of athletes or textured supplements should be used to contrast against the vibrant Electric Lime UI elements.

## Colors

The palette is built on extreme contrast to drive focus and action. 

- **Primary (Electric Lime):** Reserved for high-priority actions, conversion points, and critical data highlights. It represents energy and activation.
- **Secondary (Deep Slate):** The bedrock of the design system. It provides a sophisticated, professional depth that feels more premium than pure black.
- **Neutral (Slate Gray):** Used for secondary containers, borders, and subtle UI layering.
- **Accent (White):** Used for primary typography and high-contrast icons to ensure maximum legibility against the dark background.

Success states should utilize the Electric Lime, while error states should use a high-chroma red (#EF4444) to maintain the aggressive, high-alert aesthetic.

## Typography

The typography strategy prioritizes impact and hierarchy. **Montserrat** is used for all headlines to provide a geometric, powerful, and athletic feel. Large display type should use heavy weights (ExtraBold/Black) with tight letter spacing to create a sense of density and strength.

**Inter** handles all functional and body text. Its neutral, systematic nature ensures that technical product information and supplement facts are easily digestible. Use uppercase styles for labels and navigation to mimic the look of industrial labeling and performance equipment.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The spacing rhythm is based on an 8px base unit.

Layouts should favor asymmetry and large "power" sections. Use generous vertical padding (80px+) between major sections to maintain a premium feel, but keep internal component spacing tight (8px, 16px) to reinforce a dense, technical aesthetic. Content should be contained within a 1280px max-width to ensure readability on ultra-wide monitors, while background sections should bleed edge-to-edge to emphasize the Deep Slate environment.

## Elevation & Depth

Depth is created through **Tonal Layers** and **Glassmorphism** rather than traditional shadows. 

1. **Base Layer:** The Deep Slate (#0F172A) background.
2. **Mid Layer:** Subtle containers using a slightly lighter slate (#1E293B) with 1px solid borders for definition.
3. **Top Layer (Interactive):** Glassmorphic panels used for dashboards and overlays. These feature a background blur (12px - 20px) and a low-opacity white fill (approx 5-10%) to create a "frosted tech" appearance. 

Avoid drop shadows. Instead, use "Glow" effects for primary buttons—a subtle outer glow using the Electric Lime color to make the element appear energized.

## Shapes

The shape language is strictly **Sharp**. 0px border radii are applied to all buttons, input fields, and containers. This reinforces the "hard-edge" athletic performance theme and differentiates the brand from softer, more casual competitors. 

Vertical and horizontal lines used for dividers should be crisp (1px) and often utilize high-contrast colors to create a grid-like, architectural feel across the layout.

## Components

- **Buttons:** Primary buttons are solid Electric Lime with black text, sharp corners, and a 1px lime glow on hover. Secondary buttons are ghost-style with a white or lime 1px border and uppercase typography.
- **Cards:** Product and data cards should use the Deep Slate Mid-Layer color or the Glassmorphic treatment. Use a 1px border (#334155) to define the sharp edges.
- **Input Fields:** Dark backgrounds (#020617) with 1px white borders that transition to Electric Lime on focus. Labels should be small, uppercase, and placed above the field.
- **Chips/Badges:** Small, rectangular badges with solid backgrounds. Use Electric Lime for "In Stock" or "New" and high-contrast Slate for technical specs.
- **Dashboards:** Use thin vertical dividers and glassmorphic sidebars to create a multi-paned "command center" feel for user profiles or subscription management.
- **Data Visualizations:** Use Electric Lime for all active data lines or bars, contrasting against the dark neutral background for maximum "glow" effect.