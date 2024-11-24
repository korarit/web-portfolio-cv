import { NextResponse, NextRequest } from 'next/server'

import GetProject from './get'
import updateProject from './patch'
import deleteProject from './delete'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} = await params

        const [status, data] = await GetProject(id)
        return NextResponse.json(data, {status: status})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to fetch project data',
            error: error
        }, {status: 500})
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} = await params

        const formData = await request.formData();
        const topic_id = formData.get('topic_id');
        const name = formData.get('name');
        const description = formData.get('description');
        const img_banner = formData.get('img_banner');

        const github_link = formData.get('github_link');
        const preview_link = formData.get('preview_link');
        const youtube_link = formData.get('youtube_link');

        const [status, data] = await updateProject(
            id,
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
            message: 'failed to update project',
            error: error
        }, {status: 500})
    }
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} =  await params

        const data = await deleteProject(id)

        return NextResponse.json(data[1], {status: data[0]})
    }catch(error){
        console.log(error)
        return NextResponse.json({success: false,message: 'failed to fetch project data', error: error}, {status: 500})
    }
}