import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function addTopic(name:string|null|undefined): Promise<[boolean, number, {success: boolean, message: string, data?: any}]> {
    try{

        if(!name){
            return [false,400,{success: false, message: 'name is required'}]
        }
        const data = {
            name: name
        }

        //check if topic already exist
        const topic = await prisma.project_topic.findFirst({
            where: {
                name: name
            }
        })

        if(topic){
            return [false,400,{success: false, message: 'topic already exist'}]
        }

        const result = await prisma.project_topic.create({
            data: data
        })

        return [true,200,{success: true, message: 'topic added successfully', data: result}]
    } catch (error) {
        throw error
    }
}