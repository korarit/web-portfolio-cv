"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import FrontawesomeIcon from "@/components/FrontawesomeIcon";
import LoadingBar from "./LoadingBar";


export default function ProjectDetail({ projectID }: { projectID: number|null }) {

    const [project, setProject] = useState<any>(null);
    const [showingData, setShowingData] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getData = async () => {
        const res = await fetch(`/api/project/${projectID}`);
        const data = await res.json();
        setProject(data.data);
        setLoading(false);
    }

    useEffect(() => {
        if (!projectID) return;
        setProject(null);
        getData();
    }, [projectID]);

    // loading check
    const handleSuccessData = () => {
        setTimeout(() => {setLoading(false);setShowingData(true);}, 10);
    };
    useEffect(() => {
        if (project !== null) {
            setLoading(true);
        }
    }, [project]);

    return (
        <>
        <div className="w-full h-full ">
            {showingData ? (
            <div className="w-full h-full flex divide-x divide-[#3F3F3F] blur-to-focus">
                {/* Detail of Project */}
                <div className="w-[60%] 2xl:w-[55%] h-full overflow-y-auto py-4 px-4 flex flex-col gap-y-10">
                    <div className="flex flex-col w-[90%]">
                        <p className="text-[24px] text-[#E2E2E2] font-medium w-fit leading-6">
                            {project?.name}
                        </p>
                        <div className="w-[100%] h-px bg-[#4D4D4D] my-2"></div>
                        <p className="text-[16px] text-[#E2E2E2] font-normal w-fit leading-6">
                            {project?.description}
                        </p>
                        <div className="flex items-center gap-x-4 mt-2">
                            {project?.github_link && (
                            <Link href={project?.github_link} target="_blank" className="px-4 py-1 bg-[#343434] hover:bg-[#383838] rounded flex justify-center items-center gap-x-2 w-fit">
                                <FrontawesomeIcon icon="fa-brands fa-github" className="text-[24px] text-[#C1C1C1]" />
                                <p className="text-[14px] text-[#FFFFFF] font-normal">
                                    GITHUB
                                </p>
                            </Link>
                            )}
                            {project?.preview_link && (
                            <Link href={project?.preview_link} target="_blank" className="px-4 py-1 bg-[#343434] hover:bg-[#383838] rounded flex items-center gap-x-2 w-fit">
                                <FrontawesomeIcon icon="fa-solid fa-globe" className="text-[24px] text-[#C1C1C1]" />
                                <p className="text-[14px] text-[#FFFFFF] font-normal">
                                    WEBSITE
                                </p>
                            </Link>
                            )}
                        </div>
                    </div>
                    

                    {project?.project_features.length > 0 && (
                    <div className="flex flex-col w-[90%]">
                        <p className="text-[20px] text-[#E2E2E2] font-medium w-fit leading-6">
                            Feature
                        </p>
                        <div className="w-[100%] h-px bg-[#4D4D4D] my-2"></div>
                        <div className="flex flex-col gap-y-2">
                        {project?.project_features.map((feature: any, index: number) => (
                        <label className='flex items-center gap-x-2' key={index}>
                            <input type="checkbox" checked={feature?.success} readOnly className="peer w-5 h-5 bg-transparent border border-[#959595] rounded-sm checked:bg-[#4D4D4D] focus:ring-0 focus:ring-transparent checked:focus:!bg-[#4D4D4D] checked:hover:!bg-[#4D4D4D] hover:!bg-transparent" />
                            <span className="text-[16px] leading-4 text-[#959595] peer-checked:text-white">{feature.name}</span>
                        </label>
                        ))}
                        </div>
                    </div>
                    )}

                    {project?.project_stacks.length > 0 && (
                    <div className="flex flex-col w-[90%]">
                        <p className="text-[20px] text-[#E2E2E2] font-medium w-fit leading-6">
                            Tech Stack
                        </p>
                        <div className="w-full h-px bg-[#4D4D4D] my-2"></div>
                        <div className="grid grid-cols-8 gap-2">
                        {project?.project_stacks.map((item: any, index: number) => (
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
                    )}
                </div>
                {/* Image or Youtube of Project */}
                <div className="w-[40%] 2xl:w-[45%] h-full flex items-center">
                    <div className="w-full pt-4 px-4 h-fit overflow-y-auto max-h-full flex flex-col gap-y-6">
                    {project?.youtube_link !== null || project?.project_imgs?.length > 0 ? (
                    <>
                        {project?.youtube_link !== null && (
                        <iframe className="w-full aspect-video relative rounded-md" src={project?.youtube_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        )}
                        {project?.project_imgs?.length > 0 && (
                        <>
                            {project?.project_imgs.map((img: any, index: number) => (
                                <Image src={img.img_path} width={400} height={200} loading="lazy" alt={index.toString()} key={index} className="object-cover object-center w-full h-auto rounded-md" />
                            ))}
                        </>
                        )}
                    </>
                    ):(
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex flex-col items-center gap-y-1">
                            <FrontawesomeIcon icon="fa-solid fa-image" className="text-[#959595] text-[44px]" />
                            <p className="text-[20px] text-[#959595] font-normal">No Image or Youtube Preview</p>
                        </div>
                    </div>
                    )}
                    </div>
                </div>
            </div>
            ):(
            <div className="w-full h-full flex justify-center items-center">
                <div className='w-[30%] flex flex-col'>
                    <p className='text-[20px] text-[#959595] font-normal text-center'>Loading...</p>
                    <div className='h-4 w-full'>
                        <LoadingBar isLoading={loading} successFunc={handleSuccessData} />
                    </div>
                </div>
            </div>
            )}
            
        </div>
        </>
    );
}
