import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const requestData = await request.json();

    const basicAuthToken = Buffer.from(`pratiksymz:pratik.budhiraja`).toString(
      "base64",
    );

    const { personId, formData } = requestData;
    return fetch(`http://0.0.0.0:8080/${personId}/birthInformation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuthToken}`,
      },
      body: JSON.stringify({ personId, ...formData }),
    });
  } catch (error) {
    console.error("Error in POST API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
