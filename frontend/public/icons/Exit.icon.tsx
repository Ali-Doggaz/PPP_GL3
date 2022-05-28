import { IconProps } from "./User.icon";

export const ExitIcon: React.FC<IconProps> = ({ className, height, width }) => {
	return (
		<svg width={width || "32"} height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M25 7L7 25" className={className} stroke="#4B5563" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M25 25L7 7" className={className} stroke="#4B5563" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	);
};
