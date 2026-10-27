import type { ReactNode } from "react";

// Flat, filled inputs. They sit on `bg-surface` panels, so the field itself
// uses the page background; focus turns the border blue.
export const fieldClass =
  "mt-2 w-full rounded-field border-2 border-transparent bg-background px-5 py-3.5 text-[15px] text-foreground transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none";

export function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="eyebrow text-muted" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}
