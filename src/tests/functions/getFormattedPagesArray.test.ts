import { it, expect, describe } from "vitest";
import getPagesArray from "../../pages/homePage/utils/getPagesArray";
import getFormattedPagesArray from "../../pages/homePage/utils/getFormattedPagesArray";

const ellipsisStart = "ellipsisStart";
const ellipsisEnd = "ellipsisEnd";

describe("getFormattedPagesArray pagesCount is 13", () => {
  const pagesArray = getPagesArray(13);

  it("current number is 1", () => {
    expect(getFormattedPagesArray(pagesArray, 1)).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 2", () => {
    expect(getFormattedPagesArray(pagesArray, 2)).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 3", () => {
    expect(getFormattedPagesArray(pagesArray, 3)).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 4", () => {
    expect(getFormattedPagesArray(pagesArray, 4)).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 5", () => {
    expect(getFormattedPagesArray(pagesArray, 5)).toStrictEqual([
      1,
      ellipsisStart,
      4,
      5,
      6,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 6", () => {
    expect(getFormattedPagesArray(pagesArray, 6)).toStrictEqual([
      1,
      ellipsisStart,
      5,
      6,
      7,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 7", () => {
    expect(getFormattedPagesArray(pagesArray, 7)).toStrictEqual([
      1,
      ellipsisStart,
      6,
      7,
      8,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 8", () => {
    expect(getFormattedPagesArray(pagesArray, 8)).toStrictEqual([
      1,
      ellipsisStart,
      7,
      8,
      9,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 9", () => {
    expect(getFormattedPagesArray(pagesArray, 9)).toStrictEqual([
      1,
      ellipsisStart,
      8,
      9,
      10,
      ellipsisEnd,
      13,
    ]);
  });

  it("current number is 10", () => {
    expect(getFormattedPagesArray(pagesArray, 10)).toStrictEqual([
      1,
      ellipsisStart,
      9,
      10,
      11,
      12,
      13,
    ]);
  });

  it("current number is 11", () => {
    expect(getFormattedPagesArray(pagesArray, 11)).toStrictEqual([
      1,
      ellipsisStart,
      9,
      10,
      11,
      12,
      13,
    ]);
  });

  it("current number is 12", () => {
    expect(getFormattedPagesArray(pagesArray, 12)).toStrictEqual([
      1,
      ellipsisStart,
      9,
      10,
      11,
      12,
      13,
    ]);
  });

  it("current number is 13", () => {
    expect(getFormattedPagesArray(pagesArray, 13)).toStrictEqual([
      1,
      ellipsisStart,
      9,
      10,
      11,
      12,
      13,
    ]);
  });
});

describe("getFormattedPagesArray pagesCount is 7", () => {
  it("current number is 1", () => {
    expect(getFormattedPagesArray([1, 2, 3, 4, 5, 6, 7], 1)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("current number is 2", () => {
    expect(getFormattedPagesArray([1, 2, 3, 4, 5, 6, 7], 2)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("current number is 3", () => {
    expect(getFormattedPagesArray([1, 2, 3, 4, 5, 6, 7], 3)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("current number is 4", () => {
    expect(getFormattedPagesArray([1, 2, 3, 4, 5, 6, 7], 1)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("current number is 5", () => {
    expect(getFormattedPagesArray([1, 2, 3, 4, 5, 6, 7], 5)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("current number is 6", () => {
    expect(getFormattedPagesArray([1, 2, 3, 4, 5, 6, 7], 6)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("current number is 7", () => {
    expect(getFormattedPagesArray([1, 2, 3, 4, 5, 6, 7], 7)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });
});
