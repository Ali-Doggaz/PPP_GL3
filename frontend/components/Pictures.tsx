interface PictureProps {
	image: string;
	caption: string;
}
interface PicturesWrapperProps {
	pictures: PictureProps[];
}
import picture from "../public/images/background.jpg";
import Image from "next/image";
import { EditIcon } from "../public/icons/Edit.icon";
import { useState } from "react";
import { ExitIcon } from "../public/icons/Exit.icon";
import { SuccesIcon } from "../public/icons/Success.icon";
export const PicturesWrapper: React.FC<PicturesWrapperProps> = ({ pictures }) => {
	return (
		<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:pr-10">
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
			<PictureCard image={""} caption={""} />
		</div>
	);
};
export const PictureCard: React.FC<PictureProps> = ({ image, caption }) => {
	const [editable, setEditable] = useState(false);
	return (
		<div className="bg-white rounded-xl h-fit shadow-md text-gray-900 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shodow-3xl">
			<div className="w-full h-[200px] overflow-hidden rounded-t-xl">
				<Image src={picture}></Image>
			</div>
			<div className="w-full p-10 flex flex-row justify-between items-start gap-2">
				{!editable && <h1 className="w-5/6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ex, ea at quidem tenetur dicta cupiditate accusantium, ad iusto soluta </h1>}
				{editable && <textarea className="w-5/6 h-fit p-5 border border-1 " value={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ex, ea at quidem tenetur dicta cupiditate accusantium, ad iusto soluta "} />}
				{!editable && (
					<div onClick={() => setEditable(true)} className="cursor-pointer">
						<EditIcon className="w-6 stroke-gray-800" />
					</div>
				)}
				{editable && (
					<div className="flex-col gap-4 flex justify-center">
						<div onClick={() => setEditable(false)} className="cursor-pointer">
							<SuccesIcon className="stroke-green-500" width="20" />
						</div>
						<div onClick={() => setEditable(false)} className="cursor-pointer">
							<ExitIcon className="stroke-red-500" width="20" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
