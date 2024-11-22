import { addSkillToTopic } from "./post"
import { NextResponse , NextRequest} from 'next/server'

export async function POST(Request: NextRequest, {params}: {params: {id: number}}) {
    try {
        const FromData = await Request.formData()
        const name = FromData.get('name')
        const icon = FromData.get('icon')
        const social = FromData.get('social')
        
        if (!name ||  !icon || !social) {
            return NextResponse.json({
                success: false, message: 'missing required field name, link, icon, social are required'
            }, {status: 400})
        }

        const file = icon as File


        const data = await addSkillToTopic(params.id, name.toString(), file)
        return NextResponse.json({
            success: true,
            message: 'contact data added successfully',
            data: data
        }, {status: 201})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'failed to add contact data',
            error: error
        }, {status: 500})
    }
}