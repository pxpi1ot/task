"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
	return (
		<div className="h-screen flex flex-col gap-y-4 items-center justify-center">
			<CircleAlert className="size-10" />
			<p className="text-muted-foreground">出现了些错误</p>
			<Button variant="outline">
				<Link href="/">返回主页</Link>
			</Button>
		</div>
	);
};

export default ErrorPage;
