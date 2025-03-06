import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

import sendLog from '@/lib/discord'

const prisma = new PrismaClient()

export default async function addImg(
    ProjectId: number,
    img: FormDataEntryValue[]|null, 
): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{

        if (!img) {
            return [400, {success: false, message: 'img is required'}]
        }

        if (img.length < 1) {
            return [400, {success: false, message: 'img is required'}]
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


        //check if img is array of files
        const isFile = img.every((file) => file instanceof File)
        if (!isFile) {
            return [400, {success: false, message: 'invalid type for img'}]
        }

        const file = img

        interface insertData {
            project_id: number,
            img_path: string
        }

        let list_data: insertData[] = []
        for (let i = 0; i < file.length; i++) {
            const icon_ext = file[i].name.split('.').pop()
            const file_name = `${uuidv7()}.${icon_ext}`

            const img_path = await uploadToR2(file[i], 'project_img', file_name)

            list_data.push({
                project_id: parseInt(ProjectId.toString()),
                img_path: img_path
            })
        }

    
        const result = await prisma.project_img.createMany({
            data: list_data
        })

        console.log(result)

        await sendLog({
            Title: "Add Project Image",
            route: '[POST] /project/[id]/image',
            Status: "pass",
            Type: "edit",
            Des: `project image added successfully`
        })

        return [200,{success: true, message: 'skill topic patch successfully', data: result}]
    }catch (error) {
        console.log(error)
        throw error
    }
}