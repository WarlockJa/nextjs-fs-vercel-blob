"use server";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";

export async function deleteFile({ downloadUrl }: { downloadUrl: string }) {
  await del(downloadUrl);

  revalidatePath("/");
}
