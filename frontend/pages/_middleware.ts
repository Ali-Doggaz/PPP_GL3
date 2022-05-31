import { NextRequest, NextResponse } from "next/server";
const secret = process.env.SECRET_KEY;
export default async function middleware(req: NextRequest) {
	const { cookies } = req;
	const jwtCookie = cookies.JWT;
	const { pathname, origin } = req.nextUrl;

	if (pathname === "/signup" || pathname === "/signin" || pathname === "/home") {
		if (jwtCookie) {
			try {
				const res = await fetch("http://localhost:8000/auth", {
					method: "GET",
					headers: {
						Authorization: "Bearer " + jwtCookie,
						"Content-Type": "application/json",
					},
				}).then((t) => t.json());
				if (res.data && res.data.length > 0) return NextResponse.redirect(origin);
				return NextResponse.next();
			} catch (e) {
				return NextResponse.next();
			}
		}
	} else {
		if (jwtCookie === undefined) return NextResponse.redirect(origin + "/home");
		try {
			const res = await fetch("http://localhost:8000/auth", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + jwtCookie,
					"Content-Type": "application/json",
				},
			}).then((t) => t.json());
			if (res.data && res.data.length > 0) return NextResponse.next();
			return NextResponse.redirect(origin + "/home");
		} catch (e) {
			return NextResponse.redirect(origin + "/home");
		}
	}
	return NextResponse.next();
}
