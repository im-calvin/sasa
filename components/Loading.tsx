import Image from "next/image";

interface LoadingProps {
  text: string;
}

export function Loading({ text }: LoadingProps) {
  return (
    <>
      <h2 className="justify-content flex w-full text-center">{text}</h2>
      <Image src="/loading.gif" alt="Loading..." width={300} height={300} />
    </>
  );
}
