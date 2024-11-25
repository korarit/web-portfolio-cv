import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export default async function updateProject(
    ProjectId: number,
    topic: FormDataEntryValue|null, 
    name: FormDataEntryValue|null, 
    description: FormDataEntryValue|null, 
    img_banner: FormDataEntryValue|null, 
    github_link:FormDataEntryValue|null,
    preview_link:FormDataEntryValue|null,
    youtube_link:FormDataEntryValue|null
): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{

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


        //get icon extension

        let banner_url:string|null = null
        if(img_banner){
            if (!(img_banner instanceof File)) {
                return [400, { success: false, message: 'img_banner must be a File object' }];
            }

            const file = img_banner

            const icon_ext = file.name.split('.').pop()
            const file_name = `${uuidv7()}.${icon_ext}`

            banner_url = await uploadToR2(file, 'blog_banner', file_name)
        }

        //upload icon
        const data: Record<string, any> = {
            name: name?.toString(),
            description: description?.toString(),
            img_banner: banner_url,
            github_link: github_link?.toString() || null,
            preview_link: preview_link?.toString() || null,
            youtube_link: youtube_link?.toString() || null,
        };

        // ลบฟิลด์ที่ไม่มีค่า
        Object.keys(data).forEach((key) => {
            if (data[key] === null || data[key] === undefined) {
                delete data[key];
            }
        });

        //check topic id is number
        //แยก topic ด้วย ,
        if (topic !== null) {
            const topic_id = topic.toString().split(',')
            const topic_id_num = topic_id.map((item) => {
                return Number(item)
            }) 
            for (let i = 0; i < topic_id_num.length; i++) {
                if (isNaN(topic_id_num[i]) || topic_id_num[i] < 0) {
                    return [400,{success: false, message: 'topic id must be number'}]
                }
            }

            data.project_topics = {
                set: topic_id_num.map((item) => {
                    return {id: item}
                })
            }
        }

    
        const result = await prisma.project.update({
            data: data,
            where: {
                id: parseInt(ProjectId.toString())
            }
        })

        console.log(result)

        return [200,{success: true, message: 'skill topic patch successfully', data: result}]
    }catch (error) {
        console.log(error)
        throw error
    }
}