/**
 * Simple QuickBooks OAuth utilities
 */

/**
 * Generate a random state string for OAuth security
 */
export function generateRandomState(): string {
  let state = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 16; i++) {
    state += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return state
}

/**
 * Build the authorization URL with all required parameters
 */
export function buildAuthorizationUrl(): string {
  // Use the correct redirect URI based on environment
  const redirectUri = process.env.QUICKBOOKS_REDIRECT_URI || ""

  // Create URL parameters
  const params = new URLSearchParams()
  params.append("client_id", process.env.QUICKBOOKS_CLIENT_ID || "")
  params.append("response_type", "code")
  params.append("scope", "com.intuit.quickbooks.accounting com.intuit.quickbooks.payment")
  params.append("redirect_uri", redirectUri)
  params.append("state", generateRandomState())

  // Return the full URL
  return `https://appcenter.intuit.com/connect/oauth2/authorize?${params.toString()}`
}

/**
 * Legacy function for backward compatibility
 */
export function getQuickBooksAuth(): string {
  return buildAuthorizationUrl()
}
