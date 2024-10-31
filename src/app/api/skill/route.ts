import { NextResponse } from 'next/server'

import { GetSkill } from './get'


export async function GET() {
    try {
        const data = await GetSkill()
        return NextResponse.json({
            success: true,
            message: 'skill data fetched successfully',
            data: data
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'failed to fetch skill data',
            error: error
        }, {status: 500})
    }    
}