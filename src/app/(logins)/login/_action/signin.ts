"use server";


import { signIn } from '@/lib/auth';
import { getIP } from '@/lib/getIP';

interface Props {
    otp_code: string;
    otp: string;
}

interface SendOTPReturn {
    success: boolean;
    message: string;
}

export default async function SignInByOTP ({otp_code, otp}:Props) : Promise<SendOTPReturn> {
    try {
        const ip = await getIP();
        if (!ip) {
            return {
                success: false,
                message: "Failed to get IP Address For Log"
            };
        }

        await signIn('credentials', {
            otp: otp,
            otp_code: otp_code,
            ip: ip,
            redirect: false
        });

        return {
            success: true,
            message: "Success"
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message || "Failed to Sign In"
            };
        }

        return {
            success: false,
            message: "Failed to Sign In"
        };
    }
}