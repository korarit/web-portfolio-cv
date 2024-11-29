import type { Metadata } from 'next'



import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'Korarit - Project',
    description: 'Korarit\'s Portfolio Website - My List of Projects',
    openGraph: {
        type: 'website',
        url: 'https://cv.korarit.website/projects',
        title: 'Korarit - Project',
        description: 'Korarit\'s Portfolio Website - My List of Projects',
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
