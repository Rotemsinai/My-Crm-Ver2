"use client"

import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function QuickbooksTest() {
  const [authUrl, setAuthUrl] = useState<string | null>(null)

  useEffect(() => {
    const state = uuidv4()
    // Store the state in localStorage for later verification
    localStorage.setItem("quickbooks_auth_state", state)

    // Make sure to use the EXACT same redirect URI as registered in QuickBooks Developer Portal
    const redirectUri =
      process.env.NEXT_PUBLIC_QUICKBOOKS_REDIRECT_URI || "https://www.mrs-crm.com/api/quickbooks/auth/callback"

    // Construct the authorization URL with the correct redirect_uri
    const authUrl = `https://appcenter.intuit.com/connect/oauth2/authorize?client_id=${
      process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID
    }&response_type=code&scope=com.intuit.quickbooks.accounting%20com.intuit.quickbooks.payment&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&state=${state}`

    setAuthUrl(authUrl)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">QuickBooks OAuth2 Test</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {authUrl ? (
          <>
            <p className="mb-4">Click the button below to connect your QuickBooks account:</p>
            <a
              href={authUrl}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Connect to QuickBooks
            </a>
          </>
        ) : (
          <p>Loading authorization URL...</p>
        )}
      </div>
    </div>
  )
}
