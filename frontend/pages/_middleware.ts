import { NextRequest, NextResponse } from "next/server";
const secret = process.env.SECRET_KEY;
export default async function middleware(req: NextRequest) {
	const { cookies } = req;
	const jwtCookie = cookies.JWT;
	const { pathname, origin } = req.nextUrl;

	if (pathname === "/signup" || pathname === "/signin") {
		if (jwtCookie) {
			try {
				const res = await fetch("http://localhost:8000/auth", {
					method: "GET",
					headers: {
						Authorization: "Bearer " + jwtCookie,
						"Content-Type": "application/json",
					},
				}).then((t) => t.json());
				console.log(res);
				if (res.data && res.data.length > 0) return NextResponse.redirect(origin);
				return NextResponse.next();
			} catch (e) {
				return NextResponse.next();
			}
		}
	} else {
		if (jwtCookie === undefined) return NextResponse.redirect(origin + "/signin");
		try {
			const res = await fetch("http://localhost:8000/auth", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + jwtCookie,
					"Content-Type": "application/json",
				},
			}).then((t) => t.json());
			console.log(res);
			if (res.data && res.data.length > 0) return NextResponse.next();
			return NextResponse.redirect(origin + "/signin");
		} catch (e) {
			return NextResponse.redirect(origin + "/signin");
		}
	}
	return NextResponse.next();
}
