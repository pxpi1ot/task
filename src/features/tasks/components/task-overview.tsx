import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { OverviewProperty } from "./overview-property";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { Badge } from "@/components/ui/badge";
import { statusToName } from "@/lib/utils";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskOverviewProps {
	task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
	const { open } = useEditTaskModal();

	return (
		<div className="flex flex-col gap-y-4 col-span-1">
			<div className="bg-muted rounded-lg p-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold">概览</p>
					<Button onClick={() => open(task.$id)} size="sm" variant="outline">
						<PencilIcon />
						编辑
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<div className="flex flex-col gap-y-4">
					<OverviewProperty label="指派给">
						<MemberAvatar name={task.assignee.name} className="size-6" />
						<p className="text-sm font-medium">{task.assignee.name}</p>
					</OverviewProperty>
					<OverviewProperty label="截止时间">
						<TaskDate value={task.dueDate} className="text-sm font-medium" />
					</OverviewProperty>
					<OverviewProperty label="状态">
						<Badge variant={task.status}>{statusToName(task.status)}</Badge>
					</OverviewProperty>
				</div>
			</div>
		</div>
	);
};
