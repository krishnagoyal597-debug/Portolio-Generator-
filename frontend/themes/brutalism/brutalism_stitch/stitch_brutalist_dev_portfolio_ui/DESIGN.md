---
name: Neo-Raw Developer Edition
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#003fd8'
  on-secondary: '#ffffff'
  secondary-container: '#2558ff'
  on-secondary-container: '#eaebff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c3ff'
  on-secondary-fixed: '#001355'
  on-secondary-fixed-variant: '#0036bc'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 96px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 24px
  border-width: 3px
  shadow-offset: 6px
---

## Brand & Style

The design system is a **Neo-Brutalist** framework tailored for developer portfolios. It prioritizes clarity, raw architectural structure, and high-impact visual hierarchy. The personality is confident, technically proficient, and unapologetically bold.

The aesthetic rejects the "softness" of modern SaaS design in favor of:
- **High-Contrast Geometry:** Using sharp 90-degree angles and thick strokes.
- **Editorial Impact:** Oversized typography that functions as a primary design element.
- **Utility-First:** Clear separation of content through rigid grids and "hard" shadows that mimic physical depth without gradients.
- **Developer-Centric:** Monospaced accents that nod to code environments while maintaining a professional, creative edge.

## Colors

The palette is built on a foundation of high-contrast neutrals punctuated by hyper-saturated accents.

- **Base:** The background uses an off-white paper tone (`#F5F5F0`) to reduce eye strain compared to pure white, while keeping the "raw" feel.
- **Primary:** Solid black (`#000000`) is used for all structural elements, borders, and heavy typography.
- **Accents:** 
    - **Electric Yellow (`#DFFF00`):** Used for primary calls-to-action, highlights, and status indicators.
    - **Cobalt Blue (`#2457FF`):** Used for secondary interactions, links, and code-related metadata.
- **Interaction:** Hover states should not use transitions. Colors should "snap" instantly between states to maintain the brutalist feel.

## Typography

Typography is used as a structural material. **Space Grotesk** provides a technical yet expressive geometric feel for headings. **Hanken Grotesk** ensures readability for long-form project descriptions, while **JetBrains Mono** is reserved for technical data and labels.

**Key Rules:**
- **Headlines:** Use tight line height and negative letter-spacing for large displays. They should feel dense and heavy.
- **Monospace:** Always uppercase when used for labels or tags to increase the "utility" look.
- **Hierarchy:** Use extreme scale differences (e.g., a 96px display next to 16px body) to create visual interest.

## Layout & Spacing

This design system utilizes a **Fixed-Fluid Hybrid Grid**. The content is contained within a maximum width (e.g., 1440px) but uses a strict 12-column system.

- **Gutter & Margins:** Large 24px gutters create "breathing room" between heavy-bordered components. 
- **The 8px Rhythm:** All spacing (padding, margins, gaps) must be multiples of 8px.
- **Borders as Grid:** Every major section should be separated by a 3px solid black border. Use horizontal and vertical "rules" to divide content like an editorial newspaper.
- **Stacking:** On mobile, columns collapse into a single vertical stack. 3px borders remain consistent across all breakpoints to preserve the style's weight.

## Elevation & Depth

Depth in this system is strictly **2D-Isometric**. 
- **Hard Shadows:** No blurs are permitted. Elevation is represented by a solid black offset (6px 6px).
- **Directionality:** All shadows must cast to the bottom-right (+6px X, +6px Y).
- **Active State:** When an element is clicked/pressed, it should translate exactly 6px right and 6px down, while the shadow disappears. This creates a "mechanical" click feel.
- **Layering:** Use primary colors (Yellow or Blue) for the surface of "raised" elements to make them pop against the neutral background.

## Shapes

The shape language is **strictly orthogonal**.
- **No Border Radius:** Every container, button, and input field must have 0px corner radius.
- **Right Angles:** Use 90-degree corners to reinforce the brutalist, architectural theme.
- **Stroke:** All containers must have a 3px black stroke. Elements without a stroke should only be used for secondary text or background decor.

## Components

### Buttons
- **Primary:** Electric Yellow background, 3px black border, black text (Bold Sans). Hard shadow (6px).
- **Secondary:** Cobalt Blue background, 3px black border, white text. Hard shadow (6px).
- **Hover:** The button should translate -2px -2px to increase the shadow size to 8px.

### Cards
- **Project Card:** White or Grey background, 3px border. Large headline. Tag labels in Monospace at the top-right.
- **Shadow:** All cards must have the 6px hard black shadow.

### Input Fields
- **Style:** Background `#FFFFFF`, 3px black border, 0px radius. 
- **Focus:** Background changes to Electric Yellow or adds a thick inner shadow.

### Chips/Tags
- **Style:** Small, rectangular (0px radius), 2px border. Using Monospace font.

### Lists
- **Style:** Separated by 3px horizontal black lines. No bullet points; use custom "arrow" icons (e.g., `->`) in Electric Yellow.