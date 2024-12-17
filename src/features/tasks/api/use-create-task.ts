import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc"


type ResponseType = InferResponseType<typeof client.api.tasks["$post"], 200>
type RequestType = InferRequestType<typeof client.api.tasks["$post"]>

export const useCreateTask = () => {
    const queryClient = useQueryClient()



    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.tasks["$post"]({ json })

            if (!response.ok) {
                throw new Error("任务创建失败")
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("任务已创建")
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: () => {
            toast.error("任务创建失败")
        }

    })

    return mutation
}