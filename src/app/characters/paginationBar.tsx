"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";

export default function PaginationBar({ pagesCount }: { pagesCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page") || 1);

  const handlePageChange = (page: number): void => {
    const search = searchParams.get("search");
    const newPath = `${pathname}?&search=${search}&page=${page}`;
    router.push(newPath);
  };

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageButtonClick={handlePageChange}
    />
  );
}
