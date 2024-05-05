"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MehIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { writeFile } from "../_actions/writeFile";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { latinAlphanumericalStartsWithLetterPattern } from "@/lib/regex";

export default function UploadFile({ path }: { path: string }) {
  const [error, action] = useFormState(writeFile.bind(null, path), {});

  const formRef = useRef(null);

  return (
    <form className="flex" action={action} ref={formRef}>
      <Input
        type="text"
        alt="folder name"
        name="folder"
        title="Folder name. Letters and digits only"
        placeholder="Placement folder"
        pattern={latinAlphanumericalStartsWithLetterPattern}
      />
      <SubmitInput form={formRef} error={error?.file} />
    </form>
  );
}

function SubmitInput({
  form,
  error,
}: {
  form: any;
  error: string[] | undefined;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      <Label htmlFor="file" className="cursor-pointer" title="upload file">
        <span className="sr-only">
          {error ? "invalid file input" : "upload file"}
        </span>
        {pending ? (
          <Loader2 className="size-10 animate-spin" />
        ) : (
          <Button variant="outline" size="icon" asChild>
            {error ? (
              <MehIcon className="p-2 text-destructive" />
            ) : (
              <UploadIcon className="p-2" />
            )}
          </Button>
        )}
      </Label>
      <Input
        className="hidden"
        type="file"
        id="file"
        name="file"
        onChange={() => form.current && form.current.requestSubmit()}
        disabled={pending}
      />
    </>
  );
}
