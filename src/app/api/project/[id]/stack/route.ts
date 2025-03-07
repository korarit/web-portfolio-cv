import { NextRequest, NextResponse } from 'next/server'

import addImg from './post.controller'
import deleteImg from './delete.controller'

import sendLog from '@/lib/discord'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} = await params

        const formData = await request.formData();
        const name= formData.get('name');
        const img= formData.get('img');

        const [status, data] = await addImg(id, name, img)
        return NextResponse.json(data, {status: status})
    }catch(error){
        await sendLog({
            Title: "Add Stack Error",
            route: '[POST] /project/[id]/stack',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })
        return NextResponse.json({
            success: false,
            message: 'failed to update project',
            error: "error"
        }, {status: 500})
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} = await params
        const {stack_id} = await request.json()

        const [status, data] = await deleteImg(id, stack_id)
        return NextResponse.json(data, {status: status})
    }catch(error){
        await sendLog({
            Title: "Delete Stack Error",
            route: '[DELETE] /project/[id]/stack',
            Status: "error",
            Des: (error as Error).message,
            Type: "error"
        })
        return NextResponse.json({
            success: false,
            message: 'failed to fetch project data',
            error: error
        }, {status: 500})
    }
}
