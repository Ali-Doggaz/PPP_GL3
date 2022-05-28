import { Button, Checkbox, Input } from "@nextui-org/react";
import { NextPage } from "next";
import { useState } from "react";
import Menu from "../components/Menu";
import { Submenu } from "../components/Submenu";
export interface SubmenuProps {
	elements: { title: string }[];
}
export interface MenuProps {
	elements: {
		title: string;
		subMenu: SubmenuProps;
	}[];
}
const Index: NextPage = () => {
	const subMenus: SubmenuProps = { elements: [{ title: "Like, Follow and DM automatically , to make your account better placed in instagram Algorithm" }, { title: "Upload a picture from the database with its caption" }] };
	const subMenus2: SubmenuProps = { elements: [{ title: "Download Pictures" }, { title: "Manage Database & Captions" }] };

	const menu: MenuProps = {
		elements: [
			{
				title: "Manage Account",
				subMenu: subMenus,
			},
			{
				title: "Manage Pictures",
				subMenu: subMenus2,
			},
		],
	};
	const [active, setActive] = useState(menu.elements.map(() => false));
	const clickHandler = (i: number) => {
		setActive(
			active.map((_value: any, index: number) => {
				if (index === i) return true;
				else return false;
			})
		);
	};
	console.log(active.findIndex((el) => el === true));
	return (
		<div className="bg-gray-50 w-full min-h-screen flex flex-col md:flex-row gap-10 items-center md:items-start justify-center md:justify-start">
			<div className="md:sticky top-0 left-0 w-fit m-0">
				<Menu menu={menu} clickHandler={clickHandler} active={active} />
			</div>
			{active.findIndex((el) => el === true) !== -1 && (
				<div className="flex flex-col gap-10 justify-start items-start">
					<div className="w-fit m-0">
						<Submenu elements={menu.elements[active.findIndex((el) => el === true)].subMenu.elements} />
					</div>
					<div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-[1000px] md:ml-3">
						<form className="flex flex-col gap-4">
							<label className="text-base">Tags you wish to explore, separated by a ','</label>
							<input className="py-2 px-4 w-full border rounded-lg" type="text" />
							<label className="text-base">Number of Likes</label>
							<input className="py-2 px-4 w-full border rounded-lg" type="number" />
							<label className="text-base">Maximum Number of follows</label>
							<input className="py-2 px-4 w-full border rounded-lg" type="number" />
							<label className="text-base">Messages you wish to send to people, separated by a ','</label>
							<input className="py-2 px-4 w-full border rounded-lg" type="text" />
							<Checkbox defaultChecked={true} size="sm" color="error">
								<p className="text-base">DM People (Doesnt DM the same person twice)</p>
							</Checkbox>
							<Checkbox size="sm" color="error">
								<p className="text-base">Show Whats going on during the process</p>
							</Checkbox>
							<p className="text-base">PS : To avoid being detected as a bot the app will pause for a bit between each like/follow</p>
							<Button className="bg-pink-600">Run</Button>
						</form>
					</div>
					<div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-[1000px] md:ml-3">
						<form className="flex flex-col gap-4">
							<label className="text-base">This will upload the most recent picture in your database (download/added manually).</label>
							<Button className="bg-pink-600">Upload</Button>
						</form>
					</div>
					<div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-[1000px] md:ml-3">
						<form className="flex flex-col gap-4">
							<label className="text-base">Please enter a subreddit's name or a theme's name</label>
							<input className="py-2 px-4 w-full border rounded-lg" type="text" />

							<label className="text-base">Number of picture to download</label>
							<input className="py-2 px-4 w-full border rounded-lg" type="number" />
							<Button className="bg-pink-600">Download</Button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Index;
