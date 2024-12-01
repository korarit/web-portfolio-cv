import type { Metadata } from 'next'



import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'Korarit - My Skills',
    description: 'Korarit\'s Portfolio Website - My List of Tech Skills',
    openGraph: {
        type: 'website',
        url: 'https://cv.korarit.website/skill',
        title: 'Korarit - Project',
        description: 'Korarit\'s Portfolio Website - My List of Tech Skills',
    },
    authors: [{
        name: 'Korarit Saengthong',
        url: 'https://cv.korarit.website'
    }],
    twitter: {
        title: 'Korarit - Skills',
        description: 'Korarit\'s Portfolio Website - My List of Tech Skills',
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
