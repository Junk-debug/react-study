import { useRouter } from "next/router";
import { NextPage } from "next";
import WithLoading from "@/components/withLoading";
import Button from "../components/ui/button";

interface Props {}

const NotFountPage: NextPage<Props> = () => {
  const router = useRouter();

  return (
    <WithLoading>
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center mb-6">Page not found</h1>
        <Button onClick={() => router.push("/")}>Go home</Button>
      </div>
    </WithLoading>
  );
};

export default NotFountPage;
