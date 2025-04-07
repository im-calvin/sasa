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
      <Circle className="text-black w-24 h-24" strokeWidth={0.5} fill="white" />
      <span className="font-geist absolute top-1/2 left-1/2 font-light text-6xl text-black -translate-1/2">
        {num}
      </span>
    </div>
  );
}
