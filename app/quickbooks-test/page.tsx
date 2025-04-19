"use client"

import { useState, useEffect } from "react"

export default function QuickBooksTest() {
  const [authUrl, setAuthUrl] = useState<string | null>(null)

  // Generate a random state for OAuth security
  function generateRandomState() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // Handle the connect button click
  const handleConnect = () => {
    if (authUrl) {
      window.location.href = authUrl
    }
  }

  // Generate the QuickBooks authorization URL with hardcoded values
  useEffect(() => {
    const baseUrl = "https://appcenter.intuit.com/connect/oauth2"

    // Hardcoded values for testing
    const clientId = "ABql0pShkQa5slEw8mvzFJdS0sCmPbJ4mQM2Dvn6PLMYxE73V" // Your QuickBooks client ID
    const redirectUri = "https://www.mrs-crm.com/api/quickbooks/auth/callback"

    // IMPORTANT: Use + instead of spaces for scopes
    const scopesString = "com.intuit.quickbooks.accounting+com.intuit.quickbooks.payment"

    const state = generateRandomState()
    localStorage.setItem("qb_oauth_state", state)

    // Manually construct the URL with proper encoding
    const url = `${baseUrl}?client_id=${encodeURIComponent(clientId)}&response_type=code&scope=${encodeURIComponent(scopesString)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`

    setAuthUrl(url)

    // Log the URL for debugging
    console.log("Generated URL:", url)
    window.location.href = url // Automatically redirect
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">QuickBooks Direct Test</h1>

      <div className="space-y-6">
        <button onClick={handleConnect} className="bg-green-600 hover:bg-green-700 text-white" size="lg">
          Connect to QuickBooks (Direct)
        </button>

        {authUrl && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p className="font-medium mb-2">Generated Auth URL:</p>
            <p className="text-sm break-all">{authUrl}</p>
          </div>
        )}

        <div className="mt-8 p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Debugging Information</h2>
          <p>This page bypasses all complex logic and directly creates an authorization URL with hardcoded values.</p>
          <p className="mt-2">
            If this works but the main integration doesn't, we know the issue is in our integration code.
          </p>
        </div>
      </div>
    </div>
  )
}
