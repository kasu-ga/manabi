"use server";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

import { AWS_BUCKET_NAME, s3 } from "../lib/aws-s3";

export async function compressFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type.startsWith("audio")) {
    // const newBuffer = await convertToMp3(buffer);
    return [buffer, "mp3"];
  }

  const newFile = await sharp(buffer)
    .resize(500)
    .png({ quality: 50 })
    .toBuffer();
  return [newFile, "png"];
}

export async function submitS3Object(file: File, prefix: string) {
  const [buffer, extname] = await compressFile(file);
  const fileName = `${prefix}.${extname}`;
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
  });
  await s3.send(command);
  return fileName;
}

export async function readS3Object(fileName: string) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
  });
  const res = await s3.send(command);
  return res.Body;
}

export async function deleteS3Object(fileName: string) {
  const command = new DeleteObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
  });
  await s3.send(command);
}
