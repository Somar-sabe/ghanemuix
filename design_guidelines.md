# Design Guidelines: Smart Product Suggestion Engine

## Design Approach

**Reference-Based: ChatGPT/Grok Aesthetic + E-commerce Enhancement**

Drawing inspiration from ChatGPT's clean conversational interface and Grok's modern, slightly playful aesthetic, enhanced with product discovery patterns from Airbnb and Pinterest for the shopping experience.

**Core Principles:**
- Conversational clarity over visual noise
- Intelligent white space that breathes
- Purposeful color usage (not decorative)
- Product imagery as the primary visual interest
- Seamless dark/light mode transitions

---

## Color Palette

**Light Mode:**
- Background: 0 0% 100% (pure white)
- Surface: 0 0% 98% (cards, chat bubbles)
- Border: 0 0% 90% (subtle dividers)
- Text Primary: 0 0% 10%
- Text Secondary: 0 0% 45%
- Primary Brand: 262 83% 58% (vibrant purple - for CTAs, active states)
- Success: 142 71% 45% (product scores, ratings)
- AI Bubble: 220 14% 96% (light gray for AI messages)

**Dark Mode:**
- Background: 0 0% 8% (deep charcoal)
- Surface: 0 0% 12% (chat bubbles, cards)
- Border: 0 0% 18% (subtle dividers)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 65%
- Primary Brand: 262 70% 65% (adjusted purple for dark)
- Success: 142 60% 55%
- AI Bubble: 0 0% 15% (dark gray for AI messages)

---

## Typography

**Font Stack:**
- Primary: 'Inter' (Google Fonts) - body text, UI elements
- Mono: 'JetBrains Mono' (Google Fonts) - product IDs, technical details

**Scale:**
- Display (Home Hero): text-5xl md:text-6xl, font-bold, tracking-tight
- H1 (Page Titles): text-3xl md:text-4xl, font-semibold
- H2 (Section Headers): text-xl md:text-2xl, font-semibold
- H3 (Card Titles): text-lg, font-medium
- Body: text-base, leading-relaxed
- Small (Metadata): text-sm, text-secondary
- Tiny (Badges): text-xs, font-medium

---

## Layout System

**Spacing Primitives:**
Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistency.
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-20
- Element gaps: gap-2, gap-4, gap-6

**Containers:**
- Max width: max-w-7xl (product grids, chat area)
- Chat window: max-w-4xl (optimal reading width)
- Sidebar: w-64 desktop, full-width mobile with slide-out

**Grid Systems:**
- Product Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
- Masonry: Use CSS Grid with auto-flow dense, varying row heights
- Comparison Table: grid-cols-2 lg:grid-cols-4 gap-4

---

## Component Library

### Navigation & Layout
- **ChatSidebar**: Fixed left panel (desktop), slide-over (mobile). Show recent chats with truncated titles, timestamps, hover states revealing actions.
- **TopBar**: Sticky header with logo, search trigger, profile avatar, theme toggle. Glass morphism effect: backdrop-blur-lg bg-white/80 dark:bg-black/80.
- **Mobile Nav**: Bottom tab bar with Home, Chat, Favorites, Profile icons.

### Chat Interface
- **Message Bubbles**: 
  - User: ml-auto, max-w-2xl, bg-primary, text-white, rounded-3xl, p-4
  - AI: mr-auto, max-w-2xl, bg-surface, rounded-3xl, p-4
  - Smooth entry animation: fade + slide from bottom
- **Input Area**: Fixed bottom, border-top, p-4. Auto-expanding textarea, send icon button.
- **Typing Indicator**: Three animated dots (scale pulse), positioned as AI message.

### Product Components
- **ProductCard**: 
  - Image: aspect-square, object-cover, rounded-xl
  - Content overlay: gradient-to-t from-black/60 at bottom
  - Title: text-white, font-semibold, line-clamp-2
  - Price + Rating: flex justify-between, text-sm
  - Favorite: absolute top-2 right-2, heart icon, glass background
  - Hover: scale-105 transform, shadow-xl transition

- **ProductGrid**: Masonry layout with staggered animation on load. Filter bar sticky below header with pill-style category filters.

- **ProductDetail Drawer**: 
  - Slide from right (desktop), bottom sheet (mobile)
  - Image carousel: dots navigation, swipe gestures
  - Score badge: circular progress, large number, positioned top-right
  - Specs table: two-column layout, zebra striping
  - Buy CTA: sticky bottom, full-width, bg-primary

### Comparison View
- Side-by-side cards (2-4 products)
- Sticky header with product images
- Row-by-row feature comparison
- Highlight differences with subtle background
- Clear winner indicators for better values

### Forms & Auth
- **Input Fields**: 
  - Border: border-2, focus:border-primary
  - Rounded: rounded-lg
  - Padding: px-4 py-3
  - Dark mode: bg-surface, text-primary
- **Social Buttons**: 
  - Brand colors (Google blue, X black, Facebook blue)
  - Icon + label layout
  - Equal width grid: grid-cols-1 md:grid-cols-3 gap-3

### Micro-interactions
- **Toasts**: Slide from top-right, auto-dismiss, icon + message
- **Loading States**: Skeleton screens (shimmer animation) for product cards
- **Error Boundaries**: Friendly illustration + retry button, centered layout

---

## Images

**Hero Section (Home):**
Large hero banner showcasing product discovery concept:
- Background: Abstract gradient mesh (purple/blue tones) OR high-quality lifestyle image showing diverse products
- Overlaid with centered headline and search input
- Image treatment: subtle blur or overlay (opacity 0.9) to ensure text readability

**Product Images:**
All product images from picsum.photos placeholders as specified in mock data. Use aspect-ratio-square with object-cover for consistency.

**Empty States:**
Simple SVG illustrations (via CDN like undraw.co) for:
- No favorites: Shopping bag illustration
- No chat history: Chat bubble illustration
- Empty search: Magnifying glass illustration

---

## Animations

**Use Sparingly:**
- Page transitions: Fade only (duration-200)
- Chat messages: Slide-up + fade (duration-300)
- Product grid: Stagger children by 50ms on initial load
- Hover states: Scale 1.02, shadow increase (duration-200)
- NO scroll-triggered animations
- NO complex keyframe animations

**Disabled Animations:**
Respect prefers-reduced-motion for accessibility.

---

## Accessibility

- All interactive elements: min-height 44px (WCAG touch target)
- Focus states: ring-2 ring-primary ring-offset-2
- Skip to main content link (hidden until focused)
- Semantic HTML: nav, main, article, aside
- Image alt text from mock data
- Keyboard navigation: Arrow keys in product grid, Tab through chat messages
- ARIA labels for icon-only buttons
- Color contrast ratio minimum 4.5:1 (text), 3:1 (UI components)

---

## Dark Mode Implementation

Toggle via context, persist in localStorage. Use Tailwind's dark: modifier throughout:
- Smooth transition: transition-colors duration-200
- Maintain contrast ratios in both modes
- Invert product images slightly (dark mode): filter brightness-90
- All form inputs must have dark mode backgrounds (bg-surface)

---

This design system balances the conversational simplicity of ChatGPT with the visual richness required for product discovery, creating a cohesive, accessible, and delightful shopping assistant experience.