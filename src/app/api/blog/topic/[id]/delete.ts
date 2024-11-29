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

        return [200,{success: true, message: 'topic deleted successfully'}]
    } catch (error) {
        throw error
    }
}