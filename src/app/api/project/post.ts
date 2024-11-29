import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export default async function addProject(
    topic: FormDataEntryValue|null, 
    name: FormDataEntryValue|null, 
    description: FormDataEntryValue|null, 
    img_banner: FormDataEntryValue|null, 
    github_link:FormDataEntryValue|null,
    preview_link:FormDataEntryValue|null,
    youtube_link:FormDataEntryValue|null
): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{
        if (!topic ||  !name || !description || !img_banner) {
            return [400,{success: false, message: 'topic, name, description, img_banner is required'}]
        }

        //แยก topic ด้วย ,
        const topic_id = topic.toString().split(',')
        const topic_id_num = topic_id.map((item) => {
            return Number(item)
        })

        //check topic id is number
        for (let i = 0; i < topic_id_num.length; i++) {
            if (isNaN(topic_id_num[i]) || topic_id_num[i] < 0) {
                return [400,{success: false, message: 'topic id must be number'}]
            }
        }

        if (!(img_banner instanceof File)) {
            return [400, { success: false, message: 'img_banner must be a File object' }];
        }

        const file = img_banner

        //get icon extension
        const icon_ext = file.name.split('.').pop()
        const file_name = `${uuidv7()}.${icon_ext}`

        //upload icon
        const banner_url = await uploadToR2(file, 'blog_banner', file_name)

        interface Project {
            name: string,
            description: string,
            img_banner: string,
            github_link: string|null,
            preview_link: string|null,
            youtube_link: string|null,
            project_topics: {
                connect: {
                    id: number
                }[]
            }
        }

        const data:Project = {
            name: name.toString(),
            description: description.toString(),
            img_banner: banner_url,
            github_link: null,
            preview_link: null,
            youtube_link: null,
            project_topics: {
                connect: []
            }

        }

        data.project_topics = {
            connect: topic_id_num.map((item) => {
                return {id: item}
            })
        }

        if (github_link) {
            data.github_link = github_link.toString()
        }
        if (preview_link) {
            data.preview_link = preview_link.toString()
        }
        if (youtube_link) {
            data.youtube_link = youtube_link.toString()
        }
    

        const result = await prisma.project.create({
            data: data
        })

        return [200,{success: true, message: 'skill topic added successfully', data: result}]
    }catch (error) {
        throw error
    }
}