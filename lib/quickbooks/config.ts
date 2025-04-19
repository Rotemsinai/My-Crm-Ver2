// QuickBooks configuration
export const QB_CONFIG = {
  // Client ID must be accessible on the client side
  clientId: process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID || "",
  // These are only used server-side
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET || "",
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI || "",
  environment: "production", // Changed from "sandbox" to "production"
  scopes: ["com.intuit.quickbooks.accounting", "com.intuit.quickbooks.payment"],
}

// Debug function to check configuration
export function logQuickBooksConfig() {
  console.log("QuickBooks Configuration Check:")
  console.log("- Client ID exists:", !!QB_CONFIG.clientId)
  console.log("- Client Secret exists:", !!QB_CONFIG.clientSecret)
  console.log("- Redirect URI:", QB_CONFIG.redirectUri)
  console.log("- Environment:", QB_CONFIG.environment)
}
