import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <Image src="/logo.png" alt="Logo" width={200} height={200} />
    </div>
  );
}
