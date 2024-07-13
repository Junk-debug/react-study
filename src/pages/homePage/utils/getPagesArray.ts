export default function getPagesArray(pagesCount: number) {
  return [...Array(pagesCount).keys()].map((i) => i + 1);
}
