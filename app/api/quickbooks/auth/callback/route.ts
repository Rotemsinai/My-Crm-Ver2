import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { handleQuickBooksError } from "@/lib/quickbooks/error-handling"

// Define QB_CONFIG directly to avoid import issues
const QB_CONFIG = {
  clientId: process.env.QUICKBOOKS_CLIENT_ID || "",
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET || "",
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI || "",
}

export async function GET(request: NextRequest) {
  // Get the authorization code and state from the URL
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const realmId = searchParams.get("realmId")

  console.log("Callback received with params:", { code: code?.substring(0, 5) + "...", state, realmId })

  // Validate the required parameters
  if (!code || !realmId) {
    console.error("Missing required parameters:", { code, realmId })
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  try {
    // Exchange the authorization code for tokens
    const tokenUrl = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer"

    console.log("Exchanging code for tokens with params:", {
      grant_type: "authorization_code",
      code: code.substring(0, 5) + "...",
      redirect_uri: QB_CONFIG.redirectUri,
    })

    const tokenResponse = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: QB_CONFIG.redirectUri,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${QB_CONFIG.clientId}:${QB_CONFIG.clientSecret}`).toString("base64")}`,
        },
      },
    )

    // Extract the tokens
    const { access_token, refresh_token, expires_in } = tokenResponse.data
    console.log("Received tokens:", {
      access_token: access_token?.substring(0, 5) + "...",
      refresh_token: refresh_token?.substring(0, 5) + "...",
      expires_in,
    })

    // Store the tokens securely (in a real app, you would store these in a database)
    const authData = {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
      realmId,
    }

    // Store the auth data in a secure cookie
    const response = NextResponse.redirect(new URL("/integrations/quickbooks/connected", request.url))
    response.cookies.set("qb_auth_data", JSON.stringify(authData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error exchanging QuickBooks authorization code:", error)
    const qbError = handleQuickBooksError(error)

    // Redirect to an error page with the error details
    const errorUrl = new URL("/integrations/quickbooks/error", request.url)
    errorUrl.searchParams.set("type", qbError.type)
    errorUrl.searchParams.set("message", qbError.message)

    return NextResponse.redirect(errorUrl)
  }
}
