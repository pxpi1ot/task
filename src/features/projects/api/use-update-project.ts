import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation";


type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"], 200>
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>

export const useUpdateProject = () => {


    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form, param }) => {
            const response = await client.api.projects[":projectId"]["$patch"]({ form, param })

            if (!response.ok) {
                throw new Error("更新项目失败")
            }

            return await response.json()
        },
        onSuccess: ({ data }) => {

            queryClient.invalidateQueries({ queryKey: ["projects"] })
            queryClient.invalidateQueries({ queryKey: ["project", data.$id] })

            toast.success("项目已更新")
        },
        onError: () => {
            toast.error("项目更新失败")
        }

    })

    return mutation
}