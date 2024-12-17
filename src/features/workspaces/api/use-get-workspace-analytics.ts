import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { InferResponseType } from "hono";

interface useGetWorkspaceAnalyticsProps {
    workspaceId: string
}

export type WorkspaceAnalyticsResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["analytics"]["$get"], 200>


export const useGetWorkspaceAnalytics = ({ workspaceId }: useGetWorkspaceAnalyticsProps) => {
    const query = useQuery({
        queryKey: ["workspace-analytics", workspaceId],
        queryFn: async () => {
            const response = await client.api.workspaces[":workspaceId"]["analytics"].$get({ param: { workspaceId } })

            if (!response.ok) {
                toast.error("获取工作区分析失败")
                throw new Error("获取工作区分析失败")
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}