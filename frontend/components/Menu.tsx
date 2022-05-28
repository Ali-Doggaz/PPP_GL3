import { UserIcon } from "../public/icons/User.icon";

export default function Menu() {
	return (
		<div className="h-screen overflow-y-scroll p-5 box-sizing">
			<div className="w-[300px] p-10  bg-neutral-900 rounded-3xl text-white font-sans flex flex-col">
				<div className="flex w-full justify-center mb-10">
					<h1 className="text-2xl font-semibold tracking-widest"> instify </h1>
				</div>
				<div className="flex w-full justify-left gap-5 items-center p-5 cursor-pointer">
					<UserIcon />
					<h1 className="text-base font-normal tracking-widest"> Manage Account </h1>
				</div>
			</div>
		</div>
	);
}
