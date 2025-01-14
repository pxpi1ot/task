import { MembersList } from "@/features/workspaces/components/members-list";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const WorkspaceIdMembersPage = async () => {
	const user = await currentUser();
	if (!user) redirect("/sign-in");
	console.log(user);
	return (
		<div className="w-full lg:max-w-xl">
			<MembersList userId={user.id} />
		</div>
	);
};

export default WorkspaceIdMembersPage;
