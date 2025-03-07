import moment from "moment-timezone";

export function payload_webhook(Title: string, Status: "pass" | "fail" | "error", route: string, IP?: string, Des?: string) {
    let color: number;
    let StatusFormat = "";
    if (Status === "pass") {
        StatusFormat = "✅ Pass";
        color = parseInt("1cbb2f", 16); // Green
    } else if (Status === "fail") {
        StatusFormat = "❌ Fail";
        color = parseInt("c97812", 16); // Orange
    } else {
        StatusFormat = "🔴 Error";
        color = parseInt("ff0000", 16); // Red
    }

    const time = moment().tz("Asia/Bangkok").format("HH:mm:ss DD-MM-YYYY");

    const embedFields = [
        ...(IP && IP !== "" ? [{ name: "IP", value: IP }] : []),
        { name: "Route Address", value: route },
        { name: "Status", value: StatusFormat },
        ...(Des && Des !== "" ? [{ name: "Description", value: Des }] : []),
    ];

    const payload = {
        content: null,
        embeds: [
            {
                title: `${Title} - ${time}`,
                color: color,
                fields: embedFields,
            },
        ],
    };

    return payload;
}

export async function sendToDiscord(url: string, payload: any) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (res.status !== 204) {
        const errorPayload = await res.json();
        console.error("Failed to send webhook");
        console.error(errorPayload);
        return false;
    }

    return true;
}

interface Log {
    Title: string;
    Status: "pass" | "fail" | "error";
    route: string;
    Type: "error" | "protect" | "edit" | "request";
    IP?: string;
    Des?: string;
}

export default async function sendLog({ Title, Status, Type, route, IP, Des }: Log) {
    let webhook = "";
    if (Type === "edit") {
        webhook = process.env.DISCORD_WEBHOOK_EDIT || "";
    } else if (Type === "protect") {
        webhook = process.env.DISCORD_WEBHOOK_PROTECT || "";
    } else if (Type === "error") {
        webhook = process.env.DISCORD_WEBHOOK_ERROR || "";
    } else if (Type === "request") {
        webhook = process.env.DISCORD_WEBHOOK_REQUEST || "";
    }

    if (webhook === "") {
        console.error("Webhook is not set");
        return false;
    }

    if (Title === "") {
        console.error("Title is not set");
        return false;
    }
    if (route === "") {
        console.error("Route is not set");
        return false;
    }

    const payload = payload_webhook(Title, Status, route, IP, Des);
    return await sendToDiscord(webhook, payload);
}