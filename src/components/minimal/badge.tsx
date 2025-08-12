import * as React from "react";

const badgeVariants = (variant: string = "default") => {
  const baseClasses = "inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0";
  
  const variantClasses = {
    default: "border-transparent bg-blue-600 text-white",
    secondary: "border-transparent bg-gray-200 text-gray-900",
    destructive: "border-transparent bg-red-600 text-white",
    outline: "border-gray-300 text-gray-700",
  };
  
  return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default}`;
};

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: string;
}) {
  return (
    <span
      className={`${badgeVariants(variant)} ${className || ""}`}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
