import { getIamportAccessToken } from "@/api/iamport/getIamportAccessToken";
import iamportAxiosInstance from "@/api/iamport/iamportAxiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const accessToken = await getIamportAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { message: "Failed to get IAMPORT token" },
        { status: 500 }
      );
    }

    const response = await iamportAxiosInstance.post(
      "/subscribe/payments/again",
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("body", body);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error-${error}` },
      { status: 500 }
    );
  }
}
