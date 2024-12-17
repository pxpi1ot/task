"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
	initialValues: {
		name: string;
	};
}

export const JoinWorkspaceForm = ({
	initialValues,
}: JoinWorkspaceFormProps) => {
	const router = useRouter();
	const workspaceId = useWorkspaceId();
	const inviteCode = useInviteCode();
	const { mutate, isPending } = useJoinWorkspace();

	const onSubmit = () => {
		mutate(
			{
				param: { workspaceId },
				json: { code: inviteCode },
			},
			{
				onSuccess: ({ data }) => {
					router.push(`/workspaces/${data.$id}`);
				},
			}
		);
	};

	return (
		<Card className="w-full h-full border-none shadow-none">
			<CardHeader className="p-7">
				<CardTitle className="text-xl font-bold">加入工作区</CardTitle>
				<CardDescription>
					邀请你加入 <strong> {initialValues.name} </strong>
				</CardDescription>
			</CardHeader>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
					<Button
						variant="outline"
						className="w-full lg:w-fit"
						type="button"
						asChild
						disabled={isPending}
					>
						<Link href="/">取消</Link>
					</Button>
					<Button
						type="button"
						className="w-full lg:w-fit"
						onClick={onSubmit}
						disabled={isPending}
					>
						加入工作区
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
