import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc"


type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$delete"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$delete"]>

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient()



    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.workspaces[":workspaceId"]["$delete"]({ param })

            if (!response.ok) {
                throw new Error("工作区删除失败")
            }

            return await response.json()
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })

            toast.success("工作区已删除")
        },
        onError: () => {
            toast.error("工作区删除失败")
        }

    })

    return mutation
}