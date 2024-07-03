import { Readable, Writable } from "stream";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export async function convertToMp3(buffer: Buffer): Promise<Buffer> {
  const readableStream = new Readable();
  readableStream._read = () => {};
  readableStream.push(buffer);
  readableStream.push(null);

  return new Promise((resolve, reject) => {
    let chunks: any[] = [];
    ffmpeg(readableStream)
      .audioBitrate(128)
      .withAudioCodec("libmp3lame")
      .toFormat("mp3")
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(Buffer.concat(chunks));
      })
      .pipe(
        new Writable({
          write(chunk, encoding, callback) {
            chunks.push(chunk);
            callback();
          },
        })
      );
  });
}
