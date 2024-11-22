import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function GetListTopic(){
    try{
        const data = await prisma.project_topic.findMany({
            select:{
                id: true,
                name: true,
            }
        })  

        return {list: data, count: data.length}
    } catch (error) {
        throw error
    }
}