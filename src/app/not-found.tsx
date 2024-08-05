import { NextPage } from "next";
import Link from "next/link";
import Button from "@/components/ui/button";

interface Props {}

const NotFountPage: NextPage<Props> = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center mb-6">Page not found</h1>
      <Button>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
};

export default NotFountPage;
