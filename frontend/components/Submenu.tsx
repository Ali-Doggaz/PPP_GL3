import clsx from "clsx";
import { useState } from "react";
import { SubmenuProps } from "../pages";
import { PictureIcon } from "../public/icons/Picture.icon";
import { UrlIcon } from "../public/icons/Url.icon";
import { UserIcon } from "../public/icons/User.icon";

export const Submenu: React.FC<SubmenuProps> = ({ elements }) => {
	const [active, setActive] = useState(
		elements.map((el: any) => {
			return false;
		})
	);
	const clickHandler = (i: number) => {
		setActive(
			active.map((value, index) => {
				if (index === i) return true;
				else return false;
			})
		);
		console.log(active);
	};
	return (
		<div className="p-5 box-sizing w-[600px]">
			<div className="w-full py-10 bg-white rounded-3xl text-gray-800 font-sans flex flex-col self-stretch shadow-lg text-left">
				{elements.map((el, index) => (
					<div
						className={clsx("flex w-full justify-start gap-3 items-center py-5 px-10 cursor-pointer hover:bg-neutral-50 transition-all duration-300", { "border-l border-l-8 border-black": active[index] })}
						onClick={() => {
							clickHandler(index);
						}}
					>
						<h1 className="text-base font-normal tracking-widest">{el.title}</h1>
					</div>
				))}
			</div>
		</div>
	);
};
