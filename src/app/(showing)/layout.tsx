"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import FrontawesomeIcon from '@/components/FrontawesomeIcon';

import '@/app/globals.css';



export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {

    const currentPath = usePathname();
  

    return (
        <>
            <div className="bg-[#818181] w-dvw h-dvh xl:p-8 2xl:px-20 2xl:py-12 overflow-hidden custom-scrollbar">
                <div className="h-full w-full bg-[#242424] xl:border xl:border-[#000000] rounded-lg flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="h-[50px] w-full flex flex-none">
                        <div className="flex-none h-full w-[256px] flex items-center px-4 border-b border-r border-[#3F3F3F]">
                            <p className="text-[#959595] text-[16px] font-normal">Korarit - CV</p>
                        </div>
                        <Link href="/" className={currentPath === '/' ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595] " : 'flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white'}>
                            <p className="text-[16px] font-normal">Hello.txt</p>
                        </Link>
                        <Link href="/about" className={currentPath === '/about' ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595]" : 'flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white'}>
                            <p className="text-[16px] font-normal">../about</p>
                        </Link>
                        <Link href="/skill" className={currentPath === '/skill' ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595]" : 'flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white'}>
                            <p className="text-[16px] font-normal">../skill</p>
                        </Link>
                        <Link href="/projects" className={currentPath === '/projects' ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595]" : 'flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white'}>
                            <p className="text-[16px] font-normal">../projects</p>
                        </Link>

                        <div className="flex-auto h-full flex items-center border-b border-r border-[#3F3F3F]">
                        </div>

                        <button className="flex-none w-[148px] xl:w-[10%]  h-full flex items-center justify-center border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white">
                            <p className=" text-[16px] font-normal">Download CV</p>
                        </button>
                    </div>
                    <div className="flex-auto w-full max-h-full overflow-hidden">
                    {children}
                    </div>
                    {/* Footer */}
                    <div className="flex-none h-[50px] w-full flex border-t border-[#3F3F3F]">
                        <div className="flex-none h-full flex items-center px-4 border-r border-[#3F3F3F]">
                            <p className="text-[#959595] text-[16px] font-normal">Contact Me at:</p>
                        </div>
                        <Link  href="https://www.facebook.com/krt.korarit" target='_blank' className="flex-none h-full px-4 flex items-center border-r border-r-[#3F3F3F] text-[#959595] hover:text-white">
                            <FrontawesomeIcon icon="fa-brands fa-facebook" className='text-[24px]' />
                        </Link>
                        <Link href="https://www.linkedin.com/in/korarit-saengthong/" target='_blank' className="flex-none h-full flex items-center px-4 border-r border-[#3F3F3F] text-[#959595] hover:text-white">
                            <FrontawesomeIcon icon="fa-brands fa-linkedin" className='text-[24px]' />
                        </Link>
                        <Link href="https://www.youtube.com/channel/UC3ZDblNrSZRnJe_-0Zv52QA/" target='_blank'  className="flex-none h-full flex items-center px-4 border-r border-[#3F3F3F] text-[#959595] hover:text-white">
                            <FrontawesomeIcon icon="fa-brands fa-youtube" className='text-[24px]' />
                        </Link>

                        <div className="flex-auto h-full flex items-center border-r border-[#3F3F3F]">
                        </div>

                        <Link href="https://github.com/korarit" target='_blank'  className="flex-none w-[148px] xl:w-[10%] h-full flex items-center justify-center space-x-2 border-r border-[#3F3F3F] text-[#959595] hover:text-white">
                            <p className="text-[16px] font-normal">@Korarit</p>
                            <FrontawesomeIcon icon="fa-brands fa-github" className='text-[24px]' />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
