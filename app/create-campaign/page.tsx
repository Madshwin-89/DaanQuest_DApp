"use client"

import { useState } from "react"
import Link from "next/link"
import { useOpenCampus } from "@/context/open-campus-context"
import { OpenCampusLogin } from "@/components/open-campus-login"
import { CampaignForm } from "@/components/campaign-form"
import { ArrowLeft } from "lucide-react"

export default function CreateCampaignPage() {
  const { isConnected, isConnecting, connect, user } = useOpenCampus()
  const [connectingAccount, setConnectingAccount] = useState(false)

  const handleConnectOpenCampus = async () => {
    setConnectingAccount(true)
    try {
      await connect()
    } catch (error) {
      console.error("Failed to connect Open Campus ID:", error)
    } finally {
      setConnectingAccount(false)
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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Create a Campaign</h1>
          <p className="text-white/80 text-xl">Start a fundraising campaign on EDUChain</p>
        </div>

        {!isConnected ? (
          <div className="card-container p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Open Campus ID</h2>
            <p className="text-white/80 mb-8">You need an Open Campus ID to create a donation campaign</p>
            <OpenCampusLogin onConnect={handleConnectOpenCampus} isConnecting={connectingAccount || isConnecting} />
          </div>
        ) : (
          <div className="card-container p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Create Your Campaign</h2>
            <p className="text-white/80 mb-8">Set up your donation campaign with the details below</p>
            <CampaignForm userId={user?.id} />
          </div>
        )}
      </div>
    </main>
  )
}

