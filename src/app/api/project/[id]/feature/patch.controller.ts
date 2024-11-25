import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export default async function editFeature(ProjectId: number, FeatureID:number|null|undefined, name: string|null|undefined, success: boolean|null|undefined): Promise<[number, {success: boolean, message: string, error?: any}]> {
    try{


        if(!FeatureID){
            return [400, {success: false, message: 'FeatureID is required'}]
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

        const data:any = {}
        if(name){
            data['name'] = name
        }

        if(success){
            data['success'] = success
        }


        const result = await prisma.project_feature.update({
            where: {
                id: parseInt(FeatureID.toString()),
                project_id: parseInt(ProjectId.toString())
            },
            data: data
        })

        if (!result) {
            return [500, {success: false, message: 'failed to add feature'}]
        }

        return [200, {success: true, message: 'feature added'}]
    } catch (error) {
        return [500, {success: false, message: 'failed to add feature', error: error}]
    }
}