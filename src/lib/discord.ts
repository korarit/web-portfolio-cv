import moment from "moment-timezone"

export function payload_webhook (Title:string, Status: ("pass"|"fail"|"error"), route: string, IP?: string,  Des?: string){
    let color = ""
    let StatusFormat = ""
    if (Status === "pass"){
        StatusFormat = "✅ Pass"
        color = "1cbb2f"
    } else if (Status === "fail"){
        StatusFormat = "❌ Fail"
        color = "c97812"
        
    } else if (Status === "error"){
        StatusFormat = "🔴 Error"
        color = "ff0000"
    }

    const time = moment().tz("Asia/Bangkok").format('HH:mm:ss DD-MM-YYYY')

    const payload = {
        "content": null,
        "embeds": [
            {
                "title":  `${Title} - ${time}`,
                "color": color,
                "fields": [
                    {
                        "name": "IP",
                        "value": IP
                    },
                    {
                        "name": "Route Address",
                        "value": route
                    },
                    {
                        "name": "Status",
                        "value": StatusFormat
                    },
                ]
            }
        ]
    }

    if (IP !== "" && IP !== undefined) {
        payload.embeds[0].fields.push({
            "name": "IP",
            "value": IP
        })
    }

    payload.embeds[0].fields.push({
        "name": "Route Address",
        "value": route
    })

    payload.embeds[0].fields.push({
         "name": "Status",
        "value": StatusFormat
    })

    if (Des !== "" && Des !== undefined){
        payload.embeds[0].fields.push({
            "name": "Description",
            "value": Des
        })
    }

    return payload
}


export async function sendToDiscord (url: string,payload: any){

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (res.status !== 204){
        console.error("Failed to send webhook")
        return false
    }

    return true
}

interface Log {
    Title: string
    Status: ("pass"|"fail"|"error")
    route: string
    Type: ("error"|"protect"|"edit")
    IP?: string
    Des?: string
}

export default async function sendLog ({Title, Status, Type, route, IP, Des}: Log){
    
    let webhook = ""
    if (Type === "edit"){
        webhook = process.env.DISCORD_WEBHOOK_EDIT || ""
    } else if (Type === "protect"){
        webhook = process.env.DISCORD_WEBHOOK_PROTECT || ""
    } else if (Type === "error"){
        webhook = process.env.DISCORD_WEBHOOK_ERROR || ""
    }

    if (webhook === ""){
        console.error("Webhook is not set")
        return false
    }

    if (Title === ""){
        console.error("Title is not set");
        return false;
    }
    if (route === ""){
        console.error("route is not set");
        return false;
    }

    const payload = payload_webhook(Title, Status, route, IP, Des);
    return await sendToDiscord(webhook, payload);
}