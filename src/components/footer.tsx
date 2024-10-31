"use client";

import Link from "next/link";
import FrontawesomeIcon from '@/components/FrontawesomeIcon';


import { useState , useEffect } from "react";

export default function Footer() {

  
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const getContact = await fetch('/api/contact_at')
      const GetJson = await getContact.json()
      setData(GetJson.data.list_contact)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="flex-none h-[50px] w-full flex border-t border-[#3F3F3F]">
        <div className="flex-none h-full flex items-center px-4 border-r border-[#3F3F3F]">
          <p className="text-[#959595] text-[16px] font-normal">Contact Me at:</p>
        </div>
        {data.map((item: { name: string; link: string; icon: string; }, index:number) => (
          <Link key={index} href={item.link} target='_blank' className="flex-none h-full px-4 flex items-center border-r border-r-[#3F3F3F] text-[#959595] hover:text-white">
            <FrontawesomeIcon icon={item.icon} className='text-[24px]' />
          </Link>
        ))}

        <div className="flex-auto h-full flex items-center border-r border-[#3F3F3F]">
        </div>

        <Link href="https://github.com/korarit" target='_blank' className="flex-none w-[148px] xl:w-[10%] h-full flex items-center justify-center space-x-2 border-r border-[#3F3F3F] text-[#959595] hover:text-white">
          <p className="text-[16px] font-normal">@Korarit</p>
          <FrontawesomeIcon icon="fa-brands fa-github" className='text-[24px]' />
        </Link>
      </div>
    </>
  );
}
