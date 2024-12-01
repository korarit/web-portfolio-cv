import type { Metadata } from 'next'


import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'Korarit - Portfolio',
    description: 'Korarit\'s Portfolio Website - Hello',
    openGraph: {
        type: 'website',
        url: 'https://cv.korarit.website',
        title: 'Korarit - Portfolio',

        images: [{
            url: 'https://pub-f562933a06224aeda971ebad86c0aea5.r2.dev/preview/preview-home.png',
            width: 1440,
            height: 1024,
            alt: 'Korarit - Portfolio'
        }],
        description: 'Korarit\'s Portfolio Website - Hello',
    },
    authors: [{
        name: 'Korarit Saengthong',
        url: 'https://cv.korarit.website'
    }],
    twitter: {
        title: 'Korarit - Portfolio',
        description: 'Korarit\'s Portfolio Website - Hello',
        creator: '@thestepkla',
        images: {
            url: 'https://pub-f562933a06224aeda971ebad86c0aea5.r2.dev/preview/preview-home.png',
            alt: 'Korarit - Portfolio'
        }
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
            <div className="bg-[#818181] w-dvw h-dvh xl:p-8 2xl:px-20 2xl:py-12 overflow-hidden custom-scrollbar">
                <div className="h-full w-full bg-[#242424] xl:border xl:border-[#000000] rounded-lg flex flex-col overflow-hidden">
                    {/* Header */}
                    <Navbar />
                    <div className="flex-auto w-full max-h-full overflow-hidden">
                    {children}
                    </div>
                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </>
    );
}
