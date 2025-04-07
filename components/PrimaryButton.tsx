import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed

interface PrimaryButtonProps {
  text: string;
}

export default function PrimaryButton({ text }: PrimaryButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      className="font-bold font-geist border-black p-[10px]">
      <Link href="/frame">
        <h4>{text}</h4>
      </Link>
    </Button>
  );
}
