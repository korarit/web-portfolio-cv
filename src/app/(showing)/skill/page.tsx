'use client';
import Image from 'next/image'

import { useState , useEffect, use } from 'react';

import FrontawesomeIcon from '@/components/FrontawesomeIcon';
import LoadingBar from '@/components/LoadingBar';
import notFileSelectIcon from '@/assets/icon/not-file-select-2.svg';


export default function Home() {

  const listFiles = [
    'skill-data'
  ]

  const [selectedFile, setSelectedFile] = useState<number>(0);
  const [listOpenFile, setlistOpenFile] = useState<number[]>([0]);

  const addFileSelected = (file: number) => {
    if (listOpenFile.length === 0) {
      setSelectedFile(file);
    }
    if (!listOpenFile.includes(file)) {
      setlistOpenFile([...listOpenFile, file]);
    }
  }

  const [dataCache, setCache] = useState<{ [key: number]: any }>({});

  const setDataCache = (index: number, data: any) => {
    let temdata = dataCache ? { ...dataCache } : {}; // Ensure temdata is an object
    console.log('data to tem', data);
    temdata[index] = data;
    console.log('temdata', temdata);
    setCache(temdata);
    return temdata;
  };



  const loadingData = async (index : number) => {
    console.log('loading data');
    const res = await fetch(`/api/skill`);
    const data = await res.json();
    return data;
  }


  const [dataShowing, setDataShowing] = useState<any>(null);
  const getData = async (index: number) => {
    if (dataCache.hasOwnProperty(index) === false) {
      const data = await loadingData(index);
      console.log(data);
      const show_data = setDataCache(index, data.data.list_skill);
      setDataShowing(show_data);
    }else{
      setDataShowing(dataCache);
    }
  }
  useEffect(() => {
    getData(selectedFile);
  });

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  useEffect(() => {
    if (dataShowing !== null) {
      setDataLoading(true);
    }
  }, [dataShowing]);

  const [showing, setShowing] = useState<boolean>(false);
  const handleSuccess = () => {
    setTimeout(() => {setDataLoading(false);setShowing(true);}, 0);
  };

  

  const closeFile = (file: number) => {
    setlistOpenFile(listOpenFile.filter(number => number !== file));

    console.log('close file', file);
    console.log('listOpenFile', listOpenFile);

    //remove cache data
    delete dataCache[file];
    setCache(dataCache);

    if (listOpenFile.length === 0) {
      setSelectedFile(0);
    }

    //ถ้าปิดไฟล์ที่กำลังเปิดอยู่ ให้กลับที่ไฟล์ก่อนหน้าที่เปิด
    if (selectedFile === file) {

      const index = listOpenFile.indexOf(file);
      // เช็คว่ามีข้อมูลอยู่หลัง index หรือไม่
      if (index < listOpenFile.length - 1) {
        setSelectedFile(index + 1);
      } 
      // ถ้าไม่มีข้อมูลหลัง index ให้เช็คว่ามีข้อมูลอยู่ก่อนหน้า index หรือไม่
      else if (index > 0) {
        setSelectedFile(index - 1);
      } 

    }else{
      console.log('close file index not equel', file);
    }
  }

  return (
    <>
    <div className="flex h-full w-full">

      {/* sidebar */}
      <div className='flex-none flex flex-col w-[256px] h-full'>
        <div className='flex-none w-full border-b border-r border-[#3F3F3F] h-7 px-4 flex items-center gap-x-2'>
          <FrontawesomeIcon icon='fa-solid fa-caret-down' className='text-[16px] text-white' />
          <p className='text-[16px] text-white font-extralight leading-4'>../skill</p>
        </div>

        <div className='flex-auto w-full border-r border-[#3F3F3F] h-7 p-4 flex flex-col gap-y-3'>
          
          {listFiles.map((file, index) => (
            <button key={index} className='flex items-center gap-x-2' onClick={() => addFileSelected(index)}>
              <FrontawesomeIcon icon='fa-brands fa-markdown' className='text-[20px] text-[#A6A6A6]' />
              <p className='text-[14px] text-[#E2E2E2] font-extralight leading-[14px]'>{ file }.md</p>
            </button>
          ))}
        
        </div>
      </div>

      <div className='flex-auto flex flex-col h-full'>

        {/* file open list */}
        {listOpenFile.length > 0 && (
        <div className='flex-none flex h-7'>

          {listOpenFile.map((file, index) => (
            <div key={index} onClick={() => setSelectedFile(file)} className={file === selectedFile ? 'flex-none w-fit h-full border-b-0 border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer' : 'flex-none w-fit h-full border-b border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer'}>
              <p className='text-[14px] text-[#959595] font-normal leading-[14px]'>{ listFiles[file] }.md</p>
              <button title='d' tabIndex={5} onClick={(event) =>{event.stopPropagation();closeFile(file)}}>
                <FrontawesomeIcon icon='fa-solid fa-xmark' className='text-[20px] text-[#959595] hover:text-white' />
              </button>
            </div>
          ))}


          <div className='flex-auto  border-b border-[#3F3F3F]'>
          </div>

        </div>
        )}
        

        {/* content */}
        <div className=' w-full h-full flex-auto flex flex-col overflow-y-auto'>
          {listOpenFile.length < 1 ? (
            <div className='flex items-center justify-center h-full w-full'>
              <div className='flex flex-col gap-y-2'>
                <Image src={notFileSelectIcon}  alt='not file select' className='w-[72px] text-black mx-auto' />
                <p className='text-[20px] text-[#959595] font-normal'>Select a file to view</p>
              </div>
              
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
            <div className='p-4 h-full'>

              {showing !== false && dataShowing !== null && Array.isArray(dataShowing[selectedFile])  ? (
                <div className='min-h-full overflow-y-auto grid grid-cols-12 grid-flow-row blur-to-focus'>
                  {dataShowing[selectedFile].map((skill: any, index: number) => (
                    <div key={index} className='col-start-2 col-span-10 flex flex-col h-fit mb-16 last:mb-8'>
                      <div className='grid grid-cols-10'>
                        <div className='col-start-2 col-span-9 '>
                        <p className='text-[32px] text-[#E2E2E2] font-normal w-fit leading-8'>{skill.title}</p>
                        </div>
                      </div>
                      
                      <div className='w-full h-px bg-[#4D4D4D] my-3'></div>

                      <div className='grid grid-cols-10'>
                        <div className='col-start-2 col-span-8 grid grid-cols-10 gap-x-4 gap-y-5'>
                        {skill.skills.map((item: any, index: number) => (
                          <div key={index} className='group col-span-2 w-full p-1 flex gap-x-3 overflow-hidden rounded-lg bg-[#1514146d] border border-[#3e3e3e] hover:border-[#878787] hover:bg-[#121212a0] transition  backdrop-blur-md'>
                            <div className='w-[30%] h-auto bg-[#f8f8f4] rounded-md overflow-hidden'>
                              <Image src={item.img_path} width={79} height={79} alt={item.name} className='object-cover object-center w-full h-full' />
                            </div>
                            <div className='w-[70%] h-full flex items-center'>
                              <p className='xl:text-[12px] 2xl:text-[16px] select-none text-[#ffffff] font-normal leading-[14px] text-nowrap'>{item.name}</p>
                            </div>
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>
                  ))
                  }
                </div>
              ) : (
                <div className='flex items-center justify-center h-full w-full'>
                  <div className='flex flex-col w-[30%]'>
                    <p className='text-[20px] text-[#959595] font-normal text-center'>Loading...</p>
                    <div className='h-4 w-full'>
                      <LoadingBar isLoading={dataLoading} successFunc={handleSuccess} />
                    </div>
                    
                  </div>

                </div>
              )}
              </div>
            </div>  
          )}
          </div>
        </div>
    </div>
    </>
  );
}
