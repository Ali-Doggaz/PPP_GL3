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
		<div className="bg-gray-50 w-full min-h-screen flex flex-row gap-10 items-start justify-start">
			<div className="sticky top-0 left-0 w-fit m-0">
				<Menu menu={menu} clickHandler={clickHandler} active={active} />
			</div>
			{active.findIndex((el) => el === true) !== -1 && (
				<div className="w-fit m-0">
					<Submenu elements={menu.elements[active.findIndex((el) => el === true)].subMenu.elements} />
				</div>
			)}
		</div>
	);
};

export default Index;
