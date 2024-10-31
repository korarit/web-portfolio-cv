import Link from 'next/link'

import FrontawesomeIcon from '@/components/FrontawesomeIcon';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


import '@/app/globals.css';



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
