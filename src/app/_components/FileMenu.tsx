import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DropdownDeleteFile } from "./FileMenuActions";

export default function FileMenu({
  pathname,
  downloadUrl,
}: {
  pathname: string;
  downloadUrl: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
        <span className="sr-only">Actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link download href={downloadUrl}>
            Download
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownDeleteFile downloadUrl={downloadUrl} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
