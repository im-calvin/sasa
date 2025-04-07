import React from "react";
import { Button } from "@/components/ui/button";

interface PrimaryButtonProps {
  disable?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function PrimaryButton({
  disable,
  onClick,
  children,
  className,
}: PrimaryButtonProps) {
  return (
    <Button
      variant="outline"
      asChild={!disable} // the disabled doesn't work without this, ref: https://github.com/shadcn-ui/ui/issues/1894#issuecomment-2089988087
      disabled={disable}
      className={`border-black p-[10px] hover:cursor-pointer ${className}`}
      onClick={onClick}>
      {children}
    </Button>
  );
}
