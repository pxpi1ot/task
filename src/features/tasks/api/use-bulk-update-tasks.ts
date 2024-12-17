import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc"



type ResponseType = InferResponseType<typeof client.api.tasks["bulk-update"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>

export const useBulkUpdateTasks = () => {
    const queryClient = useQueryClient()



    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.tasks["bulk-update"]["$post"]({ json })

            if (!response.ok) {
                throw new Error("任务更新失败")
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("任务已更新")



            queryClient.invalidateQueries({ queryKey: ["tasks"] })



        },
        onError: () => {
            toast.error("任务更新失败")
        }

    })

    return mutation
}