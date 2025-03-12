

import FrontawesomeIcon from '@/components/FrontawesomeIcon';

interface Props {
    setShowInput: (value: boolean) => void;
}

export default async function getOTP({setShowInput}: Readonly<Props>) {

    const handleGetOTP = async () => {
        setShowInput(true)
    }

    return (
    <>
        <p className="text-[24px] text-center text-nowrap font-normal text-white leading-4">Login To Admin Dashboard</p>
        
        <p className="text-[16px] text-center text-[#959595] leading-4">กดปุ่มเพื่อให้ตัว OTP ส่งไป Discord</p>
                      
        <div className='flex items-center justify-between gap-x-4'>
            <FrontawesomeIcon icon="fa-solid fa-chevron-right" className='flex-none text-[18px] text-center text-[#959595]' />
        
            <button onClick={handleGetOTP} className='flex-auto  bg-[#565656] hover:bg-[#585858] border border-[#606060] py-1 text-lg font-medium text-[#1C1C1C] rounded-md flex items-center justify-center'>
                ขอ OTP จาก Discord
            </button>
        </div>
    </>
    )
}