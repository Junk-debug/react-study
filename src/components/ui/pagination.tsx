import getPagesArray from "@/utils/getPagesArray";
import getFormattedPagesArray from "@/utils/getFormattedPagesArray";
import Button from "@/components/ui/button";

interface Props {
  pagesCount: number;
  onPageButtonClick: (pageNumber: number) => void;
  currentPage: number;
}

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
    <nav className="flex gap-1 flex-wrap">
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => onPageButtonClick(currentPage - 1)}
      >
        Prev
      </Button>

      {pages.map((pageNumber) => {
        if (typeof pageNumber === "string") {
          return (
            <Button variant="outlined" key={pageNumber} disabled>
              ...
            </Button>
          );
        }
        return (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? "standard" : "outlined"}
            onClick={() => onPageButtonClick(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant="outlined"
        disabled={currentPage === pagesCount}
        onClick={() => onPageButtonClick(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;
