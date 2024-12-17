import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteTask } from "../api/use-delete-task.";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskActionProps {
	id: string;
	projectId: string;
	children: React.ReactNode;
}

export const TaskAction = ({ id, projectId, children }: TaskActionProps) => {
	const router = useRouter();
	const workspaceId = useWorkspaceId();

	const { open } = useEditTaskModal();

	const [DeleteDialog, confirmDelete] = useConfirm(
		"删除任务",
		"这个操作无法恢复",
		"destructive"
	);
	const { mutate, isPending } = useDeleteTask();

	const onDelete = async () => {
		const ok = await confirmDelete();
		if (!ok) return;
		mutate({ param: { taskId: id } });
	};

	const onOpenTask = () => {
		router.push(`/workspaces/${workspaceId}/tasks/${id}`);
	};
	const onOpenProject = () => {
		router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
	};

	return (
		<div className="flex justify-end">
			<DeleteDialog />
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="">
					<DropdownMenuItem onClick={onOpenTask} className="font-medium p-2">
						<ExternalLinkIcon className="stroke-2" />
						任务详情
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onOpenProject} className="font-medium p-2">
						<ExternalLinkIcon className="stroke-2" />
						打开项目
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => open(id)}
						className="font-medium p-2"
					>
						<PencilIcon className="stroke-2" />
						编辑任务
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={onDelete}
						disabled={isPending}
						className="text-amber-700 focus:text-amber-700 font-medium  p-2"
					>
						<TrashIcon className="stroke-2" />
						删除任务
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
