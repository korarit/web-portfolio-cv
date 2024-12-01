import type { Metadata } from 'next'



import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'Korarit - Blog',
    description: 'Korarit\'s Portfolio Website - My List of Blog in Public',
    openGraph: {
        type: 'website',
        url: 'https://cv.korarit.website/blog',
        title: 'Korarit - Blog',
        description: 'Korarit\'s Portfolio Website - My List of Blog in Public',
    },
    authors: [{
        name: 'Korarit Saengthong',
        url: 'https://cv.korarit.website'
    }],
    twitter: {
        title: 'Korarit - About Me',
        description: 'Korarit\'s Portfolio Website - About of Me',
        creator: '@thestepkla',
    },
    icons:[
        {
            url: '/icon/icon-16.png',
            sizes: '16x16',
            type: 'image/png'
        },
        {
            url: '/icon/icon-32.png',
            sizes: '32x32',
            type: 'image/png'
        },
        {
            url: '/icon/icon-48.png',
            sizes: '48x48',
            type: 'image/png'
        },
        {
            url: '/icon/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
        }
    ]
}

export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            {children}
        </>
    );
}
