import { NextResponse , NextRequest } from 'next/server'

import updateTopic from './patch'
import deleteTopic from './delete'


export async function PATCH(Request: NextRequest, {params}: {params: {id: string}}) {
    try{
        const {id} = params
        const {name} = await Request.json()

        const [status, message] = await updateTopic(parseInt(id), name)

        return NextResponse.json(message, {status: status})
    }catch(error){
        return NextResponse.json({success: false,message: 'failed to fetch topic blog', error: error}, {status: 500})
    }
}

export async function DELETE(Request: NextRequest, {params}: {params: {id: string}}) {
    try{
        const {id} = params

        const data = await deleteTopic(parseInt(id))

        return NextResponse.json(data[1], {status: data[0]})
    }catch(error){
        console.log(error)
        return NextResponse.json({success: false,message: 'failed to fetch topic blog', error: error}, {status: 500})
    }
}