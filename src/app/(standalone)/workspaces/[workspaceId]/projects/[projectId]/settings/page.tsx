import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { ProjectIdSettingsClient } from "./client";

const ProjectIdSettingsPage = async () => {
	const user = await currentUser();
	if (!user) redirect("/sign-in");

	return <ProjectIdSettingsClient />;
};

export default ProjectIdSettingsPage;
