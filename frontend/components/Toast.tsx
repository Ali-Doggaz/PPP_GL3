import { ExitIcon } from "../public/icons/Exit.icon";
import { SuccessBigIcon, CloudIcon } from "../public/icons/Success.icon";

export const Toast = (elements: { setShow: (a: boolean) => void; show: boolean }) => {
	if (elements.show)
		return (
			<div className="w-full h-full bg-gray-600 absolute top-0 left-0 z-30 bg-opacity-20 flex justify-center items-center">
				<div className="relative w-full max-w-[1000px] p-20 bg-white rounded-lg flex flex-col justify-center items-center gap-6 overflow-hidden">
					<div
						className="absolute top-10 right-10 cursor-pointer"
						onClick={() => {
							elements.setShow(false);
						}}
					>
						<ExitIcon className={""} />
					</div>
					<div className="z-10">
						<SuccessBigIcon className={""} />
					</div>
					<h1 className="text-2xl md:text-4xl lg:text-5xl z-10 text-darkerGrey font-semibold">Success!</h1>
					<p className="text-lg lg:text-xl text-darkGrey max-w-[700px] text-center leading-8">Action was successful</p>
					<div className="absolute top-40 left-10 z-1 opacity-70">
						<CloudIcon width="150" height="100" className={""} />
					</div>
					<div className="absolute top-50 left-60 z-1 opacity-70">
						<CloudIcon width="100" height="100" className={""} />
					</div>
					<div className="absolute top-20 right-40 z-1 opacity-70">
						<CloudIcon width="100" height="100" className={""} />
					</div>
					<div className="absolute bottom-10 right-20 z-1 opacity-70">
						<CloudIcon width="50" height="100" className={""} />
					</div>
				</div>
			</div>
		);
	else return <></>;
};
