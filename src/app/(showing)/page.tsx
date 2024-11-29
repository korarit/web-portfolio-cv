'use client';
import Link from 'next/link';
import Image from 'next/image'

import { useState , useEffect } from 'react';

import { TypeAnimation } from 'react-type-animation';

import FrontawesomeIcon from '@/components/FrontawesomeIcon';


import blueblur from '@/assets/bg/blue-blur.svg'
import greenblur from '@/assets/bg/green-blur.svg'

export default function Home() {

  const [listSeeProject, setSeeProject] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const getContact = await fetch('/api/contact_at?project=true')
      const GetJson = await getContact.json()
      console.log(GetJson)
      setSeeProject(GetJson.data.list)
    }
    fetchData()
  }, [])
  return (
    <>
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-fit w-fit flex gap-x-14 items-center justify-center fade-zoom-in">
        
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
                    5000,
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
            {listSeeProject.map((item: { name: string; link: string; icon: string; }, index:number) => (
              <p className="text-[16px] font-normal leading-4" key={index}>
                <span className='text-[#4D5BCE]'>const</span>&nbsp;
                <span className='text-[#3499e1]'>{item.name}</span>
                <span className='text-[#959595]'> = </span>
                <Link href={item.link} target='_blank' className='text-[#E99287] cursor-pointer'>"<u>{item.link.replace('https://','')}</u>"</Link>
              </p>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="h-[500px] w-[350px] relative">
          <div className="absolute z-50 h-[500px] w-[350px] bg-[#4D5BCE] rounded-lg border border-[#3F3F3F] overflow-hidden">
            <Image src="/img/me-profile.jpg" height={500} width={350} alt="Korarit" className='object-cover object-center' />
          </div>
          <div className='absolute -top-[160px] left-1/2 transform -translate-x-1/2 w-[700px] z-0 select-none'>
            <Image src={blueblur} height={500} width={800} alt="blue-blur" className='object-cover object-center'/>
          </div>
          <div className='absolute -bottom-[160px] left-1/2 transform -translate-x-1/2 w-[700px] z-0 select-none'>
            <Image src={greenblur} height={500} width={800} alt="blue-blur" className='object-cover object-center'/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
