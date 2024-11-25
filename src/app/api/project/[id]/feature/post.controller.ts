import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export default async function addFeature(ProjectId: number,name: string|null|undefined, success: boolean|null|undefined): Promise<[number, {success: boolean, message: string, error?: any}]> {
    try{
        
        if (!name || !success) {
            return [400, {success: false, message: 'name and success are required'}]
        }

        // check type of name , success
        if (typeof name !== 'string' || typeof success !== 'boolean') {
            return [400, {success: false, message: 'invalid type for name or success'}]
        }

        const hasProject = await prisma.project.findFirst({
            select:{
                id: true
            },
            where: {
                id: parseInt(ProjectId.toString())
            }
        })

        if (!hasProject) {
            return [404, {success: false, message: 'project not found'}]
        }

        let success_bool = success?.toString() === 'true' ? true : false

        const result = await prisma.project_feature.create({
            data: {
                name: name?.toString(),
                success: success_bool,
                project: {
                    connect: {
                        id: ProjectId
                    }
                }
            }
        })

        if (!result) {
            return [500, {success: false, message: 'failed to add feature'}]
        }

        return [200, {success: true, message: 'feature added'}]
    } catch (error) {
        return [500, {success: false, message: 'failed to add feature', error: error}]
    }
}