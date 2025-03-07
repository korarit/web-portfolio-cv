import { PrismaClient } from '@prisma/client'

import sendLog from '@/lib/discord'

const prisma = new PrismaClient()

export default async function deleteProject(ProjectId: number): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{


        const data = await prisma.project.delete({
            where: {
                id: parseInt(ProjectId.toString())
            }
        })  

        if (!data) {
            return [404, {success: false, message: 'project data not found'}]
        }

        return [200, {success: true, message: 'project data delete successfully', data: data}]
    } catch (error) {
        await sendLog({
            Title: "Delete Project Error",
            route: '[POST] /project/[id]',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })
        throw error
    }
}