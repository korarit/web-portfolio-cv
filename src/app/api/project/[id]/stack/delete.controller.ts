import { PrismaClient } from '@prisma/client'
import { deleteFromR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export default async function deleteImg(ProjectId: number, StackID:number|null|undefined): Promise<[number, {success: boolean, message: string, error?: any}]> {
    try{
        if(!StackID){
            return [400, {success: false, message: 'StackID is required'}]
        }

        const hasProject = await prisma.project_stack.findFirst({
            select:{
                img_path: true
            },
            where: {
                id: parseInt(StackID.toString()),
                project_id: parseInt(ProjectId.toString())
            }
        })

        if (!hasProject) {
            return [404, {success: false, message: ''}]
        }

        const result = await prisma.project_stack.delete({
            where: {
                id: parseInt(StackID.toString()),
                project_id: parseInt(ProjectId.toString())
            }
        })

        if (!result) {
            return [500, {success: false, message: 'failed to delete stack of project'}]
        }

        if(result.img_path){
            await deleteFromR2(result.img_path)
        }

        return [200, {success: true, message: 'img deleted'}]
    }
    catch (error) {
        return [500, {success: false, message: 'failed to delete img', error: error}]
    }
}

