import { PrismaClient } from '@prisma/client'
import { deleteFromR2 } from '@/lib/cloudflare'
import sendLog from '@/lib/discord'

const prisma = new PrismaClient()

export default async function deleteImg(ProjectId: number, ImgID:number|null|undefined): Promise<[number, {success: boolean, message: string, error?: any}]> {
    try{
        if(!ImgID){
            return [400, {success: false, message: 'ImgID is required'}]
        }

        const hasProject = await prisma.project_img.findFirst({
            select:{
                img_path: true
            },
            where: {
                id: parseInt(ImgID.toString()),
                project_id: parseInt(ProjectId.toString())
            }
        })

        if (!hasProject) {
            return [404, {success: false, message: 'img not found'}]
        }

        const result = await prisma.project_img.delete({
            where: {
                id: parseInt(ImgID.toString()),
                project_id: parseInt(ProjectId.toString())
            }
        })

        if (!result) {
            return [500, {success: false, message: 'failed to delete img'}]
        }

        await deleteFromR2(hasProject.img_path)

        await sendLog({
            Title: "Delete Img",
            route: '[DELETE] /project/[id]/image/[img_id]',
            Status: "pass",
            Type: "edit",
            Des: `img deleted successfully with id : ${ImgID}`
        })

        return [200, {success: true, message: 'img deleted'}]
    }
    catch (error) {
        return [500, {success: false, message: 'failed to delete img', error: error}]
    }
}

