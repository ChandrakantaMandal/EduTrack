import { Shield } from "lucide-react"
import { adminLogin } from "@/module/auth/utils/admin-auth-utils"

export default async function AdminLoginPage(props: {
  searchParams?: Promise<{ error?: string }>
}) {
  const searchParams = await props.searchParams
  const error = searchParams?.error

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Admin Access
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your admin code to continue
          </p>
        </div>

        <form action={adminLogin} className="space-y-4">
          {error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
              Invalid admin code
            </p>
          )}
          <input
            type="password"
            name="code"
            placeholder="Admin code"
            autoFocus
            className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Protected area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
