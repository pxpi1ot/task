import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

export const useGetMembers = ({ workspaceId }: { workspaceId: string }) => {
    const query = useQuery({
        queryKey: ["members", workspaceId],
        queryFn: async () => {
            const response = await client.api.members.$get({ query: { workspaceId } })

            if (!response.ok) {

                if (response.status == 401) {
                    toast.error("不是该工作区成员！")
                }
                if (response.status == 500) {
                    toast.error("请求超时!")

                }

                throw new Error("获取成员失败")
            }

            const { data } = await response.json()



            return data
        }

    })

    return query
}