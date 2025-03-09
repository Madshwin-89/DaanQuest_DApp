"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  isConnecting: boolean
  address: string | null
  balance: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            setIsConnected(true)
            fetchBalance(accounts[0])
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setIsConnected(false)
          setAddress(null)
          setBalance(null)
        } else {
          // User switched accounts
          setAddress(accounts[0])
          fetchBalance(accounts[0])
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  const fetchBalance = async (walletAddress: string) => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [walletAddress, "latest"],
        })

        // Convert from wei to ETH
        const ethBalance = Number.parseInt(balance, 16) / 1e18
        setBalance(ethBalance.toFixed(4))
      } catch (error) {
        console.error("Error fetching balance:", error)
      }
    }
  }

  const connect = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      setIsConnecting(true)
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAddress(accounts[0])
        setIsConnected(true)
        await fetchBalance(accounts[0])
      } catch (error) {
        console.error("Error connecting wallet:", error)
        throw error
      } finally {
        setIsConnecting(false)
      }
    } else {
      window.open("https://metamask.io/download/", "_blank")
      throw new Error("Please install MetaMask to connect your wallet")
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(null)
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isConnecting,
        address,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

