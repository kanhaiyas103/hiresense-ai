import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[-0.01em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-white/10 bg-white/[0.06] text-muted-foreground",
        accent:
          "border-indigo-400/20 bg-indigo-400/10 text-indigo-100",
        success:
          "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
