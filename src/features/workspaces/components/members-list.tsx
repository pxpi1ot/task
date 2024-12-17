"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Fragment } from "react";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Separator } from "@/components/ui/separator";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";

export const MembersList = () => {
	const workspaceId = useWorkspaceId();
	const { data } = useGetMembers({ workspaceId });
	const { mutate: deleteMember, isPending: isDeletingMember } =
		useDeleteMember();
	const { mutate: updateMember, isPending: isUpdatingMember } =
		useUpdateMember();
	const [ConfirmDialog, confirm] = useConfirm(
		"删除成员",
		"此成员将从该工作区移除",
		"destructive"
	);

	const handleUpdateMember = (memberId: string, role: MemberRole) => {
		updateMember({
			json: { role },
			param: { memberId },
		});
	};

	const handleDeleteMember = async (memberId: string) => {
		const ok = await confirm();
		if (!ok) return;

		deleteMember(
			{
				param: { memberId },
			},
			{
				onSuccess: () => {
					window.location.reload();
				},
			}
		);
	};

	return (
		<Card className="w-full h-full border-none shadow-none">
			<ConfirmDialog />
			<CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
				<Button asChild variant="outline" size="sm">
					<Link href={`/workspaces/${workspaceId}`}>
						<ArrowLeftIcon className="size-4" />
						返回
					</Link>
				</Button>

				<CardTitle>成员列表</CardTitle>
			</CardHeader>

			<div className="px-7">
				<DottedSeparator />
			</div>

			<CardContent className="p-7">
				{data?.documents.map((member, index) => (
					<Fragment key={member.$id}>
						<div className="flex items-center gap-2">
							<MemberAvatar
								className="size-10"
								fallbackClassName="text-lg"
								name={member.name}
							/>
							<div className="flex flex-col">
								<p className="text-sm font-medium">{member.name}</p>
								<p className="text-xs font-muted-foreground">{member.email}</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button className="ml-auto" variant="secondary" size="icon">
										<MoreVerticalIcon className="text-muted-foreground" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent side="bottom">
									<DropdownMenuItem
										className=""
										disabled={isUpdatingMember}
										onClick={() =>
											handleUpdateMember(member.$id, MemberRole.ADMIN)
										}
									>
										设置为 管理员
									</DropdownMenuItem>
									<DropdownMenuItem
										className=""
										disabled={isUpdatingMember}
										onClick={() =>
											handleUpdateMember(member.$id, MemberRole.MEMBER)
										}
									>
										设置为 普通成员
									</DropdownMenuItem>
									<DropdownMenuItem
										className="text-amber-700"
										disabled={isDeletingMember}
										onClick={() => handleDeleteMember(member.$id)}
									>
										删除 {member.name}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						{index < data.documents.length - 1 && (
							<Separator className="my-2.5" />
						)}
					</Fragment>
				))}
			</CardContent>
		</Card>
	);
};
