import { assertArrayIncludes, assertEquals, assertExists } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getAllTotals } from "./getAllTotals.ts"

Deno.test("doesn't throw", () => {
    const result = getAllTotals("");
    assertExists(result);
  });

Deno.test("has some totals", () => {
    const input = `
100
50
50
  
999
1`;

    const result = getAllTotals(input);

    assertEquals(2, result.length);
    assertArrayIncludes(result, [200, 1000]);
});