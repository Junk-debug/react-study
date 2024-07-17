export default function getFormattedPagesArray(
  pages: number[],
  currentPage: number,
  limit: number = 7,
) {
  const totalPages = pages.length;

  const result: (number | string)[] = [];

  const ellipsisStart = "ellipsisStart";
  const ellipsisEnd = "ellipsisEnd";

  const firstPage = 1;
  const lastPage = totalPages;

  if (totalPages <= limit) {
    return pages;
  }

  if (currentPage <= limit - 3) {
    result.push(...pages.slice(0, limit - 2), ellipsisEnd, lastPage);
  } else if (currentPage >= totalPages - 3) {
    result.push(
      firstPage,
      ellipsisStart,
      ...pages.slice(totalPages - (limit - 2)),
    );
  } else {
    result.push(
      firstPage,
      ellipsisStart,
      ...pages.slice(currentPage - (limit - 5), currentPage + (limit - 6)),
      ellipsisEnd,
      lastPage,
    );
  }

  return result;
}
