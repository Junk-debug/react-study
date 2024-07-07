// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from "vitest";
import getFormattedPagesArray from "./getFormattedPagesArray";

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

test("current number is 1", () => {
  expect(getFormattedPagesArray(pages, 1)).toStrictEqual([
    1,
    2,
    3,
    4,
    5,
    "...",
    13,
  ]);
});

test("current number is 2", () => {
  expect(getFormattedPagesArray(pages, 2)).toStrictEqual([
    1,
    2,
    3,
    4,
    5,
    "...",
    13,
  ]);
});

test("current number is 3", () => {
  expect(getFormattedPagesArray(pages, 3)).toStrictEqual([
    1,
    2,
    3,
    4,
    5,
    "...",
    13,
  ]);
});

test("current number is 4", () => {
  expect(getFormattedPagesArray(pages, 4)).toStrictEqual([
    1,
    2,
    3,
    4,
    5,
    "...",
    13,
  ]);
});

test("current number is 5", () => {
  expect(getFormattedPagesArray(pages, 5)).toStrictEqual([
    1,
    "...",
    4,
    5,
    6,
    "...",
    13,
  ]);
});

test("current number is 6", () => {
  expect(getFormattedPagesArray(pages, 6)).toStrictEqual([
    1,
    "...",
    5,
    6,
    7,
    "...",
    13,
  ]);
});

test("current number is 7", () => {
  expect(getFormattedPagesArray(pages, 7)).toStrictEqual([
    1,
    "...",
    6,
    7,
    8,
    "...",
    13,
  ]);
});

test("current number is 8", () => {
  expect(getFormattedPagesArray(pages, 8)).toStrictEqual([
    1,
    "...",
    7,
    8,
    9,
    "...",
    13,
  ]);
});

test("current number is 9", () => {
  expect(getFormattedPagesArray(pages, 9)).toStrictEqual([
    1,
    "...",
    8,
    9,
    10,
    "...",
    13,
  ]);
});

test("current number is 10", () => {
  expect(getFormattedPagesArray(pages, 10)).toStrictEqual([
    1,
    "...",
    9,
    10,
    11,
    12,
    13,
  ]);
});

test("current number is 11", () => {
  expect(getFormattedPagesArray(pages, 11)).toStrictEqual([
    1,
    "...",
    9,
    10,
    11,
    12,
    13,
  ]);
});

test("current number is 12", () => {
  expect(getFormattedPagesArray(pages, 12)).toStrictEqual([
    1,
    "...",
    9,
    10,
    11,
    12,
    13,
  ]);
});

test("current number is 13", () => {
  expect(getFormattedPagesArray(pages, 13)).toStrictEqual([
    1,
    "...",
    9,
    10,
    11,
    12,
    13,
  ]);
});
