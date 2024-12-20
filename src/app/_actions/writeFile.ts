"use server";
import { File } from "buffer";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { latinAlphanumericalStartsWithLetter } from "@/lib/regex";

const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "Required" })
    .refine((file) => file.size > 0, "Required"),
  folder: z.string().min(0).max(64).regex(latinAlphanumericalStartsWithLetter),
});

export async function writeFile(
  path: string,
  prevState: unknown,
  formData: FormData
) {
  // validating form data
  console.log(Object.fromEntries(formData.entries()));
  const result = fileSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  // validated file from formData
  const file = result.data.file;

  // constructing file path
  const folder = result.data.folder ? result.data.folder.concat("/") : "";
  const fullFilepath = path
    ? path.concat(folder, file.name)
    : folder.concat(file.name);

  // console.log(path, folder, file.name, fullFilepath);
  // writing to blob
  const test = await put(fullFilepath, Buffer.from(await file.arrayBuffer()), {
    access: "public",
  });

  // console.log(test);

  revalidatePath("/");
}
