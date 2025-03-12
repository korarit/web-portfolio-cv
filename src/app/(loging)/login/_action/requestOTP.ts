"use server";

import sendLog, { sendToDiscord } from "@/lib/discord";
import { saveOTP } from "@/lib/otp";

export interface requestOTPResponse {
    status: boolean;
    code?: string;
    expired_at?: Date;        
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