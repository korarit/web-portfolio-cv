import Link from 'next/link';
import Image from 'next/image'



import FrontawesomeIcon from '@/components/FrontawesomeIcon';
import TypeAnimationComponent from '@/components/TypeAnimation';

import blueblur from '@/assets/bg/blue-blur.svg'
import greenblur from '@/assets/bg/green-blur.svg'

export default async function Home() {
  const getContact = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact_at?project=true`)
  const GetJson = await getContact.json()
  const listSeeProject: any[] = await GetJson.data.list

  return (
    <>
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-fit w-fit flex gap-x-14 items-center justify-center fade-zoom-in">
        
        {/* Hello Text */}
        <div className="h-fit w-fit flex flex-col gap-y-12">


          {/* Image */}
          <div className="w-fit p-20 relative">
            <div className='absolute left-1/2 transform top-1/2 -translate-y-1/2   -translate-x-1/2 z-10'>
              <div className='p-6 w-[480px] h-[240px] bg-[#1C1C1C] border border-[#4E4E4E] flex flex-col justify-between rounded-md'>
                <p className="text-[24px] text-center text-nowrap font-normal text-white leading-4">Login To Admin Dashboard</p>

                <p className="text-[16px] text-center text-[#959595] leading-4">กดปุ่มเพื่อให้ตัว OTP ส่งไป Discord</p>
              
                <div className='flex items-center justify-between gap-x-4'>
                  <FrontawesomeIcon icon="fa-solid fa-chevron-right" className='flex-none text-[18px] text-center text-[#959595]' />

                  <button className='flex-auto  bg-[#565656] hover:bg-[#585858] border border-[#606060] py-1 text-lg font-medium text-[#1C1C1C] rounded-md flex items-center justify-center'>
                    ขอ OTP จาก Discord
                  </button>
                </div>
              </div>
            </div>
            
            
            <div className='absolute -top-[160px]  left-1/2 transform -translate-x-1/2 w-[600px] z-0 select-none'>
              <Image src={blueblur} height={500} width={800} alt="blue-blur" className='object-cover object-center'/>
            </div>
            <div className='absolute -bottom-[160px] left-1/2 transform -translate-x-1/2 w-[600px] z-0 select-none'>
              <Image src={greenblur} height={500} width={800} alt="blue-blur" className='object-cover object-center'/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
