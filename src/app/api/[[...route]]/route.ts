import { Hono } from "hono"
import { handle } from "hono/vercel"

import workspaces from "@/features/workspaces/server/route"
import members from "@/features/members/server/route"
import projects from "@/features/projects/server/route"
import tasks from "@/features/tasks/server/route"
/* 接管nextjs api
 */
const app = new Hono().basePath("/api")


const routes = app
    .route("/workspaces", workspaces)
    .route("/members", members)
    .route("projects", projects)
    .route("/tasks", tasks)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes