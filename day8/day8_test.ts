import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { Forest } from "./day8.ts";

Deno.test(`load trees and has the right values`, () => {
  const input = `30373
25512
65332
33549`;

  const forest = Forest.loadForest(input);

  assertEquals(forest.width(), 5);
  assertEquals(forest.height(), 4);
});

Deno.test(`test tree visiblity`, () => {
  const input = `30373
25512
65332
33549
35390`;

  const forest = Forest.loadForest(input);
  forest.determineTreeVisibility();

  assertEquals(forest.treeVisibleAt(0,0), true);
  assertEquals(forest.treeVisibleAt(1,1), true);
  assertEquals(forest.treeVisibleAt(2,2), false);
  assertEquals(forest.treeVisibleAt(3,3), false);
  assertEquals(forest.treeVisibleAt(4,4), true);
});

Deno.test(`test tree score sample 1`, () => {
  const input = `30373
25512
65332
33549
35390`;

  const forest = Forest.loadForest(input);
  forest.determineTreeVisibility();

  const values = forest.trees.flat().map(t => t.viewScore());
  console.log(`all values ${values.join(",")}`);
  assertEquals(forest.treeScoreAt(2, 1), 4);
  assertEquals(forest.treeScoreAt(2, 3), 8);
});
