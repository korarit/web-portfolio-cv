import { NextResponse , NextRequest } from 'next/server'

import updateTopic from './patch'
import deleteTopic from './delete'


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: number }>} ) {
    try{
        const {id} = await params
        const {name} = await request.json()

        const [status, message] = await updateTopic(id, name)

        return NextResponse.json(message, {status: status})
    }catch(error){
        return NextResponse.json({success: false,message: 'failed to fetch topic blog', error: error}, {status: 500})
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: number }>}) {
    try{
        const {id} = await params

        const data = await deleteTopic(id)

        return NextResponse.json(data[1], {status: data[0]})
    }catch(error){
        console.log(error)
        return NextResponse.json({success: false,message: 'failed to fetch topic blog', error: error}, {status: 500})
    }
}