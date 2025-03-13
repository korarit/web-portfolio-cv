import { toast, Bounce } from 'react-toastify';


import FrontawesomeIcon from '@/components/FrontawesomeIcon';
import requestOTP from '../_action/requestOTP';

interface Props {
    setShowInput: (value: boolean) => void;
    setCode: (value: string) => void;
    setExpiredAt: (value: Date) => void;
}

export default function getOTP({setShowInput, setCode, setExpiredAt}: Readonly<Props>) {

    const handleGetOTP = async () => {
        const result = await requestOTP();
        if (!result.status || !result.code || !result.expired_at) {
            toast.error('Request OTP Failed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                closeButton: false,
                pauseOnHover: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        toast.success('Request OTP Success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

        setShowInput(true)
        setCode(result.code)
        setExpiredAt(result.expired_at)
    }

    return (
    <>
        <p className="text-[16px] text-center text-[#959595] leading-4">กดปุ่มเพื่อให้ตัว OTP ส่งไป Discord</p>
                      
        <div className='flex items-center justify-between gap-x-4'>
            <FrontawesomeIcon icon="fa-solid fa-chevron-right" className='flex-none text-[18px] text-center text-[#959595]' />
        
            <button onClick={handleGetOTP} className='flex-auto  bg-[#f8f7f7] hover:bg-[#ebeaea] border border-[#606060] py-1 text-lg font-medium text-[#1C1C1C] rounded-md flex items-center justify-center'>
                ขอ OTP จาก Discord
            </button>
        </div>
    </>
    )
}