"use client"

import Link from "next/link"
import { Loader2, LogIn } from "lucide-react"

interface OpenCampusLoginProps {
  onConnect: () => Promise<void>
  isConnecting: boolean
}

export function OpenCampusLogin({ onConnect, isConnecting }: OpenCampusLoginProps) {
  return (
    <div className="space-y-6">
      <button
        className="action-button w-full py-3 flex items-center justify-center"
        onClick={onConnect}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-5 w-5" />
            Connect Open Campus ID
          </>
        )}
      </button>

      <div className="text-center text-white/80 text-sm mt-4">
        Don't have an Open Campus ID yet?
        <Link href="/signup" className="text-white font-medium hover:underline ml-1">
          Sign up here
        </Link>
      </div>
    </div>
  )
}

