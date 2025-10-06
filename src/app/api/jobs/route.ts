import {NextRequest, NextResponse} from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const res = await fetch(`${BACKEND_URL}/jobs`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();

  return NextResponse.json(data, {status: res.status});
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const body = await req.json();

  const res = await fetch(`${BACKEND_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, {status: res.status});
}
