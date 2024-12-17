import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>

export const useRegister = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth.register["$post"]({ json })
            if (!response.ok) {
                throw new Error("注册失败")
            }
            return await response.json()
        },
        onSuccess: () => {
            router.refresh()
            queryClient.invalidateQueries({ queryKey: ["current"] })
            toast('欢迎新用户');
        },
        onError: () => {
            toast.error("注册失败")
        }

    })

    return mutation
}