import type { NextPage } from "next";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import { Input, Button, Link } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { setCookies } from 'cookies-next';
const Home: NextPage = () => {
	const router = useRouter();

	const [disappear, setDisappear] = useState(false);

	const toSignUp = useCallback(() => {
		setDisappear(true);
		setTimeout(() => {
			router.push("signup");
		}, 300);
	}, [router]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = async () => {
		if (email && password) {
			const res = await fetch("/api/login", {
				method: "POST",
				body: JSON.stringify({ email, password }),
			}).then((t) => t.json());

			const token = res.token;
			console.log(token);
			if (token) setCookies("JWT", token);
		}
	};
	return (
		<div className={styles.container}>
			<Card disappear={disappear}>
				<div className="w-full justify-center flex">
					<img src="/logo.jpg" alt="logo.jpg" className={styles.img} />
				</div>
				<br />

				{/* email input */}
				<div
					style={{
						marginBottom: "10px",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Input
						label="Email"
						placeholder="Email"
						type={"email"}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					></Input>
				</div>

				{/* password input */}
				<div
					style={{
						marginBottom: "20px",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Input.Password
						label="Password"
						placeholder="Password"
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					></Input.Password>
				</div>

				<div style={{ marginBottom: "10px" }}>
					<Text>
						Don't have an account? <Link onClick={toSignUp}>Create new account</Link>{" "}
					</Text>
				</div>

				<div className={styles.bottom}>
					<Button className="bg-pink-400" onClick={handleSubmit}>
						Sign In
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default Home;
