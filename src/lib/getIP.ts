"use server";

import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

function realIP(request: NextRequest){

    const headers = request.headers;
    if (headers.has('cf-connecting-ip')) {
        return headers.get('cf-connecting-ip');
    }
    
    if (headers.has('x-real-ip')) {
        return headers.get('x-real-ip');
    }
    
    if (headers.has('x-forwarded-for')) {
        return headers.get('x-forwarded-for');
    }
    
    if (headers.has('x-vercel-forwarded-for')) {
        return headers.get('x-vercel-forwarded-for');
    }
    
    if (headers.has('x-vercel-proxied-for')) {
        return headers.get('x-vercel-proxied-for');
    }
    
    /**
       * The fallback IP address.
    */
    return  "";
}

export async function getIP() {
    const headersList = await headers();
    if (headersList.has('cf-connecting-ip')) {
        return headersList.get('cf-connecting-ip');
    }
    
    if (headersList.has('x-real-ip')) {
        return headersList.get('x-real-ip');
    }
    
    if (headersList.has('x-forwarded-for')) {
        return headersList.get('x-forwarded-for');
    }
    
    if (headersList.has('x-vercel-forwarded-for')) {
        return headersList.get('x-vercel-forwarded-for');
    }
    
    if (headersList.has('x-vercel-proxied-for')) {
        return headersList.get('x-vercel-proxied-for');
    }
    
    /**
       * The fallback IP address.
    */
    return  "";
}

export default realIP;