export default function AdminNotice({
  success,
  error,
}: {
  success?: string;
  error?: string;
}) {
  if (!success && !error) return null;

  return (
    <div
      className={`mb-5 rounded-md border px-4 py-3 text-sm font-semibold ${
        error
          ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          : "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
      }`}
    >
      {error || success}
    </div>
  );
}
