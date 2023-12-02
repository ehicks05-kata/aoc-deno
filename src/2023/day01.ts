import { sum } from "$lodash/";
import { readLines } from "../utils.ts";

const spelledOutDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const safeParseInt = (char: string) => parseInt(char, 10) || 0;

const parseLinePart1 = (line: string) => {
  const digits = line.split("").map(safeParseInt).filter(Boolean);
  const [leading, trailing] = [digits[0], digits[digits.length - 1]];
  return Number(`${leading}${trailing}`);
};

const checkIndex = (line: string, i: number, isLookBack: boolean) => {
  let digit = safeParseInt(line[isLookBack ? line.length - 1 - i : i]);
  if (digit) {
    return digit;
  }

  spelledOutDigits.forEach((spelledOutDigit, spelledOutIndex) => {
    if (digit) {
      return;
    }
    const sliceRange = isLookBack
      ? [line.length + 1 - i - spelledOutDigit.length, line.length + 1 - i]
      : [i, i + spelledOutDigit.length];
    if (sliceRange[0] < 0 || sliceRange[1] > line.length) {
      return;
    }

    const sliced = line.slice(...sliceRange);
    // console.debug({
    //   i,
    //   isLookBack,
    //   spelledOutDigit,
    //   sliceRange,
    //   sliced,
    //   "found?": sliced === spelledOutDigit,
    // });

    if (sliced === spelledOutDigit) {
      digit = spelledOutIndex + 1;
    }
  });

  return digit;
};

const parseLinePart2 = (line: string) => {
  let leading = 0;
  let trailing = 0;

  let i = 0;
  while (leading === 0 || trailing === 0) {
    if (leading === 0) {
      leading = checkIndex(line, i, false);
    }
    if (trailing === 0) {
      trailing = checkIndex(line, i, true);
    }
    i++;
  }

  console.log(line + ": " + [leading, trailing]);
  return Number(`${leading}${trailing}`);
};

const run = async () => {
  const lines = await readLines("./inputs/2023/01.txt");

  const part1 = sum(lines.map((line) => parseLinePart1(line)));
  const part2 = sum(lines.map((line) => parseLinePart2(line)));
  console.log(`part1: ${part1}`);
  console.log(`part2: ${part2}`);
};

run();
