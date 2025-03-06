import sendLog from '@/lib/discord'
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

        await sendLog({
            Title: "Add Skill Topic",
            route: '[POST] /skill/topic',
            Status: "pass",
            Type: "edit",
            Des: `skill topic ${result.name} added successfully`
        })

        return {success: true, message: 'skill topic added successfully', data: result}
    }catch (error) {

        await sendLog({
            Title: "Add Skill Topic Error",
            route: '[POST] /skill/topic',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })

        throw error
    }
}