"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickBooksConnectButton } from "@/components/quickbooks-connect-button"

export default function QuickBooksIntegrationPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">QuickBooks Integration</h1>

      <Card>
        <CardHeader>
          <CardTitle>Connect to QuickBooks</CardTitle>
          <CardDescription>Connect your QuickBooks account to import financial data into your CRM</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="mb-4">
            Connecting to QuickBooks allows you to import your financial data directly into your CRM. This integration
            provides access to:
          </p>

          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li>Customer information</li>
            <li>Invoices and payments</li>
            <li>Bills and expenses</li>
            <li>Financial reports</li>
          </ul>

          <QuickBooksConnectButton />
        </CardContent>
      </Card>
    </div>
  )
}
