import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { WorkspaceIdSettingsClient } from "./client";

const WorkspaceIdSettingsPage = async () => {
	const user = await currentUser();

	if (!user) redirect("/sign-in");

	return <WorkspaceIdSettingsClient />;
};

export default WorkspaceIdSettingsPage;
