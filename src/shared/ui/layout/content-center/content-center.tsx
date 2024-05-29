import { cn } from "@/shared/lib";

export const ContentCenter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("max-w-[87.5rem] w-11/12 mx-auto", className)}
      {...props}
    />
  );
};
