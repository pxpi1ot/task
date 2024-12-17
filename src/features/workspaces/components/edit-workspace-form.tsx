"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateWorkspaceSchema } from "../schema";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface EditWorkspaceFormProps {
	onCancel?: () => void;
	initialValues: Workspace;
}

export const EditWorkspaceForm = ({
	onCancel,
	initialValues,
}: EditWorkspaceFormProps) => {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const { mutate, isPending } = useUpdateWorkspace();
	const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
		useDeleteWorkspace();

	const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
		useResetInviteCode();

	const [DeleteDialog, confirmDelete] = useConfirm(
		"删除工作区",
		"这个操作无法恢复",
		"destructive"
	);

	const [ResetDialog, confirmReset] = useConfirm(
		"重置邀请码",
		"这将重置当前邀请码",
		"destructive"
	);

	const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
		resolver: zodResolver(updateWorkspaceSchema),
		defaultValues: {
			...initialValues,
			image: initialValues.imageUrl ?? "",
			/*  ?? 只会在 value 是 null 或 undefined 时才使用默认值，
			而 || 会在 value 是假值（例如 null、undefined、0、NaN、false、""）时使用默认值。 */
		},
	});

	const handleDelete = async () => {
		const ok = await confirmDelete();
		if (!ok) return;
		deleteWorkspace(
			{
				param: { workspaceId: initialValues.$id },
			},
			{
				onSuccess: () => {
					// router.push("/");
					window.location.href = "/";
				},
			}
		);
	};

	const handleResetInviteCode = async () => {
		const ok = await confirmReset();
		if (!ok) return;
		resetInviteCode(
			{
				param: { workspaceId: initialValues.$id },
			},
			{
				onSuccess: () => {},
			}
		);
	};

	const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
		const finalValues = {
			...values,
			image: values.image instanceof File ? values.image : "",
		};

		mutate({ form: finalValues, param: { workspaceId: initialValues.$id } });
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			form.setValue("image", file);
		}
	};

	const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

	const handleCopyInviteLink = () => {
		navigator.clipboard
			.writeText(fullInviteLink)
			.then(() => toast.success("已复制邀请链接"));
	};

	return (
		<div className="flex flex-col gap-y-4">
			<DeleteDialog />
			<ResetDialog />
			<Card className="w-full h-full border-none shadow-none">
				<CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
					<Button
						size="sm"
						variant="secondary"
						onClick={
							onCancel
								? onCancel
								: () => router.push(`/workspaces/${initialValues.$id}`)
						}
					>
						<ArrowLeftIcon className="size-4" />
						返回
					</Button>
					<CardTitle className="text-xl font-bold">
						{initialValues.name}
					</CardTitle>
				</CardHeader>
				<div className="px-7">
					<DottedSeparator />
				</div>
				<CardContent className="p-7">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>工作区名称</FormLabel>
											<FormControl>
												<Input {...field} placeholder="输入工作区名称" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="image"
									render={({ field }) => (
										<div className="flex flex-col gap-y-2">
											<div className="flex items-center gap-x-5">
												{field.value ? (
													<div className="size-[72px] relative rounded-md overflow-hidden">
														<Image
															alt="logo"
															fill //没有relative fill失效（会直接占满整个屏幕）
															className="object-cover"
															src={
																field.value instanceof File
																	? URL.createObjectURL(field.value)
																	: field.value
															}
														/>
													</div>
												) : (
													<Avatar className="size-[72px]">
														<AvatarFallback>
															<ImageIcon className="size-[36px] text-neutral-400" />
														</AvatarFallback>
													</Avatar>
												)}
												<div className="flex flex-col">
													<p className="text-sm">工作区图标</p>
													<p className="text-sm text-muted-foreground">
														JPG, PNG, SVG 或 JPEG, 最大1MB
													</p>
													<input
														className="hidden"
														type="file"
														accept=".jpg, .png, .svg, .jpeg"
														ref={inputRef}
														onChange={handleImageChange}
														disabled={isPending}
													/>
													{field.value ? (
														<Button
															type="button"
															disabled={isPending}
															variant="destructive"
															size="xs"
															className="w-fit mt-2"
															onClick={() => {
																field.onChange(null);
																if (inputRef.current) {
																	inputRef.current.value = "";
																}
															}}
														>
															删除图片
														</Button>
													) : (
														<Button
															type="button"
															disabled={isPending}
															variant="outline"
															size="xs"
															className="w-fit mt-2"
															onClick={() => inputRef.current?.click()}
														>
															上传图片
														</Button>
													)}
												</div>
											</div>
										</div>
									)}
								/>
							</div>
							<DottedSeparator className="py-7" />
							<div className="flex items-center justify-between">
								<Button
									type="button"
									size="lg"
									variant="secondary"
									onClick={onCancel}
									disabled={isPending}
									className={cn(!onCancel && "invisible")}
								>
									取消
								</Button>
								<Button disabled={isPending} type="submit" size="lg">
									设置
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>

			{/* 邀请码 */}
			<Card className="w-full h-full border-none shadow-none">
				<CardContent className="p-7">
					<div className="flex flex-col">
						<h3 className="font-bold">邀请成员</h3>
						<p className="text-sm text-muted-foreground">
							使用邀请链接将成员添加到你的工作区
						</p>
						<div className="mt-4">
							<div className="flex items-center gap-x-2">
								<Input disabled value={fullInviteLink} />
								<Button
									onClick={handleCopyInviteLink}
									variant="outline"
									className="size-9"
								>
									<CopyIcon />
								</Button>
							</div>
						</div>
						<DottedSeparator className="py-7" />
						<Button
							className="w-fit ml-auto"
							size="sm"
							variant="destructive"
							type="button"
							disabled={isPending || isResettingInviteCode}
							onClick={handleResetInviteCode}
						>
							重置邀请链接
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* 删除 */}
			<Card className="w-full h-full border-none shadow-none">
				<CardContent className="p-7">
					<div className="flex flex-col">
						<h3 className="font-bold">删除</h3>
						<p className="text-sm text-muted-foreground">
							删除工作区是不可逆的操作，并将移除所有相关数据。
						</p>
						<DottedSeparator className="py-7" />

						<Button
							className=" w-fit ml-auto"
							size="sm"
							variant="destructive"
							type="button"
							disabled={isPending || isDeletingWorkspace}
							onClick={handleDelete}
						>
							删除工作区
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
