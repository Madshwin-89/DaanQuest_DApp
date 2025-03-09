import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-blue-50 to-transparent">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About DaanQuest</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A secure platform for crypto donations on the EDUChain blockchain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-t-4 border-t-primary">
            <CardHeader className="pb-2">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Secure Transactions</CardTitle>
              <CardDescription>All donations are processed through secure blockchain technology</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-primary">
            <CardHeader className="pb-2">
              <Lock className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Protected Data</CardTitle>
              <CardDescription>Your personal information is encrypted and never shared</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-primary">
            <CardHeader className="pb-2">
              <CheckCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Verified Campaigns</CardTitle>
              <CardDescription>All campaigns are verified through Open Campus ID</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            DaanQuest was created to provide a secure and transparent platform for educational fundraising on the
            blockchain. We believe in the power of community support to drive educational initiatives forward, with
            complete transparency and security provided by blockchain technology.
          </p>
          <p className="text-muted-foreground mb-4">
            By connecting donors directly with educational campaigns, we eliminate intermediaries and ensure that funds
            reach their intended recipients efficiently and securely.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium">Create a Campaign</h3>
                <p className="text-sm text-muted-foreground">
                  Educational institutions can create fundraising campaigns using their Open Campus ID
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium">Donors Connect</h3>
                <p className="text-sm text-muted-foreground">
                  Donors connect their crypto wallets and browse verified campaigns
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium">Secure Donations</h3>
                <p className="text-sm text-muted-foreground">
                  Donations are securely processed on the EDUChain blockchain with NFT receipts
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium">Transparent Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Campaign creators and donors can track progress in real-time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button asChild size="lg">
              <Link href="/create-campaign">Create a Campaign</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/donate">Make a Donation</Link>
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">
            DaanQuest is built on the EDUChain blockchain, a secure and educational-focused blockchain platform.
          </p>
          <a
            href="https://educhain.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            Learn more about EDUChain
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </main>
  )
}

