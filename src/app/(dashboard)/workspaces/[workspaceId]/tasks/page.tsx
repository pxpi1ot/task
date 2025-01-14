import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const TasksPage = async () => {
	const user = await currentUser();
	if (!user) redirect("/sign-in");

	return (
		<div className="h-full flex flex-col">
			<TaskViewSwitcher />
		</div>
	);
};

export default TasksPage;
