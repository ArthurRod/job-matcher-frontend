import {NextResponse} from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  const {email, password} = await request.json();

  try {
    const res = await axios.post(`${BACKEND_URL}/auth/login`, {
      email,
      password,
    });

    const token = res.data?.token;

    if (!token) {
      return NextResponse.json(
        {message: "Token não retornado pelo servidor."},

        {status: 400}
      );
    }

    const response = NextResponse.json({token});

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {message: error?.response?.data?.message || "Erro no login"},
      {status: error?.response?.status || 500}
    );
  }
}
