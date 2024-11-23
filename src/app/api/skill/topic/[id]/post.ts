import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export async function addSkillToTopic(topic_id: number, name: FormDataEntryValue|null, icon: FormDataEntryValue|null): Promise<[boolean, number, {success: boolean, message: string, data?: any}]> {
    try{
        if (!name ||  !icon) {
            return [false, 400,{success: false, message: 'name and icon is required'}]
        }
        if (!icon) {
            return [false, 400,{success: false, message: 'icon is required'}]
        }

        if (!(icon instanceof File)) {
            return [false, 400, { success: false, message: 'img_banner must be a File object' }];
        }

        const file = icon

        
        //check icon is svg
        if (file.type !== 'image/svg+xml') {
            return [false, 400,{success: false, message: 'icon must be svg'}]
        }

        //get icon extension
        const icon_ext = file.name.split('.')[-1]
        if (icon_ext !== 'svg') {
            return [false, 400,{success: false, message: 'icon must be svg'}]
        }

        const file_name = `${uuidv7()}.${icon_ext}`

        //upload icon
        const icon_url = await uploadToR2(file, 'skill', file_name)
    

        const result = await prisma.skill.create({
            data: {
                name: name.toString(),
                img_path: icon_url,
                skill_topic: {
                    connect: {
                        id: topic_id
                    }
                }
            }
        })

        return [false, 400,{success: true, message: 'skill topic added successfully', data: result}]
    }catch (error) {
        throw error
    }
}