"use client";
import { useState } from "react"

import GetOTP from "./getOTP"
import SendOTP from "./sendOTP";

export default function getOTP() {

    const [showInput, setShowInput] = useState(false)

    return (
    <>
        <div className='p-6 w-[480px] h-[240px] bg-[#1C1C1C] border border-[#4E4E4E] flex flex-col justify-between rounded-md'>

            <p className="text-[24px] text-center text-nowrap font-normal text-white leading-4">Login To Admin Dashboard</p>

            {!showInput ? (
                <GetOTP setShowInput={setShowInput} />
            ):(
                <SendOTP />
            )}
        </div>
    </>
    )
}