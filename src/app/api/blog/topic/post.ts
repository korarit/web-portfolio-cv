import { PrismaClient } from '@prisma/client'

import sendLog from '@/lib/discord'

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
        const topic = await prisma.blog_topic.findFirst({
            where: {
                name: name
            }
        })

        if(topic){
            return [false,400,{success: false, message: 'topic already exist'}]
        }

        const result = await prisma.blog_topic.create({
            data: data
        })

        await sendLog({
            Title: "Add Topic",
            route: '[POST] /blog/topic/:id',
            Status: "pass",
            Type: "edit",
            Des: `topic ${result.name} added successfully`
        })

        return [true,200,{success: true, message: 'topic added successfully', data: result}]
    } catch (error) {
        await sendLog({
            Title: "Add Topic Error",
            route: '[POST] /blog/topic/:id',
            Status: "error",
            Type: "error",
            Des: (error as Error).message
        })
        throw error
    }
}