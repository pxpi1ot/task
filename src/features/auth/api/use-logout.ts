import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout = () => {
    const router = useRouter()

    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.auth.logout["$post"]()
            if (!response.ok) {
                throw new Error("退出失败")
            }
            return await response.json()
        },
        onSuccess: () => {
            router.refresh()
            queryClient.invalidateQueries({ queryKey: ["current"] })
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })

        },
        onError: () => {
            toast.error("退出失败")
        }

    })

    return mutation
}