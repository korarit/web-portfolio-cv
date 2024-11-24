import { NextResponse } from 'next/server'
import getData from './get'
import addProject from './post'

export async function GET() {
    try{
        const data = await getData()
        return NextResponse.json({
            success: true,
            message: 'project data fetched successfully',
            data: data
        }, {status: 200})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to fetch project data',
            error: error
        }, {status: 500})
    }
}

export async function POST(request: Request) {
    try{
        const formData = await request.formData();
        const topic_id = formData.get('topic_id');
        const name = formData.get('name');
        const description = formData.get('description');
        const img_banner = formData.get('img_banner');

        const github_link = formData.get('github_link');
        const preview_link = formData.get('preview_link');
        const youtube_link = formData.get('youtube_link');

        const [status, data] = await addProject(
            topic_id,
            name,
            description,
            img_banner,
            github_link,
            preview_link,
            youtube_link
        )
        return NextResponse.json(data, {status: status})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to add project',
            error: error
        }, {status: 500})
    }
}