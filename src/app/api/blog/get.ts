import { PrismaClient } from '@prisma/client'

import sendLog from '@/lib/discord'

const prisma = new PrismaClient()

export default async function GetListBlog(): Promise<[number,{success:boolean,message:string,data:any}]> {
    try{
        const data = await prisma.blog.findMany({
            select:{
                id: true,
                name: true,
                img_banner: true,
                link: true,
                view_count: true,
                blog_topics: { 
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy:[
                {
                    view_count: 'desc'
                }
            ]
        })  

        return [200,{success: true, message: 'blog fetched successfully', data: {list : data, count: data.length}}]
    } catch (error) {

        await sendLog({
            Title: "Get List Blog Error",
            route: '/blog/get',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })

        throw error
    }
}