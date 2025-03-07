import { NextResponse , NextRequest } from 'next/server'

import PatchBlog from './patch.controller'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{

        const {id} = await params

        if (!id || isNaN(id)) {
            return NextResponse.json({success: false, message: 'id required'}, {status: 400})
        }

        const fromData = await request.formData()


        const topic_id = fromData.get('topic_id')
        const name = fromData.get('name')
        const link = fromData.get('link')
        const view_count = fromData.get('view_count')
        const img_banner = fromData.get('img_banner')

        const [status, message] = await PatchBlog(id, {name, topic_id, link, view_count, img_banner})

        return NextResponse.json(message, {status: status})
    }catch(error){
        return NextResponse.json({success: false,message: 'failed to fetch blog list', error: error}, {status: 500})
    }
}