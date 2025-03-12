"use client";

import { useState } from "react"

import GetOTP from "./getOTP"

export default function getOTP() {

    const [showInput, setShowInput] = useState(false)

    return (
    <>
        <div className='p-6 w-[480px] h-[240px] bg-[#1C1C1C] border border-[#4E4E4E] flex flex-col justify-between rounded-md'>
            {showInput ? (
                <GetOTP setShowInput={setShowInput} />
            ):(
                <></>
            )}
        </div>
    </>
    )
}