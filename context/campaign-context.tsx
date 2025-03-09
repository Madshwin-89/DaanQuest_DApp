"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Campaign {
  id: string
  title: string
  description: string
  creatorId: string
  currentAmount: number
  targetAmount: number
  startTime: string
  endTime: string
  status: "ACTIVE" | "COMPLETED" | "EXPIRED"
  withdrawn: boolean
  donations: Donation[]
}

interface Donation {
  id: string
  campaignId: string
  donorAddress: string
  amount: number
  timestamp: string
  transactionHash: string
}

interface CreateCampaignParams {
  title: string
  description: string
  creatorId: string
  targetAmount: number
  durationDays: number
}

interface CampaignsContextType {
  campaigns: Campaign[]
  isLoading: boolean
  isCreating: boolean
  isDonating: boolean
  isWithdrawing: boolean
  getCampaign: (id: string) => Promise<Campaign>
  createCampaign: (params: CreateCampaignParams) => Promise<string>
  donate: (campaignId: string, amount: string) => Promise<void>
  withdrawFunds: (campaignId: string) => Promise<void>
}

const CampaignsContext = createContext<CampaignsContextType | undefined>(undefined)

// Mock data for demonstration
const mockCampaigns: Campaign[] = [
  {
    id: "campaign_1",
    title: "Educational Resources for Rural Schools",
    description: "Help us provide educational materials to underserved rural schools.",
    creatorId: "oc_user1",
    currentAmount: 2.5,
    targetAmount: 10,
    startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
    status: "ACTIVE",
    withdrawn: false,
    donations: [
      {
        id: "donation_1",
        campaignId: "campaign_1",
        donorAddress: "0x1234567890abcdef1234567890abcdef12345678",
        amount: 1.5,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      },
      {
        id: "donation_2",
        campaignId: "campaign_1",
        donorAddress: "0x2345678901abcdef2345678901abcdef23456789",
        amount: 1.0,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        transactionHash: "0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a",
      },
    ],
  },
]

export function CampaignsProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isDonating, setIsDonating] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const getCampaign = async (id: string): Promise<Campaign> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const campaign = campaigns.find((c) => c.id === id)
      if (!campaign) {
        throw new Error("Campaign not found")
      }

      return campaign
    } finally {
      setIsLoading(false)
    }
  }

  const createCampaign = async (params: CreateCampaignParams): Promise<string> => {
    setIsCreating(true)
    try {
      // Simulate API call and blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const now = new Date()
      const endDate = new Date(now.getTime() + params.durationDays * 24 * 60 * 60 * 1000)

      const newCampaign: Campaign = {
        id: "campaign_" + Math.random().toString(36).substring(2, 10),
        title: params.title,
        description: params.description,
        creatorId: params.creatorId,
        currentAmount: 0,
        targetAmount: params.targetAmount,
        startTime: now.toISOString(),
        endTime: endDate.toISOString(),
        status: "ACTIVE",
        withdrawn: false,
        donations: [],
      }

      setCampaigns((prev) => [...prev, newCampaign])
      return newCampaign.id
    } finally {
      setIsCreating(false)
    }
  }

  const donate = async (campaignId: string, amount: string): Promise<void> => {
    setIsDonating(true)
    try {
      // Simulate API call and blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const donationAmount = Number.parseFloat(amount)
      if (isNaN(donationAmount) || donationAmount <= 0) {
        throw new Error("Invalid donation amount")
      }

      setCampaigns((prev) =>
        prev.map((campaign) => {
          if (campaign.id === campaignId) {
            const newCurrentAmount = campaign.currentAmount + donationAmount
            const newStatus = newCurrentAmount >= campaign.targetAmount ? "COMPLETED" : campaign.status

            const newDonation: Donation = {
              id: "donation_" + Math.random().toString(36).substring(2, 10),
              campaignId,
              donorAddress: "0x" + Math.random().toString(36).substring(2, 42),
              amount: donationAmount,
              timestamp: new Date().toISOString(),
              transactionHash: "0x" + Math.random().toString(36).substring(2, 66),
            }

            return {
              ...campaign,
              currentAmount: newCurrentAmount,
              status: newStatus,
              donations: [...campaign.donations, newDonation],
            }
          }
          return campaign
        }),
      )
    } finally {
      setIsDonating(false)
    }
  }

  const withdrawFunds = async (campaignId: string): Promise<void> => {
    setIsWithdrawing(true)
    try {
      // Simulate API call and blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setCampaigns((prev) =>
        prev.map((campaign) => {
          if (campaign.id === campaignId) {
            return {
              ...campaign,
              withdrawn: true,
            }
          }
          return campaign
        }),
      )
    } finally {
      setIsWithdrawing(false)
    }
  }

  return (
    <CampaignsContext.Provider
      value={{
        campaigns,
        isLoading,
        isCreating,
        isDonating,
        isWithdrawing,
        getCampaign,
        createCampaign,
        donate,
        withdrawFunds,
      }}
    >
      {children}
    </CampaignsContext.Provider>
  )
}

export function useCampaigns() {
  const context = useContext(CampaignsContext)
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignsProvider")
  }
  return context
}

