import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function GetListTopic(): Promise<[boolean,number,{list:any,count:number}]> {
    try{
        const data = await prisma.project_topic.findMany({
            select:{
                id: true,
                name: true,
            }
        })  

        return [true,200,{list: data, count : data.length}]
    } catch (error) {
        throw error
    }
}