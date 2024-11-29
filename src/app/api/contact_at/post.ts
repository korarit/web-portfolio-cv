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

        return {success: true, message: 'contact added successfully', data: {id: id}}
    } catch (error) {
        throw error
    }
}