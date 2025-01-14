import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberAvatarProps {
	name: string;
	className?: string;
	fallbackClassName?: string;
	imageUrl?: string;
}

export const MemberAvatar = ({
	name,
	className,
	fallbackClassName,
	imageUrl,
}: MemberAvatarProps) => {
	return (
		<Avatar
			className={cn(
				"size-5 transition border border-neutral-300 rounded-full",
				className
			)}
		>
			<AvatarImage src={imageUrl}></AvatarImage>
			<AvatarFallback
				className={cn(
					"bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
					fallbackClassName
				)}
			>
				{name?.charAt(0).toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
};
