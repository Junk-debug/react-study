import { PureComponent } from "react";
import getPagesArray from "./utils/getPagesArray";
import Button from "../components/ui/button";
import getFormattedPagesArray from "./utils/getFormattedPagesArray";

interface Props {
  pagesCount: number;
  handlePageButtonClick: (pageNumber: number) => void;
  currentPage: number;
}

class PaginationBar extends PureComponent<Props> {
  // TODO: add logic for displaying page buttons
  render() {
    const { currentPage, pagesCount, handlePageButtonClick } = this.props;
    const pages = getFormattedPagesArray(
      getPagesArray(pagesCount),
      currentPage,
    );
    return (
      <nav className="flex gap-1 flex-wrap">
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => handlePageButtonClick(currentPage - 1)}
        >
          Prev
        </Button>

        {pages.map((pageNumber) => {
          if (typeof pageNumber === "symbol") {
            return (
              <Button variant="outlined" key={pageNumber.toString()} disabled>
                ...
              </Button>
            );
          }
          return (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "standard" : "outlined"}
              onClick={() => handlePageButtonClick(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          variant="outlined"
          disabled={currentPage === pagesCount}
          onClick={() => handlePageButtonClick(currentPage + 1)}
        >
          Next
        </Button>
      </nav>
    );
  }
}

export default PaginationBar;
