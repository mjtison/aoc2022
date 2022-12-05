import { assertArrayIncludes, assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { Simulation } from "./day5.ts";

Deno.test("create simple simulation from state", () => {
  const input = `ABC
XYZ

1,1,2
2,1,2`;

  const s = Simulation.Create(input);

  assertEquals(s.stacks.length, 2);
  assertEquals(s.commands.length, 2);
  assertArrayIncludes(s.stacks, [["C", "B", "A"]]);
  assertArrayIncludes(s.commands, ["2,1,2"]);
});

Deno.test("create complex simuation from state", () => {
  const input = `TZB
NDTHV
DMFB
LQVWGJT
MQFVPGDW
SFHGQZV
WCTLRNSZ
MRNJDWHZ
SDFLQM

1,7,4
1,6,2
5,9,4
2,2,8
2,2,6
3,3,7
3,7,1
1,9,4
4,7,3
5,1,8`;

  const s = Simulation.Create(input);

  assertEquals(s.stacks.length, 9);
  assertEquals(s.commands.length, 10);
  assertArrayIncludes(s.stacks, [["B", "F", "M", "D"]]);
  assertArrayIncludes(s.commands, ["4,7,3"]);
});

function CreateSimulations() : Simulation[] {
  const input1 = `ABC
XYZ

1,1,2
2,2,1`;
  const s1 = Simulation.Create(input1);

  const input2 = `NZ
DCM
P

1,2,1
3,1,3
2,2,1
1,1,2`;
  const s2 = Simulation.Create(input2);

  return [s1, s2];
}

const expectations = [
  "XY",
  "CMZ"
];

CreateSimulations().forEach((sim, simIndex) => {
  Deno.test(`sim #${simIndex + 1} should return ${expectations[simIndex]}`, () => {
    const result = sim.execute();

    assertEquals(result, expectations[simIndex]);
  });
});

const expectations2 = [
  "AY",
  "MCD"
];

CreateSimulations().forEach((sim, simIndex) => {
  Deno.test(`sim #${simIndex + 1} for part 2 should return ${expectations2[simIndex]}`, () => {
    const result = sim.execute2();

    assertEquals(result, expectations2[simIndex]);
  });
});