import { getCurrent } from "@/features/auth/queries";
import { TaskIdClient } from "./client";
import { redirect } from "next/navigation";

const TaskIdPage = async () => {
	const user = await getCurrent();
	if (!user) redirect("/sign-in");

	return <TaskIdClient />;
};

export default TaskIdPage;
