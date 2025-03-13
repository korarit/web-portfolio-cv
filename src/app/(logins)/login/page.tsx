

import Image from 'next/image'
import { redirect } from 'next/navigation'

import { auth } from "@/lib/auth"
import OTP from './_components/OTP'
import blueblur from '@/assets/bg/blue-blur.svg'
import greenblur from '@/assets/bg/green-blur.svg'





export default async function Home() {

  const session = await auth()
  if (session) {
    return redirect('/')
  }

  return (
    <>
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-fit w-fit flex gap-x-14 items-center justify-center fade-zoom-in">
        
        {/* Hello Text */}
        <div className="h-fit w-fit flex flex-col gap-y-12">


          {/* Image */}
          <div className="w-fit p-20 relative">
            <div className='absolute left-1/2 transform top-1/2 -translate-y-1/2   -translate-x-1/2 z-10'>
              <OTP />
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
