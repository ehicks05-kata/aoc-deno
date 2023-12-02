import { readLines } from "./utils.ts";

const parse = (lines: string[]) => {
  return lines;
};

const run = async () => {
  const lines = await readLines("inputs/2023/01.txt");

  const parsed = parse(lines);
  console.log(parsed);

  const part1 = 0;
  const part2 = 0;
  console.log(`part1: ${part1}`);
  console.log(`part2: ${part2}`);
};

run();
