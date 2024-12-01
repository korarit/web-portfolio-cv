'use client';
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation';

import { useState , useEffect } from 'react';

import FrontawesomeIcon from '@/components/FrontawesomeIcon';
import LoadingBar from '@/components/LoadingBar';
import ProjectDetail from '@/components/ProjectDetail';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [allSelect, setAllSelect] = useState<boolean>(true);
  const [listTopics, setListTopics] = useState<{ [key: string]: {id:number,name:string,select:boolean} }|null>(null);

  const loadTopics = async () => {
    const res = await fetch(`/api/project/topic`);
    const data = await res.json();
    //สร้าง list ของ topic ที่มีการเลือก โดยที่ id ของ topic จะเป็น index ของ list
    let temdata: { [key: string]: {id:number,name:string,select:boolean} } = {}
    data.list.forEach((file: any, index: number) => {
      temdata[file['id']] = { ...file, select: true };
    });
    console.log('temdata', temdata);
    setListTopics(temdata);
  };
  useEffect(() => {
    loadTopics();
  }, []);


  //จัดการ loading ของ topic
  const [loadingTopic, setLoadingTopic] = useState<boolean>(false);
  const [showTopic, setShowTopic] = useState<boolean>(false);
  useEffect(() => {
    if (listTopics !== null) {
      setLoadingTopic(true);
    }
  }, [listTopics]);

  const handleSuccessTopic = () => {
    setTimeout(() => {setLoadingTopic(false);setShowTopic(true);}, 10);
  };


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

  const [selectViewListProject, setSelectViewListProject] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<number>(0);
  const [listOpenFile, setlistOpenFile] = useState<number[]>([]);

  const SetToViewListProject = () => {
    setSelectViewListProject(true);
    setSelectedFile(0);

    const currentParams = new URLSearchParams(searchParams); // Clone current search params
    currentParams.delete('project_id'); // Remove the key

    router.push(`?${currentParams.toString()}`);
  }


  const SetFileView = (index: number) => {
    setSelectedFile(index);
    if (selectViewListProject === true) {
      setSelectViewListProject(false);
    }

    const currentParams = new URLSearchParams(searchParams); // Clone current search params
    currentParams.set('project_id', index.toString()); // Set new value for the key

    router.push(`?${currentParams.toString()}`);
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

  const [cache_list, setCacheList] = useState<any>({});
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

    setDataShowing(data.data.list); // ตั้งค่า dataShowing
    if (selectViewListProject === true) {
      setCacheList(data.data.list); // ตั้งค่า data_list
    }else{
      setDataCache(data.data.list); // ตั้งค่า data_cache
    }
  };

  // เมื่อมีการเลือก topic ใหม่
  useEffect(() => {
    console.log("selectViewListProject:", selectViewListProject); // จะเรียกเมื่อ listTopics อัพเดต
    if (selectViewListProject === false) return;
    if (cache_list === null) return;
    let filteredDataCache: any = [];

    Object.keys(cache_list).forEach((key) => {
      const item = cache_list[key];
      if (listTopics !== null && item.project_topics.some((t:any) => listTopics[t.id] && listTopics[t.id].select)) {
        filteredDataCache.push(item);
      }
    });

    console.log("Filtered data:", filteredDataCache); // แสดงข้อมูลที่กรองแล้ว

    setDataShowing(filteredDataCache); // ตั้งค่า dataShowing ใหม่ โดยกรองข้อมูลจาก data_list 
  }, [listTopics]);
  useEffect(() => {
    if (selectViewListProject === false) return;
    if (cache_list === null) return;
    console.log("selectViewListProject:", selectViewListProject); // จะเรียกเมื่อ listTopics อัพเดต
    let filteredDataCache: any[] = [];

    Object.keys(cache_list).forEach((key) => {
      const item = cache_list[key];
      if (listTopics !== null && item.project_topics.some((t: any) => listTopics[t.id] && listTopics[t.id].select)) {
        filteredDataCache.push(item);
      }
    });

    console.log("Filtered data:", filteredDataCache); // แสดงข้อมูลที่กรองแล้ว

    setDataShowing(filteredDataCache); // ตั้งค่า dataShowing ใหม่ โดยกรองข้อมูลจาก data_list 
  }, [selectViewListProject]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectViewListProject === true) {
        await getData('/api/project');
        console.log('dataShowing', dataShowing);
      }
    };
    fetchData();
  },[]);


  useEffect(() => {
    if (searchParams.has('project_id')) {
      const file = Number(searchParams.get('project_id'));
      if (cache_list){
        addFileSelected(file);
      }
    }
  }, [cache_list]);


  // จัดการ loading ของข้อมูล
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [showingofData, setShowingofData] = useState<boolean>(false);
  useEffect(() => {
    if (dataShowing !== null) {
      setDataLoading(true);
    }
  }, [dataShowing]);

  const handleSuccessData = () => {
    setTimeout(() => {setDataLoading(false);setShowingofData(true);}, 10);
  };


  const closeFile = (file: number) => {
    //ถ้าปิดไฟล์ที่กำลังเปิดอยู่ ให้กลับที่ไฟล์ก่อนหน้าที่เปิด
    const list_new = listOpenFile.filter((number) => number !== file);
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
    if (list_new.length === 0) {
      SetToViewListProject();
    }
    // console.log('close file', file);
    // console.log('listOpenFile', listOpenFile);


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

        <div className='flex-auto w-full border-r border-[#3F3F3F] h-7 p-4'>
          {showTopic && listTopics !== null && Object.keys(listTopics).length > 0 ? 
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
              <div className='w-[90%] flex flex-col '>
                <p className='text-[20px] text-[#959595] font-normal'>Loading...</p>
                <div className='h-4 w-full'>
                  <LoadingBar isLoading={loadingTopic} successFunc={handleSuccessTopic} />
                </div>
              </div>
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



          {listTopics !== null && Object.keys(listTopics).length > 0 && (
            <>
            {listOpenFile.map((file, index) => (
                <div key={index} onClick={() => SetFileView(file)} className={file === selectedFile && selectViewListProject === false  ? 'flex-none w-fit h-full border-b-0 border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer' : 'flex-none w-fit h-full border-b border-r border-[#3F3F3F] px-4 flex items-center gap-x-12 cursor-pointer'}>
                {cache_list[file-1] && (
                  <>
                  <p className='text-[14px] text-[#959595] font-normal leading-[14px]'>{cache_list[file-1].name.replace(/\s+/g,'-').toLowerCase()}.md</p>
                  <button title='d' tabIndex={5} onClick={(event) => { event.stopPropagation(); closeFile(file) }}>
                    <FrontawesomeIcon icon='fa-solid fa-xmark' className='text-[20px] text-[#959595] hover:text-white' />
                  </button>
                  </>
                )}
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
                {showingofData && listTopics !== null && dataShowing !== null ? (
                <>
                {dataShowing?.length > 0 ? (
                <div className='grid grid-cols-12 gap-x-10 gap-y-8 grid-flow-row p-4 blur-to-focus'>
                    {dataShowing.map((item:any,index:any) => (
                      <div key={index} className='col-span-4 flex flex-col h-auto  rounded-lg overflow-hidden'>
                        <div className='px-1 w-full flex items-center mb-2 gap-x-2'>
                          <p className='text-[16px] leading-4 text-[#959595] font-normal'>//</p>
                          
                          {item.project_topics.map((topic:any ,index:number) => (
                            <p key={index} className='text-[16px] leading-4 text-[#959595] font-normal'>{topic.name};</p>
                          ))}
                        </div>
                        
                        <div key={index} className='w-full h-full flex flex-col border border-[#4D4D4D] rounded-lg overflow-hidden'>
                          <div className='w-full h-[70%]'>
                          <Image src={item.img_banner} width={500} height={350} alt={item.name} className='object-cover h-[100%] w-full' />
                          </div>
                          <div className='h-[30%] flex py-5 px-4 items-center justify-between border-t border-[#4D4D4D] bg-[#1B1B1B]'>
                              <p className='xl:text-[18px] 2xl:text-[20px] text-[#E2E2E2] font-normal w-fit leading-8'>{item.name}</p>
                              <button title={'Open About : '+item.name} onClick={()=> addFileSelected(item.id)}>
                                <FrontawesomeIcon icon='fa-solid fa-arrow-right-from-bracket' className='xl:text-[18px] 2xl:text-[20px] text-[#959595] hover:text-[#E2E2E2] active:text-[#E2E2E2] transition -rotate-45' />
                              </button>
                          </div>
                        </div>
                      </div>
                    ))
                    }
                
                  </div>
                  ) : (
                    <div className=' flex items-center justify-center h-full w-full'>
                      <p className='text-[24px] text-[#959595] font-normal text-center blur-to-focus'>No Data Found</p>
                    </div>
                )}
                </>
                ) : (
                  <div className='flex items-center justify-center h-full w-full'>
                    <div className='w-[30%] flex flex-col'>
                      <p className='text-[20px] text-[#959595] font-normal text-center'>Loading...</p>
                      <div className='h-4 w-full'>
                        <LoadingBar isLoading={dataLoading} successFunc={handleSuccessData} />
                      </div>
                    </div>
                  </div>
                )}
                </>
              ):(
                <>
                  <div className='w-full h-full'>
                    <ProjectDetail projectID={selectedFile} />
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
