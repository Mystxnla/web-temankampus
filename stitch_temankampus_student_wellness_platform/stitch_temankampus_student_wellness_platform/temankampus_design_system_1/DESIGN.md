---
name: TemanKampus Design System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#404943'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#707972'
  outline-variant: '#c0c9c1'
  surface-tint: '#33694e'
  primary: '#30664b'
  on-primary: '#ffffff'
  primary-container: '#4a7f63'
  on-primary-container: '#f6fff6'
  inverse-primary: '#9ad3b2'
  secondary: '#0060ac'
  on-secondary: '#ffffff'
  secondary-container: '#68abff'
  on-secondary-container: '#003e73'
  tertiary: '#65528a'
  on-tertiary: '#ffffff'
  tertiary-container: '#7f6aa5'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b6efcd'
  primary-fixed-dim: '#9ad3b2'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#185037'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#ebdcff'
  tertiary-fixed-dim: '#d3bcfc'
  on-tertiary-fixed: '#230f45'
  on-tertiary-fixed-variant: '#503d73'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4.25rem
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.025em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system serves Indonesian tertiary students navigating the intense demands of semester deadlines, organizational commitments, and emotional well-being. The product balances academic rigor with mental breathing room, rejecting high-anxiety hustle culture in favor of compassionate momentum.

### Emotional Disposition
- **Empathetic Companion:** Feels like a calm, supportive peer studying beside you in a quiet library corner rather than a demanding taskmaster.
- **Cognitive Relief:** Provides deliberate visual breathing room to lower cortisol levels during high-stress exam periods.
- **Warm & Non-Judgmental:** Speaks with relatable peer warmth through local microcopy (*"Yuk, mulai pelan-pelan"*, *"Santai sejenak"*, *"Tugas beres, hati tenang"*).

### Design Movement: Soft Tactile Minimalism
The visual execution combines modern clean minimalism with tactile softness:
- Extra-smooth curves (squircle-inspired radii up to 2rem/32px)
- Ultra-diffused ambient light with subtle sage and sky undertones
- Warm cream/eggshell canvases instead of sterile clinical whites
- Floating pill badges and lightweight container nesting that avoid visual clutter

## Colors

The palette mimics natural Indonesian campus environments: lush foliage, clear morning skies, and warm tropical sunlight filtering through study spaces.

### Palette Architecture
- **Primary (`#558B6E`):** Deep Sage Green. Represents grounding, focus, and organic growth. Used for primary CTAs, active navigation items, and key completion states.
  - *Light Tint (`#E8F5E9`):* Canvas fills for success banners, progress trackers, and soft pill containers.
  - *Mid Tone (`#88B990`):* Secondary borders, non-urgent badges, and illustrations.
- **Secondary (`#4A90E2`):** Soft Sky Blue. Reflects mental clarity and perspective. Reserved for academic/schedule contexts (class timetables, study sessions, link elements).
  - *Tint (`#EBF5FB`):* Study block backgrounds and informative alert banners.
  - *Mid Tone (`#7FB3D5`):* Calendar event tags and sub-navigation active indicators.
- **Tertiary (`#B39DDB`):** Soft Lavender. An emotionally calming accent dedicated to mindfulness, journaling, mood tracking, and restorative reflection.
  - *Tint (`#F3E5F5`):* Reflection card backgrounds and breathing exercise surfaces.
- **Neutrals & Surfaces:**
  - *Background Canvas (`#FBFBF9`):* Warm rice-paper tone that prevents screen glare during night study.
  - *Surface Containers (`#F6F8F5`):* Muted sage-tinted neutral for structural nesting.
  - *Primary Text (`#1E293B`):* Deep slate/charcoal offering AA/AAA readability without harsh pure-black contrast.
  - *Secondary Text (`#475569`):* Muted slate for metadata, timestamps, and placeholder labels.

## Typography

**Plus Jakarta Sans** is used globally across display, body, and UI labels. Its geometric humanist structure yields an approachable tone while remaining optimized for prolonged digital reading on laptops and mobile devices.

### Hierarchy & Stylistic Rules
- **Display & Headlines:** Use medium to bold weights (`600` and `700`) with tight negative tracking to keep larger Indonesian phrases concise and visually anchored.
- **Body:** Kept at weight `400` with generous line-heights (1.5x - 1.6x) to reduce optical fatigue when processing dense syllabus briefs or guided journaling prompts.
- **Labels & Microcopy:** Weight `500` and `600` with slightly open tracking (`0.01em` to `0.025em`) for quick scanning on task badges, chips, and navigational tabs.
- **Punctuation & Tone:** Titles avoid all-caps lock to preserve a conversational, peer-level voice.

## Layout & Spacing

The layout philosophy follows a structured fluid grid with open breathing spaces, avoiding cramped desktop dashboards.

### Responsive Breakpoints
- **Mobile (360px – 767px):** 4-column layout. Margin: `1.25rem`, Gutter: `1rem`. Floating sticky bottom navigation for high-reach ergonomic control.
- **Tablet (768px – 1023px):** 8-column layout. Margin: `2rem`, Gutter: `1.25rem`. Collapsible dual-column cards for study and mood widgets.
- **Desktop (1024px – 1440px+):** 12-column layout. Max container width capped at `1280px` centered. Margin: `2.5rem`, Gutter: `1.5rem`. Asymmetric balance: 8 columns for core tasks/focus tools, 4 columns for empathetic companions (mood check-in, water intake, upcoming breaks).

### Spacing Rhythm
- Always prioritize macro-spacing (`space-lg`, `space-xl`) between independent functional units to preserve visual tranquility.
- Micro-spacing (`space-xs`, `space-sm`) is strictly reserved for binding text to related micro-indicators (e.g., status dot + label, icon + chip copy).

## Elevation & Depth

Visual depth is achieved through **Tonal Layering** accompanied by **Subtle Ambient Shadows**. Heavy, drop shadows and dark borders are avoided to prevent visual noise.

### Layer Tiers
- **Base Level (Canvas):** `#FBFBF9`. The physical desk on which all materials rest.
- **Level 1 (Card & Module Surfaces):** Pure `#FFFFFF` resting on `#FBFBF9`. Gives cards an illuminated, fresh lift.
  - *Shadow formulation:* `0 4px 20px -2px rgba(30, 41, 59, 0.04), 0 2px 6px -1px rgba(85, 139, 110, 0.03)`
- **Level 2 (Active Panels, Dropdowns & Modals):** Pure `#FFFFFF` elevated above ambient canvas with a soft colored glow.
  - *Shadow formulation:* `0 12px 32px -4px rgba(30, 41, 59, 0.08), 0 4px 12px -2px rgba(74, 144, 226, 0.06)`
- **Low-Contrast Separation:** Cards rely primarily on tonal differentiation rather than prominent border lines. When borders are required for accessibility, use a translucent tint: `rgba(85, 139, 110, 0.12)`.

## Shapes

The design system employs **Pill-shaped (Level 3)** geometry to convey comfort, safety, and modern approachability.

### Radii Application Rules
- **Pill (`rounded-full` / 9999px):** Action buttons, interactive filter chips, status badges, search inputs, and navigation pills.
- **Extra Large (`rounded-3xl` / 2rem):** Outer card boundaries, modal sheets, schedule modules, and wellness reflection cards.
- **Large (`rounded-2xl` / 1.25rem - 1.5rem):** Nested container panels, internal media blocks, task list containers, and popovers.
- **Medium (`rounded-xl` / 0.75rem - 1rem):** Checkboxes, form inputs, mood selector toggles, and dropdown panels.

## Components

### Buttons
- **Primary:** Full pill border radius (`rounded-full`), solid `#558B6E` background, white text (`#FFFFFF`), with an elevation hover effect that subtly scales the button (`transform: translateY(-1px)`).
- **Secondary (Calm Action):** Pill shape with light sage fill (`#E8F5E9`) and deep sage text (`#558B6E`). No border.
- **Ghost/Tertiary:** Transparent background with `#475569` text, transitioning to `#F6F8F5` on hover.

### Chips & Badges
- **Status & Category Chips:** Pill shape with `0.375rem 0.875rem` padding.
  - *Deadline Chip (Upcoming):* `#EBF5FB` background with `#4A90E2` text.
  - *Wellness/Mindfulness Chip:* `#F3E5F5` background with `#7E57C2` text.
  - *Completed Chip:* `#E8F5E9` background with `#558B6E` text.

### Input Fields
- Form inputs feature pill-shaped or soft-rounded (`rounded-2xl`) perimeters with `#FFFFFF` fill and a subtle border: `1.5px solid rgba(85, 139, 110, 0.2)`.
- Focus state: Border transitions to `#558B6E` with a diffuse outer aura (`box-shadow: 0 0 0 4px rgba(85, 139, 110, 0.15)`).

### Cards & Panels
- Constructed using `rounded-3xl` curves, pure `#FFFFFF` background, and Level 1 ambient shadows.
- Generous internal padding (`1.5rem` to `2rem`). Section headers inside cards paired with an encouraging subtitle (e.g., *"Target Belajar Hari Ini"* followed by *"3 dari 5 tugas selesai. Hebat!"*).

### Selection Controls (Checkbox & Radio)
- **Checkbox:** `rounded-lg` (8px) squircle with smooth transitions. Checked state uses `#558B6E` background with a crisp white checkmark icon.
- **Radio Buttons:** Circular with a smooth concentric expanding dot in `#558B6E`.

### Specialized Domain Components
- **Mood Check-in Pill Bar:** A horizontal scrollable stack of soft-colored emoji capsules allowing students to log emotional states (*"Lagi Capek"*, *"Semangat"*, *"Biasa Aja"*, *"Overwhelmed"*).
- **Pomodoro/Focus Bubble:** A large circular dial using an animated dual-color track (`#E8F5E9` base with `#558B6E` active progress) surrounded by breathing mindfulness prompts.