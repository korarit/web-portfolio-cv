'use client';
import Image from 'next/image'

import { useState , useEffect } from 'react';

import FrontawesomeIcon from '@/components/FrontawesomeIcon';


export default function Home() {

  const [allSelect, setAllSelect] = useState<boolean>(true);
  const [listTopics, setListTopics] = useState<{ [key: string]: any }>({});

  const loadTopics = async () => {
    const res = await fetch(`/data_test/list-poject-topic.json`);
    const data = await res.json();
    //สร้าง list ของ topic ที่มีการเลือก โดยที่ id ของ topic จะเป็น index ของ list
    let temdata: { [key: string]: any } = {}
    data.forEach((file: any, index: number) => {
      temdata[file['id']] = { ...file, select: true };
    });
    console.log('temdata', temdata);
    setListTopics(temdata);
  };
  useEffect(() => {
    loadTopics();
  }, []);

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
      if (Object.keys(listTopics).every((file: any) => listTopics[file].select === true)) {
        
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
    if (Object.keys(listTopics).every((obj: any) => listTopics[obj].select === true)) {
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

  const [selectViewListProject, setSelectViewListProject] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<number>(0);
  const [listOpenFile, setlistOpenFile] = useState<number[]>([]);

  const SetToViewListProject = () => {
    setSelectViewListProject(true);
    setSelectedFile(0);
  }


  const SetFileView = (index: number) => {
    setSelectedFile(index);
    if (selectViewListProject === true) {
      setSelectViewListProject(false);
    }
  }

  const addFileSelected = (file: number) => {
    if (listOpenFile.length === 0) {
      setSelectedFile(file);
    }
    if (!listOpenFile.includes(file)) {
      setlistOpenFile([...listOpenFile, file]);
    }
    SetFileView(file);
  }

  const [dataShowing, setDataShowing] = useState<any>(null);
  const [data_cache, setDataCache] = useState<any>(null);

  const loadingData = async (fileName: string) => {
    console.log('loading data');
    const res = await fetch(fileName);
    const data = await res.json();
    return data;
  };

  const getData = async (fileName: string) => {
    const data = await loadingData(String(fileName).toLowerCase());
    console.log("Loaded data:", data); // แสดงค่า data ที่โหลดมา

    setDataShowing(data); // ตั้งค่า dataShowing
    setDataCache(data); // ตั้งค่า data_cache
  };

  // เมื่อมีการเลือก topic ใหม่
  useEffect(() => {
    if (data_cache === null) return;
    let filteredDataCache: { [key: string]: any } = {};

    Object.keys(data_cache).forEach((key) => {
      const item = data_cache[key];
      if (item.topic_id.some((id: any) => listTopics[id] && listTopics[id].select)) {
        filteredDataCache[key] = item;
      }
    });

    console.log("Filtered data:", filteredDataCache); // แสดงข้อมูลที่กรองแล้ว

    setDataShowing(filteredDataCache); // ตั้งค่า dataShowing ใหม่ โดยกรองข้อมูลจาก data_cache 
  }, [listTopics])

  useEffect(() => {
    console.log("Updated dataShowing:", dataShowing); // จะเรียกเมื่อ dataShowing อัพเดต
  }, [dataShowing]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectViewListProject === true) {
        await getData('/data_test/list-project.json');
        console.log('dataShowing', dataShowing);
      } else {
        getData(listTopics[selectedFile].title);
      }
    };
    fetchData();
  }, [selectedFile, selectViewListProject]);


  const closeFile = (file: number) => {
    //ถ้าปิดไฟล์ที่กำลังเปิดอยู่ ให้กลับที่ไฟล์ก่อนหน้าที่เปิด
    const list_new = listOpenFile.filter((number) => number !== file);
    if (selectedFile === file) {
      const index = listOpenFile.indexOf(file);

      if (index >= 0) {
          
          setlistOpenFile(list_new);

          // Set the selected file to the next one if available
          if (index < list_new.length) {
              setSelectedFile(list_new[index]); // Next file in the list
          } 
          // If no next file, set it to the previous one if available
          else if (index - 1 >= 0) {
              setSelectedFile(list_new[index - 1]); // Previous file in the list
          } else {
              setSelectedFile(0); // No files left
          }
      }
    } else {
        
    }

    if (list_new.length === 0) {
      SetToViewListProject();
    }
    console.log('close file', file);
    console.log('listOpenFile', listOpenFile);


  }

  return (
    <>
    <div className="flex h-full w-full">

      {/* sidebar */}
      <div className='flex-none flex flex-col w-[256px] h-full'>
        <div className='flex-none w-full border-b border-r border-[#3F3F3F] h-7 px-4 flex items-center gap-x-2'>
          <FrontawesomeIcon icon='fa-solid fa-caret-down' className='text-[16px] text-white' />
          <p className='text-[16px] text-white font-extralight leading-4'>../projects</p>
        </div>

        <div className='flex-auto w-full border-r border-[#3F3F3F] h-7 p-4 flex flex-col gap-y-3'>
          {Object.keys(listTopics).length > 0 ? 
          (
          <>
          <label className='flex items-center gap-x-2'>
            <input type="checkbox" checked={allSelect} onChange={() => setAllSelect(!allSelect)} className="peer w-5 h-5 bg-transparent border border-[#959595] rounded-sm checked:bg-[#959595] focus:ring-0 focus:ring-transparent checked:focus:!bg-[#959595] checked:hover:!bg-[#959595] hover:!bg-transparent" />
            <span className="text-[16px] leading-4 text-[#959595] peer-checked:text-white">All Topics</span>
          </label>
            {Object.keys(listTopics).map((obj:any) => (
                <label key={obj} className='flex items-center gap-x-2'>
                    <input type="checkbox" checked={listTopics[obj].select} onChange={() => setSelectTopic(obj)} className="peer w-5 h-5 bg-transparent border border-[#959595] rounded-sm checked:bg-[#959595] focus:ring-0 focus:ring-transparent checked:focus:!bg-[#959595] checked:hover:!bg-[#959595] hover:!bg-transparent" />
                    <span className="text-[16px] leading-4 text-[#959595] peer-checked:text-white">{`${listTopics[obj].title}`}</span>
                </label>
            ))}
          </>) 
          : (
            <div className='flex items-center justify-center h-full w-full'>
              <p className='text-[20px] text-[#959595] font-normal'>Loading...</p>
            </div>
          )}
        
        </div>
      </div>

      <div className='flex-auto flex flex-col h-full'>

        {/* file open list */}
        <div className='flex-none flex h-7'>

          <div onClick={() => SetToViewListProject()} className={selectViewListProject === true ? 'flex-none w-fit h-full border-b-0 border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer' : 'flex-none w-fit h-full border-b border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer'}>
            <p className='text-[14px] text-[#959595] font-normal leading-[14px]'>list-project.md</p>
          </div>



          {Object.keys(listTopics).length > 0 && (
            <>
            {listOpenFile.map((file, index) => (
              <div key={index} onClick={() => SetFileView(file)} className={file === selectedFile && selectViewListProject === false  ? 'flex-none w-fit h-full border-b-0 border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer' : 'flex-none w-fit h-full border-b border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer'}>
                <p className='text-[14px] text-[#959595] font-normal leading-[14px]'>{dataShowing[file].name.replace(/\s+/g,'-').toLowerCase()}.md</p>
                <button title='d' tabIndex={5} onClick={(event) => { event.stopPropagation(); closeFile(file) }}>
                  <FrontawesomeIcon icon='fa-solid fa-xmark' className='text-[20px] text-[#959595] hover:text-white' />
                </button>
              </div>
            ))}
            </>
          )}


          <div className='flex-auto  border-b border-[#3F3F3F]'>
          </div>

        </div>
        

        {/* content */}
        <div className=' w-full h-full flex-auto flex flex-col overflow-y-auto'>
            <div className="w-full h-full overflow-y-auto">
            <div className=' h-full max-h-full overflow-y-auto'>
              {selectViewListProject === true ? (
                <>
                {dataShowing !== null && Array.isArray(Object.keys(dataShowing)) ? (
                <div className='grid grid-cols-12 gap-x-10 gap-y-8 grid-flow-row p-4'>
                    {Object.keys(dataShowing).map((obj:string) => (
                      <div key={obj} className='col-span-4 flex flex-col h-auto  rounded-lg overflow-hidden'>
                        <div className='px-1 w-full flex items-center mb-2 gap-x-2'>
                          <p className='text-[16px] leading-4 text-[#959595] font-normal'>//</p>
                          {dataShowing[obj].topic_id.map((tag: number,index:number) => (
                            <p key={index} className='text-[16px] leading-4 text-[#959595] font-normal'>{listTopics[tag].title};</p>
                          ))}
                        </div>
                        
                        <div key={obj} className='w-full h-full flex flex-col border border-[#4D4D4D] rounded-lg overflow-hidden'>
                          <div className='w-full h-[70%]'>
                          <Image src={dataShowing[obj].banner_img} width={500} height={350} alt={dataShowing[obj].name} className='object-cover h-[100%] w-full' />
                          </div>
                          <div className='h-[30%] flex py-5 px-4 items-center justify-between border-t border-[#4D4D4D] bg-[#1B1B1B]'>
                              <p className='xl:text-[18px] 2xl:text-[20px] text-[#E2E2E2] font-normal w-fit leading-8'>{dataShowing[obj].name}</p>
                              <button title='go' onClick={()=> addFileSelected(dataShowing[obj].id)}>
                                <FrontawesomeIcon icon='fa-solid fa-arrow-right-from-bracket' className='xl:text-[18px] 2xl:text-[20px] text-[#959595] -rotate-45' />
                              </button>
                          </div>
                        </div>
                      </div>
                    ))
                    }
                </div>
                ) : (
                  <div className='col-span-12 flex items-center justify-center h-full w-full'>
                    <p className='text-[20px] text-[#959595] font-normal'>Loading...</p>
                  </div>
                )}
                </>
              ):(
                <>
                  <div className='col-span-12 flex divide-x divide-[#3F3F3F] h-full'>
                    <div className='w-[60%] h-full'>

                    </div>
                    <div className='w-[40%] h-full'>

                    </div>
                  </div>
                </>
              )}

              </div>
            </div>  
          </div>
        </div>
    </div>
    </>
  );
}
