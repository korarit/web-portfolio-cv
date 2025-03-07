import sendLog from '@/lib/discord'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function deleteTopic(id:number): Promise<[number, {success: boolean, message: string}]> {
    try{

        const topic = await prisma.blog_topic.findFirst({
            where: {
                id: parseInt(id.toString())
            }
        })

        if(!topic){
            return [400,{success: false, message: 'topic not found'}]
        }

        //check if topic already exist
        const deletes = await prisma.blog_topic.delete({
            where: {
                id: parseInt(id.toString())
            }
        })

        await sendLog({
            Title: "Delete Topic",
            route: '[DELETE] /blog/topic/[id]',
            Status: "pass",
            Type: "edit",
            Des: `topic id ${id} deleted successfully`
        })

        return [200,{success: true, message: 'topic deleted successfully'}]
    } catch (error) {
        await sendLog({
            Title: "Delete Topic Error",
            route: '/blog/topic/[id]/delete',
            Status: "error",
            Type: "error",
            Des: (error as Error).message
        })
        throw error
    }
}