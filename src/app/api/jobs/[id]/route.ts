import {NextRequest, NextResponse} from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  const token = req.cookies.get("token")?.value;
  const {id} = context.params;

  const res = await fetch(`${BACKEND_URL}/jobs/${id}`, {
    headers: {Authorization: token ? `Bearer ${token}` : ""},
  });

  const data = await res.json();
  return NextResponse.json(data, {status: res.status});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: NextRequest, context: any) {
  const token = req.cookies.get("token")?.value;
  const {id} = context.params;
  const body = await req.json();

  const res = await fetch(`${BACKEND_URL}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, {status: res.status});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: NextRequest, context: any) {
  const token = req.cookies.get("token")?.value;
  const {id} = context.params;

  const res = await fetch(`${BACKEND_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: {Authorization: token ? `Bearer ${token}` : ""},
  });

  const data = await res.json();
  return NextResponse.json(data, {status: res.status});
}
