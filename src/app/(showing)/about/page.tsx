'use client';
import Link from 'next/link';
import Image from 'next/image'

import FrontawesomeIcon from '@/components/FrontawesomeIcon';


export default function Home() {
  return (
    <>
    <div className="flex h-full w-full">

      {/* sidebar */}
      <div className='flex-none flex flex-col w-[256px] h-full'>
        <div className='flex-none w-full border-b border-r border-[#3F3F3F] h-7 px-4 flex items-center gap-x-2'>
          <FrontawesomeIcon icon='fa-solid fa-caret-down' className='text-[16px] text-white' />
          <p className='text-[16px] text-white font-extralight leading-4'>../about</p>
        </div>

        <div className='flex-auto w-full border-r border-[#3F3F3F] h-7 p-4 flex flex-col gap-y-3'>
          
          <div className='flex items-center gap-x-2'>
            <FrontawesomeIcon icon='fa-brands fa-markdown' className='text-[20px] text-[#A6A6A6]' />
            <p className='text-[14px] text-[#E2E2E2] font-extralight leading-[14px]'>persona-data.md</p>
          </div>
        
        </div>
      </div>

      <div className='flex-auto flex flex-col'>

        {/* file open list */}
        <div className='flex-none flex h-7'>
          <div className='flex-none w-fit h-full border-b-0 border-r border-[#3F3F3F] px-4 flex items-center gap-x-12'>
            <p className='text-[14px] text-[#959595] font-normal leading-[14px]'>persona-data.md</p>
            <FrontawesomeIcon icon='fa-solid fa-xmark' className='text-[20px] text-[#959595]' />
          </div>

          <div className='flex-auto  border-b border-[#3F3F3F]'>
          </div>

        </div>

        {/* content */}
        <div className='flex-auto flex flex-col w-full h-full'>
        </div>

      </div>

    </div>
    </>
  );
}
