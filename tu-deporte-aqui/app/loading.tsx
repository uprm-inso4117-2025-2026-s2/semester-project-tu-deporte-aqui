"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-gray-900">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#043058]" aria-hidden />
        <p className="text-sm text-gray-600">Loading, please wait…</p>
      </div>
    </div>
  );
}
