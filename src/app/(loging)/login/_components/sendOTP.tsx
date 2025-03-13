"use client";

import { useEffect, useState } from 'react';
import FrontawesomeIcon from '@/components/FrontawesomeIcon';
import OtpInput from 'react-otp-input';

interface Props {
    code: string;
    expiredAt: Date;
    handleBack: () => void;
}

export default function sendOTP({code, expiredAt, handleBack}:Props) {

    const [otp, setOtp] = useState('');

    useEffect(() => {
        console.log(otp)
    }, [otp])

    const handleSendOTP = async () => {
        
    }

    return (
        <>
        <div className='w-full flex flex-col gap-y-1.5'>

            <div className='flex items-center justify-between gap-x-4'>
                <p className="text-[14px] text-center text-[#959595] leading-4">{code}</p>

                <p className="text-[14px] text-center text-[#959595] leading-4">15:00</p>
            </div>
            
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={8}
                inputType='text'
                inputStyle='!w-full h-fit px-1 py-2 bg-[#242424] border border-[#606060] text-[#ffffff] text-center text-lg font-medium rounded-md'
                containerStyle='w-full !grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4'
                renderInput={(props) => <input {...props} />}
            />
        </div>
        
        <div className='flex items-center justify-between gap-x-4'>

            <button onClick={handleBack} className='flex-none p-1 text-[#959595] hover:text-[#f8f7f7]' title="Go Back">
                <FrontawesomeIcon icon="fa-solid fa-chevron-left" className='flex-none text-[18px] text-center' />
            </button>


            <button disabled={otp.length < 8} onClick={handleSendOTP} className='flex-auto disabled:bg-[#7f7f7f]  bg-[#f8f7f7] hover:bg-[#ebeaea] border border-[#606060] py-1 text-lg font-medium text-[#1C1C1C] rounded-md flex items-center justify-center'>
                ส่ง OTP
            </button>
        </div>
        </>
    )
}