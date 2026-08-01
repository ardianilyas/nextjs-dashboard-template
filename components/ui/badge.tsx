import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#136650] text-white hover:bg-[#0d4f3e]",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
        destructive:
          "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
        outline: "text-slate-950 border border-slate-200",
        pending: "bg-red-50 text-red-500 border border-red-100",
        completed: "bg-emerald-50 text-emerald-600 border border-emerald-100",
        processing: "bg-blue-50 text-blue-600 border border-blue-100",
        trendUp: "bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[11px]",
        trendDown: "bg-red-50 text-red-500 px-2 py-0.5 rounded-full text-[11px]",
        badgeCount: "bg-[#136650] text-white text-[11px] font-bold px-2 py-0.5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
