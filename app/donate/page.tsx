"use client"

import { useState } from "react"
import Link from "next/link"
import { useWallet } from "@/context/wallet-context"
import { useCampaigns } from "@/context/campaign-context"
import { ConnectWallet } from "@/components/connect-wallet"
import { CampaignList } from "@/components/campaign-list"
import { Loader2, ArrowLeft } from "lucide-react"

export default function DonatePage() {
  const { isConnected, isConnecting, connect } = useWallet()
  const { campaigns, isLoading } = useCampaigns()
  const [connectingWallet, setConnectingWallet] = useState(false)

  const handleConnectWallet = async () => {
    setConnectingWallet(true)
    try {
      await connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setConnectingWallet(false)
    }
  }

  return (
    <main className="gradient-bg min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Make a Donation</h1>
          <p className="text-white/80 text-xl">Support educational campaigns with cryptocurrency</p>
        </div>

        {!isConnected ? (
          <div className="card-container p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-white/80 mb-8">Connect your wallet to view available campaigns and make donations</p>
            <ConnectWallet onConnect={handleConnectWallet} isConnecting={connectingWallet || isConnecting} />
          </div>
        ) : (
          <div className="card-container p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Available Campaigns</h2>
            <p className="text-white/80 mb-8">Browse and donate to campaigns that resonate with you</p>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            ) : campaigns.length > 0 ? (
              <CampaignList campaigns={campaigns} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-white mb-2">No Campaigns Created till now</h3>
                <p className="text-white/80 mb-6">Be the first to create a campaign and start receiving donations.</p>
                <Link href="/create-campaign">
                  <button className="action-button">Create a Campaign</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

