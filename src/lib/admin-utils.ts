import { toSafeUrl } from "@/lib/safe-url";

export function parseList(value: FormDataEntryValue | null) {
  if (!value) return [];

  return String(value)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseMedia(value: FormDataEntryValue | null) {
  return parseList(value).map((url) => {
    const safeUrl = toSafeUrl(url);
    if (!safeUrl) throw new Error("Media URLs must be safe http(s) or site-relative URLs.");

    return {
      type: /\.(mp4|mov|webm|avi)$/i.test(safeUrl) ? "video" : "image",
      url: safeUrl,
    };
  });
}

export function parseUrlList(value: FormDataEntryValue | null, allowRelative = true) {
  return parseList(value).map((url) => {
    const safeUrl = toSafeUrl(url, allowRelative);
    if (!safeUrl) throw new Error("URLs must use http(s) or a safe site-relative path.");
    return safeUrl;
  });
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || null;
}

export function getOptionalUrl(
  formData: FormData,
  key: string,
  allowRelative = true
) {
  const value = getOptionalString(formData, key);
  if (!value) return null;

  const safeUrl = toSafeUrl(value, allowRelative);
  if (!safeUrl) throw new Error(`${key} must be a valid http(s) URL.`);
  return safeUrl;
}

export function getNumber(formData: FormData, key: string) {
  return Number(formData.get(key) || 0);
}

export function requireFields(
  formData: FormData,
  fields: Array<{ key: string; label: string }>
) {
  const missing = fields
    .filter((field) => !getString(formData, field.key))
    .map((field) => field.label);

  if (missing.length) {
    throw new Error(`${missing.join(", ")} required.`);
  }
}

export function formatSearchParams(status: "success" | "error", message: string) {
  return `?${status}=${encodeURIComponent(message)}`;
}
