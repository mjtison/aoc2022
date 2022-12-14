import { takeWhile } from "https://deno.land/std@0.117.0/collections/mod.ts";

export function findIndexAfterNthUniqueCharacters(value: string, nth: number): number {
  const lastNthCharacters : string[] = [];
  const stringBeforeMarker = takeWhile<string>([...value], (char: string) => {
    if (lastNthCharacters.length >= nth)
      lastNthCharacters.shift();
    lastNthCharacters.push(char);

    if (lastNthCharacters.length < nth) {
      return true;
    }
    return new Set<string>([...lastNthCharacters]).size < nth;
  });
  return stringBeforeMarker.length;
}

if (import.meta.main) {
  const text = await Deno.readTextFile("./data.txt");

  const part1 = findIndexAfterNthUniqueCharacters(text.trim(), 4) + 1;

  console.log(`part 1 ${part1}`);

  const part2 = findIndexAfterNthUniqueCharacters(text.trim(), 14) + 1;

  console.log(`part 2 ${part2}`);
}
