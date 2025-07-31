import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.post("https://api.iamport.kr/users/getToken", {
      imp_key: `${process.env.NEXT_PUBLIC_IAMPORT_REST_API_KEY}`,
      imp_secret: `${process.env.NEXT_PUBLIC_IAMPORT_REST_API_SECRET}`,
    });

    const accessToken = data?.response?.access_token;
    const expiredAt = data?.response?.expired_at;
    const now = data?.response?.now;

    if (!accessToken || !expiredAt || !now) {
      return NextResponse.json(
        { message: "Failed to get IAMPORT token" },
        { status: 500 }
      );
    }

    return NextResponse.json({ accessToken, expiredAt, now }, { status: 200 });
  } catch (error) {
    console.error("IAMPORT 토큰 요청 실패:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
