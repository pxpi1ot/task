"use client";
import PageError from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceIdJoinClient = () => {
	const workspaceId = useWorkspaceId();
	const { data: initialValues, isLoading } = useGetWorkspaceInfo({
		workspaceId,
	});

	if (isLoading) {
		return <PageLoader />;
	}

	if (!initialValues) {
		return <PageError message="项目查询失败" />;
	}

	return (
		<div>
			<JoinWorkspaceForm initialValues={initialValues} />
		</div>
	);
};

export default WorkspaceIdJoinClient;
