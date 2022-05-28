import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
	const { cookies } = req;
	const jwt = cookies.JWT;
	const { pathname, origin } = req.nextUrl;
	if (pathname === undefined || pathname === "/") {
		if (jwt === undefined) return NextResponse.redirect(origin + "/signin");
	}

	return NextResponse.next();
}
