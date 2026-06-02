"use client";

import { useFormStatus } from "react-dom";

type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-[#101214]"
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  required = false,
  rows = 4,
  placeholder,
}: FieldProps & { rows?: number }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {label}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-[#101214]"
      />
    </label>
  );
}

export function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-3 text-sm font-semibold">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-black/20"
      />
      {label}
    </label>
  );
}

export function SubmitButton({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary disabled:opacity-60" disabled={pending}>
      {pending ? "Saving..." : label}
    </button>
  );
}

export function DeleteButton({ label = "Delete" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:hover:bg-red-950"
      disabled={pending}
      onClick={(event) => {
        if (!confirm("Delete this item? This cannot be undone.")) {
          event.preventDefault();
        }
      }}
    >
      {pending ? "Deleting..." : label}
    </button>
  );
}
