"use client"

import { useState, useEffect } from "react"
import { buildAuthorizationUrl } from "@/lib/quickbooks/simple-auth"

export default function QuickbooksTest() {
  const [authUrl, setAuthUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Get the authorization URL directly
      const url = buildAuthorizationUrl()
      setAuthUrl(url)
    } catch (err) {
      console.error("Error generating QuickBooks auth URL:", err)
      setError("Failed to generate authorization URL")
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">QuickBooks OAuth2 Test</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
            <p className="font-medium">Error connecting to QuickBooks</p>
            <p>{error}</p>
          </div>
        )}

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
        ) : !error ? (
          <p>Loading authorization URL...</p>
        ) : null}
      </div>
    </div>
  )
}
