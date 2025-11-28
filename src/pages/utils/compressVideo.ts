import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;

const MAX_SIZE = 9 * 1024 * 1024; // 9MB limit

export const compressVideo = async (file: File): Promise<File> => {
  if (file.size <= MAX_SIZE) return file; // no need to compress

  // init ffmpeg once
  if (!ffmpeg) {
    ffmpeg = new FFmpeg();
    await ffmpeg.load();
  }

  // write input video
  await ffmpeg.writeFile("input.mp4", await fetchFile(file));

  // run compression
  await ffmpeg.exec([
    "-i", "input.mp4",
    "-vf", "scale=720:-1",     // reduce resolution → smaller file
    "-b:v", "900k",            // reduce bitrate
    "-preset", "veryfast",
    "output.mp4"
  ]);

  // read output safely and normalize to Uint8Array
  let rawOutput: unknown;
  try {
    rawOutput = await ffmpeg.readFile("output.mp4");
  } catch (err) {
    console.error("FFmpeg readFile error:", err);
    throw new Error("Compression failed — output missing");
  }

  // Normalize various possible return shapes to Uint8Array
  let data: Uint8Array;
  if (rawOutput instanceof Uint8Array) {
    data = rawOutput;
  } else if (rawOutput && typeof rawOutput === "object" && "buffer" in (rawOutput as any)) {
    const buf = (rawOutput as any).buffer as ArrayBufferLike;
    data = new Uint8Array(buf as ArrayBuffer);
  } else {
    // last resort: try to coerce
    try {
      data = new Uint8Array(rawOutput as any);
    } catch (e) {
      console.error("Unexpected ffmpeg output shape:", rawOutput);
      throw new Error("Compression failed — unexpected output format");
    }
  }

  // ensure the blob is backed by a plain ArrayBuffer (avoid SharedArrayBuffer typing)
  const copied = new Uint8Array(data);
  const blob = new Blob([copied.buffer], { type: "video/mp4" });

  return new File([blob], "compressed.mp4", {
    type: "video/mp4",
  });
};
