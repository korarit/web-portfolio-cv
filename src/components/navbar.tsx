"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';


interface NavbarProps {
  showMenu : boolean;
}

export default function Navbar({showMenu}: NavbarProps) {


    const currentPath = usePathname();

    return (
    <>
      <div className="h-[50px] w-full flex flex-none">
        <div className="flex-none h-full w-[256px] flex items-center px-4 border-b border-r border-[#3F3F3F]">
          <p className="text-[#959595] text-[16px] font-normal">Korarit - CV</p>
        </div>
        {showMenu && (
        <>
          <Link
            href="/"
            className={
              currentPath === "/"
                ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595] "
                : "flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white"
            }
          >
            <p className="text-[16px] font-normal">Hello.txt</p>
          </Link>
          <Link
            href="/about"
            className={
              currentPath === "/about"
                ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595]"
                : "flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white"
            }
          >
            <p className="text-[16px] font-normal">../about</p>
          </Link>
          <Link
            href="/skill"
            className={
              currentPath === "/skill"
                ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595]"
                : "flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white"
            }
          >
            <p className="text-[16px] font-normal">../skill</p>
          </Link>
          <Link
            href="/projects"
            className={
              currentPath === "/projects"
                ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595]"
                : "flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white"
            }
          >
            <p className="text-[16px] font-normal">../projects</p>
          </Link>
          <Link
            href="/blog"
            className={
              currentPath === "/blog"
                ? "flex-none h-full px-4 flex items-center border-b-4 border-r border-b-[#FFFFFF] border-r-[#3F3F3F] text-[#959595]"
                : "flex-none h-full flex items-center px-4 border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white"
            }
          >
            <p className="text-[16px] font-normal">../blog</p>
          </Link>
        </>
        )}

        <div className="flex-auto h-full flex items-center border-b border-r border-[#3F3F3F]"></div>

        <button className="flex-none w-[148px] xl:w-[10%]  h-full flex items-center justify-center border-b border-r border-[#3F3F3F] text-[#959595] hover:text-white">
          <p className=" text-[16px] font-normal">Download CV</p>
        </button>
      </div>
    </>
    );
}
