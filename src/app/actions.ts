"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export type PostDataType = {
    title: string
    content: string
    imageUrl: string
    authorId: string
    authorImage: string
    authorName: string
}

export async function handleSubmisson(formData: FormData){

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    const title = formData.get('title')
    const content = formData.get('content')
    const url = formData.get('url')
        
        const data = await prisma.blogPost.create({
            data: {
                title: title,
                content:content,
                imageUrl: url,
                authorId: user?.id,
                authorImage: user?.picture,
                authorName: user?.given_name,
            } as PostDataType,
        })

        return redirect("/dashboard")
    }