import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

interface useGetProjectProps {
    projectId: string
}


export const useGetProject = ({ projectId }: useGetProjectProps) => {
    const query = useQuery({
        queryKey: ["project", projectId],
        queryFn: async () => {
            const response = await client.api.projects[":projectId"].$get({ param: { projectId } })

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