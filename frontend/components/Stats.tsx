import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";

export const Stats = () => {
	const data = [
		{
			subject: "Followers",
			A: 98,
			fullMark: 150,
		},
		{
			subject: "Likes",
			A: 120,
			fullMark: 150,
		},
		{
			subject: "Pictures",
			A: 86,
			fullMark: 150,
		},
		{
			subject: "Tags",
			A: 86,
			fullMark: 150,
		},
		{
			subject: "DMs",
			A: 16,
			fullMark: 150,
		},
	];
	return (
		<RadarChart outerRadius={90} width={320} height={300} data={data}>
			<PolarGrid />
			<PolarAngleAxis dataKey="subject" />
			<PolarRadiusAxis angle={40} domain={[0, 150]} />
			<Radar name="Your stats" dataKey="A" stroke="#9d174d" className="fill-pink-800 stroke-pink- mt-10" fillOpacity={0.6} />
			<Legend />
		</RadarChart>
	);
};
