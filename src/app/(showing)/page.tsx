'use client';
import Link from 'next/link';
import Image from 'next/image'

import { TypeAnimation } from 'react-type-animation';

import FrontawesomeIcon from '@/components/FrontawesomeIcon';


export default function Home() {
  return (
    <>
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-fit w-fit flex gap-x-14 items-center justify-center">
        
        {/* Hello Text */}
        <div className="h-fit w-fit flex flex-col gap-y-12">

          <div className="h-fit w-fit flex flex-col gap-y-4">
            <p className="text-[20px] font-normal text-white leading-4">Hi All. I am</p>
            <p className="text-[48px] font-normal text-white leading-10">Korarit Saengthong</p>

            <div className="flex items-center gap-x-4">
              <FrontawesomeIcon icon="fa-solid fa-chevron-right" className='text-[28px] text-[#4D5BCE]' />
              <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed once, initially
                    'Software Engineer',
                    3000,
                    'Full-Stack Developer',
                    3000,
                    'Back-End Developer',
                    3000,
                    'Front-End Developer',
                    3000,
                  ]}
                  speed={50}
                  className='text-[24px] font-normal text-[#4D5BCE] leading-6'
                  repeat={Infinity}
                />
            </div>
          </div>

          <div className="h-fit w-fit flex flex-col gap-y-2">
            <p className="text-[16px] font-normal text-[#959595] leading-4">// you can also see my projects on</p>
            <p className="text-[16px] font-normal leading-4">
              <span className='text-[#4D5BCE]'>const</span>&nbsp;
              <span className='text-[#3499e1]'>github_link</span>
              <span className='text-[#959595]'> = </span>
              <Link href="https://github.com/korarit" target='_blank' className='text-[#E99287] cursor-pointer'>"<u>github.com/korarit</u>"</Link>
            </p>
            <p className="text-[16px] font-normal leading-4">
              <span className='text-[#4D5BCE]'>const</span>&nbsp;
              <span className='text-[#3499e1]'>linkedin_name</span>
              <span className='text-[#959595]'> = </span>
              <Link href="https://www.linkedin.com/in/korarit-saengthong/" target='_blank' className='text-[#E99287] cursor-pointer'>"<u>korarit-saengthong</u>"</Link>
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="h-[500px] w-[350px] bg-[#4D5BCE] rounded-lg border border-[#3F3F3F] overflow-hidden">
          <Image src="/img/me-profile.jpg" height={500} width={350} alt="Korarit" className='object-cover object-center' />
        </div>
      </div>
    </div>
    </>
  );
}
