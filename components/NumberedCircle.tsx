import { Circle } from "lucide-react";

interface NumberedCircleProps {
  num: number;
  className: string;
}

export default function NumberedCircle({
  num,
  className,
}: NumberedCircleProps) {
  return (
    <div className={`${className}`}>
      <Circle className="h-24 w-24 text-black" strokeWidth={0.5} fill="white" />
      <span className="font-geist absolute top-1/2 left-1/2 -translate-1/2 text-6xl font-light text-black">
        {num}
      </span>
    </div>
  );
}
