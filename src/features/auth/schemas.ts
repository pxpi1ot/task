import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("邮箱格式不正确"),
    password: z.string().min(1, "必填"),
});

export const registerSchema = z.object({
    name: z.string().trim().min(1, "必填"),
    email: z.string().email("邮箱格式不正确"),
    password: z.string().min(8, "密码长度最少为8位"),
});