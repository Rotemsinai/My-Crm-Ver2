import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get the authorization code from the query parameters
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const realmId = searchParams.get("realmId") // QuickBooks company ID

    if (!code) {
      return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 })
    }

    // Log the received code (in production, you would exchange this for tokens)
    console.log("Received authorization code:", code)
    console.log("Realm ID:", realmId)

    // For now, just redirect to a success page
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Error in QuickBooks callback:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
