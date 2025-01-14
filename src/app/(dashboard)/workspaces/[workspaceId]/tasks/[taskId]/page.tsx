import { TaskIdClient } from "./client";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const TaskIdPage = async () => {
	const user = await currentUser();
	if (!user) redirect("/sign-in");

	return <TaskIdClient />;
};

export default TaskIdPage;
