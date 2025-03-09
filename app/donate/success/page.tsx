"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function DonationSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [campaignId, setCampaignId] = useState("")
  const [amount, setAmount] = useState("")
  const [txHash, setTxHash] = useState("")

  useEffect(() => {
    const id = searchParams.get("campaignId")
    const donationAmount = searchParams.get("amount")
    const hash = searchParams.get("txHash")

    if (!id || !donationAmount) {
      router.push("/donate")
      return
    }

    setCampaignId(id)
    setAmount(donationAmount)
    if (hash) setTxHash(hash)
  }, [searchParams, router])

  return (
    <main className="gradient-bg min-h-screen flex justify-center items-center p-4">
      <div className="card-container p-8 max-w-md w-full">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-6">Donation Successful!</h2>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-white/80">Thank you for your donation of</p>
          <p className="text-3xl font-bold text-white my-2">{amount} EDU</p>
          <p className="text-white/70">Your contribution makes a difference!</p>
        </div>

        {txHash && (
          <div className="bg-white/5 p-4 rounded-md text-sm break-all mb-6">
            <p className="font-medium text-white mb-1">Transaction Hash:</p>
            <p className="text-white/70">{txHash}</p>
          </div>
        )}

        <div className="bg-green-800/20 p-4 rounded-md border border-green-700/30 text-green-400 text-sm mb-8">
          <p className="font-medium">NFT Receipt</p>
          <p className="text-green-400/80">An NFT receipt has been sent to your wallet as proof of your donation.</p>
        </div>

        <div className="space-y-3">
          <Link href={`/donate/${campaignId}`}>
            <button className="action-button w-full py-3">View Campaign</button>
          </Link>

          <Link href="/donate">
            <button className="w-full py-3 rounded-md border border-white/20 text-white bg-white/5 hover:bg-white/10">
              Browse More Campaigns
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}

