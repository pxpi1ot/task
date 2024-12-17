import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc"



type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$delete"], 200>
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>

export const useDeleteProject = () => {


    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.projects[":projectId"]["$delete"]({ param })

            if (!response.ok) {
                throw new Error("删除项目失败")
            }

            return await response.json()
        },
        onSuccess: ({ data }) => {

            queryClient.invalidateQueries({ queryKey: ["projects"] })
            queryClient.invalidateQueries({ queryKey: ["project", data.$id] })

            toast.success("项目已删除")
        },
        onError: () => {
            toast.error("项目删除失败")
        }

    })

    return mutation
}