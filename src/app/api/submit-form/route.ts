import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Send the form data to your external API
    const externalApiResponse = await fetch("https://your-external-api-url.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!externalApiResponse.ok) {
      throw new Error("External API request failed")
    }

    const pdfData = await externalApiResponse.json()

    // Return the PDF URL to the client
    return NextResponse.json({ pdfUrl: pdfData.pdfUrl })
  } catch (error) {
    console.error("Error in submit-form API route:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}