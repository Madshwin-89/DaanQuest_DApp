"use client"

interface Donation {
  id: string
  donorAddress: string
  amount: number
  timestamp: string
  transactionHash: string
}

interface DonationListProps {
  donations: Donation[]
}

export function DonationList({ donations }: DonationListProps) {
  if (donations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/70">No donations have been made yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-2 text-white/80 font-medium">Donor</th>
            <th className="text-left py-3 px-2 text-white/80 font-medium">Amount</th>
            <th className="text-left py-3 px-2 text-white/80 font-medium">Date</th>
            <th className="text-left py-3 px-2 text-white/80 font-medium">Transaction</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => {
            const date = new Date(donation.timestamp)
            const formattedDate = date.toLocaleDateString()
            const truncatedAddress = `${donation.donorAddress.slice(0, 6)}...${donation.donorAddress.slice(-4)}`
            const truncatedTxHash = `${donation.transactionHash.slice(0, 10)}...`

            return (
              <tr key={donation.id} className="border-b border-white/10">
                <td className="py-3 px-2 text-white font-mono">{truncatedAddress}</td>
                <td className="py-3 px-2 text-white">{donation.amount} EDU</td>
                <td className="py-3 px-2 text-white/70">{formattedDate}</td>
                <td className="py-3 px-2">
                  <a
                    href={`https://explorer.educhain.com/tx/${donation.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-mono"
                  >
                    {truncatedTxHash}
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

