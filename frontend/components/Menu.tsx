import clsx from "clsx";
import { useState } from "react";
import { PictureIcon } from "../public/icons/Picture.icon";
import { UrlIcon } from "../public/icons/Url.icon";
import { UserIcon } from "../public/icons/User.icon";

export default function Menu() {
	const [active, setActive] = useState([false, false, false]);
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
		<div className="h-screen p-5 box-sizing">
			<div className="w-[300px] py-10  bg-neutral-900 rounded-3xl text-white font-sans flex flex-col self-stretch drop-shadow-lg">
				<div className="flex w-full justify-center mb-10">
					<h1 className="text-2xl font-semibold tracking-widest"> instify </h1>
				</div>
				<div
					className={clsx("flex w-full justify-left gap-3 items-center py-5 px-10 cursor-pointer hover:bg-neutral-800 transition-all duration-300", { "border-l border-l-8 border-white": active[0] })}
					onClick={() => {
						clickHandler(0);
					}}
				>
					<UserIcon className="w-4 h-4 stroke-white" />
					<h1 className="text-base font-normal tracking-widest">Manage Account</h1>
				</div>
				<div
					className={clsx("flex w-full justify-left gap-3 items-center py-5 px-10 cursor-pointer hover:bg-neutral-800 transition-all duration-300", { "border-l border-l-8 border-white": active[1] })}
					onClick={() => {
						clickHandler(1);
					}}
				>
					<PictureIcon className="w-4 h-4 stroke-white" />
					<h1 className="text-base font-normal tracking-widest">Manage Pictures</h1>
				</div>
				<div
					className={clsx("flex w-full justify-left gap-3 items-center py-5 px-10 cursor-pointer hover:bg-neutral-800 transition-all duration-300", { "border-l border-l-8 border-white": active[2] })}
					onClick={() => {
						clickHandler(2);
					}}
				>
					<UrlIcon className="w-4 h-4 stroke-white" />
					<h1 className="text-base font-normal tracking-widest">Validate Path</h1>
				</div>
				<div className="w-full mt-20 flex justify-center text-center flex-col">
					<p className="text-sm">
						All copyrights reserved to <span className="font-semibold text-base">Instify</span>
					</p>
					<a className="text-sm" href="">
						Contact us
					</a>
				</div>
			</div>
		</div>
	);
}
