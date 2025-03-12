"use server";

import sendLog from "@/lib/discord";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import moment from "moment-timezone";


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
        const expire_mins = process.env.OTP_EXPIRE_MINS || 10;
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

        const expire = moment().tz("Asia/Bangkok").add(expire_mins, 'minutes').toDate();

        const hash_otp = await bcrypt.hash(otp, 10);

        const result = await prisma.otp.create({
            data: {
                otp: hash_otp,
                otp_code: code,
                expired_at: expire,
                created_at: time,
            },
        });

        return {
            status: true,
            otp: result.otp,
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

export default async function checkOTP(otp:string, otp_code:string): Promise<boolean> {
    try {
        const prisma = new PrismaClient();

        const result = await prisma.otp.findFirst({
            where: {
                otp_code: otp_code
            }
        });

        if (!result) {
            return false;
        }

        const match = await bcrypt.compare(otp, result.otp);
        if (!match) {
            return false;
        }

        const now = moment().tz("Asia/Bangkok").toDate();
        if (now > result.expired_at) {
            return false;
        }

        return true;
    } catch (e) {
        return false;
    }
}