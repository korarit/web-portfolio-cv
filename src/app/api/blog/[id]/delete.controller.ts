import sendLog from '@/lib/discord'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function DeleteBlog(id: number): Promise<[number, any]> {
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: parseInt(id.toString())
            }
        })

        if (!blog) {
            return [404, { success: false, message: 'blog not found' }]
        }

        await prisma.blog.delete({
            where: {
                id: parseInt(id.toString())
            }
        })

        await sendLog({
            Title: "Delete Blog",
            route: '/blog/delete',
            Status: "pass",
            Des: `blog id ${id} deleted successfully`,
            Type: "edit"
        })

        return [200, { success: true, message: 'blog deleted successfully' }]
    } catch (error) {
        await sendLog({
            Title: "Delete Blog Error",
            route: '/blog/delete',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })
        throw error
    }
}