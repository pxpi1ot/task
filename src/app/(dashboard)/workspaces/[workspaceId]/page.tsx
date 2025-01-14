import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { WorkspaceIdClient } from "./client";

interface WorkspaceIdPageProps {
	params: {
		workspaceId: string;
	};
}

const WorkspaceIdPage = async ({ params }: WorkspaceIdPageProps) => {
	const user = await currentUser();

	if (!user) redirect("/sign-in");

	return <WorkspaceIdClient userId={user.id} />;
};

export default WorkspaceIdPage;
