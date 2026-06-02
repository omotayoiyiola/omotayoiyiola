export function parseJsonArray(value?: string | null): string[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
  } catch {
    return [];
  }
}

export function toJsonArray(value: FormDataEntryValue | null): string {
  if (!value) return "[]";

  return JSON.stringify(
    String(value)
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)
  );
}
