import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GetSkillTopic() {
    try {
    const data = await prisma.skill_topic.findMany({
        select:{
            id: true,
            name: true,
        }
    })

    return {list: data, count : data.length}
    } catch (error) {
        throw error
    }
}