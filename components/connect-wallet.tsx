"use client"

import { Loader2, Wallet } from "lucide-react"

interface ConnectWalletProps {
  onConnect: () => Promise<void>
  isConnecting: boolean
}

export function ConnectWallet({ onConnect, isConnecting }: ConnectWalletProps) {
  return (
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
          <Wallet className="mr-2 h-5 w-5" />
          Connect Wallet
        </>
      )}
    </button>
  )
}

