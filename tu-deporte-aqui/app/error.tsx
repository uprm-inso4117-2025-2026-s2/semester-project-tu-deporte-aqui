"use client";

import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-gray-900 px-6">
      <div className="max-w-md w-full rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-red-100 p-2 text-red-600">
            <AlertTriangle className="h-5 w-5" aria-hidden />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-semibold text-red-700">Something went wrong</h1>
            <p className="text-sm text-red-700/80">
              {error?.message || "An unexpected error occurred. Please try again."}
            </p>
            {error?.digest && (
              <p className="text-xs text-red-500/80">Error ID: {error.digest}</p>
            )}
            <div className="pt-2">
              <Button onClick={reset} variant="destructive" className="gap-2">
                <RotateCw className="h-4 w-4" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
