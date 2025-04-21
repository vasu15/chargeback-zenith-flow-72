
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        info: "bg-info text-info-foreground",
        pending: "bg-pending text-pending-foreground",
        outline: "border border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status?: string;
}

function StatusBadge({
  className,
  variant,
  status,
  ...props
}: StatusBadgeProps) {
  // If variant is not explicitly provided, infer it from the status
  const inferredVariant = 
    variant || 
    (status?.toLowerCase() === "success" ? "success" : 
    status?.toLowerCase() === "error" ? "destructive" :
    status?.toLowerCase() === "warning" ? "warning" :
    status?.toLowerCase() === "info" ? "info" :
    status?.toLowerCase() === "pending" ? "pending" : "default");

  return (
    <div
      className={cn(statusBadgeVariants({ variant: inferredVariant }), className)}
      {...props}
    >
      {status}
    </div>
  );
}

export { StatusBadge, statusBadgeVariants };
