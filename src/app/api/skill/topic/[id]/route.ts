import { addSkillToTopic } from "./post"
import { NextResponse , NextRequest} from 'next/server'

export async function POST(Request: NextRequest, {params}: {params: {id: number}}) {
    try {

        const FromData = await Request.formData()
        const name = FromData.get('name')
        const icon = FromData.get('icon')

        const [status, message] = await addSkillToTopic(params.id, name, icon)
        return NextResponse.json( message, {status: status})
    } catch (error) {
        return NextResponse.json({success: false,message: 'failed to add contact data',error: error}, {status: 500})
    }
}

