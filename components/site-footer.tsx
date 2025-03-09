import Link from "next/link"
import { Shield } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold">DaanQuest</span>
        </div>

        <p className="text-center text-sm text-muted-foreground md:text-left">
          Secure crypto donations on EDUChain blockchain. All transactions are verified and protected.
        </p>

        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="/security" className="text-sm text-muted-foreground hover:text-primary">
            Security
          </Link>
        </div>
      </div>
    </footer>
  )
}

