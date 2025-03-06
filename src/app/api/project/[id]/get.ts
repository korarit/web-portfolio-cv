import sendLog from '@/lib/discord'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function GetProject(ProjectId: number): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{
        const data = await prisma.project.findFirst({
            select:{
                id: true,
                name: true,
                description: true,
                img_banner: true,
                project_topics: true,

                github_link: true,
                preview_link: true,
                youtube_link: true,
                
                project_imgs: {
                    select: {
                        id: true,
                        img_path: true
                    }
                },

                project_features: {
                    select: {
                        id: true,
                        name: true,
                        success: true
                    }
                },

                project_stacks: {
                    select: {
                        id: true,
                        name: true,
                        img_path: true
                    }
                }

            },
            where: {
                id: parseInt(ProjectId.toString())
            }
        })  

        if (!data) {
            return [404, {success: false, message: 'project data not found'}]
        }

        return [200, {success: true, message: 'project data fetched successfully', data: data}]
    } catch (error) {
        await sendLog({
            Title: "Get Project Error",
            route: '[GET] /project/[id]',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })
        throw error
    }
}