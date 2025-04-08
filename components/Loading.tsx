import Image from "next/image";

interface LoadingProps {
  text: string;
}

export function Loading({ text }: LoadingProps) {
  return (
    <>
      <h2 className="w-full text-center flex justify-content">{text}</h2>
      <Image src="/loading.gif" alt="Loading..." width={300} height={300} />
    </>
  );
}
