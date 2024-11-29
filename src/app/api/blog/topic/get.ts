import { PrismaClient } from '@prisma/client'
import { list } from 'postcss'

const prisma = new PrismaClient()

export default async function GetListTopic(): Promise<[number,{success:boolean,message:string,data:any}]> {
    try{
        const data = await prisma.blog_topic.findMany({
            select:{
                id: true,
                name: true,
            }
        })  

        return [200,{success: true, message: 'topic fetched successfully', data: {list : data, count: data.length}}]
    } catch (error) {
        throw error
    }
}