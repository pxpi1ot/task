import { getWorkspaces } from "@/features/workspaces/queries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await currentUser();

	if (!user) redirect("/sign-in");

	const workspaces = await getWorkspaces();
	if (workspaces.total === 0) {
		redirect("/workspaces/create");
	} else {
		redirect(`/workspaces/${workspaces.documents[0].$id}`);
	}
}
