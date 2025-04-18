import { PrismaClient } from '@prisma/client'

import sendLog from '@/lib/discord'

const prisma = new PrismaClient()

export async function GetSkill() {
    try {
    const data = await prisma.skill_topic.findMany({
        select:{
            name: true,
            skills: true
        }
    })

    return {list_skill: data.map((data)=> {return {
            title: data.name,
            skills: data.skills,
            skill_count: data.skills.length
        }
    }), count : data.length}

    } catch (error) {

        await sendLog({
            Title: "Get List Skill Error",
            route: '/skill/get',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })

        throw error
    }
}