import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export async function addSkillToTopic(topic_id: number, name: string, icon: File) {
    try{

        if (!icon) {
            return [false, 400,{success: false, message: 'icon is required'}]
        }
        //check icon is svg
        if (icon.type !== 'image/svg+xml') {
            return [false, 400,{success: false, message: 'icon must be svg'}]
        }

        //get icon extension
        const icon_ext = icon.name.split('.')[-1]
        if (icon_ext !== 'svg') {
            return [false, 400,{success: false, message: 'icon must be svg'}]
        }

        const file_name = `${uuidv7()}.${icon_ext}`

        //upload icon
        const icon_url = await uploadToR2(icon, 'skill', file_name)
    

        const result = await prisma.skill.create({
            data: {
                name: name,
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