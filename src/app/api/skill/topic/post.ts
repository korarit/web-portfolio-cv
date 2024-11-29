import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addSkillTopic(name: string) {
    try{
        const data = {
            name: name
        }

        const result = await prisma.skill_topic.create({
            data: data
        })

        return {success: true, message: 'skill topic added successfully', data: result}
    }catch (error) {
        throw error
    }
}