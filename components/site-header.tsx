import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/context/wallet-context"
import { useOpenCampus } from "@/context/open-campus-context"
import { Shield } from "lucide-react"

export function SiteHeader() {
  const { isConnected: isWalletConnected, address } = useWallet()
  const { isConnected: isOpenCampusConnected, user } = useOpenCampus()

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">DaanQuest</span>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/donate" className="text-sm font-medium hover:text-primary">
            Donate
          </Link>
          <Link href="/create-campaign" className="text-sm font-medium hover:text-primary">
            Create Campaign
          </Link>

          {isWalletConnected && address && (
            <div className="hidden md:flex items-center text-xs bg-blue-50 text-primary px-3 py-1 rounded-full">
              <span className="font-mono">{truncateAddress(address)}</span>
            </div>
          )}

          {isOpenCampusConnected && user && (
            <div className="hidden md:block text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
              <span>{user.name}</span>
            </div>
          )}

          <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
            <Link href="/about">About</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

