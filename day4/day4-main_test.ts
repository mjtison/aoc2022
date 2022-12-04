import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { eitherRangeIsSubset, intersectRanges, Range } from "./day4-main.ts";

const rangeInRangeTestData = [
  { range1: new Range(0, 100), range2: new Range(1,1), expected: true },
  { range1: new Range(0, 100), range2: new Range(104,1000), expected: false },
  { range1: new Range(0, 0), range2: new Range(0,0), expected: true }
]

rangeInRangeTestData.forEach((testData) => {
  const range1 = testData.range1;
  const range2 = testData.range2;
  const expected = testData.expected;

  Deno.test(`range of ${range1.start}-${range1.end} and range ${range2.start}-${range2.end}, should contain the other: ${expected}`, () => {
    const result = eitherRangeIsSubset(range1, range2);
    
    assertEquals(result, expected);
  });
});

const rangeIntersectionsData = [
  { range1: new Range(0,0), range2: new Range(0,15), expected: new Set([0]) }, 
  { range1: new Range(100,200), range2: new Range(101,101), expected: new Set([101]) },
  { range1: new Range(5,10), range2: new Range(5,10), expected: new Set([5,6,7,8,9,10]) },
  { range1: new Range(5,10), range2: new Range(0,15), expected: new Set([5,6,7,8,9,10]) }
];

rangeIntersectionsData.forEach((t) => {
  Deno.test(`range of ${t.range1.start}-${t.range1.end} and ${t.range2.start}-${t.range2.end} should have set of size ${t.expected.size}`, () => {
    const result = intersectRanges(t.range1, t.range2);

    assertEquals(result, t.expected);
  });
});