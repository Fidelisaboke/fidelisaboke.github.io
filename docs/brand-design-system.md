# Purple Mint — Personal Brand Design System

> **Theme:** Calm Tech / Purple Mint
> **Core Feel:** Regal confidence, modern minimalism, refined engineering

## 1. Brand Overview

This design system is built around a **refined, modern purple-and-mint aesthetic**, balancing:

- **Professionalism** — tech/developer focus with premium polish
- **Approachability** — cool mint/teal accents keep the purple fresh and energetic
- **Uniqueness** — a distinctive palette that separates you from the typical blue/gray developer portfolio

## 2. Typography

### Primary Font (Headings)

**Sora**

- Use for: headings, hero text, section titles
- Characteristics: modern, geometric, distinctive
- Weights: 600, 700, 800

### Secondary Font (Body)

**Inter**

- Use for: paragraphs, UI text, labels, buttons
- Characteristics: highly readable, clean, versatile
- Weights: 400, 500, 600, 700

## 3. Core Color System

### 🌙 Dark Mode (Default)

| Token | Hex | Usage |
|---|---|---|
| **Primary** | `#A78BFA` | Buttons (CTA), links, active states |
| **Primary Hover** | `#9474EB` | Hover/pressed states |
| **Secondary** | `#5EEAD4` | Highlights, accent UI, gradient endpoint |
| **Background** | `#0D0B14` | Main page background |
| **Background Subtle** | `#13111D` | Input fields, subtle layering |
| **Surface** | `#1A1726` | Cards, containers, navbar fills |
| **Surface Glass** | `rgba(26, 23, 38, 0.78)` | Glassmorphism panels |
| **Border** | `rgba(167, 139, 250, 0.15)` | Card borders, dividers |
| **Text Primary** | `#EDEBF4` | Headings, body text |
| **Text Secondary** | `#A09BB5` | Subtitles, muted labels |

### 🌞 Light Mode

| Token | Hex | Usage |
|---|---|---|
| **Primary** | `#7C5CCA` | Buttons (CTA), links, active states |
| **Primary Hover** | `#6A4BB5` | Hover/pressed states |
| **Secondary** | `#14B8A6` | Highlights, accent UI, gradient endpoint |
| **Background** | `#FAF8FF` | Main page background (near-white lavender) |
| **Background Subtle** | `#F0ECFA` | Input fields, subtle accents |
| **Surface** | `#FFFFFF` | Cards, containers |
| **Surface Glass** | `rgba(255, 255, 255, 0.82)` | Glassmorphism panels |
| **Border** | `rgba(124, 92, 202, 0.15)` | Card borders, dividers |
| **Text Primary** | `#1A1726` | Headings, body text |
| **Text Secondary** | `#5A5370` | Subtitles, muted labels |

## 4. Gradient System

### 4.1 Primary → Secondary (Diagonal)

```css
/* Dark */  linear-gradient(135deg, #A78BFA, #5EEAD4)
/* Light */ linear-gradient(135deg, #7C5CCA, #14B8A6)
```

Use for: Hero section text, banners, gradient headings

### 4.2 Primary Only (Button Gradient)

```css
linear-gradient(135deg, #8B6FE0, #A78BFA)
```

Use for: Primary buttons, interactive CTA elements

### 4.3 Secondary Only (Mint Gradient)

```css
/* Dark */  linear-gradient(135deg, #3DD4BE, #5EEAD4)
/* Light */ linear-gradient(135deg, #0D9488, #14B8A6)
```

Use for: Accent highlights, secondary interactive elements

### 4.4 Dark Mode Hero

```css
linear-gradient(135deg, #0D0B14, #1A1726, #151220)
```

Use for: Dark hero section depth, background layering

### 4.5 Light Mode Hero

```css
linear-gradient(135deg, #FAF8FF, #F5F0FF, #FAF8FF)
```

Use for: Light hero section, soft background transitions

### 4.6 Card Border Glow

```css
/* Dark */  linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(94, 234, 212, 0.12))
/* Light */ linear-gradient(135deg, rgba(124, 92, 202, 0.35), rgba(20, 184, 166, 0.15))
```

Use for: Subtle gradient borders on glass cards (via CSS mask technique)

## 5. Usage Rules

### 5.1 Color Hierarchy

- **Primary (Purple)** → Actions only: buttons, links, active nav states, skill tag text
- **Secondary (Mint/Teal)** → Accents only: gradient endpoints, highlights, badges
- **Neutrals** → Structure and layout: borders, dividers, muted text

### 5.2 Background Rules

- Use `#FAF8FF` (light) or `#0D0B14` (dark) as the main page background
- **Never use pure white or pure black** as page backgrounds
- Use `bg-subtle` (`#F0ECFA` / `#13111D`) for form inputs and recessed surfaces
- Reserve `surface` (`#FFFFFF` / `#1A1726`) for cards and elevated containers

### 5.3 Contrast & Readability

- Always use light text on dark backgrounds, dark text on light backgrounds
- Avoid placing mint text directly on purple backgrounds (can clash)
- Both modes maintain WCAG AA contrast ratios for body text

### 5.4 Gradient Usage

**Use gradients for:**
- Hero headlines (purple → mint text gradient)
- Primary action buttons (purple-only gradient)
- Card border accents

**Avoid:**
- Long text backgrounds
- Overusing gradients across the entire UI
- Gradient body text (only headlines)

### 5.5 Component Guidelines

#### Buttons
- **Primary:** Purple gradient (`#8B6FE0` → `#A78BFA`)
- **Hover:** Lift (-3px) + enhanced purple glow
- **Secondary:** Surface fill + 1px border

#### Cards
- Glassmorphism with `backdrop-filter: blur(16px)`
- Subtle purple→mint gradient border via `.glow-border` CSS mask
- Hover state: lift (-6px) + glow shadow

#### Links
- Purple (primary color)
- Hover: slightly darker purple shade

#### Skill Tags / Badges
- Purple-tinted background (`rgba(167, 139, 250, 0.1)`)
- Purple text color matching primary
- 1px purple border (`rgba(167, 139, 250, 0.2)`)
- Pill-shaped (border-radius: 50px)

#### Navigation
- Glassmorphism navbar, pill-shaped
- Active link: purple text + purple-tinted background
- Theme toggle: circular button in navbar

### 5.6 Brand Personality Rules

This system represents:

- Creative confidence with technical depth
- Cool, modern engineering mindset
- Thoughtful, premium design

**Avoid:**
- Neon or overly saturated colors
- Harsh black/white contrasts
- Over-saturation or competing gradients
- Warm oranges/reds (stay in the cool purple + mint lane)

## 6. Dark Mode Toggle

- Default: **Dark mode** (developer preference, strongest visual impact)
- Toggle: Sun ☀️ / Moon 🌙 icon button in navbar
- Persistence: `localStorage` key `portfolio-theme`
- Transition: All color tokens transition via `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

## 7. Animation & Motion

### Scroll Reveal
- Elements fade in from 30px below with 0.8s duration
- Staggered children: each child delayed by +0.1s

### Hover Micro-interactions
- Cards: `translateY(-6px)` + glow shadow
- Buttons: `translateY(-3px)` + enhanced glow
- Skill tags: `translateY(-1px)`
- Social links: `translateY(-2px)` + border color change

### Hero Ambient Orbs
- Two blurred pseudo-elements (purple + mint)
- Gentle `float` animation (8s cycle, ease-in-out)
- Low opacity (0.06–0.08) to avoid distraction

### Reduced Motion
- All animations and transitions disabled via `prefers-reduced-motion: reduce`
