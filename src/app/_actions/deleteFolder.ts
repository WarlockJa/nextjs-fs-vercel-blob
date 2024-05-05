"use server";
import { del, list } from "@vercel/blob";
import { revalidatePath } from "next/cache";

async function recursiveDeleteFolder(folderName: string) {
  const entries = await list({ mode: "folded", prefix: folderName });

  await Promise.all(entries.blobs.map(async (file) => del(file.downloadUrl)));

  for (const subfolder of entries.folders) {
    await recursiveDeleteFolder(subfolder);
  }
}

export async function deleteFolder({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  // recursively deleting folder and its contents
  await recursiveDeleteFolder(name);

  revalidatePath("/");
}
