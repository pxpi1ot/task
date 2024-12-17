import { TaskStatus } from "@/features/tasks/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInviteCode(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function statusToName(status: TaskStatus) {
  let finalStatus = ""
  if (status == TaskStatus.TODO) {
    finalStatus = "计划中";
  } else if (status == TaskStatus.BACKLOG) {
    finalStatus = "待办事项";
  } else if (status == TaskStatus.IN_PROGRESS) {
    finalStatus = "进行中";
  } else if (status == TaskStatus.IN_REVIEW) {
    finalStatus = "审核中";
  } else if (status == TaskStatus.DONE) {
    finalStatus = "已完成";
  }

  return finalStatus
}