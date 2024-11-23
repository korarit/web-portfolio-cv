import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function deleteTopic(id:number): Promise<[boolean, number, {success: boolean, message: string}]> {
    try{

        const topic = await prisma.blog_topic.findFirst({
            where: {
                id: id
            }
        })

        if(!topic){
            return [false,400,{success: false, message: 'topic not found'}]
        }

        //check if topic already exist
        const deletes = await prisma.blog_topic.delete({
            where: {
                id: id
            }
        })

        return [true,200,{success: true, message: 'topic deleted successfully'}]
    } catch (error) {
        throw error
    }
}