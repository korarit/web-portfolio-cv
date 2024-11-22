import { NextResponse , NextRequest} from 'next/server'

import { GetSkillTopic } from './get'
import { addSkillTopic } from './post'

export async function GET() {
    try {
        const data = await GetSkillTopic()
        return NextResponse.json({
            success: true,
            message: 'skill data fetched successfully',
            data: data
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'failed to fetch skill data',
            error: error
        }, {status: 500})
    }    
}


export async function POST(Request: NextRequest) {
    try {
        const {name} = await Request.json()
        
        if (!name) {
            return NextResponse.json({
                success: false, message: 'missing required field name',
                error: 'name is required'
            }, {status: 400})
        }
        const nameTopic = name as string

        const data = await addSkillTopic(nameTopic)
        return NextResponse.json({
            success: true,
            message: 'skill topic added successfully',
            data: data
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'failed to add skill topic',
            error: error
        }, {status: 500})
    }
}
