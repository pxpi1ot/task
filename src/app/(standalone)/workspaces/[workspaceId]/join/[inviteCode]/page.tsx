import { redirect } from "next/navigation";
import WorkspaceIdJoinClient from "./client";
import { currentUser } from "@clerk/nextjs/server";

const WorkspaceIdJoinPage = async () => {
	const user = await currentUser();
	if (!user) redirect("/sign-in");

	return (
		<div className="w-full lg:max-w-xl">
			<WorkspaceIdJoinClient />
		</div>
	);
};

export default WorkspaceIdJoinPage;
