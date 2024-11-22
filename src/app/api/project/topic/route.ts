import { NextResponse } from 'next/server'
import getData from './get'

export async function GET() {
    try{
        const data = await getData()
        return NextResponse.json({
            success: true,
            message: 'topic data fetched successfully',
            data: data
        }, {status: 200})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'failed to fetch topic data',
            error: error
        }, {status: 500})
    }
}