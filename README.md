BugNet - Bug Report Generator
A client-side web application for generating structured, well-formatted Markdown bug reports. Built with React 19, Vite 8, and TypeScript 6.
 Live Demo
The project is now live! You can try the application directly from your browser:  https://portfolio-agustin-tabarcache.vercel.app/ 
Features
    • Guided form fill in title, description, reproduction steps, expected/actual results, severity, priority, and environment
    • Real-time Markdown preview - toggle between raw Markdown and rendered view
    • Tone & style selection - choose from Formal, Direct, or Detailed tones with 6 header variants
    • Quick templates - pre-fill the form with Visual, Functional, or Performance bug templates
    • Auto-detect environment - automatically detect browser, OS, and current URL
    • Quality checklist - 9-point completeness checklist with actionable suggestions
    • Save reports locally - all reports are persisted in the browser via localStorage
    • Manage saved reports - view, preview, copy, edit, and delete reports on a dedicated page
    • Dark-only design - "Polilla" (Moth) aesthetic with pink accents, custom fonts, and animated moth swarm
    • Fully client-side - no backend required, all data stays in your browser
Tech Stack
Technology	Purpose
React 19	UI library
Vite 8	Build tool & dev server
TypeScript 6	Language
React Router v7	Client-side routing
Zustand	State management (persisted to localStorage)
react-hook-form + Zod	Form state & validation
shadcn/ui (Radix Nova)	Accessible UI primitives
Tailwind CSS v4	Utility-first CSS
react-markdown	Markdown preview rendering
Lucide	Icons

Prerequisites
    • Node.js (compatible with Vite 8)
    • pnpm (package manager)
Getting Started
# Clone the repository
git clone <repo-url>
cd proyecto-2-Generador-de-Reportes-de-bugs

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
Available Scripts
    • pnpm dev: Start Vite dev server
    • pnpm build: Type-check and build for production
    • pnpm preview: Preview the production build locally
    • pnpm lint: Run ESLint across the codebase
Project Structure
Plaintext
src/
├── app/               # Router configuration
├── features/
│   └── bug-report/
│       ├── components/ # Core: form, validation, store, Markdown generation. Form sections, preview, templates, quality checks
│       ├── hooks/      # useBugReport Form (react-hook-form + zod)
│       ├── utils/      # Markdown generation, tone templates, env detection
│       ├── constants/  # Validation limits
│       ├── types.ts    # Severity, Priority, Tone types
│       ├── schema.ts   # Zod validation schemas
│       └── store.ts    # Zustand store (persisted)
├── polillas/          # Decorative animated moth swarm
├── about/             # "About" dialog with team info
├── pages/             # HomePage, ReportsPage
├── shared/
│   ├── components/    # Layout (RootLayout), UI (shadcn), PolillaLogo
│   └── lib/           # Utility functions (cn)
└── main.tsx           # Entry point
The "Polilla" Theme
The app features a dark-only design with a pink accent (#ff4d8d) on a near-black background (#08080a). It uses three custom fonts - Space Grotesk (body), Bricolage Grotesque (headings), and IBM Plex Mono (code/UI).
The name BugNet and the moth mascot reference the first documented computer bug - a literal moth trapped in the Harvard Mark II relay. An animated moth swarm drifts across the screen as a decorative element (can be toggled on/off).
Contributors
    • Magali Suarez
    • Matias Fauda
    • Agustin Tabarcache
    • Angie Alvarez Lucero
    • Octavio Britez

