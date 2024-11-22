import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getSocial() {
    try {
    const data = await prisma.contact_me.findMany({
        select:{
            name: true,
            icon: true,
            link: true
        },
        where: {
            social: {
                equals: true
            }
        }
    })

    return {list: data, count : data.length}

    } catch (error) {
        throw error
    }
}

export async function getProjects() {
    try {
    const data = await prisma.contact_me.findMany({
        select:{
            name: true,
            icon: true,
            link: true
        },
        where: {
            show_project: {
                equals: true
            }
        }
    })

    return {list: data, count : data.length}

    } catch (error) {
        throw error
    }
}