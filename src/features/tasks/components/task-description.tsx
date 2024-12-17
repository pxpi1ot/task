import { Button } from "@/components/ui/button";
import { Task } from "../types";

import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, XIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";

interface TaskDescriptionProps {
	task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(task.description);

	const { mutate, isPending } = useUpdateTask();

	const handleSave = () => {
		mutate(
			{ json: { description: value }, param: { taskId: task.$id } },
			{
				onSuccess: () => {
					setIsEditing(false);
				},
			}
		);
	};

	return (
		<div className="p-4 border rounded-lg">
			<div className="flex items-center justify-between">
				<p className="text-lg font-semibold">概览</p>
				<Button
					onClick={() => setIsEditing(prev => !prev)}
					size="sm"
					variant="outline"
				>
					{isEditing ? (
						<XIcon className="size-4" />
					) : (
						<PencilIcon className="size-4" />
					)}
					{isEditing ? "取消编辑" : "编辑"}
				</Button>
			</div>
			<DottedSeparator className="my-4" />

			{isEditing ? (
				<div className="flex flex-col gap-y-4">
					<Textarea
						placeholder="添加描述"
						value={value}
						rows={4}
						onChange={e => setValue(e.target.value)}
						disabled={isPending}
					/>
					<Button
						size="sm"
						className="w-fit ml-auto"
						disabled={isPending}
						onClick={handleSave}
					>
						{isPending ? "保存中..." : "保存"}
					</Button>
				</div>
			) : (
				<div>
					{task.description || (
						<span className="text-muted-foreground">未设置描述</span>
					)}
				</div>
			)}
		</div>
	);
};
