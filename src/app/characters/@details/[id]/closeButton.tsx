"use client";

import Button from "@/components/ui/button";
import CloseIconButton from "@/components/ui/closeButton";
import { useRouter, useSearchParams } from "next/navigation";

export default function CloseButton({
  variant = "text",
}: {
  variant?: "text" | "icon";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const newPath = `/characters?${searchParams.toString()}`;
    router.push(newPath, { scroll: false });
  };

  if (variant === "icon") {
    return <CloseIconButton aria-label="close" onClick={handleClick} />;
  }

  return (
    <Button aria-label="close" onClick={handleClick}>
      Close
    </Button>
  );
}
