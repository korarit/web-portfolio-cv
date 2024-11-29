import { PrismaClient } from '@prisma/client'
import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

const prisma = new PrismaClient()

export default async function addBlog(
    blog_topic: FormDataEntryValue|null, 
    name: FormDataEntryValue|null, 
    link: FormDataEntryValue|null, 
    view_count: FormDataEntryValue|null, 
    img_banner: FormDataEntryValue|null
): Promise<[number, {success: boolean, message: string, data?: any}]> {
    try{
        if (!blog_topic ||  !name || !link || !view_count || !img_banner) {
            return [400,{success: false, message: 'blog_topic, name, link, view_count, img_banner is required'}]
        }
        if (isNaN(Number(view_count)) || Number(view_count) < 0 || isNaN(Number(blog_topic)) || Number(blog_topic) < 0) {
            return [400,{success: false, message: 'view_count or blog_topic must be number'}]
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
    

        const result = await prisma.blog.create({
            data: {
                name: name.toString(),
                link: link.toString(),
                view_count: Number(view_count),
                img_banner: banner_url,
                blog_topics: {
                    connect: {
                        id: Number(blog_topic)
                    }
                }
            }
        })

        return [200,{success: true, message: 'skill topic added successfully', data: result}]
    }catch (error) {
        throw error
    }
}