import Image from "next/image"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="EduTrack"
          width={120}
          height={34}
          className="mb-8 h-10 w-auto"
        />
        <h1 className="mb-2 text-2xl font-bold">You&apos;re offline</h1>
        <p className="mb-8 text-muted-foreground">
          Connect to the internet to use EduTrack. Some previously viewed pages
          may still be available.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}
