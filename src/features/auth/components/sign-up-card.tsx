"use client";

import { z } from "zod";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";
import { toast } from "sonner";

export const SignUpCard = () => {
	const { mutate, isPending } = useRegister();

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof registerSchema>) => {
		mutate({ json: values });
	};

	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none">
			<CardHeader className="flex items-center justify-center text-center p-7">
				<CardTitle className="text-2xl">创建账户</CardTitle>
				<CardDescription>欢迎新用户</CardDescription>
			</CardHeader>
			<div className="px-7 mb-2">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<Form {...form}>
					<form
						noValidate
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="text"
											placeholder="输入昵称"
											disabled={false}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="email"
											placeholder="输入邮箱"
											disabled={false}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder="输入密码"
											disabled={false}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled size="lg" className="w-full">
							注册
						</Button>
					</form>
				</Form>
			</CardContent>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex flex-col gap-y-4">
				<Button
					disabled={isPending}
					variant="secondary"
					size="lg"
					className="w-full"
					onClick={() => toast.error("禁止注册！")}
				>
					<FcGoogle className="mr-2" />
					继续使用 Google 登录
				</Button>
				<Button
					disabled={isPending}
					variant="secondary"
					size="lg"
					className="w-full"
					onClick={() => toast.error("禁止注册！")}
				>
					<FaGithub className="mr-2" />
					继续使用 Github 登录
				</Button>
			</CardContent>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex items-center justify-center">
				<p>已经有帐户了？</p>
				<Link href="/sign-in">
					<span className="text-blue-700 hover:underline">登录</span>
				</Link>
			</CardContent>
		</Card>
	);
};
