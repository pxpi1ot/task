import "server-only"

import { Client, Account, Users, Databases } from "node-appwrite";
import { clerkClient } from '@clerk/nextjs/server';


export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)




    return {

        get databases() {
            return new Databases(client)

        }
    }

}


export async function createAdminClient() {

    const cClient = await clerkClient()
    const users = cClient.users
    return {

        users
    }
}