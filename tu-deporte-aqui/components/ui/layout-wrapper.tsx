"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type LayoutWrapperProps = {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padded?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function LayoutWrapper({
  className,
  children,
  maxWidth = "xl",
  padded = true,
  ...props
}: LayoutWrapperProps) {
  const widthClass =
    maxWidth === "full"
      ? "max-w-none"
      : maxWidth === "lg"
        ? "max-w-5xl"
        : maxWidth === "md"
          ? "max-w-4xl"
          : maxWidth === "sm"
            ? "max-w-3xl"
            : "max-w-7xl";

  return (
    <div className={cn("min-h-screen bg-white text-gray-900", className)} {...props}>
      <div className={cn("mx-auto px-4", widthClass, padded && "py-10")}>{children}</div>
    </div>
  );
}
