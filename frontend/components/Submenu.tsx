import clsx from "clsx";
import { useState } from "react";
import { SubmenuProps } from "../pages";
import { PictureIcon } from "../public/icons/Picture.icon";
import { UrlIcon } from "../public/icons/Url.icon";
import { UserIcon } from "../public/icons/User.icon";

export const Submenu = (submenu: { submenu: SubmenuProps; clickHandler: (i: number) => void; active: boolean[] }) => {
	return (
		<div className="p-5 box-sizing w-full max-w-[600px]">
			<div className="w-full py-10 bg-white rounded-3xl text-gray-800 font-sans flex flex-col self-stretch shadow-lg text-left">
				{submenu.submenu.elements.map((el, index) => (
					<div
						className={clsx("flex w-full justify-start gap-3 items-center py-5 px-10 cursor-pointer hover:bg-neutral-50 transition-all duration-300", { "border-l border-l-8 border-pink-900": submenu.active[index] })}
						onClick={() => {
							submenu.clickHandler(index);
						}}
					>
						<h1 className="text-base font-normal tracking-widest">{el.title}</h1>
					</div>
				))}
			</div>
		</div>
	);
};
