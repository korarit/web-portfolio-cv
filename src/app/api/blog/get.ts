import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function GetListBlog(): Promise<[boolean,number,{success:boolean,message:string,data:any}]> {
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

        return [true,200,{success: true, message: 'blog fetched successfully', data: {list : data, count: data.length}}]
    } catch (error) {
        throw error
    }
}