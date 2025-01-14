"use client";

import { Analytics } from "@/components/analytics";
import { DottedSeparator } from "@/components/dotted-separator";
import PageError from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Member } from "@/features/members/types";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { Project } from "@/features/projects/types";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { Task } from "@/features/tasks/types";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export const WorkspaceIdClient = ({ userId }: { userId: string }) => {
	const workspaceId = useWorkspaceId();

	const { data: analytics, isLoading: isLoadingAnalytics } =
		useGetWorkspaceAnalytics({ workspaceId });
	const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
		workspaceId,
		assigneeId: userId,
	});

	const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
		workspaceId,
	});
	const { data: members, isLoading: isLoadingMembers } = useGetMembers({
		workspaceId,
	});

	const isLoading =
		isLoadingTasks ||
		isLoadingProjects ||
		isLoadingAnalytics ||
		isLoadingMembers;

	if (isLoading) {
		return <PageLoader />;
	}

	if (!analytics || !tasks || !projects || !members) {
		return <PageError message="加载数据失败" />;
	}

	return (
		<div className="h-full flex flex-col space-y-4">
			<Analytics data={analytics} />
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<TaskList data={tasks.documents} total={tasks.total} />
				<ProjectList data={projects.documents} total={projects.total} />
				<MemberList data={members.documents} total={members.total} />
			</div>
		</div>
	);
};

interface TaskListProps {
	data: Task[];
	total: number;
}

export const TaskList = ({ data, total }: TaskListProps) => {
	const { open: createTask } = useCreateTaskModal();
	const workspaceId = useWorkspaceId();

	return (
		<div className="flex flex-col gap-y-4 col-span-1">
			<div className="bg-muted rounded-lg p-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold">我的任务 ({total})</p>
					<Button variant="muted" size="icon" onClick={createTask}>
						<PlusIcon className="size-4 text-neutral-400" />
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<ul className="flex flex-col gap-y-4">
					{data.map(task => (
						<li key={task.$id}>
							<Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
								<Card className="border-none shadow-none rounded-lg hover:opacity-75 transition">
									<CardContent className="p-4">
										<p className="text-lg font-medium truncate">{task.name}</p>
										<div className="flex items-center gap-x-2">
											<p>{task.project?.name}</p>
											<div className="size-1 rounded-full bg-neutral-300" />
											<div className="text-sm text-muted-foreground flex items-center">
												<CalendarIcon className="size-3 mr-1.5" />
												<span className="truncate">
													{new Date() < new Date(task.dueDate) ? (
														formatDistanceToNow(new Date(task.dueDate), {
															locale: zhCN,
														})
													) : (
														<span className="text-red-500">已逾期</span>
													)}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						</li>
					))}
					{/* first-of-type： 元素为第一个时 */}
					<li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
						没有任务
					</li>
				</ul>
				<Button className="mt-4 w-full" variant="muted" asChild>
					<Link href={`/workspaces/${workspaceId}/tasks`}>显示全部</Link>
				</Button>
			</div>
		</div>
	);
};

interface ProjectListProps {
	data: Project[];
	total: number;
}

export const ProjectList = ({ data, total }: ProjectListProps) => {
	const { open: createProject } = useCreateProjectModal();
	const workspaceId = useWorkspaceId();

	return (
		<div className="flex flex-col gap-y-4 col-span-1">
			<div className="bg-white border rounded-lg p-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold">项目 ({total})</p>
					<Button variant="outline" size="icon" onClick={createProject}>
						<PlusIcon className="size-4 text-neutral-400" />
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{data.map(project => (
						<li key={project.$id}>
							<Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
								<Card className="shadow-none rounded-lg hover:opacity-75 transition">
									<CardContent className="p-4 flex items-center gap-x-2.5">
										<ProjectAvatar
											className="size-12"
											name={project.name}
											image={project.imageUrl}
											fallbackClassName="text-lg"
										/>
										<p className="text-lg font-medium truncate">
											{project.name}
										</p>
									</CardContent>
								</Card>
							</Link>
						</li>
					))}
					{/* first-of-type： 元素为第一个时 */}
					<li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
						没有项目
					</li>
				</ul>
			</div>
		</div>
	);
};

interface MemberListProps {
	data: Member[];
	total: number;
}

export const MemberList = ({ data, total }: MemberListProps) => {
	const workspaceId = useWorkspaceId();

	return (
		<div className="flex flex-col gap-y-4 col-span-1">
			<div className="bg-white border rounded-lg p-4">
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold">成员 ({total})</p>
					<Button variant="outline" size="icon" asChild>
						<Link href={`/workspaces/${workspaceId}/members`}>
							<SettingsIcon className="size-4 text-neutral-400" />
						</Link>
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{data.map(member => (
						<li key={member.$id}>
							<Card className="shadow-none rounded-lg overflow-hidden">
								<CardContent className="p-3 flex flex-col items-center gap-x-2">
									<MemberAvatar
										className="size-12"
										name={member.name}
										imageUrl={member.imageUrl}
									/>
									<div className="flex flex-col items-center overflow-hidden">
										<p className="text-lg font-medium line-clamp-1">
											{member.name}
										</p>
										<p className="text-sm text-muted-foreground line-clamp-1">
											{member.email}
										</p>
									</div>
								</CardContent>
							</Card>
						</li>
					))}
					{/* first-of-type： 元素为第一个时 */}
					<li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
						没有成员
					</li>
				</ul>
			</div>
		</div>
	);
};
