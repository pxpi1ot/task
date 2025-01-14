import { redirect } from "next/navigation";
import { ProjectIdClient } from "./client";
import { currentUser } from "@clerk/nextjs/server";
const ProjectIdPage = async () => {
	const user = await currentUser();
	if (!user) redirect("/sign-in");

	return <ProjectIdClient />;
};

export default ProjectIdPage;
