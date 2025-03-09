"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCampaigns } from "@/context/campaign-context"
import { Loader2 } from "lucide-react"

interface CampaignFormProps {
  userId: string
}

export function CampaignForm({ userId }: CampaignFormProps) {
  const router = useRouter()
  const { createCampaign, isCreating } = useCampaigns()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    durationDays: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const campaignId = await createCampaign({
        ...formData,
        creatorId: userId,
        targetAmount: Number.parseFloat(formData.targetAmount),
        durationDays: Number.parseInt(formData.durationDays),
      })

      router.push(`/admin/${campaignId}`)
    } catch (error) {
      console.error("Failed to create campaign:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-white font-medium">
          Campaign Title
        </label>
        <input
          id="title"
          name="title"
          placeholder="Enter campaign title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-white font-medium">
          Campaign Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your campaign and its purpose"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
          className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="targetAmount" className="block text-white font-medium">
            Minimum Donation Amount (EDU)
          </label>
          <input
            id="targetAmount"
            name="targetAmount"
            type="number"
            placeholder="e.g., 5.0"
            value={formData.targetAmount}
            onChange={handleChange}
            min="0.001"
            step="0.001"
            required
            className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="durationDays" className="block text-white font-medium">
            Campaign Duration (Days)
          </label>
          <input
            id="durationDays"
            name="durationDays"
            type="number"
            placeholder="e.g., 30"
            value={formData.durationDays}
            onChange={handleChange}
            min="1"
            max="365"
            required
            className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        className="action-button w-full py-3 flex items-center justify-center"
        disabled={isCreating}
      >
        {isCreating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Creating Campaign...
          </>
        ) : (
          "Create Campaign"
        )}
      </button>
    </form>
  )
}

