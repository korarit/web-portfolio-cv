import { NextResponse, NextRequest } from 'next/server'

import sendLog from '@/lib/discord'

import { getSocial, getProjects } from './get'
import addContantDB from './post'


export async function GET(request: NextRequest) {
    try {

        const Social = request.nextUrl.searchParams.get('social')
        const ShowProjects = request.nextUrl.searchParams.get('project')

        if (Social === null && ShowProjects === null) {
            return NextResponse.json({
                success: false,
                message: 'invalid query parameter',
                error: 'query parameter must be social or project'
            }, {status: 400})
        }

        if (Social !== null && Social === 'true') {
            const data = await getSocial()
            return NextResponse.json({
                success: true,
                message: 'contact data fetched successfully',
                data: data
            }, {status: 200})
        }

        if (ShowProjects !== null && ShowProjects === 'true') {
            const data = await getProjects()
            return NextResponse.json({
                success: true,
                message: 'contact data fetched successfully',
                data: data
            }, {status: 200})
        }
        
    } catch (error) {
        await sendLog({
            Title: "Get Contact Error",
            route: '[GET] /contact_at',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })
        return NextResponse.json({
            success: false,
            message: 'failed to fetch contact data',
            error: error
        }, {status: 500})
    }    
}

interface Contact {
    name: string,
    link: string,
    icon: string,
    social: boolean
}
export async function POST(request: NextRequest) {
    try {
        const {name, link, icon, social} = await request.json()

        if (!name || !link || !icon || !social) {
            return NextResponse.json({
                success: false, message: 'missing required field name, link, icon, social are required',
            }, {status: 400})
        }

        const contactData: Contact = {name:name, link:link, icon:icon, social:social}

        const result = await addContantDB(contactData.name, contactData.link, contactData.icon, contactData.social)
        return NextResponse.json(result, {status: 201})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'failed to add contact',
            error: error
        }, {status: 500})
    }
}