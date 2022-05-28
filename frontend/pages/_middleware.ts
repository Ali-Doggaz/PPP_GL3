import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const secret = process.env.SECRET_KEY;
export default function middleware(req: NextRequest) {
	const { cookies } = req;
	const jwt = cookies.JWT;
	const { pathname, origin } = req.nextUrl;
	if (pathname === undefined || pathname === "/") {
		if (jwt === undefined) return NextResponse.redirect(origin + "/signin");
		try {
			verify(jwt, secret!);
			return NextResponse.next();
		} catch (e) {
			return NextResponse.redirect(origin + "/signin");
		}
	}

	return NextResponse.next();
}
