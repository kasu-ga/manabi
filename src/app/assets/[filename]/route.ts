import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { readS3Object } from "@/services/s3";

// export const config = {
//   api: {
//     responseLimit: false,
//   },
// };

export async function GET(
  req: NextRequest,
  { params: { filename } }: { params: { filename: string } }
) {
  if (!filename) return notFound();
  const fileData = await readS3Object(filename);
  if (!fileData) return notFound();
  const stream = fileData.transformToWebStream();
  return new NextResponse(stream);
}
