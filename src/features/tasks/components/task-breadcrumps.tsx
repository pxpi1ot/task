import { Project } from "@/features/projects/types";
import { Task } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteTask } from "../api/use-delete-task.";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";

interface TaskBreadCrumbsProps {
	project: Project;
	task: Task;
}
/* 面包屑 */
export const TaskBreadCrumbs = ({ project, task }: TaskBreadCrumbsProps) => {
	const router = useRouter();
	const workspaceId = useWorkspaceId();
	const [DeleteDialog, confirmDelete] = useConfirm(
		"删除任务",
		"这个操作无法恢复",
		"destructive"
	);
	const { mutate, isPending } = useDeleteTask();

	const handleDeleteTask = async () => {
		const ok = await confirmDelete();
		if (!ok) return;
		mutate(
			{ param: { taskId: task.$id } },
			{
				onSuccess: () => {
					router.push(`/workspaces/${workspaceId}/tasks`);
				},
			}
		);
	};

	return (
		<div className="flex items-center gap-x-2">
			<DeleteDialog />
			<ProjectAvatar
				name={project.name}
				image={project.imageUrl}
				className="size-6 lg:size-8"
			/>

			<Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
				<p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
					{project.name}
				</p>
			</Link>
			<ChevronRightIcon className="size-5 lg:size-5 text-muted-foreground" />
			<p className="text-sm lg:text-lg font-semibold">{task.name}</p>
			<Button
				onClick={handleDeleteTask}
				disabled={isPending}
				className="ml-auto"
				variant="destructive"
				size="sm"
			>
				<TrashIcon />
				<span className="hidden lg:block">删除任务</span>
			</Button>
		</div>
	);
};
