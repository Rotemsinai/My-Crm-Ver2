// Generate a random state for OAuth security
export function generateRandomState() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Generate the QuickBooks authorization URL
export function getQuickBooksAuthUrl() {
  // Debug environment variables
  console.log("Environment Variables Check:")
  console.log("- NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID:", process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID)
  console.log("- QUICKBOOKS_REDIRECT_URI:", process.env.QUICKBOOKS_REDIRECT_URI)

  const baseUrl = "https://appcenter.intuit.com/connect/oauth2"

  // Use the public environment variable for client ID
  const clientId = process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID || ""
  // Use the server environment variable for redirect URI
  const redirectUri = process.env.QUICKBOOKS_REDIRECT_URI || ""

  // IMPORTANT: Use + instead of spaces for scopes
  const scopes = ["com.intuit.quickbooks.accounting", "com.intuit.quickbooks.payment"]
  const scopesString = scopes.join("+")

  if (!clientId) {
    console.error("CRITICAL ERROR: No QuickBooks Client ID available!")
    return "#error-no-client-id"
  }

  // IMPORTANT: Manually construct the URL instead of using URLSearchParams
  // This ensures proper encoding of all parameters
  return `${baseUrl}?client_id=${encodeURIComponent(clientId)}&response_type=code&scope=${encodeURIComponent(scopesString)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(generateRandomState())}`
}

// Verify the returned OAuth state
export function verifyOAuthState(state: string) {
  if (typeof window !== "undefined") {
    const storedState = localStorage.getItem("qb_oauth_state")
    return state === storedState
  }
  return false
}

// Clear the OAuth state
export function clearOAuthState() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("qb_oauth_state")
  }
}
