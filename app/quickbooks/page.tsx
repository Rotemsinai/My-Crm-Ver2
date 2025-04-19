"use client"

import { useState, useEffect } from "react"
import { getQuickBooksAuth } from "@/lib/quickbooks/simple-auth"

export default function QuickBooksIntegration() {
  const [authUrl, setAuthUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Use the exported getQuickBooksAuth function
      const url = getQuickBooksAuth()
      setAuthUrl(url)
    } catch (err) {
      console.error("Error generating QuickBooks auth URL:", err)
      setError("Failed to generate authorization URL")
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">QuickBooks Integration</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Connect to QuickBooks</h2>
        <p className="mb-4">Connect your QuickBooks account to import financial data into your CRM</p>

        <p className="mb-6">
          Connecting to QuickBooks allows you to import your financial data directly into your CRM. This integration
          provides access to:
        </p>

        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2">Customer information</li>
          <li className="mb-2">Invoices and payments</li>
          <li className="mb-2">Bills and expenses</li>
          <li className="mb-2">Financial reports</li>
        </ul>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
            <p className="font-medium">Error connecting to QuickBooks</p>
            <p>{error}</p>
          </div>
        )}

        {authUrl ? (
          <a
            href={authUrl}
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            Connect to QuickBooks
          </a>
        ) : !error ? (
          <button disabled className="inline-block bg-gray-300 text-gray-500 px-6 py-3 rounded-md cursor-not-allowed">
            Loading...
          </button>
        ) : null}

        <p className="text-sm text-gray-500 mt-4">
          By clicking this button, you'll be redirected to QuickBooks to authorize access to your data.
        </p>
      </div>
    </div>
  )
}
