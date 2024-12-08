'use client';
import Link from 'next/link';
import Image from 'next/image'

import {useRef} from 'react';

import FrontawesomeIcon from '@/components/FrontawesomeIcon';


export default function Home() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLElement | null>(null);
  const educationRef = useRef<HTMLElement | null>(null);


  const handleScroll = (ref: React.RefObject<HTMLElement> | null) => {
    const element = ref?.current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          
          <button onClick={() => handleScroll(aboutRef)} className='group flex items-center gap-x-2'>
            <FrontawesomeIcon icon='fa-brands fa-markdown' className='text-[20px] text-[#A6A6A6] group-hover:text-white' />
            <p className='text-[14px] text-[#E2E2E2] group-hover:text-white font-extralight leading-[14px]'>fact-of-me.md</p>
          </button>

          <button onClick={() => handleScroll(timelineRef)} className='group flex items-center gap-x-2'>
            <FrontawesomeIcon icon='fa-brands fa-markdown' className='text-[20px] text-[#A6A6A6] group-hover:text-white' />
            <p className='text-[14px] text-[#E2E2E2] group-hover:text-white font-extralight leading-[14px]'>timeline-to-dev.md</p>
          </button>

          <button onClick={() => handleScroll(educationRef)} className='group flex items-center gap-x-2'>
            <FrontawesomeIcon icon='fa-brands fa-markdown' className='text-[20px] text-[#A6A6A6] group-hover:text-white' />
            <p className='text-[14px] text-[#E2E2E2] group-hover:text-white font-extralight leading-[14px]'>education.md</p>
          </button>
        
        </div>
      </div>

      <div className='flex-auto flex flex-col'>

        {/* file open list */}
        <div className='flex-none flex h-7'>
          <div className='flex-none w-fit h-full border-b-0 border-r border-[#3F3F3F] px-4 flex items-center gap-x-12'>
            <p className='text-[14px] text-[#959595] font-normal leading-[14px]'>about-me.md</p>
          </div>

          <div className='flex-auto  border-b border-[#3F3F3F]'>
          </div>

        </div>

        {/* content */}
        <div className='flex-auto flex flex-col gap-y-8 overflow-auto w-full max-h-full p-4 focus:border-0'>

          {/* fact of me*/}
          <section ref={aboutRef} className='flex-none w-full h-full relative'>
            <div className='w-full h-full flex items-center justify-center'>
              <div className='w-[30%] p-6 2xl:p-9 h-full flex items-center justify-end'>
              <Image src="/img/me-profile.jpg" height={500} width={350} alt="Korarit" className='object-cover object-center w-full h-auto rounded-xl' />
              </div>
              <div className='w-[65%] 2xl:w-[55%] h-full p-6 2xl:p-9 flex items-center'>
                <div className=' h-fit'>
                  <p className="text-[16px] font-normal text-white leading-4">Hi All. I am Korarit</p>
                  <p className="text-[28px] font-normal text-white leading-12">จากเด็กที่หาทางเล่นเกม สู่เส้นทาง Developer</p>

                  <p className="xl:text-base 2xl:text-[18px] font-normal text-[#b0b0b0] leading-5">
                    จุดเริ่มต้นของผม มาจากสมัยช่วงประมาณ ป. 2-3 ผมติด Youtuber Notebook ของผมในตอนนั้น Spec มันก็ไม่ดีเท่าไหร่โหลด Minecraft 
                    มาเล่นได้แล้ว FPS 10 Frame ซึ่งมันเล่นไม่ไหวเลยเลยเริ่มศึกษาหาทาง Setting ให้ Windows XP เล่นเกมได้ลื่นขึ้นแต่ก็ยังเล่นไม่ไหวอยู่ดี 55555 
                    ก็เลยสนใจด้านคอมพิวเตอร์มากขึ้น ศึกษาไปหลาย ๆ เรื่องในตอนนั้นจุดใกล้เคียง Devlopper ในตอนนั้นประถมคือทำเว็บไซต์ด้วย google site 
                    กับได้รู้จักโปรแกรม Dreamweaver และภาษา HTML และ CSS แต่ด้วยอุปกรณ์ไม่ค่อยสนองเท่าไรเลยหันไปเป็น Youtuber เล่นเกมแทน !
                  </p>

                  {/* blockquote */}
                  <blockquote className="p-4 my-4 border-l-4 border-[#9595958c]">
                      <p className="xl:text-base 2xl:text-[18px] font-medium text-[#959595]">
                        ช่วงประถมผมค้นหาตัวเองหลายอย่าง ทำ Youtube แคสเกม,ประกวดร้องเพลง,แข่งทำหนังสั้น แต่รู้ว่าสิ่งที่ถนัดมักเกี่ยวกับคอมพิวเตอร์
                        ช่วงประถมตอนปลาย กับ มัธยม ผมเหมือน IT Support ยังไงก็ไม่รู้อาจจะเพราะเรียกใช้ง่ายมั้ง ไม่ต้องเกรงใจ ไม่ว่าจะเป็นเพื่อนหรือครู
                      </p>
                  </blockquote>

                </div>
              </div>
            </div>

            <button onClick={() => handleScroll(timelineRef)} title='d' className='absolute left-1/2 transform -translate-x-1/2 bottom-0 rounded-full w-7 h-7 bg-[#5d5c5c] border border-[#1b1a1a] flex items-center justify-center animate-bounce'>
              <FrontawesomeIcon icon='fa-solid fa-arrow-down' className=' text-[18px] text-[#d6d6d6]' />
            </button>
          </section>


          {/* timeline of me */}
          <section ref={timelineRef} id="timeline" className='flex-none w-full flex justify-center min-h-full'>
          <div className='w-[95%] 2xl:w-[85%]'>

            <p className="text-[28px] font-medium text-white leading-12 my-2">Timeline ของจุดเริ่มของสู่เส้นทาง Developer</p>

            <div className="ps-2 my-2 first:mt-0">
              <h3 className="text-sm font-medium uppercase  text-[#e5e5e5]">
                2557 โรงเรียนไชยะวิทยา ตอน ประถม
              </h3>
            </div>

            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-2xl text-white">
                  เว็บไซต์ เด็กไซยะวิทยาสร้าง
                </h3>
                <p className="mt-1 text-base text-[#bdbdbd]">
                  ในช่วงประถมประมาณ ป.4 ผมเริ่มศึกษาเกี่ยวคอมพิวเตอร์อย่างจริงจังมากขึ้นด้วยตัวเองผ่าน Youtube โดยเริ่มต้นจากการสร้างเว็บไซต์ด้วย Google Site 
                  โดยตอนนั้นเน้นไปที่อัพเดตข่าวสารพยากรณ์ ความรู้ เริ่มศึกษาตัวโปรแกรม Dreamweaver และได้รู้จักภาษา HTML และ CSS แต่ไม่ได้มีความใจเท่าไร
                  เลิกศึกษาไปก่อน เนืองจากอุปกรณ์ไม่อำนวยเท่าไร ทำแล้วรู้สึกทรมานกับ Notebook ตัวเองในตอนนั้น
                </p>
              </div>
            </div>    

            <div className="ps-2 my-2 first:mt-0">
              <h3 className="text-sm font-medium uppercase  text-[#e5e5e5]">
                2561 โรงเรียนสรรค์อนันต์วิทยา ตอน มัธยมต้น
              </h3>
            </div>

            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-2xl text-white">
                  การกลับเป็นเด็กติดเกม และจุดเริ่มต้นของการทำเกม Server
                </h3>
                <p className="mt-1 text-base text-[#bdbdbd]">
                  ตอนคาบเกี่ยว ป.6 กับ ม.1 ผมได้คอมพิวเตอร์ตั้งโต๊ะใหม่ที่เป็นการมาจากการเก็บเงินของตัวเอง ตอนนั้นผมได้รู้จักกับเกม ๆ หนึ่งชื่อว่า Arma 3 ก็เล่นไปเรื่อย ๆ จนสนใจด้านการเขียน Script (Plugin) ของเกมนั้น 
                  และเริ่มศึกษาการเขียนเลย ได้รู้จักพวก if else, loop, function ตั้งแต่
                  ช่วง ม.1 จะขึ้น ม.2 เนื่องจากเกม Arma 3 และ Minecraft PE ผมอยากทำเซิฟเวอร์ community ในการศึกษามีน้อยสิ่งที่ทำได้คือแกะ Script ที่มีตาม Github หรือแจกตาม board
                  มีโอกาสได้ใช้ Linux Ubuntu Server ในตอนนั้น และได้มีโอกาสทำ Game Launcher ด้วยภาษา VB.net รวมถึงได้ลองเล่น SQL นิดหน่อย
                </p>
              </div>
            </div>

            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-2xl text-white">
                  มีโอกาสได้เรียน HTML Python
                </h3>
                <p className="mt-1 text-base text-[#bdbdbd]">
                  ตอนช่วง ม.2 เทอม 1 ผมได้มีโอกาสเรียน HTML ซึ่งว่ากันตามตรงผมรู้มาก่อนว่าจะเจอเลยไปเรียนรู้ก่อน ผมได้โชว์ขีดความสามารถของตัวเองในช่วงนั้นเยอะมากจนครูชวนไปแข่งภาษา C
                  ซึ่งผมก็มีโอกาสได้ไปเรียนกับ W3 School ในห้องพักครูอยู่ 3 อาทิตย์ ได้ใช้คำสั่ง if else printf แล้วผมก็เลยชิงหนี 555555 และครูก็มาชวนอีกที่ตอน ม.3 ซึ่งผมปฎิเสธไปเนื่องจาก
                  มีเรื่องให้ Focus อย่างการต่อ ม.ปลาย และบอกไปว่า ม.4 ผมน่าจะมาแข่งครับ เพราะจะได้เอาไปใช้ในการยื่นมหาวิทยาลัย สรุปเจอ Covid-19 ไป
                </p>
              </div>
            </div>

            <div className="ps-2 my-2 first:mt-0">
              <h3 className="text-sm font-medium uppercase  text-[#e5e5e5]">
                2563 โรงเรียนสรรค์อนันต์วิทยา ตอน มัธยมปลาย
              </h3>
            </div>

            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-2xl text-white">
                  Covid-19 และ Web Application ตัวแรก
                </h3>
                <p className="mt-1 text-base text-[#bdbdbd]">
                  ช่วง ม.4 ผมเริ่มสนใจเรื่อง Web Application แบบ Full-Stack เนื่องจากตอนนั้นผมมีพื้นฐานภาษา PHP ที่ได้จากการทำ Script เกม Minecraft PE 
                  มาพอสมควร จึ่งเริ่มทำเว็บไซต์ ซึ่ง ณ ตอนนั้นก็ทำเว็บไซต์แสดงสถานการณ์ Covid ได้รู้จัก API และ JSON รวมทั้ง Javascript , bootstrap และเทคนิค
                  Web Scraper
                </p>
              </div>
            </div>

            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-2xl text-white">
                  LineBot ตัวแรก และ ตัวที่ 2 - 3
                </h3>
                <p className="mt-1 text-base text-[#bdbdbd]">
                  โดย Line Bot (OA) ตัวแรกเป็น Line เกี่ยวกับ รายงานพยากรณ์อากาศใช้ภาษา Python พัฒนา เริ่มได้รู้จักกับ Framework
                  ชื่อ Flask และตอนนั้นเริ่มสนใจเกี่ยวกับ AI จำพวก NLP มากขึ้น และตัวที่ 2 ใช้ชื่อว่า TheStepKla concept เป็นผู้ช่วยส่วนตัวทำหลาย ๆ อย่างได้เช่นตรวจหวย และอื่น ๆ อีก 4-5อย่าง ส่วนตัวที่ 3 ทำระบบ Line OA สำหรับโรงเรียน ตัวโปรเจคค่อยข้างใหญ่วาดภาพสุดท้ายก็คือ ERP ของ โรงเรียนเลย แต่ไปไม่ถึงทำไม่ทันแข่ง
                  ศิลปหัตกรรมนักเรียนระดับจังหวัดได้ที่ 2 ตอนนี้พับไว้ก่อน ตัวนี้มีการเอา NLP อย่าง Google Dialogflow มาใช้
                </p>
              </div>
            </div>


            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-2xl text-white">
                  ค่าย Gamer To Coder ของ Garena Thailand
                </h3>
                <p className="mt-1 text-base text-[#bdbdbd]">
                  ตอนช่วงปิดเทอม ม.6 เทอม 1 เข้าเทอม 2 ผมได้มีโอกาสเข้าค่าย Online ของ Garena Thailand โดยตอนนั้นได้เรียนรู้เกี่ยวกับ HTML , CSS
                   , Javascript , Responsive , Gitมีโอกาสได้ฟังประสบการณ์ของพี่ที่ทำระบบให้เกม ROV พร้อมกับรู้ว่าในประเทศไทย มีคนเก่ง ๆ อีกมากมาย
                </p>
              </div>
            </div>

            <div className="ps-2 my-2 first:mt-0">
              <h3 className="text-sm font-medium uppercase  text-[#e5e5e5]">
                2566 มหาวิทยาลัยพะเยา
              </h3>
            </div>

            <div className="flex gap-x-3">
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-2xl text-white">
                  การเดินทางมาถึงจุดที่ใกล้จะเป็นอาชีพ
                </h3>
                <p className="mt-1 text-base text-[#bdbdbd]">
                  นี่คือผมในปัจจุบัน ที่เน้นการใฝ่เรียนรู้ด้วยตัวเองเหมือนกับจุดเริ่มต้นของตัวเองเหมือนเดิม แต่ที่เพิ่มเติมมาคือความสามารถที่มากขึ้นเรื่อย ๆ ผม ณ ตอนนี้กำลังเรียนรู้ และในการทำ
                  โปรเจคของผมก็จะเน้นให้งานสามารถใช้งานได้จริง ๆ พร้อมที่จะใช้งานมากที่สุด ทำเท่าที่คิดว่าตัวเองทำได้ พยายามทะลุขีดจำกัดในความรู้ของตัวเอง เพื่อให้เกิดการเรียนรู้สิ่งใหม่ ๆนอน
                </p>
              </div>
            </div>
            
          </div>

          </section>


          {/* section การศึกษา educaton */}
          <section ref={educationRef} className='flex-none w-full h-fit flex justify-center'>
            <div className='w-[95%] 2xl:w-[85%]'>

              <p className="text-[28px] font-medium text-white leading-12 my-2">การศึกษา</p>

              <div className='flex gap-x-8'>

                <div className='group w-1/2 p-4 flex flex-col gap-y-6 rounded-md border border-[#3e3e3e] hover:border-[#878787] bg-[#1514146d] hover:bg-[#121212a0] transition  backdrop-blur-md'>
                  <div className='w-full flex items-center gap-x-4'>
                    <div className='w-[10%]'>
                      <Image src="/img/logo-university-up.svg" height={200} width={200} alt="Korarit" className='object-cover object-center w-full h-auto rounded-full' />
                    </div>
                    <div className='w-[90%] flex flex-col'>
                      <p className='text-[28px] text-[#E2E2E2] font-normal w-fit leading-8'>สาขาวิศวกรรมซอฟต์แวร์</p>
                      <p className='text-[16px] text-[#b0b0b0] font-normal'>คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา</p>
                    </div>
                  </div>

                  <div className='flex gap-x-4'>
                    <div className='w-fit px-3 py-1  rounded-xl border border-[#3e3e3e] bg-[#1514146d] group-hover:bg-[#353535a0] transition  backdrop-blur-md'>
                      <p className='text-[16px] text-[#E2E2E2] font-light w-fit leading-5'>2023 - ปัจจุบัน</p>
                    </div>

                    <div className='w-fit px-3 py-1  rounded-xl border border-[#3e3e3e] bg-[#1514146d] group-hover:bg-[#353535a0] transition  backdrop-blur-md'>
                      <p className='text-[16px] text-[#E2E2E2] font-light w-fit leading-5'>GPAX 3.59</p>
                    </div>
                  </div>
                  
                </div>

                <div className='group w-1/2 p-4 flex flex-col gap-y-6 rounded-md border border-[#3e3e3e] hover:border-[#878787] bg-[#1514146d] hover:bg-[#121212a0] transition  backdrop-blur-md'>
                  <div className='w-full flex items-center gap-x-4'>
                    <div className='w-[13%]'>
                      <Image src="/img/logo-school-sw.png" height={200} width={200} alt="Korarit" className='object-cover object-center w-full h-auto rounded-full' />
                    </div>
                    <div className='w-[75%] flex flex-col'>
                      <p className='text-[28px] text-[#E2E2E2] font-normal w-fit leading-8'>แผนการเรียนศิลป-คำนวณ</p>
                      <p className='text-[16px] text-[#b0b0b0] font-normal'>โรงเรียนสรรค์อนันต์วิทยา จ.สุโขทัย</p>
                    </div>
                  </div>

                  <div className='flex gap-x-4'>
                    <div className='w-fit px-3 py-1  rounded-xl border border-[#3e3e3e] bg-[#1514146d] group-hover:bg-[#353535a0] transition  backdrop-blur-md'>
                      <p className='text-[16px] text-[#E2E2E2] font-light w-fit leading-5'>2020 - 2023</p>
                    </div>

                    <div className='w-fit px-3 py-1  rounded-xl border border-[#3e3e3e] bg-[#1514146d] group-hover:bg-[#353535a0] transition  backdrop-blur-md'>
                      <p className='text-[16px] text-[#E2E2E2] font-light w-fit leading-5'>GPAX 3.41</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>

    </div>
    </>
  );
}
