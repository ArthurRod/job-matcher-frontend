import {NextRequest, NextResponse} from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  const token = req.cookies.get("token")?.value;
  const {id} = context.params;

  const res = await fetch(`${BACKEND_URL}/jobs/${id}/match`, {
    headers: {Authorization: token ? `Bearer ${token}` : ""},
  });

  const data = await res.json();
  return NextResponse.json(data, {status: res.status});
}
