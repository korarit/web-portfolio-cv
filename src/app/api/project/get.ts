import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function GetListProject(){
    try{
        const data = await prisma.project.findMany({
            select:{
                id: true,
                name: true,
                img_banner: true,
                project_topics: true
            }
        })  

        return {list: data, count: data.length}
    } catch (error) {
        throw error
    }
}