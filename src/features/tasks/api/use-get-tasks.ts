import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { TaskStatus } from "../types";

interface UserGetTasksProps {
    workspaceId: string
    projectId?: string | null
    assigneeId?: string | null
    search?: string | null
    dueDate?: string | null
    status?: TaskStatus | null

}

export const useGetTasks = ({ workspaceId, projectId, assigneeId, search, dueDate, status }: UserGetTasksProps) => {
    const query = useQuery({
        queryKey: ["tasks", workspaceId, projectId, assigneeId, search, dueDate, status],
        queryFn: async () => {
            const response = await client.api.tasks.$get({
                query: {
                    workspaceId,
                    projectId: projectId ?? undefined,
                    status: status ?? undefined,
                    assigneeId: assigneeId ?? undefined,
                    search: search ?? undefined,
                    dueDate: dueDate ?? undefined,


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