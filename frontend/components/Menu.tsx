import clsx from "clsx";
import { MenuProps } from "../pages";
import { PictureIcon } from "../public/icons/Picture.icon";
import { UrlIcon } from "../public/icons/Url.icon";
import { UserIcon } from "../public/icons/User.icon";

export default function Menu(menu: { menu: MenuProps; clickHandler: (i: number) => void; active: boolean[] }) {
	return (
		<div className="h-fit p-5 box-sizing  w-full max-w-[350px]">
			<div className="w-full py-10 bg-pink-900 rounded-3xl text-white font-sans flex flex-col self-stretch drop-shadow-lg">
				<div className="flex w-full justify-center mb-10">
					<h1 className="text-2xl font-semibold tracking-widest"> instify </h1>
				</div>
				<div
					className={clsx("flex w-full justify-left gap-3 items-center py-5 px-10 cursor-pointer hover:bg-pink-800 transition-all duration-300", { "border-l border-l-8 border-white": menu.active[0] })}
					onClick={() => {
						menu.clickHandler(0);
					}}
				>
					<UserIcon className="w-4 h-4 stroke-white" />
					<h1 className="text-base font-normal tracking-widest">Manage Account</h1>
				</div>
				<div
					className={clsx("flex w-full justify-left gap-3 items-center py-5 px-10 cursor-pointer hover:bg-pink-800 transition-all duration-300", { "border-l border-l-8 border-white": menu.active[1] })}
					onClick={() => {
						menu.clickHandler(1);
					}}
				>
					<PictureIcon className="w-4 h-4 stroke-white" />
					<h1 className="text-base font-normal tracking-widest">Manage Pictures</h1>
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
