import { PrismaClient } from '@prisma/client'

import {v7 as uuidv7} from 'uuid'
import { uploadToR2 } from '@/lib/cloudflare'

import sendLog from '@/lib/discord'


const prisma = new PrismaClient()

export interface BlogPatchData {
    name: FormDataEntryValue|null
    topic_id: FormDataEntryValue|null
    link: FormDataEntryValue|null
    view_count: FormDataEntryValue|null
    img_banner: FormDataEntryValue|null
}

export default async function PatchBlog(id: number, {name, topic_id, link, view_count, img_banner}: BlogPatchData): Promise<[number, object]> {
    try{

        const data:any = {}

        if (name) {
            data.name = name.toString()
        }

        if (link) {
            data.link = link.toString()
        }

        if (view_count) {
            data.view_count = Number(view_count)
        }

        if (img_banner) {
            if (!(img_banner instanceof File)) {
                return [400, {success: false, message: 'img_banner must be an image file'}]
            }

            //check if file is image
            const valid_ext = ['jpg', 'jpeg', 'png', 'webp', 'gif']
            const ext = img_banner.type.split('/').pop()
            if (!ext || !valid_ext.includes(ext)) {
                return [400, {success: false, message: 'img_banner must be an image file (jpg jpeg png webp gif)'}]
            }

            const file = img_banner

            //get icon extension
            const icon_ext = file.name.split('.').pop()
            const file_name = `${uuidv7()}.${icon_ext}`

            //upload icon
            const banner_url = await uploadToR2(file, 'blog_banner', file_name)
            data.img_banner = banner_url
        }

        if (topic_id) {
            data.blog_topics = {
                connect: {
                    id: parseInt(id.toString())
                }
            }
        }

        if (Object.keys(data).length === 0) {
            return [400, { success: false, message: 'no data to update' }]
        }

        const has_blog = await prisma.blog.findFirst({
            where: {
                id: parseInt(id.toString())
            }
        })

        if (!has_blog) {
            return [404, { success: false, message: 'blog not found' }]
        }

        const blog = await prisma.blog.update({
            where: {
                id: parseInt(id.toString())
            },
            data: data
        })

        await sendLog({
            Title: "Edit Blog",
            route: `[PATCH] /blog/${id}`,
            Status: "pass",
            Type: "edit",
            Des: `blog ${blog.name} edited successfully`
        })

        return [200, { success: true, message: 'blog updated successfully', data: blog }]
    } catch (error) {
        await sendLog({
            Title: "Edit Blog Error",
            route: `[PATCH] /blog/${id}`,
            Status: "error",
            Type: "error",
            Des: (error as Error).message
        })
        throw error
    }
}