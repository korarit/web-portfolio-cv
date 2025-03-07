import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'
import sendLog from '@/lib/discord'

const prisma = new PrismaClient()

export async function addSkillToTopic(
    topic_id: number, 
    name: FormDataEntryValue|null, 
    icon: FormDataEntryValue|null
): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{
        if (!name ||  !icon) {
            return [400,{success: false, message: 'name and icon is required'}]
        }
        if (!icon) {
            return [400,{success: false, message: 'icon is required'}]
        }

        if (!(icon instanceof File)) {
            return [400, { success: false, message: 'img_banner must be a File object' }];
        }

        const file = icon

        
        //check icon is not webp
        if (file.type !== 'image/webp') {
            return [400, { success: false, message: 'icon must be webp' }];
        }


        const file_name = `${uuidv7()}.webp`

        //upload icon
        const icon_url = await uploadToR2(file, 'skill', file_name)
    

        const result = await prisma.skill.create({
            data: {
                name: name.toString(),
                img_path: icon_url,
                skill_topic: {
                    connect: {
                        id: parseInt(topic_id.toString())
                    }
                }
            }
        })

        await sendLog({
            Title: "Add Skill",
            route: '[POST] /skill/topic/:id',
            Status: "pass",
            Type: "edit",
            Des: `skill ${result.name} added successfully`
        })

        return [200,{success: true, message: 'skill topic added successfully', data: result}]
    }catch (error) {

        await sendLog({
            Title: "Add Skill Error",
            route: '[POST] /skill/topic/:id',
            Status: "error",
            Type: "error",
            Des: (error as Error).message
        })

        throw error
    }
}