import { S3Client } from "@aws-sdk/client-s3";

export const { S3_PUBLIC_KEY, S3_SECRET_KEY, BUCKET_NAME, BUCKET_REGION } =
  process.env;

export const s3 = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: S3_PUBLIC_KEY ?? "",
    secretAccessKey: S3_SECRET_KEY ?? "",
  },
});
