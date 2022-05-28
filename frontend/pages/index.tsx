import { NextPage } from "next";
import Menu from "../components/Menu";
const Index: NextPage = () => {
	return (
		<div className="bg-white w-screen min-h-screen flex-row gap-5 items-start justify-between">
			<div className="">
				<Menu />
			</div>
			<div className=""></div>
		</div>
	);
};

export default Index;
