import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get the authorization code and state from the query parameters
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const realmId = searchParams.get("realmId") // QuickBooks company ID

  if (!code) {
    return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 })
  }

  try {
    // Exchange the authorization code for access and refresh tokens
    const tokenResponse = await fetch("https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.QUICKBOOKS_CLIENT_ID}:${process.env.QUICKBOOKS_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.QUICKBOOKS_REDIRECT_URI || "https://www.mrs-crm.com/api/quickbooks/auth/callback",
      }).toString(),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error("Token exchange error:", errorData)
      return NextResponse.json({ error: "Failed to exchange authorization code for tokens" }, { status: 500 })
    }

    const tokenData = await tokenResponse.json()

    // Log the tokens (in a real app, you would store these securely)
    console.log("Access Token:", tokenData.access_token)
    console.log("Refresh Token:", tokenData.refresh_token)
    console.log("Realm ID:", realmId)

    // Redirect to a success page or dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Error in QuickBooks callback:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
