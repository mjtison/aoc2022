import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { charValue, lastOfIntersectStrings, splitStringInHalf, lastOfIntersectThreeStrings } from "./day3-main.ts";


const testDataSetIntersection = [
  [ "AAb", "ttA", "A" ],
  [ "vJrwpWtwJgWr", "hcsFMMfFFhFp", "p" ],
  [ "asdfqwer", "jklLKJIAa", "a" ]
]

testDataSetIntersection.forEach((testData) => {
  const firstSegment = testData[0];
  const secondSegment = testData[1];
  const expected = testData[2];

  Deno.test(`find intesetion between ${firstSegment} and ${secondSegment}`, () => {
    const result = lastOfIntersectStrings(firstSegment, secondSegment);

    assertEquals(result, expected);
  });
});


const testDataSetSplit = [
  [ "aaaa", "aa", "aa" ],
  [ "aaaabb", "aaa", "abb" ],
  [ "vJrwpWtwJgWrhcsFMMfFFhFp", "vJrwpWtwJgWr", "hcsFMMfFFhFp" ]
];

testDataSetSplit.forEach((testData) => {
  const input = testData[0];
  const expectedFirstSegment = testData[1];
  const expectedSecondSegment = testData[2];

  Deno.test(`split string ${input} into halves of ${expectedFirstSegment} and ${expectedSecondSegment}`, () => {
    const { firstSegment, secondSegment } = splitStringInHalf(input);

    assertEquals(firstSegment, expectedFirstSegment);
    assertEquals(secondSegment, expectedSecondSegment);
  });
});

const testDataCharValue = [
  { char: "a", val: 1 },
  { char: "b", val: 2 },
  { char: "L", val: 38 },
  { char: "A", val: 27 },
  { char: "v", val: 22 }
];

testDataCharValue.forEach((testData) => {
  const input = testData.char;
  const expected = testData.val;

  Deno.test(`value of ${input} is ${expected}`, () => {
    const result = charValue(input);

    assertEquals(result, expected);
  });
});

const testDataIntersect3 = [
  [ "asdf", "jkla", "Auba", "a"],
  [ "ajdf", "jkla", "Aubj", "j"],
  [ "aAdf", "jklavvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvA", "Aubj", "A"],
];

testDataIntersect3.forEach((testData) => {
  const input1 = testData[0];
  const input2 = testData[1];
  const input3 = testData[2];
  const expected = testData[3];

  Deno.test(`common character in ${input1}, ${input2}, ${input3} should be ${expected}`, () => {
    const result = lastOfIntersectThreeStrings(input1, input2, input3);

    assertEquals(result, expected);
  });
});