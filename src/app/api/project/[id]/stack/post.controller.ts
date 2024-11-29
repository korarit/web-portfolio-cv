import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export default async function addImg(
    ProjectId: number,
    name: FormDataEntryValue|null,
    img: FormDataEntryValue|null, 
): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{

        if (!img || !name) {
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

        //check if img is file
        if (!(img instanceof File)) {
            return [400, {success: false, message: 'invalid type for img'}]
        }


        const icon_ext = img.name.split('.').pop()
        const file_name = `${uuidv7()}.${icon_ext}`

        const img_path = await uploadToR2(img, 'project_img', file_name)

        

    
        const result = await prisma.project_stack.create({
            data: {
                name: name.toString(),
                img_path: img_path,
                project: {
                    connect: {
                        id: parseInt(ProjectId.toString())
                    }
                }
            }
        })

        console.log(result)

        return [200,{success: true, message: 'skill topic patch successfully', data: result}]
    }catch (error) {
        console.log(error)
        throw error
    }
}