"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useCampaigns } from "@/context/campaign-context"
import { useOpenCampus } from "@/context/open-campus-context"
import { Loader2, Clock, Users, CreditCard, AlertTriangle, ArrowLeft } from "lucide-react"
import { formatEther } from "@/lib/utils"
import { DonationList } from "@/components/donation-list"
import Link from "next/link"

export default function AdminPage() {
  const params = useParams()
  const router = useRouter()
  const { isConnected: isOpenCampusConnected } = useOpenCampus()
  const { getCampaign, withdrawFunds, isWithdrawing } = useCampaigns()
  const [campaign, setCampaign] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState("")
  const campaignId = params.campaignId

  useEffect(() => {
    if (!isOpenCampusConnected) {
      router.push("/create-campaign")
      return
    }

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
  }, [campaignId, getCampaign, isOpenCampusConnected, router])

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

  const handleWithdraw = async () => {
    if (!campaign) return

    try {
      await withdrawFunds(campaignId)
      // Refresh campaign data after withdrawal
      const updatedCampaign = await getCampaign(campaignId)
      setCampaign(updatedCampaign)
    } catch (error) {
      console.error("Failed to withdraw funds:", error)
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
          <p className="text-white/80 mb-8">
            The campaign you're looking for doesn't exist or you don't have access to it.
          </p>
          <Link href="/">
            <button className="action-button">Return Home</button>
          </Link>
        </div>
      </div>
    )
  }

  const progress = (campaign.currentAmount / campaign.targetAmount) * 100
  const isCampaignEnded = campaign.status === "COMPLETED" || campaign.status === "EXPIRED"
  const canWithdraw = isCampaignEnded && campaign.currentAmount > 0 && !campaign.withdrawn

  return (
    <main className="gradient-bg min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{campaign.title}</h1>
          <p className="text-white/80">Campaign Admin Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Campaign Status</h3>
            <div className="text-2xl font-bold text-white mb-2">{campaign.status}</div>
            <div className="flex items-center text-white/70">
              <Clock className="h-4 w-4 mr-2" />
              {timeRemaining}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Funds Raised</h3>
            <div className="text-2xl font-bold text-white mb-2">{formatEther(campaign.currentAmount)} EDU</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white">
                <span>Target: {formatEther(campaign.targetAmount)} EDU</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Donors</h3>
            <div className="text-2xl font-bold text-white mb-2">{campaign.donations?.length || 0}</div>
            <div className="flex items-center text-white/70">
              <Users className="h-4 w-4 mr-2" />
              Total unique donors
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3">
            <div className="card-container p-6">
              <h3 className="text-xl font-bold text-white mb-4">Donation History</h3>
              <DonationList donations={campaign.donations || []} />
            </div>
          </div>

          <div>
            <div className="card-container p-6">
              <h3 className="text-xl font-bold text-white mb-4">Actions</h3>
              <button
                className={`w-full py-3 rounded-md flex items-center justify-center ${canWithdraw ? "action-button" : "bg-white/10 text-white/50 cursor-not-allowed"}`}
                disabled={!canWithdraw || isWithdrawing}
                onClick={handleWithdraw}
              >
                {isWithdrawing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Withdrawing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Withdraw Funds
                  </>
                )}
              </button>
              {!canWithdraw && (
                <p className="text-sm text-white/70 mt-2">
                  {campaign.withdrawn
                    ? "Funds have already been withdrawn"
                    : !isCampaignEnded
                      ? "Campaign must end before withdrawal"
                      : campaign.currentAmount <= 0
                        ? "No funds to withdraw"
                        : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

