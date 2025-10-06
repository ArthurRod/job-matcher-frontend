import {NextRequest, NextResponse} from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const token = req.cookies.get("token")?.value;
  const {id} = params;

  const res = await fetch(`${BACKEND_URL}/jobs/${id}/match`, {
    headers: {Authorization: token ? `Bearer ${token}` : ""},
  });

  const data = await res.json();
  return NextResponse.json(data, {status: res.status});
}
