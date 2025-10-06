import {NextRequest, NextResponse} from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: NextRequest, context: any) {
  const token = req.cookies.get("token")?.value;
  const {id} = context.params;

  try {
    const res = await fetch(`${BACKEND_URL}/candidates/${id}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, {status: res.status});
  } catch (err) {
    console.error("Erro ao convidar candidato:", err);
    return NextResponse.json(
      {message: "Erro ao convidar candidato"},
      {status: 500}
    );
  }
}
