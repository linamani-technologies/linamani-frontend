import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    const requestData = await request.json();

    const basicAuthToken = Buffer.from(`pratiksymz:pratik.budhiraja`).toString(
      "base64",
    );

    const { personId } = requestData;
    return fetch(`http://0.0.0.0:8080/${personId}/i-140`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuthToken}`,
      }
    });
  } catch (error) {
    console.error("Error in GET API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
