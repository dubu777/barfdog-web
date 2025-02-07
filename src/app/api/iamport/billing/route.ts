import { getIamportAccessToken } from "@/api/iamport/getIamportAccessToken";
import iamportAxiosInstance from "@/api/iamport/iamportAxiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const customerUid = searchParams.get("customerUid");

    if (!customerUid) {
      return NextResponse.json(
        { message: "customerUid must be provided" },
        { status: 400 }
      );
    }

    const accessToken = await getIamportAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { message: "Failed to get IAMPORT token" },
        { status: 500 }
      );
    }

    const response = await iamportAxiosInstance.get(
      `/subscribe/customers/${customerUid}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { customerUid, reason } = await req.json();
    if (!customerUid || !reason) {
      return NextResponse.json(
        { message: "customerUid and reason must be provided" },
        { status: 400 }
      );
    }

    // IAMPORT Access Token 가져오기
    const accessToken = await getIamportAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { message: "Failed to get IAMPORT token" },
        { status: 500 }
      );
    }

    const response = await iamportAxiosInstance.delete(
      `/subscribe/customers/${customerUid}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { reason },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
