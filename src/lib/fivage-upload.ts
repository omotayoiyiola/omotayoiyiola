export type FivageUploadResponse = {
  message: string;
  files: string[];
};

export async function uploadToFivage(files: File[]) {
  const uploadUrl = process.env.FIVAGE_UPLOAD_URL;
  const username = process.env.FIVAGE_USERNAME;
  const apiKey = process.env.FIVAGE_API_KEY;

  if (!uploadUrl || !username || !apiKey) {
    throw new Error("Fivage upload environment variables are not configured.");
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      "x-username": username,
      "x-api-key": apiKey,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Fivage upload failed with status ${response.status}`);
  }

  const data = (await response.json()) as FivageUploadResponse;
  if (!Array.isArray(data.files) || data.files.length === 0) {
    throw new Error("Fivage upload did not return any file URLs.");
  }

  if (
    data.files.some((fileUrl) => {
      try {
        const parsedUrl = new URL(fileUrl);
        return !["http:", "https:"].includes(parsedUrl.protocol);
      } catch {
        return true;
      }
    })
  ) {
    throw new Error("Fivage upload returned an invalid file URL.");
  }

  return data;
}
