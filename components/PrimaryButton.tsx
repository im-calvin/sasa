import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Url } from "next/dist/shared/lib/router/router";

interface PrimaryButtonProps {
  text: string;
  disable?: boolean;
  href: Url;
}

export default function PrimaryButton({
  text,
  disable,
  href,
}: PrimaryButtonProps) {
  return (
    <Button
      variant="outline"
      asChild={!disable} // the disabled doesn't work without this, ref: https://github.com/shadcn-ui/ui/issues/1894#issuecomment-2089988087
      disabled={disable}
      className="font-bold font-geist border-black p-[10px]">
      <Link href={href}>
        <h4>{text}</h4>
      </Link>
    </Button>
  );
}
