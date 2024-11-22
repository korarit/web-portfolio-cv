import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    DeleteObjectCommandInput,
    PutObjectCommandInput,
} from "@aws-sdk/client-s3";


function r2Conent(){
    const ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
    const ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

    if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
        throw new Error("Please provide R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY");
    }
    const S3 = new S3Client({
        region: "auto",
        endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
    });

    return S3;
}

const S3 = r2Conent();

export async function uploadToR2(file: File, folder:string, FileName: string) {
    const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const url_bucket = process.env.CLOUDFLARE_R2_BUCKET_URL;
    if (!bucket || !url_bucket) {
        throw new Error("Please provide R2_BUCKET and R2_URL_BUCKET");
    }

    const path = `${folder}/${FileName}`;

    const params:PutObjectCommandInput = {
        Bucket: bucket,
        Key: path,
        Body: file,
        ContentType: file.type,
    };
    try {
        const data = await S3.send(new PutObjectCommand(params));
        return `${url_bucket}/${path}`;
    } catch (error) {
        throw error;
    }
}

export async function deleteFromR2(FilePath: string) {
    const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    if (!bucket) {
        throw new Error("Please provide R2_BUCKET");
    }
    const params:DeleteObjectCommandInput = {
        Bucket: bucket,
        Key: FilePath,
    };
    try {
        const data = await S3.send(new DeleteObjectCommand(params));
        return data;
    } catch (error) {
        throw error;
    }
}