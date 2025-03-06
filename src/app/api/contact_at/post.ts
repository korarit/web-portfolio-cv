import sendLog from '@/lib/discord'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function addContactDB(name: string, link: string, icon: string, social: boolean) {
    try {

        const data = {
            name: name,
            link: link,
            icon: icon,
            show_project: false,
            social: false
        }

        if (social) {
            data['social'] = true
        } else {
            data['show_project'] = true
        }

        const result = await prisma.contact_me.create({
            data: data
        })

        //get id
        const id = result.id

        await sendLog({
            Title: "Add Contact",
            route: '[POST] /contact_at',
            Status: "pass",
            Type: "edit",
            Des: `contact ${result.name} added successfully`
        })

        return {success: true, message: 'contact added successfully', data: {id: id}}
    } catch (error) {

        await sendLog({
            Title: "Add Contact Error",
            route: '[POST] /contact_at',
            Status: "error",
            Type: "error",
            Des: (error as Error).message
        })

        throw error
    }
}