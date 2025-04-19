"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getQuickBooksAuthUrl } from "@/lib/quickbooks/simple-auth"

export function QuickBooksConnectButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Connecting to QuickBooks...")

      // Get the authorization URL using our simplified helper
      const authUrl = getQuickBooksAuthUrl()

      // Log for debugging
      console.log("Generated auth URL (partial):", authUrl.substring(0, 60) + "...")

      // Redirect to QuickBooks
      window.location.href = authUrl
    } catch (err: any) {
      console.error("Error connecting to QuickBooks:", err)
      setError(err.message || "Error connecting to QuickBooks")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md border border-red-200">
          <p className="font-medium">Error connecting to QuickBooks</p>
          <p>{error}</p>
        </div>
      )}

      <Button
        onClick={handleConnect}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        {isLoading ? "Connecting..." : "Connect to QuickBooks"}
      </Button>

      <p className="text-sm text-gray-500">
        By clicking this button, you'll be redirected to QuickBooks to authorize access to your data.
      </p>
    </div>
  )
}
