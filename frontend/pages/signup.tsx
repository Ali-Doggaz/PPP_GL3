import type { NextPage } from "next";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import { Input, Button, Link } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { setCookies } from "cookies-next";

const Home: NextPage = () => {
	const router = useRouter();
	const [disappear, setDisappear] = useState(false);

	const toSignIn = useCallback(() => {
		setDisappear(true);
		setTimeout(() => {
			router.push("signin");
		}, 300);
	}, [router]);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [wrong, setWrong] = useState(false);
	const handleSubmit = async () => {
		if (!loading) {
			setLoading(true);
			if (email && password && username) {
				try {
					const res = await fetch("http://localhost:8000/auth/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, email, password }),
					}).then((t) => {
						if (t.status === 400) return null;
						return t.json();
					});
					if (res) {
						router.push("/signin");
					} else {
						setWrong(true);
					}
				} catch (e) {
					setWrong(true);
				}
			}
			setLoading(false);
		}
	};
	return (
		<div className={styles.container}>
			<Card disappear={disappear}>
				<div className="w-full justify-center flex">
					<img src="/logo.jpg" alt="logo.jpg" className={styles.img} />
				</div>
				<br />
				{wrong && (
					<div className="p-6 rounded-xl mb-5 w-full flex justify-center bg-red-200 text-red-600 border border-red-100 text-sm">
						<p>Make sure the form is valid or email is already used</p>
					</div>
				)}
				{/* username input */}
				<div
					style={{
						marginBottom: "10px",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Input
						label="Username"
						placeholder="Username"
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					></Input>
				</div>
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
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					></Input>
				</div>

				{/* password input */}
				<div
					style={{
						marginBottom: "10px",
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

				{/* password input */}
				<div
					style={{
						marginBottom: "20px",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Input.Password label="Repeat Password" placeholder="Repeat Password"></Input.Password>
				</div>

				<div style={{ marginBottom: "10px" }}>
					<Text>
						Already have an account? <Link onClick={toSignIn}>Sign In</Link>{" "}
					</Text>
				</div>

				<div className={styles.bottom}>
					<Button className="bg-pink-400" onClick={handleSubmit}>
						Sign Up
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default Home;
