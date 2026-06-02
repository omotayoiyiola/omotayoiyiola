export function toSafeUrl(value: string | null | undefined, allowRelative = true) {
  const url = value?.trim();
  if (!url) return null;

  if (allowRelative && url.startsWith("/") && !url.startsWith("//")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    return null;
  }

  return null;
}

export function isSafeUrl(value: string | null | undefined, allowRelative = true) {
  return toSafeUrl(value, allowRelative) !== null;
}
