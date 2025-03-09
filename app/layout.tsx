import type React from "react"
import "@/app/globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/context/wallet-context"
import { OpenCampusProvider } from "@/context/open-campus-context"
import { CampaignsProvider } from "@/context/campaign-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}> */}
          <WalletProvider>
            <OpenCampusProvider>
              <CampaignsProvider>
                <div className="min-h-screen">{children}</div>
              </CampaignsProvider>
            </OpenCampusProvider>
          </WalletProvider>
        {/* </ThemeProvider>  */}
      </body>
    </html>
  )
}

