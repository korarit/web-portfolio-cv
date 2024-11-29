import { NextResponse , NextRequest } from 'next/server'
import getData from './get'
import addTopic from './post'

export async function GET() {
    try{
        const data = await getData()
        return NextResponse.json(data[2], {status: data[1]})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to fetch topic data',
            error: error
        }, {status: 500})
    }
}

export async function POST(request: NextRequest) {
    try{
        const {name} = await request.json()

        const data = await addTopic(name)
        if(!data[0]){
            return NextResponse.json(data[2], {status: data[1]})
        }

        return NextResponse.json(data[2], {status: data[1]})
    }catch(error){
        return NextResponse.json({success: false,message: 'failed to fetch topic data', error: error}, {status: 500})
    }
}