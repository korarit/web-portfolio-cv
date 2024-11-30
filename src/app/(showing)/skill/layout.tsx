import type { Metadata } from 'next'



import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'Korarit - My Skills',
    description: 'Korarit\'s Portfolio Website - My List of Tech Skills',
    openGraph: {
        type: 'website',
        url: 'https://cv.korarit.website/skills',
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
    }
}

export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            {children}
        </>
    );
}
