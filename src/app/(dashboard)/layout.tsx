import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { EditTaskModal } from "@/features/tasks/components/edit-task-modal";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen">
			{/* 创建工作区弹窗 */}
			<CreateWorkspaceModal />
			<CreateProjectModal />
			<CreateTaskModal />
			<EditTaskModal />
			<div className="flex w-full h-full">
				{/* 侧边栏 */}
				<div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
					<Sidebar />
				</div>

				{/* 右侧主内容 */}
				<div className="lg:pl-[264px] w-full">
					<div className="mx-auto max-w-screen-2xl h-full">
						<Navbar />
						<main className="h-full py-8 px-6 flex flex-col">{children} </main>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
