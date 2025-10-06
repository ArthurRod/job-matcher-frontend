import {NextResponse, NextRequest} from "next/server";

const privateRoutes = ["/jobs", "/jobs/:path*", "/match/:path*"];

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  const token = req.cookies.get("token")?.value;

  console.log(token);

  const isPrivate = privateRoutes.some((route) => {
    const pattern = route.replace(":path*", ".*");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });

  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*"],
};
