import { NextRequest , NextResponse } from "next/server"

import addFeature from "./post.controller"
import editFeature from "./patch.controller"
import deleteFeature from "./delete.controller"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} = await params
        const {name, success} = await request.json()

        const [status, data] = await addFeature(id, name, success)
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
        const {feature_id, name, success} = await request.json()

        const [status, data] = await editFeature(id, feature_id, name, success)
        return NextResponse.json(data, {status: status})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to fetch project data',
            error: error
        }, {status: 500})
    }
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} = await params
        const {feature_id} = await request.json()

        const [status, data] = await deleteFeature(id, feature_id)
        return NextResponse.json(data, {status: status})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to fetch project data',
            error: error
        }, {status: 500})
    }
}