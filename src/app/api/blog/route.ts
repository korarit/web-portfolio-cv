import { NextResponse , NextRequest } from 'next/server'
import getData from './get';
import addBlog from './post';

export async function GET() {
    try{
        const data = await getData()
        return NextResponse.json(data[2], {status: data[1]})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to fetch blog list',
            error: error
        }, {status: 500})
    }
}

export async function POST(Request: NextRequest) {
    try{
        const fromData = await Request.formData()

        const topic_id = fromData.get('topic_id')
        const name = fromData.get('name')
        const link = fromData.get('link')
        const view_count = fromData.get('view_count')
        const img_banner = fromData.get('img_banner')


        const data = await addBlog(topic_id, name, link, view_count, img_banner)
        if(!data[0]){
            return NextResponse.json(data[2], {status: data[1]})
        }

        return NextResponse.json(data[2], {status: data[1]})
    }catch(error){
        return NextResponse.json({success: false,message: 'failed to fetch blog list', error: error}, {status: 500})
    }
}