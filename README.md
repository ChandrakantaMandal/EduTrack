# EduTrack — Attendance Management System

A full-stack attendance tracking application built with Next.js, featuring role-based access (Admin/User), real-time dashboards, subject scheduling, and report generation (PDF/Excel).

## Tech Stack

| Layer       | Technology                                               |
| ----------- | -------------------------------------------------------- |
| Framework   | [Next.js](https://nextjs.org/) 16.2.9 (App Router)       |
| Language    | [TypeScript](https://www.typescriptlang.org/) 6.0        |
| UI          | [Tailwind CSS](https://tailwindcss.com/) 4.3 + shadcn/ui |
| Database    | PostgreSQL via [Prisma](https://www.prisma.io/) ORM      |
| Auth        | NextAuth.js + @auth/prisma-adapter                       |
| Reports     | ExcelJS, jsPDF + jspdf-autotable                         |
| Package Mgr | [Bun](https://bun.sh/)                                   |
| Linting     | ESLint, Prettier, Husky + lint-staged                    |

## Getting Started

```bash
# Install dependencies
bun install

# Set up the database
cp .env.example .env  # configure DATABASE_URL
bun run db:generate
bun run db:migrate

# Start dev server
bun run dev
```

Browse to [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                | Description                  |
| --------------------- | ---------------------------- |
| `bun run dev`         | Start development server     |
| `bun run build`       | Build for production         |
| `bun run start`       | Start production server      |
| `bun run lint`        | Run ESLint                   |
| `bun run typecheck`   | Run TypeScript type checking |
| `bun run format`      | Format with Prettier         |
| `bun run db:generate` | Generate Prisma client       |
| `bun run db:migrate`  | Run database migrations      |
| `bun run db:studio`   | Open Prisma Studio           |

## Project Structure

```
app/                          # Next.js App Router pages
├── (auth)/                   # Authentication routes
│   ├── login/
│   └── layout.tsx
├── admin/                    # Admin-only routes
│   ├── dashboard/
│   ├── login/
│   ├── reports/
│   ├── schedule/
│   ├── settings/
│   ├── subjects/
│   └── users/
├── api/auth/                 # NextAuth API route
├── dashboard/                # User-facing routes
│   ├── reports/
│   ├── settings/
│   └── subjects/
├── layout.tsx                # Root layout
├── globals.css               # Global styles
└── page.tsx                  # Home page

module/                       # Feature modules (logic + UI)
├── admin/
│   ├── Reports/
│   ├── Settings/
│   ├── dashboard/
│   ├── schedule/
│   ├── subjects/
│   └── users/
├── auth/
│   ├── components/
│   └── utils/
└── user/
    ├── Reports/
    ├── Settings/
    ├── dashboard/
    └── subjects/

components/                   # Shared UI components
├── admin/                    # Admin page wrappers
├── dashboard/                # User dashboard wrappers
├── ui/                       # shadcn primitives
│   ├── avatar.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── dropdown-menu.tsx
│   └── input.tsx
├── admin-layout.tsx
├── admin-sidebar.tsx
├── heder.tsx
├── notifications.tsx
├── profile.tsx
├── schedule.tsx
├── sidebar.tsx
└── theme-provider.tsx

prisma/                       # Database
├── schema.prisma
└── migrations/

lib/                          # Utilities
hooks/                        # Custom React hooks
```

## Database Models

- **User** — name, email, studentId, course, role (ADMIN / USER), preferences (JSON)
- **Account / Session / VerificationToken** — NextAuth primitives
- **Subject** — course subjects linked to schedules
- **Attendance** — per-session attendance records
- **ScheduleEntry** — class schedule entries

## Architecture

- **Routing**: Next.js App Router with parallel layouts for admin and user dashboards
- **Auth**: NextAuth.js with Prisma adapter, role-based gating (admin vs. user)
- **State**: Server components by default; client components for interactive UI
- **Reports**: Server-side generation of PDF (jsPDF) and Excel (ExcelJS) exports
- **Styling**: Tailwind CSS 4 with shadcn/ui Radix-Nova style, CSS variables for theming
