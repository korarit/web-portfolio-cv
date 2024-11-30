import type { Metadata } from 'next'



import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'Korarit - About Me',
    description: 'Korarit\'s Portfolio Website - About of Me',
    openGraph: {
        type: 'website',
        url: 'https://cv.korarit.website/about',
        title: 'Korarit - Blog',
        description: 'Korarit\'s Portfolio Website - About of Me',
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
