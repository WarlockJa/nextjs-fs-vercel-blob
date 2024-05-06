import { redirect } from "next/navigation";
import PathNavigator from "./PathNavigatior";
import { ThemeToggle } from "@/components/ThemeToggle";
import getSize from "@/lib/getSize";
import FileMenu from "./FileMenu";
import UploadFile from "./UploadFile";
import { list } from "@vercel/blob";
import Link from "next/link";
import FolderMenu from "./FolderMenu";

export default async function FileExplorer({ path }: { path: string }) {
  const entries = await list({ mode: "folded", prefix: path });

  // redirecting to root in case of an improper path
  if (entries.folders.length === 0 && entries.blobs.length === 0 && path !== "")
    redirect("/");

  return (
    <div className="overflow-scroll h-full">
      <div className="flex justify-between items-center sticky top-0 bg-secondary">
        <PathNavigator path={path} />
        <div className="flex items-center">
          <UploadFile path={path} />
          <ThemeToggle />
        </div>
      </div>
      <ul className="px-4">
        {entries.folders.map((entry) => (
          <li key={entry} className="listItem">
            <div className="flex justify-between hover:bg-secondary">
              <Link
                href={`/?path=${
                  path === ""
                    ? entry
                    : path.concat(
                        entry.slice(0, -1).split("/").pop() as string,
                        "/"
                      )
                }`}
              >
                {entry.slice(0, -1).split("/").pop()}
              </Link>
              <FolderMenu name={entry} path={path} />
            </div>
          </li>
        ))}
        {entries.blobs.map((entry) => (
          <li key={entry.pathname} className="listItem">
            <div className="flex justify-between text-muted-foreground hover:bg-secondary">
              <p>{entry.pathname.split("/").pop()}</p>
              <div className="flex">
                <p>{entry.size && getSize(entry.size)}</p>
                <FileMenu
                  pathname={entry.pathname}
                  downloadUrl={entry.downloadUrl}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
