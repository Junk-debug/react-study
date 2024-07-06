import { PureComponent } from "react";
import getPagesArray from "./utils/getPagesArray";
import Button from "../components/ui/button";

interface Props {
  pagesCount: number;
  handlePageButtonClick: (pageNumber: number) => void;
  currentPage: number;
}

class PaginationBar extends PureComponent<Props> {
  render() {
    const { currentPage, pagesCount, handlePageButtonClick } = this.props;
    const pages = getPagesArray(pagesCount);
    return (
      <div className="flex gap-1 flex-wrap">
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => handlePageButtonClick(currentPage - 1)}
        >
          Prev
        </Button>

        {pages.slice(0, 5).map((pageNumber) => (
          <Button
            variant={pageNumber === currentPage ? "standard" : "outlined"}
            onClick={() => handlePageButtonClick(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </Button>
        ))}
        <Button disabled variant="outlined">
          ...
        </Button>
        <Button
          variant={pagesCount === currentPage ? "standard" : "outlined"}
          onClick={() => handlePageButtonClick(pagesCount)}
        >
          {pagesCount}
        </Button>

        <Button
          variant="outlined"
          disabled={currentPage === pagesCount}
          onClick={() => handlePageButtonClick(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default PaginationBar;
