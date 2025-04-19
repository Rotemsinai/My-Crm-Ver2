"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuickBooksSandboxTest() {
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Function to handle the QuickBooks connection
  const connectToQuickBooks = () => {
    setIsRedirecting(true)

    // Sandbox-specific configuration
    const clientId = process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID || "ABql0pShkQa5slEw8mvzFJdS0sCmPbJ4mQM2Dvn6PLMYxE73V"
    const redirectUri = "https://www.mrs-crm.com/api/quickbooks/auth/callback"
    const scopes = "com.intuit.quickbooks.accounting+com.intuit.quickbooks.payment"
    const state = Math.random().toString(36).substring(2, 15)

    // Store state for verification later
    localStorage.setItem("qb_oauth_state", state)

    // Construct the authorization URL for sandbox
    const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${encodeURIComponent(clientId)}&response_type=code&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`

    console.log("Redirecting to:", authUrl)

    // Redirect to QuickBooks authorization page
    window.location.href = authUrl
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">QuickBooks Sandbox Test</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Connect to QuickBooks Sandbox</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This page is specifically configured to connect to the QuickBooks Sandbox environment.</p>

          <Button onClick={connectToQuickBooks} disabled={isRedirecting} className="bg-green-600 hover:bg-green-700">
            {isRedirecting ? "Redirecting..." : "Connect to QuickBooks Sandbox"}
          </Button>
        </CardContent>
      </Card>

      <div className="p-4 bg-amber-50 rounded-md">
        <h2 className="font-semibold mb-2">Important Notes:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Make sure your redirect URI is registered in the <strong>Sandbox Development settings</strong> in the
            QuickBooks Developer Portal
          </li>
          <li>You must use a Sandbox company for testing</li>
          <li>The sandbox environment is completely separate from the production environment</li>
        </ul>
      </div>
    </div>
  )
}
