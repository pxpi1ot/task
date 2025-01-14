import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const WorkspaceCreatePage = async () => {
	const user = await currentUser();

	if (!user) redirect("/sign-in");

	return (
		<div className="w-full lg:max-w-xl">
			<CreateWorkspaceForm />
		</div>
	);
};

export default WorkspaceCreatePage;
