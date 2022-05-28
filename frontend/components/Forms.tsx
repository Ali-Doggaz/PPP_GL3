import { Checkbox, Button } from "@nextui-org/react";

export const FormFake = () => {
	return (
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
			<Button className="bg-pink-600 mt-3">Run</Button>
		</form>
	);
};
export const FormUpload = () => {
	return (
		<form className="flex flex-col gap-4">
			<label className="text-base">This will upload the most recent picture in your database (download/added manually).</label>
			<Button className="bg-pink-600 mt-3">Upload</Button>
		</form>
	);
};
export const FormDownload = () => {
	return (
		<form className="flex flex-col gap-4">
			<label className="text-base">Please enter a subreddit's name or a theme's name</label>
			<input className="py-2 px-4 w-full border rounded-lg" type="text" />

			<label className="text-base">Number of picture to download</label>
			<input className="py-2 px-4 w-full border rounded-lg" type="number" />
			<Button className="bg-pink-600 mt-3">Download</Button>
		</form>
	);
};
