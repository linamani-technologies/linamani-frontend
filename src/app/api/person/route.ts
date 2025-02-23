import { NextResponse } from "next/server";
import { usePerson } from "../../PersonContext";

export async function POST(request: Request) {
  const { personName } = usePerson();

  try {
    const requestData = await request.json();
    console.log("Data:", requestData);
    const { action } = requestData;

    const basicAuthToken = Buffer.from(`pratiksymz:pratik.budhiraja`).toString(
      "base64",
    );

    switch (action) {
      case "create-person": {
        const { username } = requestData;
        // Append username to path
        return fetch(`http://0.0.0.0:8080/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuthToken}`,
          },
          body: JSON.stringify({}),
        });
      }

      case "add-name": {
        return fetch(`http://0.0.0.0:8080/${personName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuthToken}`,
          },
          body: JSON.stringify({
            personId: personName,
            prefix: "DR",
            firstName: "Ichigo",
            lastName: "Kurosaki",
            suffix: "Soul Reaper",
          }),
        });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    // // Send the form data to your external API
    // const externalApiResponse = await fetch("http://0.0.0.0:8080/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    // if (!externalApiResponse.ok) {
    //   throw new Error("External API request failed");
    // }

    // const pdfData = await externalApiResponse.json();

    // Return the PDF URL to the client
    // return NextResponse.json({ pdfUrl: pdfData.pdfUrl });

    // if (!externalApiResponse.ok) {
    //   return NextResponse.json(
    //     { error: "API request failed" },
    //     { status: externalApiResponse.status },
    //   );
    // }

    // const responseData = await externalApiResponse.json();
    // return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in POST API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Handle GET requests for different actions based on query parameters
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const action = searchParams.get("action");

//     let externalApiResponse;

//     switch (action) {
//       case "get-usernames":
//         externalApiResponse = await fetch("http://0.0.0.0:8080/get-usernames", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });
//         break;
//       case "get-other-data":
//         externalApiResponse = await fetch(
//           "http://0.0.0.0:8080/get-other-data",
//           {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//           },
//         );
//         break;
//       default:
//         return NextResponse.json({ error: "Invalid action" }, { status: 400 });
//     }

//     if (!externalApiResponse.ok) {
//       return NextResponse.json(
//         { error: "Failed to fetch data" },
//         { status: externalApiResponse.status },
//       );
//     }

//     const data = await externalApiResponse.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error in GET API route:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }
