import { PrismaClient } from '@prisma/client'
import sendLog from '@/lib/discord'

const prisma = new PrismaClient()


export default async function updateTopic(id:number, name:string|null|undefined): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{

        if(!name){
            return [400,{success: false, message: 'name is required'}]
        }
        const topic = await prisma.blog_topic.findFirst({
            where: {
                id: parseInt(id.toString())
            }
        })

        if(!topic){
            return [400,{success: false, message: 'topic not found'}]
        }

        const result = await prisma.blog_topic.update({
            where: {
                id: parseInt(id.toString())
            },
            data: {
                name: name
            }
        })

        await sendLog({
            Title: "Update Topic",
            route: '[PATCH] /blog/topic/:id',
            Status: "pass",
            Type: "edit",
            Des: `topic updated successfully with id : ${id}`
        })

        return [200,{success: true, message: 'topic updated successfully', data: result}]
    } catch (error) {
        await sendLog({
            Title: "Update Topic Error",
            route: '/blog/topic/:id/patch',
            Status: "error",
            Type: "error",
            Des: (error as Error).message
        })
        throw error
    }
}