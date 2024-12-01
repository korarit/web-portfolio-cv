import type { Metadata ,ResolvingMetadata } from 'next'


import MainPage from './compunents/MainPage';


import '@/app/globals.css';


type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata({ params, searchParams }:Props) : Promise<Metadata> {
        const project_id  = (await searchParams)?.project_id || null;
        if (project_id) {
            const projectId = project_id;
            const getfetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/${projectId}`);
            const json = await getfetch.json();
            const data = json.data;

            return {
                title: `${data.name} - Project`,
                description: data.description,
                openGraph: {
                    type: 'website',
                    url: `https://cv.korarit.website/projects?project_id=${projectId}`,
                    title: `Korarit Project - ${data.name}`,
                    description: `Korarit\'s Portfolio Website - Project ${data.name}`,
                    images: [{
                        url: data.img_banner,
                        alt: `${data.name} - Project`
                    }],
                },
                authors: [{
                    name: 'Korarit Saengthong',
                    url: 'https://cv.korarit.website'
                }],
                twitter: {
                    title: `${data.name} - Project`,
                    description: data.description,
                    creator: '@thestepkla',
                },
            }
        }

    return {
        title: 'Korarit Website - Projects',
        description: 'Korarit\'s Portfolio Website - Projects',
        openGraph: {
            type: 'website',
            url: 'https://cv.korarit.website/projects',
            title: 'Korarit - Projects',
            description: 'Korarit\'s Portfolio Website - Projects',
            images: [{
                url: 'https://pub-f562933a06224aeda971ebad86c0aea5.r2.dev/preview/preview-home.png',
                width: 1440,
                height: 1024,
                alt: 'Korarit - Projects'
            }],
        },
        authors: [{
            name: 'Korarit Saengthong',
            url: 'https://cv.korarit.website'
        }],
        twitter: {
            title: 'Korarit - Projects',
            description: 'Korarit\'s Portfolio Website - Projects',
            creator: '@thestepkla',
        },
    };

}
export default function Home() {
    return (
        <MainPage />
    );
}
