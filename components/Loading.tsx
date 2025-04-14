import Image from "next/image";

interface LoadingProps {
  text: string;
}

export function Loading({ text }: LoadingProps) {
  return (
    <div className="justify-content flex h-full w-full flex-col items-center gap-8 px-11">
      <Image src="/loading.gif" alt="Loading..." width={1000} height={270} />
      <h4 className="text-center text-(--saman-red)">{text}</h4>
    </div>
  );
}
