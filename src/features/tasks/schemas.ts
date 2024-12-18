import { z } from "zod"
import { TaskStatus } from "./types"
export const createTaskSchema = z.object({
    name: z.string().min(1, "必填"),
    status: z.nativeEnum(TaskStatus, { required_error: "必填" }),
    workspaceId: z.string().trim().min(1, "必填"),
    projectId: z.string().trim().min(1, "必填"),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1, "必填"),
    description: z.string().optional()

})