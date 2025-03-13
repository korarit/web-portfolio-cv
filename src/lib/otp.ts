"use server";

import sendLog from "@/lib/discord";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import moment from "moment-timezone";

import { getIP } from "@/lib/getIP";

function generateRandomOTP(length: number) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // สุ่มตัวเลข 0-9
    }
    return result;
}

function generateRandomCode(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

interface OTP {
    status: boolean;
    otp?: string;
    otp_code?: string;
    expired_at?: Date;
}

export async function saveOTP(): Promise<OTP> {
    try {

        //save otp to db
        const prisma = new PrismaClient();

        //generate otp
        const otp = generateRandomOTP(8);
        const code = generateRandomCode(6);

        //get current time in Asia/Bangkok
        const time = moment().tz("Asia/Bangkok").toDate();

        //get expire time
        const expire_mins = process.env.OTP_EXPIRE_MINS;
        if (!expire_mins) {
            sendLog({
                Title: "OTP Expire Time is not set",
                Status: "error",
                route: "requestOTP",
                Type: "error",
                Des: "OTP Expire Time is not set",
            });
            console.error("OTP Expire Time is not set");
            return { status: false };
        }

        const expire = moment().tz("Asia/Bangkok").add(parseInt(expire_mins), 'minutes').toDate();

        const hash_otp = await bcrypt.hash(otp, 10);

        const result = await prisma.otp.create({
            data: {
                otp: hash_otp,
                otp_code: code,
                expired_at: expire,
                created_at: time,
            },
        });

        const ip = await getIP();
        if (!ip) {
            sendLog({
                Title: "Failed to get IP for OTP request",
                Status: "error",
                route: "requestOTP",
                Type: "error",
                Des: "Failed to get IP",
            });
            console.error("Failed to get IP");
            return { status: false };
        }

        sendLog({
            Title: "OTP Code For Login",
            Status: "pass",
            route: "requestOTP",
            Type: "request",
            IP: ip,
            Des: `OTP: ${otp} OTP Code: ${code} Expired At: ${expire.toLocaleTimeString("th-TH") + " " + expire.toLocaleDateString("th-TH")}`,
        });

        return {
            status: true,
            otp: otp,
            otp_code: result.otp_code,
            expired_at: result.expired_at
        };
    } catch (e) {
        sendLog({
            Title: "Failed to save OTP",
            Status: "error",
            route: "requestOTP",
            Type: "error",
            Des: "Failed to save OTP",
        });
        console.error("Failed to save OTP");
        return { status: false };
    }
}

interface SessionResult {
    status: boolean;
    token?: string;
}
export async function createSession(otp_id: number, ip: string): Promise<SessionResult> {
    try {
        const prisma = new PrismaClient();

        //generate token
        const token = generateRandomCode(32);

        const hash_token = await bcrypt.hash(token, 10);

        //current time
        const time = moment().tz("Asia/Bangkok").toDate();

        const result = await prisma.session.create({
            data: {
                login_ip: ip,
                token: hash_token,
                created_at: time,
                otp:{
                    connect:{
                        id: parseInt(otp_id.toString())
                    }
                }
            }
        });
        return {
            status: true,
            token: result.token
        };
    } catch (e) {
        return {
            status: false
        };
    }
}

interface CheckResult {
    status: boolean;
    message: string;
    otp_id?: number;
}

export async function checkOTP(otp:string, otp_code:string): Promise<CheckResult> {
    try {
        const prisma = new PrismaClient();

        const result = await prisma.otp.findFirst({
            where: {
                otp_code: otp_code
            },
            include: {
                session: true
            }
        });

        if (!result) {
            return { status: false, message: "Invalid OTP" };
        }

        //if has session is to false
        if (result.session) {
            return { status: false, message: "OTP is already used" };
        }

        //if failed count is more than 10
        if (result.failed_count > 10) {
            return { status: false, message: "OTP is failed to use more than 10" };
        }


        const match = await bcrypt.compare(otp, result.otp);
        if (!match) {

            //add failed count
            await prisma.otp.update({
                where: {
                    id: result.id
                },
                data: {
                    failed_count:{
                        increment: 1
                    }
                }
            });

            return { status: false, message: "Invalid OTP" };
        }

        const now = moment().tz("Asia/Bangkok").toDate();
        if (now > result.expired_at) {
            return { status: false, message: "OTP is expired" };
        }

        return {
            status: true,
            message: "OTP is valid",
            otp_id: result.id
        };
    } catch (e) {
        sendLog({
            Title: "Failed to check OTP",
            Status: "error",
            route: "checkOTP",
            Type: "error",
            Des: "Failed to check OTP",
        });
        console.error("Failed to check OTP", e);
        return { status: false, message: "Failed to check OTP" };
    }
}