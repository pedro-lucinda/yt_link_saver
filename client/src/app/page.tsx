import Link from "next/link";
import { Button } from "@/components/templates/ui/button";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <Button>Click me</Button>
    </div>
  );
}
