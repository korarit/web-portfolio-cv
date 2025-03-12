"use server";

import sendLog, { sendToDiscord } from "@/lib/discord";
import { PrismaClient } from '@prisma/client';
import moment from "moment-timezone";


export interface requestOTPResponse {
    status: boolean;
    code?: string;
    expired_at?: Date;        
}

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

async function saveOTP(): Promise<OTP> {
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

        const result = await prisma.otp.create({
            data: {
                otp: otp,
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

export default async function requestOTP() : Promise<requestOTPResponse> {

    //env link discord webhook
    const webhook = process.env.DISCORD_WEBHOOK_OTP;
    if (!webhook) {
        sendLog({
            Title: "Webhook is not set",
            Status: "error",
            route: "requestOTP",
            Type: "error",
            Des: "Webhook is not set",
        });
        console.error("Webhook is not set");
        return { status: false };
    }

    //save otp
    const otp = await saveOTP();
    if (!otp.status || !otp.otp || !otp.otp_code || !otp.expired_at) {
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


    const payload = {
        content: null,
        embeds: [
            {
                title: `OTP Code For Login`,
                color: parseInt("1cbb2f", 16),
                fields: [
                    {
                        name: "OTP",
                        value: otp.otp,
                    },
                    {
                        name: "OTP CODE",
                        value: otp.otp_code,
                    },
                    {
                        name: "Time",
                        value: otp.expired_at?.toISOString(),
                    }
                ],
            },
        ],
    };

    const res = await sendToDiscord(webhook, payload);
    if (!res) {
        sendLog({
            Title: "Failed to send OTP",
            Status: "error",
            route: "requestOTP",
            Type: "error",
            Des: "Failed to send OTP",
        });
        console.error("Failed to send OTP");
        return { status: false};
    };

    return {
        status: true,
        code: otp.otp_code,
        expired_at: otp.expired_at
    }
}