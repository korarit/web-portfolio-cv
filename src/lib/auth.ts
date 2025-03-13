import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"


import {checkOTP, createSession} from "@/lib/otp"

// Override interface User และ Session
declare module "next-auth" {
  /**
   * Interface สำหรับ User ที่จะใช้ในระบบทั้งหมด
   */
  interface User {
    session_id: string;
  }

  /**
   * Interface สำหรับ Session ที่จะถูกส่งไปยัง client
   */
  interface Session {
    user: {
      session_id: string;
    };
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        name: 'otp',
        credentials: {
            ip: { label: "IP", type: "text" },
            otp_code: { label: "OTP Code", type: "text" },
            otp: { label: "OTP", type: "text" },
        },
        authorize: async (credentials) => {
            
          console.log(credentials)

            if (typeof credentials.otp !== "string" || typeof credentials.otp_code !== "string" || typeof credentials.ip !== "string") {
                return null;
            }

            
            const otp = credentials.otp;
            const otp_code = credentials.otp_code;
            const ip = credentials.ip;

            //check otp
            const result = await checkOTP(otp, otp_code);
            if (!result.status || !result.otp_id) {
                throw new Error(result.message);
            }

            //create session
            const session = await createSession(result.otp_id, ip);
            if (!session.status || !session.token) {
                throw new Error("Failed to create session");
            }

            console.log(session.token)

            return { session_id: session.token };
        }
    })
  ],
})