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
    }
}

export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            {children}
        </>
    );
}
