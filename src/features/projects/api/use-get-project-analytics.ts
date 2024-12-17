import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { InferResponseType } from "hono";

interface useGetProjectAnalyticsProps {
    projectId: string
}

export type ProjectAnalyticsResponseType = InferResponseType<typeof client.api.projects[":projectId"]["analytics"]["$get"], 200>


export const useGetProjectAnalytics = ({ projectId }: useGetProjectAnalyticsProps) => {
    const query = useQuery({
        queryKey: ["project-analytics", projectId],
        queryFn: async () => {
            const response = await client.api.projects[":projectId"]["analytics"].$get({ param: { projectId } })

            if (!response.ok) {
                toast.error("获取项目分析失败")
                throw new Error("获取项目分析失败")
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}