import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET_KEY;
export default function login(req: NextApiRequest, res: NextApiResponse) {
	const { email, password } = req.body;

	res.json({
		token: jwt.sign(
			{
				email,
			},
			secret!
		),
	});
}
