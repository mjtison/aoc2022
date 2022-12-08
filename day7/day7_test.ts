import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { part1 } from "./day7.ts";


Deno.test('File.fromLine creates a file from a line of input', async () => {
  const result = await part1("./testdata/sample1.txt")
  assertEquals(result, 95437, 'Size was incorrect')
})