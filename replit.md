# Smart Product Suggestion Engine

## Overview

A conversational AI-powered e-commerce platform that helps users discover and compare products across multiple marketplaces (Amazon, Noon, SHEIN, Temu). The application features a ChatGPT-inspired interface where users interact with an AI assistant to find products, with support for favorites, browsing history, and product comparison tools.

**Core Features:**
- AI-powered conversational product search
- Multi-marketplace product aggregation
- Favorites and viewed history tracking
- Product comparison functionality
- Dark/light theme support
- Responsive mobile-first design

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as build tool and dev server
- Wouter for client-side routing
- TanStack Query for data fetching and caching
- Tailwind CSS with custom design system

**UI Framework:**
- shadcn/ui components (Radix UI primitives)
- Custom theme system with CSS variables for light/dark modes
- Design inspired by ChatGPT/Grok aesthetics with e-commerce enhancements

**State Management Pattern:**
- Context-based providers for global state (Products, Favorites, Viewed, Chats, Theme)
- Local storage persistence for user data
- No external state management library - uses React Context API

**Component Architecture:**
- Atomic design pattern with shared UI components in `/components/ui`
- Feature-specific components in `/components`
- Page components in `/pages`
- Custom hooks in `/hooks` for business logic separation

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Node.js runtime
- Vite middleware integration for development

**Database Layer:**
- Drizzle ORM configured for PostgreSQL
- Schema defined in `shared/schema.ts`
- Currently using in-memory storage (MemStorage class) as placeholder
- Database migrations managed via Drizzle Kit

**API Design:**
- RESTful API structure (routes prefixed with `/api`)
- Currently minimal backend - most logic client-side for demo purposes
- Prepared for expansion with storage interface pattern

**Authentication Pattern:**
- Mock authentication system (demo mode)
- User schema defined but not actively used
- Prepared for session-based auth with connect-pg-simple

### Data Storage Solutions

**Current Implementation:**
- **Client-side**: LocalStorage for favorites, viewed products, chat history, theme preferences
- **Mock Data**: JSON file (`attached_assets/chat-UI-data_1760686170530.json`) provides initial product catalog and sample chats
- **In-Memory**: MemStorage class implements IStorage interface for user management

**Database Schema (Prepared but not active):**
- PostgreSQL with Drizzle ORM
- Users table with UUID primary keys
- Schema uses `gen_random_uuid()` for ID generation
- Validation with Zod schemas via drizzle-zod

**Future Expansion Ready:**
- Storage interface pattern allows easy swap from in-memory to database
- Drizzle config points to PostgreSQL via `DATABASE_URL` environment variable
- Migration system in place (`npm run db:push`)

### Design System

**Color System:**
- CSS custom properties for theming
- Separate light/dark mode palettes
- Primary brand color: Purple (262° hue)
- Neutral-based grays for surfaces

**Typography:**
- Primary: Inter (Google Fonts)
- Monospace: JetBrains Mono for technical details
- Responsive text scaling with Tailwind utilities

**Interactive States:**
- Custom elevation utilities (`hover-elevate`, `active-elevate-2`)
- Outline buttons with dynamic opacity borders
- Smooth transitions for theme switching

### Routing Structure

**Client Routes:**
- `/` - Home/landing page with search
- `/chat` - New chat interface
- `/chat/:id` - Specific chat conversation
- `/favorites` - Saved products with comparison
- `/viewed` - Recently viewed products
- `/profile` - User account (mock)
- `/auth` - Login/signup (mock)

**Navigation:**
- Desktop: Top bar with theme toggle
- Mobile: Bottom tab bar for core functions
- Chat sidebar for conversation history

### AI/Chat System

**Implementation:**
- Rule-based keyword matching (not external AI API)
- Pattern: User message → keyword detection → product matching → AI response generation
- Message types: text messages and product grids
- Typing indicator for simulated response delay

**Chat Features:**
- Persistent chat history (localStorage)
- Auto-scroll to latest message
- Product cards embedded in chat
- Chat management (create, continue, delete)

## External Dependencies

### UI Component Libraries
- **Radix UI**: Headless UI primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component library with Tailwind
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library
- **react-icons**: Additional icons (social media)
- **vaul**: Drawer component

### Styling & Utilities
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx** & **tailwind-merge**: Conditional class utilities
- **autoprefixer** & **postcss**: CSS processing

### Data & Forms
- **TanStack Query**: Data fetching, caching, synchronization
- **React Hook Form**: Form state management (@hookform/resolvers)
- **Zod**: Schema validation
- **date-fns**: Date formatting utilities

### Development Tools
- **Vite**: Build tool with HMR
- **TypeScript**: Type safety
- **ESBuild**: Fast bundling for production
- **@replit/vite-plugin-***: Replit-specific dev tools

### Backend/Database (Configured but minimal usage)
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **Drizzle ORM**: Type-safe ORM
- **connect-pg-simple**: PostgreSQL session store
- **nanoid**: ID generation

### Current Limitations
- No actual AI integration (rule-based matching only)
- No real authentication (mock system)
- No active database (in-memory storage)
- No external API calls for products (static JSON data)
- No real payment processing