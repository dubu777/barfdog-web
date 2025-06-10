import { getIamportAccessToken } from "@/api/iamport/getIamportAccessToken";
import iamportAxiosInstance from "@/api/iamport/iamportAxiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const impUid = searchParams.get("impUid");

    if (!impUid) {
      return NextResponse.json({ message: "impUid must be provided" }, { status: 400 });
    }

    const accessToken = await getIamportAccessToken();
    if (!accessToken) {
      return NextResponse.json({ message: "Failed to get IAMPORT token" }, { status: 500 });
    }

    const response = await iamportAxiosInstance.get(`/payments/${impUid}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
