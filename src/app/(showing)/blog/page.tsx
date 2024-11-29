'use client';
import Link from 'next/link';
import Image from 'next/image'

import { useState , useEffect } from 'react';

import FrontawesomeIcon from '@/components/FrontawesomeIcon';
import LoadingBar from '@/components/LoadingBar';


export default function Home() {

  const [allSelect, setAllSelect] = useState<boolean>(true);
  const [listTopics, setListTopics] = useState<{ [key: string]: any }|null>(null);

  const loadTopics = async () => {
    const res = await fetch(`/api/blog/topic`);
    const datas = await res.json();
    const data = datas.data;
    //สร้าง list ของ topic ที่มีการเลือก โดยที่ id ของ topic จะเป็น index ของ list
    let temdata: { [key: string]: any } = {}
    data.list.forEach((file: any, index: number) => {
      temdata[file['id']] = { ...file, select: true };
    });
    console.log('temdata', temdata);
    setListTopics(temdata);
  };
  useEffect(() => {
    loadTopics();
  }, []);

  ////////////////// โหลดข้อมูล topic //////////////////
  const [TopicsShowing, setTopicsShowing] = useState<boolean>(false);
  const [loadingTopics, setLoadingTopics] = useState<boolean>(false);
  useEffect(() => {
    if (listTopics !== null) {
      setLoadingTopics(true);
    }
  }, [listTopics]);

  const handleTopicsShowing = () => {
    setTimeout(() => {setTopicsShowing(true);setLoadingTopics(false);}, 10);
  }


  //ดูว่ามีการเลือกทั้งหมดหรือไม่
  useEffect(() => {
    if (allSelect) {
      const new_data:{ [key: string]: any }  = {}

      for (let key in listTopics) {
        new_data[key] = { ...listTopics[key], select: true };
      }

      console.log('temdata all select', new_data);
      setListTopics(new_data);
    }else{
      //ดูว่า list topic ถูกเลือกหมดหรือไม่
      if (listTopics !== null && Object.keys(listTopics).every((file: any) => listTopics[file].select === true)) {
        
        const new_data: { [key: string]: any } = {}

        for (let key in listTopics) {
          new_data[key] = { ...listTopics[key], select: false };
        }
        console.log('temdata not all select', new_data);
        setListTopics(new_data);
      }
    }
  }, [allSelect]);

  //ตรวจสอบว่า list topic ถูกเลือกหมดหรือไม่
  useEffect(() => {
    if (listTopics !== null && Object.keys(listTopics).every((obj: any) => listTopics[obj].select === true)) {
      if (allSelect === false) {
        setAllSelect(true);
      }
    }else{
      setAllSelect(false);
    }

  }, [listTopics]);


  const setSelectTopic = (index: number) => {
    let temdata = listTopics ? {...listTopics} : {};
    temdata[index].select = !temdata[index].select;
    setListTopics(temdata);
  }

  const [dataShowing, setDataShowing] = useState<any>(null);

  const [cache_list, setCacheList] = useState<any|null>(null);

  const loadingData = async (fileName: string) => {
    console.log('loading data');
    const res = await fetch(fileName);
    const data = await res.json();
    return data;
  };

  // โหลดข้อมูลเมื่อเริ่มต้น
  useEffect(() => {
    const fetchData = async () => {
      const data = await loadingData(`/api/blog`);
      const datas = data.data.list;
      setCacheList(datas);
      setDataShowing(datas);
    };
    fetchData();
  },[]);


  ////////////////// โหลดข้อมูล blog list //////////////////
  const [BlogShowing, setBlogShowing] = useState<boolean>(false);
  const [LoadingBlog, setLoadingBlog] = useState<boolean>(false);
  useEffect(() => {
    if (dataShowing !== null) {
      setLoadingBlog(true);
    }
  }, [dataShowing]);

  const handleBlogShowing = () => {
    setTimeout(() => {setBlogShowing(true);setLoadingBlog(false);}, 10);
  }


  // เมื่อมีการเลือก topic ใหม่
  useEffect(() => {
    if (cache_list === null) return;
    if (listTopics === null) return;
    let filteredDataCache: { [key: string]: any } = {};

    Object.keys(cache_list).forEach((key) => {
      const item = cache_list[key];
      if (item.blog_topics.some((item:any) => listTopics[item.id] && listTopics[item.id].select)) {
        filteredDataCache[key] = item;
      }
    });

    console.log("Filtered data:", filteredDataCache); // แสดงข้อมูลที่กรองแล้ว

    setDataShowing(filteredDataCache); // ตั้งค่า dataShowing ใหม่ โดยกรองข้อมูลจาก data_list 
  }, [listTopics]);

  useEffect(() => {
    console.log("Updated dataShowing:", dataShowing); // จะเรียกเมื่อ dataShowing อัพเดต
  }, [dataShowing]);

  return (
    <>
    <div className="flex h-full w-full">

      {/* sidebar */}
      <div className='flex-none flex flex-col w-[256px] h-full'>
        <div className='flex-none w-full border-b border-r border-[#3F3F3F] h-7 px-4 flex items-center gap-x-2'>
          <FrontawesomeIcon icon='fa-solid fa-caret-down' className='text-[16px] text-white' />
          <p className='text-[16px] text-white font-extralight leading-4'>../blog</p>
        </div>

        <div className='flex-auto w-full border-r border-[#3F3F3F] h-7 p-4 '>
          {TopicsShowing && listTopics !== null && Object.keys(listTopics).length > 0 ? 
          (
          <div className='flex flex-col gap-y-3 blur-to-focus'>
            <label className='flex items-center gap-x-2'>
              <input type="checkbox" checked={allSelect} onChange={() => setAllSelect(!allSelect)} className="peer w-5 h-5 bg-transparent border border-[#4D4D4D] rounded-sm checked:bg-[#4D4D4D] focus:ring-0 focus:ring-transparent checked:focus:!bg-[#4D4D4D] checked:hover:!bg-[#4D4D4D] hover:!bg-transparent" />
              <span className="text-[16px] leading-4 text-[#959595] peer-checked:text-white">All Topics</span>
            </label>
              {Object.keys(listTopics).map((obj:any) => (
                  <label key={obj} className='flex items-center gap-x-2'>
                      <input type="checkbox" checked={listTopics[obj].select} onChange={() => setSelectTopic(obj)} className="peer w-5 h-5 bg-transparent border border-[#4D4D4D] rounded-sm checked:bg-[#4D4D4D] focus:ring-0 focus:ring-transparent checked:focus:!bg-[#4D4D4D] checked:hover:!bg-[#4D4D4D] hover:!bg-transparent" />
                      <span className="text-[16px] leading-4 text-[#959595] peer-checked:text-white">{`${listTopics[obj].name}`}</span>
                  </label>
              ))}
          </div>) 
          : (
            <div className='flex items-center justify-center h-full w-full'>
              <div className='w-[90%] flex flex-col'>
                <p className='text-[20px] text-[#959595] font-normal'>Loading...</p>
                <div className='h-4 w-full'>
                  <LoadingBar isLoading={loadingTopics} successFunc={handleTopicsShowing} />
                </div>
              </div>
            </div>
          )}
        
        </div>
      </div>

      <div className='flex-auto flex flex-col h-full'>

        {/* file open list */}
        <div className='flex-none flex h-7'>

          <div className='flex-none w-fit h-full border-b-0 border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer'>
            <p className='text-[14px] text-[#959595] font-normal leading-[14px]'>list-blog.md</p>
          </div>


          <div className='flex-auto  border-b border-[#3F3F3F]'>
          </div>

        </div>
        

        {/* content */}
        <div className=' w-full h-full flex-auto flex flex-col overflow-y-auto'>
            <div className="w-full h-full overflow-y-auto">
            <div className=' h-full max-h-full overflow-y-auto'>
                {BlogShowing && dataShowing !== null && Array.isArray(Object.keys(dataShowing)) ? (
                <div className='grid grid-cols-12 gap-x-10 gap-y-8 grid-flow-row p-4 blur-to-focus'>
                    {Object.keys(dataShowing).map((obj:string) => (
                      <div key={obj} className='col-span-4 flex flex-col h-auto  rounded-lg overflow-hidden'>
                        <div className='px-1 w-full flex items-center mb-2 gap-x-2'>
                          <p className='text-[16px] leading-4 text-[#959595] font-normal'>//</p>
                          {dataShowing[obj].blog_topics.map((item:any,index:number) => (
                            <p key={index} className='text-[16px] leading-4 text-[#959595] font-normal'>{item.name};</p>
                          ))}
                        </div>
                        
                        <div key={obj} className='w-full h-full flex flex-col border border-[#4D4D4D] rounded-lg overflow-hidden'>
                          <div className='w-full h-[70%]'>
                          <Image src={dataShowing[obj].img_banner} width={500} height={350} alt={dataShowing[obj].name} className='object-cover h-[100%] w-full' />
                          </div>
                          <div className='min-h-[30%] h-fit flex flex-col gap-y-1 py-5 px-4 justify-center border-t border-[#4D4D4D] bg-[#1B1B1B]'>
                            <div className='w-full flex items-center justify-between'>
                              <p className='xl:text-[18px] 2xl:text-[20px] text-[#E2E2E2] font-normal w-fit leading-8'>{dataShowing[obj].name}</p>
                              <Link href={dataShowing[obj].link} target='_blank'>
                                <FrontawesomeIcon icon='fa-solid fa-arrow-right-from-bracket' className='xl:text-[18px] 2xl:text-[20px] text-[#959595] hover:text-[#E2E2E2] -rotate-45' />
                              </Link>
                            </div>
                            <div className='flex gap-x-3'>
                              <div className='px-2 py-1 bg-[#353535] rounded-md flex gap-x-1 items-center'>
                                <FrontawesomeIcon icon='fa-solid fa-eye' className='text-[#faf8f8]' />
                                <p className='xl:text-[12px] 2xl:text-[14px] text-[#faf8f8] font-normal'>{dataShowing[obj].view_count}+</p>
                              </div>
                              {dataShowing[obj].share_count > 0 && (
                              <div className='px-2 py-1 bg-[#353535] rounded-md flex gap-x-1 items-center'>
                                <FrontawesomeIcon icon='fa-solid fa-share-nodes' className='text-[#faf8f8]' />
                                <p className='xl:text-[12px] 2xl:text-[14px] text-[#faf8f8] font-normal'>{dataShowing[obj].share_count}+</p>
                              </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    }
                </div>
                ) : (
                  <div className='flex items-center justify-center h-full w-full'>
                    <div className='w-[30%] flex flex-col'>
                      <p className='text-[20px] text-[#959595] font-normal text-center'>Loading...</p>
                      <div className='h-4 w-full'>
                        <LoadingBar isLoading={LoadingBlog} successFunc={handleBlogShowing} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>  
        </div>
      </div>
    </div>
    </>
  );
}
