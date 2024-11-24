import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async function updateTopic(id:number, name:string|null|undefined): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{

        if(!name){
            return [400,{success: false, message: 'name is required'}]
        }
        const topic = await prisma.blog_topic.findFirst({
            where: {
                id: id
            }
        })

        if(!topic){
            return [400,{success: false, message: 'topic not found'}]
        }

        const result = await prisma.blog_topic.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        })

        return [200,{success: true, message: 'topic updated successfully', data: result}]
    } catch (error) {
        throw error
    }
}