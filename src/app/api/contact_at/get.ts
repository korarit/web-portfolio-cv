import { PrismaClient } from '@prisma/client'
import { count } from 'console'

const prisma = new PrismaClient()

export async function GetContact() {
    try {
    const data = await prisma.contact_me.findMany({
        select:{
            name: true,
            icon: true,
            link: true
        }
    })

    return {list_contact: data, count : data.length}

    } catch (error) {
        throw error
    }
}