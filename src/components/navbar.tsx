"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { usePathname } from "next/navigation";

const pathnameMap = {
	tasks: {
		title: "任务",
		description: "在此处查看工作区所有任务",
	},
	projects: {
		title: "项目",
		description: "在此处查看你的项目",
	},
};

const defaultMap = {
	title: "主页",
	description: "在此处查看您的所有项目和任务",
};

export const Navbar = () => {
	const pathname = usePathname();
	const pathnameParts = pathname.split("/");

	const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

	const { title, description } = pathnameMap[pathnameKey] || defaultMap;
	return (
		<nav className="pt-4 px-6 flex items-center justify-between">
			<div className="flex-col hidden lg:flex">
				<h1 className="text-2xl">{title}</h1>
				<p className="text-muted-foreground">{description}</p>
			</div>
			<MobileSidebar />
			<UserButton />
		</nav>
	);
};
