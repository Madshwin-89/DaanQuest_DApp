"use client"

import Link from "next/link"
import { Clock } from "lucide-react"
import { formatEther } from "@/lib/utils"

interface Campaign {
  id: string
  title: string
  description: string
  currentAmount: number
  targetAmount: number
  endTime: string
  status: string
}

interface CampaignListProps {
  campaigns: Campaign[]
}

export function CampaignList({ campaigns }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/80">No campaigns available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campaigns.map((campaign) => {
        const progress = (campaign.currentAmount / campaign.targetAmount) * 100
        const endDate = new Date(campaign.endTime)
        const isActive = campaign.status === "ACTIVE"

        return (
          <div key={campaign.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{campaign.title}</h3>
            <p className="text-white/70 mb-4 line-clamp-2">{campaign.description}</p>

            <div className="mb-4">
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

            <div className="flex items-center text-sm text-white/70 mb-6">
              <Clock className="h-4 w-4 mr-2" />
              {isActive ? (
                <span>Ends on {endDate.toLocaleDateString()}</span>
              ) : (
                <span>Campaign {campaign.status.toLowerCase()}</span>
              )}
            </div>

            <Link href={`/donate/${campaign.id}`}>
              <button
                className={
                  isActive
                    ? "action-button w-full"
                    : "w-full py-2 rounded-md border border-white/20 text-white/80 bg-white/5 hover:bg-white/10"
                }
                disabled={!isActive}
              >
                {isActive ? "Donate Now" : "View Campaign"}
              </button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

