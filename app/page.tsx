import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="gradient-bg min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Welcome to DaanQuest</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            A decentralized platform for creating and supporting educational campaigns with cryptocurrency donations
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="card-container p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Create a Campaign</h2>
            <p className="text-white/80 mb-6">Start a new fundraising campaign and receive crypto donations</p>
            <div className="bg-gray-200 rounded-lg w-full h-48 mb-6 flex items-center justify-center">
          <Image
          src="/photo1.jpg"
          alt="Create Campaign Icon"
          width={150}
          height={150}
          className="opacity-50"
        />

            </div>
            <Link href="/create-campaign">
              <button className="action-button w-full py-2">Create a Campaign</button>
            </Link>
          </div>

          <div className="card-container p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Donate</h2>
            <p className="text-white/80 mb-6">Support existing campaigns with cryptocurrency donations</p>
            <div className="bg-gray-200 rounded-lg w-full h-48 mb-6 flex items-center justify-center">
              <Image
                src="/photo.jpg"
                alt="Donate Icon"
                width={150}
                height={150}
                className="opacity-50"
              />
            </div>
            <Link href="/donate">
              <button className="action-button w-full py-2">Browse Campaigns</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

