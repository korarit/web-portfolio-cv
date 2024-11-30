'use client';

import { useState, useEffect } from "react";


export default function LoadingBar({isLoading, successFunc}: {isLoading: boolean;successFunc: () => void}) {

    const [filled, setFilled] = useState<number>(0);
    
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setFilled((prev) => {
                    if (prev < 100) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        successFunc?.(); // เรียกฟังก์ชันอย่างปลอดภัย
                        return 0;
                    }
                });
            }, 2);
            return () => clearInterval(interval);
        }
    }, [isLoading, successFunc]);

    return (
        <div className="w-full h-full bg-transparent border border-[#797979] overflow-hidden">
            <div className="h-full bg-[#959595]" style={{width: `${filled}%`}}></div>
        </div>
    );
}