# Design Brief — Shapetech Solutions

## Purpose
Modern redesign of boutique B2B tech design and full-stack development firm. Dark, premium aesthetic with white text and teal/cyan accents. Dynamic, fluid component design conveys technical expertise with contemporary visual sophistication.

## Tone
Premium, professional, refined. Fluid and organic—curved sections, smooth transitions, dynamic depth. Teal/cyan accent used intentionally for focus. Tech-forward but approachable.

## Palette

| Token | OKLCH | Intent |
|-------|-------|--------|
| Background (Primary) | `0.11 0.04 267` | Deep navy—matches #1a1f2e, authority, tech credibility |
| Card/Elevated | `0.18 0.05 270` | Slightly lighter navy for depth and hierarchy |
| Accent (Action) | `0.75 0.12 195` | Teal/cyan—matches #00bcd4, CTAs, highlights, emphasis |
| Foreground (Text) | `0.98 0 0` | Near white for all text on dark backgrounds |
| Muted (Secondary) | `0.40 0.02 270` | Muted grey—secondary text, dividers, subtle elements |
| Border | `0.24 0.05 270` | Subtle navy borders and dividers |

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Space Grotesk | Headlines, hero text, brand moments—geometric, modern, tech-forward |
| Body | General Sans | Navigation, copy, labels—clean, legible, professional |
| Mono | Geist Mono | Code blocks, technical references—maintains system legibility |

## Shape Language
Border radius: **16–20px** (cards, flowing containers) / **40%+ organic** (accent blobs, accent elements) / **0** (structural). Moderate to generous rounding creates fluid, approachable feel. Curves soften technical edges.

## Elevation & Depth
- **Flat**: Default background, muted text, subtle dividers
- **Subtle**: Cards with organic shadows (`card-fluid`), borders at 30% opacity
- **Elevated**: Modals, hero sections, accent gradients, lifted with transform on interaction
- **Depth by color + shadow**: Layered backgrounds with soft shadows; no flat surfaces

## Structural Zones

| Zone | Background | Style | Intent |
|------|------------|-------|--------|
| Header/Nav | `--background` | Minimal border, smooth fade divider | Navigation anchors top; dissolves into content |
| Hero | `--background` | Curved bottom edge, accent gradient accent bar | Full-bleed hero flows into next section with curve |
| Content Sections | Alternating `--background` / `--card` | Rounded containers, soft borders, subtle shadow | Rhythm via color and organic depth, not flat edges |
| Cards | `--card` | Rounded 16px, soft shadow, organic hover lift | Smooth depth; interactive elevation on hover |
| Footer | `--background` | Curved top, border-top with gradient fade | Grounded closure; accent on secondary links |
| Forms/Inputs | `--input` (navy) | Rounded 12px, subtle border, focus glow | Focus state uses accent color with soft ring |

## Component Patterns
- **Buttons**: Primary (accent bg, rounded), Secondary (muted bg, rounded), Tertiary (accent text, underline)
- **Cards**: `--card` background, rounded 16px, organic shadow, hover lift via transform
- **Links**: White text, accent underline, smooth color transition on hover
- **Dividers**: Gradient fade from transparent→border→transparent (horizontal flow)
- **Accent blocks**: Diagonal gradient, organic blob shapes, subtle animation on scroll

## Motion
Smooth transitions by default (`all 0.3s`). Flowing animations for accent elements. Hover states elevate via transform + shadow. Scroll animations optional but enhance visual narrative. No bouncy or excessive animations—focus on fluidity and clarity.

## Fluid Utilities
- `.card-fluid`: Rounded container with soft shadow, hover lift
- `.section-curve-bottom`: SVG-like curved bottom edge for section separation
- `.accent-diagonal`: Diagonal gradient accent bars
- `.divider-fluid`: Gradient fade divider
- `.animate-flowing`: Subtle vertical float effect
- `.blob-accent`: Organic asymmetric shape
- `.link-accent`: Smooth underline with color transition
- `.bg-texture`: Subtle radial gradient texture overlay

## Responsive Breakpoints
Mobile-first: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1400px`. Curves and animations adjust for performance on mobile. Hero typography scales; nav collapses on `sm`.

## Constraints
- Only semantic color tokens—no arbitrary hex or rgb()
- No full-page gradients; accents via diagonal bars and subtle overlays
- Max width: `1400px`
- Spacing: `8px` base unit
- Curves soften all major sections—no hard 90° corners on zone boundaries

## Signature Detail
Teal/cyan accent reserved for CTAs, accent bars, and interactive highlights. Curved section boundaries and organic shapes replace boxy layouts. Fluid hover states with subtle elevation create sense of interactive responsiveness. Premium tech aesthetic balances deep navy authority with teal accents and approachable curves.
