import { NextRequest } from 'next/server';

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

export default realIP;