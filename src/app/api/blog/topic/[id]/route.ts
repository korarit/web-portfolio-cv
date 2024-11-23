import { NextResponse , NextRequest } from 'next/server'

import updateTopic from './patch'
import deleteTopic from './delete'


export async function PATCH(Request: NextRequest, {params}: {params: {id: string}}) {
    try{
        const {id} = params
        const {name} = await Request.json()

        const data = await updateTopic(parseInt(id), name)
        if(!data[0]){
            return NextResponse.json(data[2], {status: data[1]})
        }

        return NextResponse.json(data[2], {status: data[1]})
    }catch(error){
        return NextResponse.json({success: false,message: 'failed to fetch topic blog', error: error}, {status: 500})
    }
}

export async function DELETE(Request: NextRequest, {params}: {params: {id: string}}) {
    try{
        const {id} = params

        const data = await deleteTopic(parseInt(id))
        if(!data[0]){
            return NextResponse.json(data[2], {status: data[1]})
        }

        return NextResponse.json(data[2], {status: data[1]})
    }catch(error){
        console.log(error)
        return NextResponse.json({success: false,message: 'failed to fetch topic blog', error: error}, {status: 500})
    }
}