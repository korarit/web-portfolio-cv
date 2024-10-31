import { NextResponse } from 'next/server'

import { GetContact } from './get'


export async function GET() {
    try {
        const data = await GetContact()
        return NextResponse.json({
            success: true,
            message: 'contact data fetched successfully',
            data: data
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'failed to fetch contact data',
            error: error
        }, {status: 500})
    }    
}