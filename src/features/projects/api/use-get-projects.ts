import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

export const useGetProjects = ({ workspaceId }: { workspaceId: string }) => {
    const query = useQuery({
        queryKey: ["projects", workspaceId],
        queryFn: async () => {
            const response = await client.api.projects.$get({ query: { workspaceId } })

            if (!response.ok) {
                toast.error("获取项目失败")
                throw new Error("获取项目失败")
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}