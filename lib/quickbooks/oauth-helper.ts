// Simple, direct OAuth helper for QuickBooks
import { QB_CONFIG } from "./config"

export function getQuickBooksAuthUrl() {
  // Log what we're using
  console.log("Creating QuickBooks auth URL with:")
  console.log("- Client ID exists:", !!QB_CONFIG.clientId)
  console.log("- Redirect URI:", QB_CONFIG.redirectUri)

  // Generate a random state for security
  const state = Math.random().toString(36).substring(2, 15)

  // Store state in localStorage for verification later
  if (typeof window !== "undefined") {
    localStorage.setItem("qb_oauth_state", state)
  }

  // Base URL for QuickBooks OAuth
  const baseUrl = "https://appcenter.intuit.com/connect/oauth2"

  // Create URL parameters
  const params = new URLSearchParams({
    client_id: QB_CONFIG.clientId,
    response_type: "code",
    scope: QB_CONFIG.scopes.join(" "),
    redirect_uri: QB_CONFIG.redirectUri,
    state: state,
  })

  // Return the full URL
  return `${baseUrl}?${params.toString()}`
}
