import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { findIndexAfterNthUniqueCharacters } from "./day6.ts";

const testDataPart1 = [
  [ "aaabcdeeeeeee", 5],
  [ "wxyxxywzafdsafae", 7],
  [ "asdasdfb", 6],
  [ "mjqjpqmgbljsphdztnvjfqwrcgsmlb", 6],
  [ "bvwbjplbgvbhsrlpgdmjqwftvncz", 4],
  [ "nppdvjthqldpwncqszvftbrmjlhg", 5],
  [ "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 9],
  [ "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 10]
];

testDataPart1.forEach((testData) => {
  const [input, expected] = testData;

  Deno.test(`With string ${input} we expect the index after 4 unique characters to be at index ${expected}`, () => {
    const actual = findIndexAfterNthUniqueCharacters(input.toString(), 4);

    assertEquals(actual, expected);
  });
});

