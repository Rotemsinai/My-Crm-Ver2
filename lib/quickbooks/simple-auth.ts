// A simplified, direct QuickBooks auth helper

// Generate a random state for OAuth security
export function generateRandomState() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Generate the QuickBooks authorization URL with hardcoded values for testing
export function getQuickBooksAuthUrl() {
  // Log what we're using for debugging
  console.log("Creating QuickBooks auth URL")

  // Use hardcoded values for testing
  const clientId = "ABql0pShkQa5slEw8mvzFJdS0sCmPbJ4mQM2Dvn6PLMYxE73V"
  const redirectUri = "https://www.mrs-crm.com/api/quickbooks/auth/callback"

  // IMPORTANT: Join scopes with + instead of space
  const scopesString = "com.intuit.quickbooks.accounting+com.intuit.quickbooks.payment"

  console.log("Using client ID:", clientId ? clientId.substring(0, 5) + "..." : "NOT SET")
  console.log("Using redirect URI:", redirectUri)
  console.log("Using scopes:", scopesString)

  // Generate a random state for security
  const state = generateRandomState()

  // Store state in localStorage for verification later
  if (typeof window !== "undefined") {
    localStorage.setItem("qb_oauth_state", state)
  }

  // Base URL for QuickBooks OAuth
  const baseUrl = "https://appcenter.intuit.com/connect/oauth2"

  // IMPORTANT: Manually construct the URL instead of using URLSearchParams
  const authUrl = `${baseUrl}?client_id=${encodeURIComponent(clientId)}&response_type=code&scope=${encodeURIComponent(scopesString)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`

  console.log("Auth URL (partial):", authUrl.substring(0, 60) + "...")

  return authUrl
}
