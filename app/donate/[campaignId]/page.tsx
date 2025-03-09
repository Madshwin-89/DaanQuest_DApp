"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useCampaigns } from "@/context/campaign-context"
import { useWallet } from "@/context/wallet-context"
import { Loader2, Clock, AlertTriangle, ArrowLeft } from "lucide-react"
import { formatEther } from "@/lib/utils"

export default function DonateToCampaignPage() {
  const params = useParams()
  const router = useRouter()
  const { isConnected, connect } = useWallet()
  const { getCampaign, donate, isDonating } = useCampaigns()
  const [campaign, setCampaign] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [donationAmount, setDonationAmount] = useState("")
  const [timeRemaining, setTimeRemaining] = useState("")
  const campaignId = params.campaignId

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const campaignData = await getCampaign(campaignId)
        setCampaign(campaignData)
      } catch (error) {
        console.error("Failed to load campaign:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCampaign()
  }, [campaignId, getCampaign])

  useEffect(() => {
    if (!campaign || !campaign.endTime) return

    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const endTime = new Date(campaign.endTime).getTime()
      const timeLeft = endTime - now

      if (timeLeft <= 0) {
        setTimeRemaining("Campaign ended")
        return
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

      setTimeRemaining(`${days}d ${hours}h ${minutes}m`)
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 60000)

    return () => clearInterval(interval)
  }, [campaign])

  const handleDonate = async () => {
    if (!campaign || !donationAmount) return

    if (!isConnected) {
      try {
        await connect()
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        return
      }
    }

    try {
      await donate(campaignId, donationAmount)
      // Show success message or redirect
      router.push(`/donate/success?campaignId=${campaignId}&amount=${donationAmount}`)
    } catch (error) {
      console.error("Failed to donate:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="gradient-bg min-h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="gradient-bg min-h-screen flex justify-center items-center p-4">
        <div className="card-container p-8 max-w-md w-full text-center">
          <AlertTriangle className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Campaign Not Found</h2>
          <p className="text-white/80 mb-8">The campaign you're looking for doesn't exist or has been removed.</p>
          <Link href="/donate">
            <button className="action-button">Browse Campaigns</button>
          </Link>
        </div>
      </div>
    )
  }

  const progress = (campaign.currentAmount / campaign.targetAmount) * 100
  const isCampaignActive = campaign.status === "ACTIVE"

  return (
    <main className="gradient-bg min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <Link href="/donate" className="inline-flex items-center text-white/80 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Link>

        <div className="card-container p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">{campaign.title}</h2>
          <p className="text-white/80 mb-8">{campaign.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-2">Campaign Progress</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-white mb-1">
                <span>
                  {formatEther(campaign.currentAmount)} / {formatEther(campaign.targetAmount)} EDU
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center text-white/70 text-sm mb-8">
            <Clock className="h-4 w-4 mr-2" />
            <span>{isCampaignActive ? `Time remaining: ${timeRemaining}` : `Campaign status: ${campaign.status}`}</span>
          </div>

          {!isCampaignActive && (
            <div className="bg-yellow-800/20 border border-yellow-600/30 rounded-md p-4 text-yellow-200 mb-8">
              <p className="font-medium">This campaign is no longer active</p>
              <p className="text-sm mt-1 text-yellow-200/80">
                The campaign has {campaign.status === "COMPLETED" ? "reached its goal" : "expired"}. You cannot make
                donations to it anymore.
              </p>
            </div>
          )}

          {isCampaignActive && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-white font-medium">
                  Donation Amount (EDU)
                </label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter amount to donate"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min="0.001"
                  step="0.001"
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                className={`w-full py-3 rounded-md ${donationAmount && isCampaignActive && !isDonating ? "action-button" : "bg-white/10 text-white/50 cursor-not-allowed"}`}
                disabled={!donationAmount || isDonating || !isCampaignActive}
                onClick={handleDonate}
              >
                {isDonating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : !isConnected ? (
                  "Connect Wallet & Donate"
                ) : (
                  "Donate Now"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

