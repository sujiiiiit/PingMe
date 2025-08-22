import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

function IconButton({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={`inline-flex cursor-pointer disabled:cursor-auto text-center p-2 bg-transparent hover:bg-light-secondary-text text-2xl  text-secondary-text items-center justify-center  rounded-full  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${className}`}
      {...props}
    />
  );
}

export { IconButton };
