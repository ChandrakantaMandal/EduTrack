import Link from "next/link"
import {
  GraduationCap,
  BarChart3,
  Bell,
  Shield,
  ArrowRight,
  Star,
  ChevronRight,
  Quote,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Visual Analytics",
    desc: "Track attendance trends with interactive charts and detailed reports.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    desc: "Get notified when attendance drops below your threshold.",
  },
  {
    icon: GraduationCap,
    title: "Course Overview",
    desc: "View all your subjects and performance at a glance.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data is encrypted and never shared with third parties.",
  },
]

const steps = [
  {
    num: "01",
    title: "Sign in with Google",
    desc: "Connect your academic account in one click.",
  },
  {
    num: "02",
    title: "View your dashboard",
    desc: "See your attendance stats and trends instantly.",
  },
  {
    num: "03",
    title: "Stay on track",
    desc: "Get insights and alerts to improve your performance.",
  },
]

const testimonials = [
  {
    name: "Alex M.",
    role: "Computer Science",
    text: "EduTrack helped me bring my attendance from 65% to 92% in one semester.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "Mathematics",
    text: "The visual charts make it so easy to see where I need to improve.",
    rating: 5,
  },
  {
    name: "James R.",
    role: "Physics",
    text: "Finally a tool that actually helps students track their progress.",
    rating: 5,
  },
]

const stats = [
  { value: "75%", label: "Avg. Attendance" },
  { value: "1K+", label: "Active Students" },
  { value: "15+", label: "Partner Schools" },
  { value: "4.9", label: "Student Rating" },
]

export default async function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">EduTrack</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/admin/login"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Admin Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-5 pt-12 pb-10 text-center sm:px-6 sm:pt-16 sm:pb-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          New — Real-time attendance tracking
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Track your academic
          <span className="relative ml-2 text-primary">
            journey
            <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-primary/30" />
          </span>
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          Monitor attendance, visualize trends, and stay on top of your courses
          with real-time insights.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="group rounded-lg bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <span className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-1 text-xs text-muted-foreground">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            />
          ))}
          <span className="ml-2">Loved by students nationwide</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mx-5 w-full max-w-4xl rounded-2xl border bg-card px-5 py-6 sm:mx-8 sm:px-6 sm:py-8 lg:mx-auto">
        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="space-y-1">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto w-full max-w-4xl px-5 pt-16 pb-10 sm:px-6 sm:pt-24 sm:pb-12">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            How It Works
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            Get started in 3 simple steps
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {step.num}
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="absolute top-4 -right-5 hidden h-5 w-5 text-muted-foreground/40 sm:block" />
              )}
              <h3 className="mb-1 font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 sm:py-12">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Features
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            Everything you need to succeed
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className="group rounded-xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6 sm:py-12">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Testimonials
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            What students say
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl border bg-card p-5"
            >
              <div>
                <Quote className="mb-2 h-5 w-5 text-primary/40" />
                <p className="text-sm leading-relaxed text-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-3 w-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-5 mb-12 w-full max-w-4xl rounded-2xl bg-primary px-6 py-10 text-center sm:mx-8 sm:mb-16 sm:px-8 sm:py-16 lg:mx-auto">
        <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
          Ready to take control?
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-primary-foreground/80">
          Join thousands of students already tracking their academic journey.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-primary-foreground px-7 py-3 text-sm font-medium text-primary shadow-sm transition hover:opacity-90"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <footer className="border-t px-5 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">EduTrack</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EduTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
