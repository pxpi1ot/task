import "server-only";

import {
    Account,
    Client,
    Databases,
    Models,
    Storage,
    type Account as AccountType,
    type Databases as DatabasesType,
    type Users as UsersType,
    type Storage as StorageType
} from "node-appwrite";

import { currentUser, User } from "@clerk/nextjs/server";
import { createMiddleware } from "hono/factory";



type AdditionalContext = {
    Variables: {
        account: AccountType
        databases: DatabasesType
        storage: StorageType
        users: UsersType
        user: User
    }
}


export const sessionMiddleware = createMiddleware<AdditionalContext>(
    async (c, next) => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)


        const user = await currentUser();

        if (!user) {
            return c.json({ error: "Unauthoried" }, 401)
        }





        const databases = new Databases(client)
        const storage = new Storage(client)



        //挂载到 Context

        c.set("databases", databases)
        c.set("storage", storage)
        c.set("user", user)

        await next()
    }

)