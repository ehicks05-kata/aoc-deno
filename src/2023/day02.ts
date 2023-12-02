import { sum } from "$lodash/";
import { readLines } from "../utils.ts";

const getCount = (colors: string[], targetColor: string) => {
  const color = colors.find(color => color.endsWith(targetColor));
  if (!color) return 0;
  const count = color.split(" ")[0];
  return parseInt(count);
}

const parseLine = (line: string) => {
  const [gameLabel, game] = line.trim().split(": ");
  const gameId = parseInt(gameLabel.split(" ")[1]);
  const reaches = game.split("; ");

  let possible = true;
  const minimums = {
    red: 0, green: 0, blue: 0,
  }

  reaches.forEach(reach => {
    const colors = reach.split(", ");
    const red = getCount(colors, 'red')
    const green = getCount(colors, 'green')
    const blue = getCount(colors, 'blue')

    if (red > 12 || green > 13 || blue > 14) {
      possible = false;
    }

    if (red > minimums.red) {
      minimums.red = red;
    }
    if (green > minimums.green) {
      minimums.green = green;
    }
    if (blue > minimums.blue) {
      minimums.blue = blue;
    }
  });

  const power = minimums.red * minimums.green * minimums.blue;
  return {gameId, part1: possible ? gameId : 0, part2: power}
};

const run = async () => {
  const lines = await readLines("./inputs/2023/02.txt");

  const part1 = sum(lines.map(parseLine).map(line => line.part1));
  const part2 = sum(lines.map(parseLine).map(line => line.part2));
  console.log(`part1: ${part1}`);
  console.log(`part2: ${part2}`);
};

run();
