// Make sure to export all necessary functions

/**
 * Generate a random state string for OAuth security
 */
export function generateRandomState() {
  let state = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 16; i++) {
    state += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return state
}

/**
 * Get QuickBooks authorization URL
 * This function must be exported
 */
export function getQuickBooksAuth() {
  return buildAuthorizationUrl()
}

/**
 * Build the authorization URL with all required parameters
 */
export function buildAuthorizationUrl(isProduction = false) {
  // Use the correct redirect URI based on environment
  const redirectUri = process.env.QUICKBOOKS_REDIRECT_URI || "https://www.mrs-crm.com/api/quickbooks/auth/callback"

  const params = new URLSearchParams({
    client_id: process.env.QUICKBOOKS_CLIENT_ID || "",
    response_type: "code",
    scope: "com.intuit.quickbooks.accounting com.intuit.quickbooks.payment",
    redirect_uri: redirectUri,
    state: generateRandomState(),
  })

  return `https://appcenter.intuit.com/connect/oauth2/authorize?${params.toString()}`
}
