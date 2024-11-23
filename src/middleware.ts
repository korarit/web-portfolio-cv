import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const method = req.method;

    if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH') {
        // ตรวจสอบว่ามีการส่ง token มาหรือไม่
        if (!req.headers.get('Authorization')){
            return NextResponse.json({success: false, message: 'token required'}, {status: 401})
        }

        //ตรวจสอบว่า token ขึ้นต้นด้วย Bearer หรือไม่
        if (!req.headers.get('Authorization')?.startsWith('Bearer ')){
            return NextResponse.json({success: false, message: 'invalid token token not start with Bearer'}, {status: 401})
        }

        const token = req.headers.get('Authorization')?.replace('Bearer ', '');
        const password = process.env.EDIT_TOKEN
        // ตรวจสอบว่า token ที่ส่งมาถูกต้องหรือไม่
        if (token !== password){
            console.log('token', password);
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
