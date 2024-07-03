import { S3Client } from "@aws-sdk/client-s3";

export const {
  AWS_PUBLIC_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
} = process.env;

export const s3 = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY ?? "",
    secretAccessKey: AWS_SECRET_KEY ?? "",
  },
});
