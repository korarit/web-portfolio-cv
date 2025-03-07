import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


import sendLog from '@/lib/discord';
import realIP from '@/lib/getIP';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const method = req.method;

    if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH') {

        await sendLog({
            Title: "Request Edit Data",
            route: url.pathname,
            Status: "pass",
            IP: realIP(req) ?? undefined,
            Type: "request"
        }) // ส่งข้อมูลไป Discord

        // ตรวจสอบว่ามีการส่ง token มาหรือไม่
        if (!req.headers.get('Authorization')){
            await sendLog({
                Title: "Authorization Error",
                route: url.pathname,
                Status: "fail",
                IP: req.headers.get('x-real-ip') ?? undefined,
                Type: "protect"
            }) // ส่งข้อมูลไป Discord

            return NextResponse.json({success: false, message: 'token required'}, {status: 401})
        }

        //ตรวจสอบว่า token ขึ้นต้นด้วย Bearer หรือไม่
        if (!req.headers.get('Authorization')?.startsWith('Bearer ')){
            await sendLog({
                Title: "Authorization Error",
                route: url.pathname,
                Status: "fail",
                IP: req.headers.get('x-real-ip') ?? undefined,
                Des: 'invalid token token not start with Bearer',
                Type: "protect"
            }) // ส่งข้อมูลไป Discord
            return NextResponse.json({success: false, message: 'invalid token token not start with Bearer'}, {status: 401})
        }

        const token = req.headers.get('Authorization')?.replace('Bearer ', '');
        const password = process.env.EDIT_TOKEN
        // ตรวจสอบว่า token ที่ส่งมาถูกต้องหรือไม่
        if (token !== password){
            await sendLog({
                Title: "Authorization Error",
                route: url.pathname,
                Status: "fail",
                IP: req.headers.get('x-real-ip') ?? undefined,
                Des: 'invalid token',
                Type: "protect"
            }) // ส่งข้อมูลไป Discord
            return NextResponse.json({success: false, message: 'invalid token'}, {status: 401})
        }

        return NextResponse.next();
    }

    // ให้ผ่านไปได้สำหรับ route อื่น
    return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // ระบุเส้นทางที่ต้องการตรวจจับ
};
