// 📌 src/app/api/site-url/route.ts (Next.js 14 App Router 기준)
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "https";
  const siteURL = host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_SITE_URL;

  return NextResponse.json({ siteURL });
}
