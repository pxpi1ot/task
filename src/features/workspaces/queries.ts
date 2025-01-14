"use server";

import { Query } from "node-appwrite";
import { currentUser } from "@clerk/nextjs/server";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";

import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {


    const { databases } = await createSessionClient()

    const user = await currentUser();
    if (!user) return { documents: [], total: 0 }

    const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId", user.id)]
    )

    if (members.total === 0) {
        return { documents: [], total: 0 }
    }

    const workspaceIds = members.documents.map(member => member.workspaceId)

    const workspaces = await databases.listDocuments(
        DATABASE_ID,
        WORKSPACES_ID,
        [
            Query.orderDesc("$createdAt"),
            Query.contains("$id", workspaceIds)
        ]
    )

    return workspaces


}





