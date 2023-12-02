
export const readLines = async (path: string) => {
  const text = await Deno.readTextFile(path);
  const lines = text.split("\n");

  if (lines[lines.length - 1].length === 0)
    return lines.slice(0, lines.length - 1);

  return lines;
};
