import * as React from "react";

const buttonVariants = (variant: string = "default", size: string = "default") => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    newspaper: "border border-black bg-white text-black hover:bg-gray-50 font-['NYTImperial:Regular',_sans-serif] rounded-none",
  };
  
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md gap-1.5 px-3 py-1.5",
    lg: "h-10 rounded-md px-6 py-2",
  };
  
  return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default}`;
};

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: string;
  size?: string;
}) {
  return (
    <button
      className={`${buttonVariants(variant, size)} ${className || ""}`}
      {...props}
    />
  );
}

export { Button, buttonVariants };
