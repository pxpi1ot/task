"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
	message: string;
}

const PageError = ({ message = "出现了些错误" }: ErrorPageProps) => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<CircleAlert className="size-6 text-muted-foreground mb-2" />
			<p className="text-sm font-medium text-muted-foreground">{message}</p>
		</div>
	);
};

export default PageError;
