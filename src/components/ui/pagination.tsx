import getPagesArray from "@/utils/getPagesArray";
import getFormattedPagesArray from "@/utils/getFormattedPagesArray";
import Button from "@/components/ui/button";
import clsx from "clsx";

interface Props {
  pagesCount: number;
  onPageButtonClick: (pageNumber: number) => void;
  currentPage: number;
}

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={clsx("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
    <span className="sr-only">More pages</span>
  </span>
);

const Pagination: React.FC<Props> = ({
  currentPage,
  pagesCount,
  onPageButtonClick,
}) => {
  if (pagesCount < 1) {
    return null;
  }

  const pages = getFormattedPagesArray(getPagesArray(pagesCount), currentPage);

  return (
    <nav role="navigation" className="flex gap-1 flex-row items-center">
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => onPageButtonClick(currentPage - 1)}
      >
        Previous
      </Button>

      {pages.map((pageNumber) => {
        if (pageNumber === "ellipsisStart" || pageNumber === "ellipsisEnd") {
          return <PaginationEllipsis key={pageNumber} />;
        }
        return (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? "outlined" : "ghost"}
            onClick={() => onPageButtonClick(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant="ghost"
        disabled={currentPage === pagesCount}
        onClick={() => onPageButtonClick(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;
