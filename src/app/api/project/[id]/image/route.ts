import { NextRequest, NextResponse } from 'next/server'

import addImg from './post.controller'
import deleteImg from './delete.controller'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} = await params

        const formData = await request.formData();
        const img= formData.getAll('img');

        const [status, data] = await addImg(
            id,
            img
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
        const {id} = await params
        const {img_id} = await request.json()

        const [status, data] = await deleteImg(id, img_id)
        return NextResponse.json(data, {status: status})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to fetch project data',
            error: error
        }, {status: 500})
    }
}