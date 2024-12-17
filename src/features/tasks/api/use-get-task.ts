import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

interface UserGetTaskProps {
    taskId: string

}

export const useGetTask = ({ taskId }: UserGetTaskProps) => {
    const query = useQuery({
        queryKey: ["task", taskId],
        queryFn: async () => {
            const response = await client.api.tasks[":taskId"].$get({
                param: {
                    taskId
                }
            })

            if (!response.ok) {
                toast.error("获取任务失败")
                throw new Error("获取任务失败")
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}