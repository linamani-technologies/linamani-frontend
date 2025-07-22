// --- TimelineSection.tsx ---
"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TimelineSection({
  title,
  description,
  children,
  status = "incomplete",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  status?: "complete" | "incomplete";
}) {
  const [open, setOpen] = useState(false);

  const StatusIcon =
    status === "complete" ? (
      <CheckCircle className="text-green-500" />
    ) : (
      <AlertCircle className="text-yellow-500" />
    );

  return (
    <div className="rounded-xl border bg-white shadow-sm transition-all">
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          {StatusIcon}
          <div>
            <h3 className="text-base font-medium leading-none">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <ChevronDown
          className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {open && <div className="space-y-4 border-t px-4 py-4">{children}</div>}
    </div>
  );
}