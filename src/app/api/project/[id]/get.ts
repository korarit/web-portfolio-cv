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
                        name: true
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
                id: ProjectId
            }
        })  

        if (!data) {
            return [404, {success: false, message: 'project data not found'}]
        }

        return [200, {success: true, message: 'project data fetched successfully', data: data}]
    } catch (error) {
        throw error
    }
}