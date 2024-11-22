import { NextResponse, NextRequest } from 'next/server'

import { getSocial, getProjects } from './get'
import addContantDB from './post'


export async function GET(Request: NextRequest) {
    try {

        const Social = Request.nextUrl.searchParams.get('social')
        const ShowProjects = Request.nextUrl.searchParams.get('project')

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
export async function POST(Request: NextRequest) {
    try {
        const {name, link, icon, social} = await Request.json()
        
        if (!name || !link || !icon || !social) {
            return NextResponse.json({
                success: false, message: 'missing required field name, link, icon, social are required',
            }, {status: 400})
        }

        const contactData: Contact = {name, link, icon, social}

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