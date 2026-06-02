"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type MediaUploaderProps = {
  label: string;
  name: string;
  defaultValue?: string[] | string | null;
  multiple?: boolean;
  accept?: string;
};

function normalize(value?: string[] | string | null) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function MediaUploader({
  label,
  name,
  defaultValue,
  multiple = false,
  accept = "image/*,video/*",
}: MediaUploaderProps) {
  const [urls, setUrls] = useState<string[]>(normalize(defaultValue));
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const hiddenValue = useMemo(() => urls.join("\n"), [urls]);

  function upload(files: FileList | null) {
    if (!files?.length) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const request = new XMLHttpRequest();
    request.open("POST", "/api/admin/upload");
    setStatus("Uploading...");
    setProgress(0);

    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    request.onload = () => {
      try {
        const response = JSON.parse(request.responseText) as {
          files?: string[];
          message?: string;
        };

        if (request.status >= 200 && request.status < 300 && response.files) {
          setUrls((current) =>
            multiple ? [...current, ...response.files!] : [response.files![0]]
          );
          setStatus("Upload complete.");
          setProgress(100);
        } else {
          setStatus(response.message || "Upload failed.");
        }
      } catch {
        setStatus("Upload failed.");
      }
    };

    request.onerror = () => setStatus("Upload failed.");
    request.send(formData);
  }

  return (
    <div>
      <label className="block">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {label}
        </span>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(event) => upload(event.target.files)}
          className="mt-2 block w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-[#101214]"
        />
      </label>
      <input type="hidden" name={name} value={hiddenValue} />
      {status && (
        <div className="mt-2 text-sm text-secondary">
          {status} {progress > 0 ? `${progress}%` : ""}
        </div>
      )}
      {urls.length > 0 && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {urls.map((url) => (
            <div
              key={url}
              className="overflow-hidden rounded-md border border-black/10 bg-white dark:border-white/10 dark:bg-[#101214]"
            >
              {/\.(mp4|mov|webm|avi)$/i.test(url) ? (
                <video src={url} controls className="aspect-video w-full object-cover" />
              ) : (
                <div className="relative aspect-video">
                  <Image
                    src={url}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
              )}
              <button
                type="button"
                className="w-full px-3 py-2 text-left text-sm font-semibold text-red-600"
                onClick={() =>
                  setUrls((current) => current.filter((item) => item !== url))
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
